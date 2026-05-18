import { useCallback, useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';

export function useCalendarMonth(initialDate = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const monthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const monthEnd = useMemo(() => endOfMonth(monthStart), [monthStart]);
  const startDate = useMemo(() => startOfWeek(monthStart, { weekStartsOn: 1 }), [monthStart]);
  const endDate = useMemo(() => endOfWeek(monthEnd, { weekStartsOn: 1 }), [monthEnd]);

  const days = useMemo(() => eachDayOfInterval({ start: startDate, end: endDate }), [endDate, startDate]);

  const nextMonth = useCallback(() => setCurrentDate((date) => addMonths(date, 1)), []);
  const previousMonth = useCallback(() => setCurrentDate((date) => subMonths(date, 1)), []);
  const goToToday = useCallback(() => setCurrentDate(new Date()), []);

  return {
    currentDate,
    setCurrentDate,
    monthStart,
    monthEnd,
    startDate,
    endDate,
    days,
    nextMonth,
    previousMonth,
    goToToday,
  };
}
