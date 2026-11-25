import { StrictMode } from 'react';
import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GitHubRepo } from '../types';

const repository: GitHubRepo = {
  id: 1,
  name: 'portafolio',
  description: 'Proyecto de prueba',
  html_url: 'https://github.com/isidoraavs/portafolio',
  language: 'TypeScript',
  stargazers_count: 2,
};

const fetchMock = vi.fn<typeof fetch>();
let useRepos: (typeof import('./useRepos'))['useRepos'];

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), { status });
}

function deferredResponse() {
  let resolve!: (response: Response) => void;
  const promise = new Promise<Response>((complete) => { resolve = complete; });
  return { promise, resolve };
}

beforeEach(async () => {
  vi.resetModules();
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
  ({ useRepos } = await import('./useRepos'));
});

describe('useRepos', () => {
  it('pasa de carga a éxito cuando llega una respuesta válida', async () => {
    const response = deferredResponse();
    fetchMock.mockReturnValueOnce(response.promise);
    const { result } = renderHook(() => useRepos());
    expect(result.current.state).toEqual({ kind: 'loading' });

    await act(async () => { response.resolve(jsonResponse([repository])); });

    await waitFor(() => expect(result.current.state).toEqual({
      kind: 'success', status: 200, data: [repository],
    }));
  });

  it('reintenta después de HTTP 404 y muestra la transición de carga', async () => {
    const retryResponse = deferredResponse();
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 404));
    fetchMock.mockReturnValueOnce(retryResponse.promise);
    const { result } = renderHook(() => useRepos());
    await waitFor(() => expect(result.current.state).toMatchObject({
      kind: 'error', status: 404,
    }));

    act(() => result.current.retry());
    expect(result.current.state).toEqual({ kind: 'loading' });
    await act(async () => { retryResponse.resolve(jsonResponse([repository])); });

    await waitFor(() => expect(result.current.state).toMatchObject({ kind: 'success' }));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('aborta al desmontar y una respuesta tardía no llena la caché', async () => {
    const firstResponse = deferredResponse();
    fetchMock.mockReturnValueOnce(firstResponse.promise);
    const first = renderHook(() => useRepos());
    const firstSignal = fetchMock.mock.calls[0][1]?.signal;
    first.unmount();
    expect(firstSignal?.aborted).toBe(true);
    await act(async () => { firstResponse.resolve(jsonResponse([repository])); });

    const secondResponse = deferredResponse();
    fetchMock.mockReturnValueOnce(secondResponse.promise);
    const second = renderHook(() => useRepos());
    expect(second.result.current.state).toEqual({ kind: 'loading' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await act(async () => { secondResponse.resolve(jsonResponse([])); });
    await waitFor(() => expect(second.result.current.state).toEqual({
      kind: 'success', status: 200, data: [],
    }));
  });

  it('ignora la respuesta del intento anterior después de reintentar', async () => {
    const staleResponse = deferredResponse();
    const currentResponse = deferredResponse();
    const updated = { ...repository, name: 'actualizado' };
    fetchMock.mockReturnValueOnce(staleResponse.promise);
    fetchMock.mockReturnValueOnce(currentResponse.promise);
    const hook = renderHook(() => useRepos());
    const staleSignal = fetchMock.mock.calls[0][1]?.signal;

    act(() => hook.result.current.retry());
    expect(staleSignal?.aborted).toBe(true);
    await act(async () => { currentResponse.resolve(jsonResponse([updated])); });
    await waitFor(() => expect(hook.result.current.state).toEqual({
      kind: 'success', status: 200, data: [updated],
    }));
    await act(async () => { staleResponse.resolve(jsonResponse([repository])); });
    expect(hook.result.current.state).toEqual({
      kind: 'success', status: 200, data: [updated],
    });

    hook.unmount();
    const cached = renderHook(() => useRepos());
    expect(cached.result.current.state).toEqual({
      kind: 'success', status: 200, data: [updated],
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('reutiliza la caché durante cinco minutos y consulta otra vez al vencer', async () => {
    let now = Date.UTC(2026, 10, 25, 12);
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    fetchMock.mockResolvedValueOnce(jsonResponse([repository]));
    const first = renderHook(() => useRepos());
    await waitFor(() => expect(first.result.current.state).toMatchObject({ kind: 'success' }));
    first.unmount();

    now += 299_999;
    const cached = renderHook(() => useRepos());
    expect(cached.result.current.state).toMatchObject({ kind: 'success' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    cached.unmount();

    now += 1;
    const refreshedResponse = deferredResponse();
    fetchMock.mockReturnValueOnce(refreshedResponse.promise);
    const refreshed = renderHook(() => useRepos());
    expect(refreshed.result.current.state).toEqual({ kind: 'loading' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await act(async () => { refreshedResponse.resolve(jsonResponse([])); });
    await waitFor(() => expect(refreshed.result.current.state).toEqual({
      kind: 'success', status: 200, data: [],
    }));
  });

  it('mantiene en caché la petición más reciente con dos consumidores simultáneos', async () => {
    const olderResponse = deferredResponse();
    const newerResponse = deferredResponse();
    const updated = { ...repository, name: 'más-reciente' };
    fetchMock.mockReturnValueOnce(olderResponse.promise);
    fetchMock.mockReturnValueOnce(newerResponse.promise);
    const older = renderHook(() => useRepos());
    const newer = renderHook(() => useRepos());

    await act(async () => { newerResponse.resolve(jsonResponse([updated])); });
    await waitFor(() => expect(newer.result.current.state).toMatchObject({ kind: 'success' }));
    await act(async () => { olderResponse.resolve(jsonResponse([repository])); });
    await waitFor(() => expect(older.result.current.state).toMatchObject({ kind: 'success' }));
    older.unmount();
    newer.unmount();

    const cached = renderHook(() => useRepos());
    expect(cached.result.current.state).toEqual({
      kind: 'success', status: 200, data: [updated],
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('tolera la limpieza adicional de StrictMode sin aceptar su respuesta abortada', async () => {
    const firstResponse = deferredResponse();
    const secondResponse = deferredResponse();
    fetchMock.mockReturnValueOnce(firstResponse.promise);
    fetchMock.mockReturnValueOnce(secondResponse.promise);
    const { result } = renderHook(() => useRepos(), { wrapper: StrictMode });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true);

    await act(async () => { secondResponse.resolve(jsonResponse([])); });
    await waitFor(() => expect(result.current.state).toEqual({
      kind: 'success', status: 200, data: [],
    }));
    await act(async () => { firstResponse.resolve(jsonResponse([repository])); });
    expect(result.current.state).toEqual({ kind: 'success', status: 200, data: [] });
  });
});

describe('GitHubProjects', () => {
  it('muestra carga y una respuesta vacía de forma explícita', async () => {
    const { GitHubProjects } = await import('../components/GitHubProjects');
    const response = deferredResponse();
    fetchMock.mockReturnValueOnce(response.promise);
    render(<GitHubProjects />);
    expect(screen.getByRole('status')).toHaveTextContent('Cargando repositorios');

    await act(async () => { response.resolve(jsonResponse([])); });

    expect(await screen.findByText('No hay resultados para mostrar.')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('HTTP 200');
    expect(screen.getByRole('status')).toHaveTextContent('Sin repositorios públicos');
  });

  it('el botón Reintentar recupera un error y presenta enlaces seguros', async () => {
    const { GitHubProjects } = await import('../components/GitHubProjects');
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 404));
    const retryResponse = deferredResponse();
    fetchMock.mockReturnValueOnce(retryResponse.promise);
    render(<GitHubProjects />);
    expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 404');

    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(screen.getByRole('status')).toHaveTextContent('Cargando repositorios');
    await act(async () => { retryResponse.resolve(jsonResponse([repository])); });

    const link = await screen.findByRole('link', { name: 'Ver repositorio portafolio' });
    expect(link).toHaveAttribute('href', repository.html_url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
