import type { ApiCommuteRange } from "../types/api/commute";

export const COMMUTE_RANGE_STEP_MINUTES = 5;

export function toCommuteRange(minutes: number | null | undefined): ApiCommuteRange | null {
  if (minutes === null || minutes === undefined || !Number.isFinite(minutes) || minutes < 0) return null;
  const min = COMMUTE_RANGE_STEP_MINUTES * Math.floor(minutes / COMMUTE_RANGE_STEP_MINUTES);
  return { min, max: min + COMMUTE_RANGE_STEP_MINUTES };
}
