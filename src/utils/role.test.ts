import { describe, expect, expectTypeOf, it } from "vitest";
import {
  isAdminAssignableRole,
  isAdminManageableRole,
  UserRole,
  type AdminAssignableRole,
  type ApiAdminUserActionError,
  type ApiAdminUserActionResponse,
  type ApiAdminUserRolePatch,
  type ApiUserGet,
} from "..";

describe("admin account roles", () => {
  it.each([UserRole.COORDINATOR, UserRole.AGENT, UserRole.ADMIN])(
    "lets admins manage %s accounts",
    (role) => {
      expect(isAdminManageableRole(role)).toBe(true);
    },
  );

  it.each([UserRole.VOLUNTEER, UserRole.USER, "superuser", 42, null, undefined])(
    "does not let admins manage %s",
    (role) => {
      expect(isAdminManageableRole(role)).toBe(false);
    },
  );

  it.each([UserRole.COORDINATOR, UserRole.ADMIN])(
    "lets admins assign %s",
    (role) => {
      expect(isAdminAssignableRole(role)).toBe(true);
    },
  );

  it.each([UserRole.AGENT, UserRole.VOLUNTEER, UserRole.USER, "admin ", {}])(
    "does not let admins assign %s",
    (role) => {
      expect(isAdminAssignableRole(role)).toBe(false);
    },
  );

  it("types the role patch, its response and its errors", () => {
    expectTypeOf<ApiAdminUserRolePatch>().toEqualTypeOf<{
      role: AdminAssignableRole;
    }>();
    expectTypeOf<ApiAdminUserActionResponse>().toEqualTypeOf<ApiUserGet>();
    expectTypeOf<ApiAdminUserActionError["code"]>().toEqualTypeOf<
      | "self"
      | "last_admin"
      | "not_manageable"
      | "role_not_assignable"
      | "erased"
      | "not_deactivated"
      | "not_verified"
      | "deactivated"
    >();
  });
});
