import type { Locale } from 'date-fns';
import format from 'date-fns/format';

/**
 * The default formatter for the name of the weekday.
 */
export function formatWeekdayName(
  weekday: Date,
  options?: { locale?: Locale }
): string {
  return format(weekday, 'cccccc', options);
}
