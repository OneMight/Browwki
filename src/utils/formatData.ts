import {
  addDays,
  format,
  getDay,
  isValid,
  parseISO,
  startOfDay
} from "date-fns";
import { ru } from "date-fns/locale";
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} мин`;
  return m ? `${h} ч ${m} мин` : `${h} ч`;
}

export function toKey(date: Date | string): string {
  return format(date, "yyyy-MM-dd");
}
export function toKeyMonth(date: Date | string): string {
  return format(date, "dd.MM");
}
export function toKeyDay(date: Date | string): string {
  return format(date, "d");
}
export function toKeyMonthnDay(
  date: Date | string
): string {
  return format(date, "d MMM", { locale: ru });
}
export function toKeyFullMonth(
  date: Date | string
): string {
  return format(date, "dd MMMM", { locale: ru });
}
export function fromKey(key: string): Date {
  return parseISO(key);
}
export function todayKey(): string {
  return toKey(new Date());
}
export function weekdayOf(key: string): number {
  return getDay(fromKey(key));
}
export function offsetKey(days: number): string {
  return toKey(addDays(startOfDay(new Date()), days));
}
export function slotDate(key: string, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  const date = fromKey(key);
  date.setHours(h, m, 0, 0);
  return date;
}
export function getTime(date: string): string {
  if (!date) return "";
  const parsedDate = parseISO(date);
  if (!isValid(parsedDate)) return "";
  return format(parsedDate, "HH:mm");
}
export function formatAllDate(date: string): string {
  const formatted = format(date, "eeee, d MMMM", {
    locale: ru
  });
  return (
    formatted.charAt(0).toUpperCase() + formatted.slice(1)
  );
}
export function formatDate(
  value: string,
  pattern: string
): string {
  const date =
    typeof value === "string" ? parseISO(value) : value;
  return format(date, pattern, { locale: ru });
}
