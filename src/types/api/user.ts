import { Lang } from "../core";
import { VoidableProps } from "../utils";

export enum UserRole {
  USER = "user",
  COORDINATOR = "coordinator",
  AGENT = "agent",
  VOLUNTEER = "volunteer",
  ADMIN = "admin",
}

export interface ApiUserPost {
  email: string;
  password: string;
  role: UserRole;
  language?: Lang;
  person: {
    id?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
  };
}

export interface ApiAuthRefreshPost {
  refresh?: string;
}

export interface ApiAuthRefreshResponse {
  access: string;
  refresh: string;
}

export interface ApiAgentMembershipSummary {
  agentId: number;
  agentTitle: string;
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
  agentId?: number;
  agentMemberships?: ApiAgentMembershipSummary[];
  volunteerId?: number;
}

export type ApiUserGet = VoidableProps<UserGet, "avatarUrl" | "personId">;

export interface ApiUserVerifyEmail {
  message: string;
  verified: boolean;
  hasVolunteerProfile?: boolean;
}

export interface ApiCoordinatorInvitePost {
  email: string;
  person: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
}

export interface ApiCoordinatorInviteResponse {
  token: string;
  link: string;
  expiresAt: string;
}

export interface ApiCoordinatorRegisterWithInvite {
  password: string;
}
