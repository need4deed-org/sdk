/**
 * Berlin working-day calendar shared by be and fe.
 *
 * Dates are date-only values: local-midnight `Date`s read with the local
 * getters. Start from `berlinToday()`, never `new Date()`. Holidays are
 * Berlin's public holidays (federal + 8 March); no school holidays.
 */
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

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isGermanPublicHoliday(date: Date): boolean {
  const y = date.getFullYear();
  const easter = easterSunday(y);

  const holidays = [
    new Date(y, 0, 1),
    new Date(y, 2, 8),
    new Date(y, 4, 1),
    new Date(y, 9, 3),
    new Date(y, 11, 25),
    new Date(y, 11, 26),
    addDays(easter, -2),
    addDays(easter, 1),
    addDays(easter, 39),
    addDays(easter, 50),
  ];

  return holidays.some((h) => sameDay(h, date));
}

export function isWorkingDay(date: Date): boolean {
  const dow = date.getDay();
  return dow !== 0 && dow !== 6 && !isGermanPublicHoliday(date);
}

export function addWorkingDays(from: Date, days: number): Date {
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

export function berlinToday(): Date {
  const s = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Berlin",
  });
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
