import { useCallback, useState } from 'react';
import type { DateRange } from '@/modules/analytics/types';

export function useDateRange(initialRange: DateRange) {
  const [dateRange, setDateRange] = useState(initialRange);

  const setFrom = useCallback((from: Date) => {
    setDateRange((current) => ({
      ...current,
      from,
    }));
  }, []);

  const setTo = useCallback((to: Date) => {
    setDateRange((current) => ({
      ...current,
      to,
    }));
  }, []);

  return {
    dateRange,
    setDateRange,
    setFrom,
    setTo,
  };
}
