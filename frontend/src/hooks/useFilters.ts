import { useCallback, useMemo, useState } from 'react';

export function useFilters<TFilters extends object>(initialFilters: TFilters) {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = useCallback(<TKey extends keyof TFilters>(key: TKey, value: TFilters[TKey]) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => setFilters(initialFilters), [initialFilters]);

  const hasActiveFilters = useMemo(
    () =>
      Object.values(filters).some((value) => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== '';
      }),
    [filters],
  );

  return {
    filters,
    setFilters,
    setFilter,
    resetFilters,
    hasActiveFilters,
  };
}
