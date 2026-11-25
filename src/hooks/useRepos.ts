import { useEffect, useRef, useState } from 'react';
import type { ApiState, GitHubReposResponse } from '../types';
import { getRepos, HttpError } from '../services/apiService';

const CACHE_DURATION = 5 * 60 * 1000;
let cache: { response: GitHubReposResponse; expiresAt: number } | null = null;
let generation = 0;

function cachedResponse(): GitHubReposResponse | null {
  if (cache && cache.expiresAt > Date.now()) return cache.response;
  cache = null;
  return null;
}

export function useRepos() {
  const [state, setState] = useState<ApiState>(() => {
    const response = cachedResponse();
    return response ? { kind: 'success', ...response } : { kind: 'loading' };
  });
  const [attempt, setAttempt] = useState(0);
  const currentRequest = useRef(0);

  useEffect(() => {
    const response = cachedResponse();
    if (response) {
      setState({ kind: 'success', ...response });
      return;
    }

    const controller = new AbortController();
    const request = ++currentRequest.current;
    const requestGeneration = ++generation;
    setState({ kind: 'loading' });

    getRepos(controller.signal)
      .then((result) => {
        if (controller.signal.aborted || request !== currentRequest.current) return;
        if (requestGeneration === generation) {
          cache = { response: result, expiresAt: Date.now() + CACHE_DURATION };
        }
        setState({ kind: 'success', ...result });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || request !== currentRequest.current) return;
        setState({
          kind: 'error',
          status: error instanceof HttpError ? error.status : null,
          retryAt: error instanceof HttpError ? error.retryAt : null,
          message:
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los repositorios. Revisa tu conexión e inténtalo de nuevo.',
        });
      });

    return () => controller.abort();
  }, [attempt]);

  function retry() {
    currentRequest.current += 1;
    generation += 1;
    cache = null;
    setState({ kind: 'loading' });
    setAttempt((previous) => previous + 1);
  }

  return { state, retry };
}
