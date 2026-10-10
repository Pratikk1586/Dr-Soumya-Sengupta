import { useAsync, type UseAsyncResult } from './useAsync';

/**
 * Convenience hook to fetch data from any service method with automatic loading and error state.
 * Example: const { data: doctor, isLoading, error } = useService(useCallback(() => doctorService.getProfile(), []));
 */
export function useService<T>(
  serviceMethod: () => Promise<T>,
  deps: unknown[] = []
): UseAsyncResult<T> {
  return useAsync(serviceMethod, deps);
}

