import {
  AdminAssignableRole,
  AdminManageableRole,
  UserRole,
} from "../types/api/user";

export const ADMIN_MANAGEABLE_ROLES: readonly AdminManageableRole[] = [
  UserRole.COORDINATOR,
  UserRole.AGENT,
  UserRole.ADMIN,
];

export const ADMIN_ASSIGNABLE_ROLES: readonly AdminAssignableRole[] = [
  UserRole.COORDINATOR,
  UserRole.ADMIN,
];

export function isAdminManageableRole(
  role: unknown,
): role is AdminManageableRole {
  return ADMIN_MANAGEABLE_ROLES.some((manageable) => manageable === role);
}

export function isAdminAssignableRole(
  role: unknown,
): role is AdminAssignableRole {
  return ADMIN_ASSIGNABLE_ROLES.some((assignable) => assignable === role);
}
