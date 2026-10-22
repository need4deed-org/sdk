import { describe, expect, it } from "vitest";
import { ProfileVolunteeringType } from "../types/api/profile";
import { volunteerTypesFromStatusType } from "./volunteer-types";

describe("volunteerTypesFromStatusType", () => {
  it("splits regular-accompanying into regular and accompanying", () => {
    expect(
      volunteerTypesFromStatusType(ProfileVolunteeringType.REGULAR_ACCOMPANYING),
    ).toEqual([
      ProfileVolunteeringType.REGULAR,
      ProfileVolunteeringType.ACCOMPANYING,
    ]);
  });

  it.each([
    ProfileVolunteeringType.REGULAR,
    ProfileVolunteeringType.ACCOMPANYING,
    ProfileVolunteeringType.EVENTS,
  ])("keeps %s as a single type", (statusType) => {
    expect(volunteerTypesFromStatusType(statusType)).toEqual([statusType]);
  });

  it("is empty without a type", () => {
    expect(volunteerTypesFromStatusType(null)).toEqual([]);
    expect(volunteerTypesFromStatusType(undefined)).toEqual([]);
  });
});
