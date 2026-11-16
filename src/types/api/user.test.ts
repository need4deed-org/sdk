import { describe, expect, expectTypeOf, it } from "vitest";
import {
  ADMIN_MANAGEABLE_ROLES,
  isAdminManageableRole,
  UserRole,
  type AdminManageableRole,
  type ApiAdminUserRolePatch,
} from "../..";

describe("admin account role contract", () => {
  it("lets admins manage coordinator, NGO and admin accounts only", () => {
    expect(ADMIN_MANAGEABLE_ROLES).toEqual([
      UserRole.COORDINATOR,
      UserRole.AGENT,
      UserRole.ADMIN,
    ]);
    expect(isAdminManageableRole(UserRole.AGENT)).toBe(true);
    expect(isAdminManageableRole(UserRole.VOLUNTEER)).toBe(false);
    expect(isAdminManageableRole(UserRole.USER)).toBe(false);
    expect(isAdminManageableRole(undefined)).toBe(false);
  });

  it("types the role patch body to manageable roles", () => {
    expectTypeOf<ApiAdminUserRolePatch>().toEqualTypeOf<{
      role: AdminManageableRole;
    }>();
  });
});
