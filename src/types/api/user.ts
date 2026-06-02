import { VoidableProps } from "../utils";

export enum UserRole {
  USER = "user",
  COORDINATOR = "coordinator",
  AGENT = "agent",
  VOLUNTEER = "volunteer",
  ADMIN = "admin",
}

interface UserGet {
  id: number;
  personId: number;
  email: string;
  isActive: boolean;
  role: UserRole;
  firstName: string;
  fullName: string;
  avatarUrl: string;
  isoCode: string;
  timezone: string;
}

export type ApiUserGet = VoidableProps<UserGet, "avatarUrl" | "personId">;
