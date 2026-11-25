import type { GitHubRepo, GitHubReposResponse } from '../types';

export const endpoint =
  'https://api.github.com/users/isidoraavs/repos?sort=updated&per_page=6';

export class HttpError extends Error {
  readonly retryAt: number | null;

  constructor(
    public readonly status: number,
    options: { rateLimited?: boolean; retryAt?: number | null } = {},
  ) {
    const message = options.rateLimited
      ? 'Se alcanzó el límite de consultas de GitHub. Reintenta más tarde.'
      : status === 404
        ? 'No se encontró el usuario o recurso de GitHub.'
        : 'No fue posible obtener los repositorios de GitHub.';
    super(message);
    this.name = 'HttpError';
    this.retryAt = options.retryAt ?? null;
  }
}

function githubUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'github.com' &&
      url.port === '' &&
      url.username === '' &&
      url.password === ''
    );
  } catch {
    return false;
  }
}

function isGitHubRepo(value: unknown): value is GitHubRepo {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'id' in value &&
    typeof value.id === 'number' &&
    Number.isSafeInteger(value.id) &&
    value.id > 0 &&
    'name' in value &&
    typeof value.name === 'string' &&
    value.name.trim().length > 0 &&
    'description' in value &&
    (value.description === null || typeof value.description === 'string') &&
    'html_url' in value &&
    typeof value.html_url === 'string' &&
    githubUrl(value.html_url) &&
    'language' in value &&
    (value.language === null || typeof value.language === 'string') &&
    'stargazers_count' in value &&
    typeof value.stargazers_count === 'number' &&
    Number.isSafeInteger(value.stargazers_count) &&
    value.stargazers_count >= 0
  );
}

function retryTime(headers: Headers): number | null {
  const retryAfter = headers.get('retry-after');
  if (retryAfter !== null) {
    const seconds = Number(retryAfter);
    const deadline = Number.isFinite(seconds)
      ? Date.now() + seconds * 1000
      : Date.parse(retryAfter);
    if (Number.isFinite(deadline) && deadline >= Date.now()) return deadline;
  }

  const reset = headers.get('x-ratelimit-reset');
  if (reset !== null) {
    const deadline = Number(reset) * 1000;
    if (Number.isFinite(deadline) && deadline >= Date.now()) return deadline;
  }
  return null;
}

export async function getRepos(signal: AbortSignal): Promise<GitHubReposResponse> {
  signal.throwIfAborted();
  let response: Response;
  try {
    response = await fetch(endpoint, {
      signal,
      headers: { Accept: 'application/vnd.github+json' },
    });
  } catch {
    signal.throwIfAborted();
    throw new Error('No se pudo conectar con GitHub. Revisa tu conexión e inténtalo de nuevo.');
  }
  signal.throwIfAborted();

  if (!response.ok) {
    const rateLimited =
      response.status === 429 ||
      (response.status === 403 &&
        (response.headers.get('x-ratelimit-remaining') === '0' ||
          response.headers.has('retry-after')));
    throw new HttpError(response.status, {
      rateLimited,
      retryAt: rateLimited ? retryTime(response.headers) : null,
    });
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    signal.throwIfAborted();
    throw new Error('GitHub devolvió una respuesta que no se pudo interpretar.');
  }
  signal.throwIfAborted();
  if (!Array.isArray(payload)) {
    throw new Error('GitHub devolvió un formato de repositorios inesperado.');
  }
  const repositories: unknown[] = payload;
  if (!repositories.every(isGitHubRepo)) {
    throw new Error('GitHub devolvió datos de repositorios incompletos o inválidos.');
  }
  return { status: response.status, data: repositories };
}
