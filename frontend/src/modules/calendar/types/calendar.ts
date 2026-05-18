export type CalendarView = 'month' | 'week' | 'day';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}
