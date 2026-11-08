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
  /** Volunteer sign-up through an NGO's registration link: the signed token from that link; the volunteer is created owned by the NGO. */
  ngoToken?: string;
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
  hasAgentMembership?: boolean;
}

export interface ApiCoordinatorInvitePost {
  email: string;
  person: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
}

export interface ApiSignedLinkResponse {
  token: string;
  link: string;
  expiresAt: string;
}

export type ApiCoordinatorInviteResponse = ApiSignedLinkResponse;

/** POST /agent/:id/registration-link (admin): a signed volunteer registration link for that NGO, valid 90 days. */
export type ApiAgentRegistrationLinkResponse = ApiSignedLinkResponse;

export interface ApiCoordinatorRegisterWithInvite {
  password: string;
}
