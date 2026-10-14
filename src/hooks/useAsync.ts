import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseAsyncResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}

interface State<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = []
): UseAsyncResult<T> {
  const [state, setState] = useState<State<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const asyncFnRef = useRef(asyncFn);
  useEffect(() => {
    asyncFnRef.current = asyncFn;
  });

  const reload = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await asyncFnRef.current();
      setState({ data: result, isLoading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        error: err instanceof Error ? err : new Error(String(err)),
      });
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    asyncFnRef.current()
      .then((result) => {
        if (!isCancelled) {
          setState({ data: result, isLoading: false, error: null });
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setState({
            data: null,
            isLoading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          });
        }
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    reload,
  };
}
