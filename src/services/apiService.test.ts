import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GitHubRepo } from '../types';
import { endpoint, getRepos, HttpError } from './apiService';

const repository: GitHubRepo = {
  id: 1,
  name: 'portafolio',
  description: 'Proyecto de prueba',
  html_url: 'https://github.com/isidoraavs/portafolio',
  language: 'TypeScript',
  stargazers_count: 2,
};

const fetchMock = vi.fn<typeof fetch>();

function jsonResponse(payload: unknown, status = 200, headers?: HeadersInit): Response {
  return new Response(JSON.stringify(payload), { status, headers });
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

describe('getRepos', () => {
  it('valida HTTP 200 y conserva el AbortSignal recibido', async () => {
    const controller = new AbortController();
    fetchMock.mockResolvedValueOnce(jsonResponse([repository]));

    await expect(getRepos(controller.signal)).resolves.toEqual({
      status: 200, data: [repository],
    });
    expect(fetchMock).toHaveBeenCalledWith(endpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    });
  });

  it('admite una respuesta vacía y campos que GitHub permite nulos', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([]));
    await expect(getRepos(new AbortController().signal)).resolves.toEqual({
      status: 200, data: [],
    });
    fetchMock.mockResolvedValueOnce(jsonResponse([
      { ...repository, description: null, language: null },
    ]));
    await expect(getRepos(new AbortController().signal)).resolves.toMatchObject({
      data: [{ description: null, language: null }],
    });
  });

  it('distingue HTTP 404 de un error de conexión', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ message: 'Not Found' }, 404));
    const request = getRepos(new AbortController().signal);
    await expect(request).rejects.toBeInstanceOf(HttpError);
    await expect(request).rejects.toMatchObject({
      status: 404,
      message: expect.stringContaining('No se encontró'),
      retryAt: null,
    });
  });

  it('explica el límite HTTP 403 y lee el momento de restablecimiento', async () => {
    const now = Date.UTC(2026, 10, 25, 12);
    vi.spyOn(Date, 'now').mockReturnValue(now);
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 403, {
      'x-ratelimit-remaining': '0',
      'x-ratelimit-reset': String((now + 120_000) / 1000),
    }));

    await expect(getRepos(new AbortController().signal)).rejects.toMatchObject({
      status: 403,
      message: expect.stringContaining('límite de consultas'),
      retryAt: now + 120_000,
    });
  });

  it('lee Retry-After en segundos para HTTP 429', async () => {
    const now = Date.UTC(2026, 10, 25, 12);
    vi.spyOn(Date, 'now').mockReturnValue(now);
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 429, { 'retry-after': '30' }));

    await expect(getRepos(new AbortController().signal)).rejects.toMatchObject({
      status: 429,
      message: expect.stringContaining('límite de consultas'),
      retryAt: now + 30_000,
    });
  });

  it('admite Retry-After como fecha HTTP sin inventar un plazo inválido', async () => {
    const now = Date.UTC(2026, 10, 25, 12);
    vi.spyOn(Date, 'now').mockReturnValue(now);
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 429, {
      'retry-after': new Date(now + 60_000).toUTCString(),
    }));
    await expect(getRepos(new AbortController().signal)).rejects.toMatchObject({
      retryAt: now + 60_000,
    });
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 429, {
      'retry-after': 'no-es-una-fecha', 'x-ratelimit-reset': 'inválido',
    }));
    await expect(getRepos(new AbortController().signal)).rejects.toMatchObject({
      status: 429, retryAt: null,
    });
  });

  it('no confunde un HTTP 403 sin indicios de cuota con rate limit', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 403));
    await expect(getRepos(new AbortController().signal)).rejects.toMatchObject({
      status: 403,
      message: 'No fue posible obtener los repositorios de GitHub.',
      retryAt: null,
    });
  });

  it.each([
    ['objeto en lugar de arreglo', { message: 'incorrecto' }],
    ['elemento nulo', [null]],
    ['objeto incompleto', [{ id: 1, name: 'incompleto' }]],
    ['id de tipo incorrecto', [{ ...repository, id: '1' }]],
    ['descripción de tipo incorrecto', [{ ...repository, description: 123 }]],
    ['lenguaje de tipo incorrecto', [{ ...repository, language: false }]],
    ['estrellas negativas', [{ ...repository, stargazers_count: -1 }]],
  ])('rechaza HTTP 200 con %s', async (_label, payload) => {
    fetchMock.mockResolvedValueOnce(jsonResponse(payload));
    await expect(getRepos(new AbortController().signal)).rejects.toThrow(/GitHub devolvió/);
  });

  it.each([
    'javascript:alert(1)',
    'http://github.com/isidoraavs/portafolio',
    'https://github.com.ejemplo.com/isidoraavs/portafolio',
    'https://otro-dominio.com/portafolio',
    'https://usuario:clave@github.com/isidoraavs/portafolio',
  ])('rechaza enlaces ajenos al contrato HTTPS de GitHub (%s)', async (html_url) => {
    fetchMock.mockResolvedValueOnce(jsonResponse([{ ...repository, html_url }]));
    await expect(getRepos(new AbortController().signal)).rejects.toThrow(/inválidos/);
  });

  it('convierte JSON ilegible en un error controlado', async () => {
    fetchMock.mockResolvedValueOnce(new Response('{json incompleto', { status: 200 }));
    await expect(getRepos(new AbortController().signal)).rejects.toThrow(
      'GitHub devolvió una respuesta que no se pudo interpretar.',
    );
  });

  it('convierte un fallo de red en una explicación legible', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    await expect(getRepos(new AbortController().signal)).rejects.toThrow(/No se pudo conectar/);
  });

  it('rechaza una señal ya abortada antes de consultar la red', async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(getRepos(controller.signal)).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('descarta una respuesta tardía aunque el transporte ignore el aborto', async () => {
    const controller = new AbortController();
    let resolveResponse!: (response: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise((resolve) => { resolveResponse = resolve; }));
    const request = getRepos(controller.signal);
    const rejected = expect(request).rejects.toMatchObject({ name: 'AbortError' });

    controller.abort();
    resolveResponse(jsonResponse([repository]));

    await rejected;
  });
});
