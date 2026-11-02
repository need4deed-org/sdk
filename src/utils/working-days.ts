function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function addDays(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

function monthDayKey(date: Date): number {
  return date.getMonth() * 100 + date.getDate();
}

const holidaysByYear = new Map<number, Set<number>>();

function holidaysOf(year: number): Set<number> {
  let holidays = holidaysByYear.get(year);
  if (!holidays) {
    const easter = easterSunday(year);
    holidays = new Set(
      [
        new Date(year, 0, 1),
        new Date(year, 2, 8),
        new Date(year, 4, 1),
        new Date(year, 9, 3),
        new Date(year, 11, 25),
        new Date(year, 11, 26),
        addDays(easter, -2),
        addDays(easter, 1),
        addDays(easter, 39),
        addDays(easter, 50),
      ].map(monthDayKey),
    );
    holidaysByYear.set(year, holidays);
  }
  return holidays;
}

export function isBerlinPublicHoliday(date: Date): boolean {
  return holidaysOf(date.getFullYear()).has(monthDayKey(date));
}

export function isWorkingDay(date: Date): boolean {
  const dow = date.getDay();
  return dow !== 0 && dow !== 6 && !isBerlinPublicHoliday(date);
}

export function addWorkingDays(from: Date, days: number): Date {
  if (!Number.isInteger(days)) {
    throw new RangeError(
      `addWorkingDays: days must be an integer, got ${days}`,
    );
  }
  let result = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const direction = days < 0 ? -1 : 1;
  const remaining = Math.abs(days);
  let added = 0;
  while (added < remaining) {
    result = addDays(result, direction);
    if (isWorkingDay(result)) {
      added++;
    }
  }
  return result;
}

export const MIN_APPOINTMENT_WORKING_DAYS = 7;

const berlinDateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export function berlinToday(): Date {
  const parts = Object.fromEntries(
    berlinDateFormat
      .formatToParts(new Date())
      .map(({ type, value }) => [type, Number(value)]),
  );
  return new Date(parts.year, parts.month - 1, parts.day);
}

export function minAppointmentDay(today: Date = berlinToday()): Date {
  return addWorkingDays(today, MIN_APPOINTMENT_WORKING_DAYS);
}
