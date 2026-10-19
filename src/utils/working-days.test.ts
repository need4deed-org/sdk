import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  addWorkingDays,
  berlinToday,
  isBerlinPublicHoliday,
  isWorkingDay,
  MIN_APPOINTMENT_WORKING_DAYS,
  minAppointmentDay,
} from "./working-days";

const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);

describe("isBerlinPublicHoliday", () => {
  describe("fixed federal holidays", () => {
    it.each([
      ["Neujahr", d(2026, 1, 1)],
      ["Tag der Arbeit", d(2026, 5, 1)],
      ["Tag der Deutschen Einheit", d(2026, 10, 3)],
      ["1. Weihnachtstag", d(2026, 12, 25)],
      ["2. Weihnachtstag", d(2026, 12, 26)],
    ])("%s is a holiday", (_name, date) => {
      expect(isBerlinPublicHoliday(date)).toBe(true);
    });
  });

  describe("Berlin state holiday", () => {
    it("Internationaler Frauentag (Mar 8) is a holiday", () => {
      expect(isBerlinPublicHoliday(d(2026, 3, 8))).toBe(true);
    });
  });

  describe("Easter-based holidays", () => {
    it.each([
      ["Karfreitag 2026", d(2026, 4, 3)],
      ["Ostermontag 2026", d(2026, 4, 6)],
      ["Christi Himmelfahrt 2026", d(2026, 5, 14)],
      ["Pfingstmontag 2026", d(2026, 5, 25)],
    ])("%s is a holiday", (_name, date) => {
      expect(isBerlinPublicHoliday(date)).toBe(true);
    });

    it.each([
      ["Karfreitag 2025", d(2025, 4, 18)],
      ["Ostermontag 2025", d(2025, 4, 21)],
      ["Christi Himmelfahrt 2025", d(2025, 5, 29)],
      ["Pfingstmontag 2025", d(2025, 6, 9)],
    ])("%s is a holiday", (_name, date) => {
      expect(isBerlinPublicHoliday(date)).toBe(true);
    });

    it.each([
      ["Karfreitag 2024", d(2024, 3, 29)],
      ["Ostermontag 2024", d(2024, 4, 1)],
      ["Christi Himmelfahrt 2024", d(2024, 5, 9)],
      ["Pfingstmontag 2024", d(2024, 5, 20)],
    ])("%s is a holiday", (_name, date) => {
      expect(isBerlinPublicHoliday(date)).toBe(true);
    });
  });

  describe("regular working days", () => {
    it.each([d(2026, 1, 2), d(2026, 4, 7), d(2026, 7, 1), d(2026, 12, 24)])(
      "%s is not a holiday",
      (date) => {
        expect(isBerlinPublicHoliday(date)).toBe(false);
      },
    );
  });
});

describe("addWorkingDays", () => {
  it("skips weekends", () => {
    const result = addWorkingDays(d(2026, 1, 2), 1);
    expect(result).toEqual(d(2026, 1, 5));
  });

  it("skips weekends when subtracting days", () => {
    const result = addWorkingDays(d(2026, 1, 5), -1);
    expect(result).toEqual(d(2026, 1, 2));
  });

  it("skips Saturday and Sunday when spanning a weekend", () => {
    const result = addWorkingDays(d(2026, 1, 8), 2);
    expect(result).toEqual(d(2026, 1, 12));
  });

  it("skips public holidays", () => {
    const result = addWorkingDays(d(2026, 4, 2), 1);
    expect(result).toEqual(d(2026, 4, 7));
  });

  it("4 working days across Easter weekend", () => {
    const result = addWorkingDays(d(2026, 3, 30), 4);
    expect(result).toEqual(d(2026, 4, 7));
  });

  it("adding 0 working days returns the same day", () => {
    const result = addWorkingDays(d(2026, 6, 10), 0);
    expect(result).toEqual(d(2026, 6, 10));
  });

  it("does not count the start date itself", () => {
    const result = addWorkingDays(d(2026, 6, 1), 1);
    expect(result).toEqual(d(2026, 6, 2));
  });
});

describe("berlinToday", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the current Berlin calendar date as a local Date", () => {
    vi.setSystemTime(new Date("2026-07-01T22:30:00Z"));
    const result = berlinToday();
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(2);
  });

  it("returns the same day when UTC and Berlin date match", () => {
    vi.setSystemTime(new Date("2026-07-01T10:00:00Z"));
    const result = berlinToday();
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(1);
  });
});

describe("isWorkingDay", () => {
  it("is false on weekends and public holidays", () => {
    expect(isWorkingDay(new Date(2026, 9, 2))).toBe(true);
    expect(isWorkingDay(new Date(2026, 9, 3))).toBe(false);
    expect(isWorkingDay(new Date(2026, 9, 4))).toBe(false);
    expect(isWorkingDay(new Date(2026, 11, 25))).toBe(false);
  });
});

describe("addWorkingDays across the year boundary", () => {
  it("skips Christmas, the weekend and New Year", () => {
    expect(addWorkingDays(d(2026, 12, 23), 3)).toEqual(d(2026, 12, 29));
    expect(addWorkingDays(d(2026, 12, 30), 2)).toEqual(d(2027, 1, 4));
    expect(addWorkingDays(d(2027, 1, 4), -2)).toEqual(d(2026, 12, 30));
  });
});

describe("addWorkingDays argument check", () => {
  it.each([1.5, Infinity, NaN])("throws for %s", (days) => {
    expect(() => addWorkingDays(d(2026, 1, 5), days)).toThrow(RangeError);
  });
});

describe("minAppointmentDay", () => {
  it("is the 7th working day after today", () => {
    expect(MIN_APPOINTMENT_WORKING_DAYS).toBe(7);
    expect(minAppointmentDay(d(2026, 4, 1))).toEqual(d(2026, 4, 14));
    expect(minAppointmentDay(d(2026, 6, 4))).toEqual(d(2026, 6, 15));
  });

  it("defaults to the Berlin today", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-31T22:30:00Z"));
    expect(minAppointmentDay()).toEqual(d(2026, 4, 14));
    vi.useRealTimers();
  });
});
