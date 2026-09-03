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

// Deliberately not ApiAgentMembership (that one embeds a full ApiPersonGet —
// meant for "who are this agent's contacts", the opposite direction, and
// would over-expose PII for what /me needs). Not OptionById either — agent
// titles are a plain string, not the per-locale OptionTitle map that type
// expects. be#809.
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
  // Single "primary" active agent membership — kept for backward
  // compatibility with existing single-agent consumers. See
  // agentMemberships for the full list (be#809).
  agentId?: number;
  // All of the caller's active AgentPerson memberships, not just one — a
  // person can belong to more than one agent (be#809).
  agentMemberships?: ApiAgentMembershipSummary[];
}

export type ApiUserGet = VoidableProps<UserGet, "avatarUrl" | "personId">;

export interface ApiUserVerifyEmail {
  message: string;
  verified: boolean;
  // Only meaningful for role: VOLUNTEER — true when the Person behind this
  // account already has a Volunteer profile (e.g. from a legacy record now
  // linked via email, be#923), so the completion form should be skipped.
  hasVolunteerProfile?: boolean;
}
