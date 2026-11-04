import { describe, expect, it } from "vitest";
import { UserRole } from "../types/api/user";
import { canModifyCommunication } from "./communication";

const coordinator = { id: 1, role: UserRole.COORDINATOR };

describe("canModifyCommunication", () => {
  it("lets the author change their entry", () => {
    expect(canModifyCommunication({ userId: 1 }, coordinator)).toBe(true);
  });

  it("forbids another coordinator's entry", () => {
    expect(canModifyCommunication({ userId: 2 }, coordinator)).toBe(false);
  });

  it("lets an admin change anyone's entry", () => {
    expect(
      canModifyCommunication({ userId: 2 }, { id: 1, role: UserRole.ADMIN }),
    ).toBe(true);
  });

  it.each([undefined, null, 0])(
    "treats userId %j as an entry without an author",
    (userId) => {
      expect(canModifyCommunication({ userId }, coordinator)).toBe(true);
    },
  );

  it.each([undefined, null])("denies when there's no user (%j)", (user) => {
    expect(canModifyCommunication({}, user)).toBe(false);
  });
});
