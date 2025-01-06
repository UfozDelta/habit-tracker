import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

export function getDaysInMonth(date: Date): Date[] {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getMonthName(date: Date): string {
  return format(date, 'MMMM yyyy');
}

