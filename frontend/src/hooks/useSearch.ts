import { useMemo, useState } from 'react';
import type { UseSearchOptions } from '@/types';

export function useSearch<T>({ items, getSearchText, initialQuery = '' }: UseSearchOptions<T>) {
  const [query, setQuery] = useState(initialQuery);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return items;

    return items.filter((item) => getSearchText(item).toLowerCase().includes(normalizedQuery));
  }, [getSearchText, items, normalizedQuery]);

  return {
    query,
    setQuery,
    results,
    hasQuery: normalizedQuery.length > 0,
  };
}
