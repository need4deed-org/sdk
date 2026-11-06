import { describe, expect, it } from "vitest";
import { toCommuteRange } from "./commute";

describe("toCommuteRange", () => {
  it("buckets minutes into 5-minute ranges", () => {
    expect(toCommuteRange(27)).toEqual({ min: 25, max: 30 });
    expect(toCommuteRange(25)).toEqual({ min: 25, max: 30 });
    expect(toCommuteRange(0)).toEqual({ min: 0, max: 5 });
    expect(toCommuteRange(4.9)).toEqual({ min: 0, max: 5 });
  });

  it("returns null without a usable travel time", () => {
    expect(toCommuteRange(null)).toBeNull();
    expect(toCommuteRange(undefined)).toBeNull();
    expect(toCommuteRange(-1)).toBeNull();
    expect(toCommuteRange(Number.NaN)).toBeNull();
  });
});
