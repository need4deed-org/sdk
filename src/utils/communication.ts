import { UserRole } from "../types/api/user";

export function canModifyCommunication(
  communication: { userId?: number | null },
  user?: { id: number; role: UserRole } | null,
): boolean {
  if (!user) {
    return false;
  }
  return (
    user.role === UserRole.ADMIN ||
    !communication.userId ||
    communication.userId === user.id
  );
}
