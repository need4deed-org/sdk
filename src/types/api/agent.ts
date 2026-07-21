import { Voidable, VoidableProps } from "../utils";
import { ApiComment } from "./comment";
import { OptionById } from "./common";
import { ApiLanguage } from "./language";
import { OptionItem } from "./option";
import { ApiPersonGet, ApiPersonPatch } from "./person";

export enum AgentType {
  AE = "AE",
  GU1 = "GU1",
  GU2 = "GU2",
  GU2_PLUS = "GU2+",
  GU3 = "GU3",
  NU = "NU",
  ASOG = "ASOG",
  COUNSELING_CENTER = "counseling-center",
  TANDEM = "tandem",
  MULTIPLE_SOCIAL_SUPPORT = "multiple-social-support",
}

export enum AgentOperatorType {
  ORGANIZATION = "organization",
  PERSON = "person",
}

export enum AgentRoleType {
  SOCIAL_WORKER = "social-worker",
  VOLUNTEER_COORDINATOR = "volunteer-coordinator",
  MANAGER = "manager",
  PROJECT_COORDINATOR = "project-coordinator",
  PSYCHOLOGIST = "psychologist",
  PROJECT_STAFF = "project-staff",
  CHILDCARE_WORKER = "childcare-worker",
  OTHER = "other",
}

export enum AgentEngagementStatusType {
  NEW = "agent-new",
  ACTIVE = "agent-active",
  UNRESPONSIVE = "agent-unresponsive",
  INACTIVE = "agent-inactive",
}

export enum AgentVolunteerSearchType {
  SEARCHING = "agent-searching",
  NOT_NEEDED = "agent-not-needed",
  VOLUNTEERS_FOUND = "agent-volunteers-found",
}

export enum AgentServiceType {
  CHILDCARE = "childcare",
  WELFARE = "welfare",
  CONSULTATION = "consultation",
  VOLUNTARY_SUPPORT = "voluntary-support",
  TANDEM = "tandem",
  SPORT = "sport",
  TUTORING = "tutoring",
  REFUGEE_ACCOMMODATION = "refugee-accommodation",
  JOB_COACHING = "job-coaching",
  YOUTH = "youth",
}

export enum AgentTrustType {
  HIGH = "agent-high",
  LOW = "agent-low",
  UNKNOWN = "agent-unknown",
}

export interface AgentDetails {
  about: string;
  website?: Voidable<string>;
  address: string;
  organizationType: AgentType;
  operator: string;
  services: string;
  clientLanguages: OptionItem[];
}

export interface ApiRepresentativeGet extends ApiPersonGet {
  role: AgentRoleType;
}

// Superset of ApiPersonPatch: editing a person in their capacity as an
// agent's representative additionally allows setting their role on that
// membership. agentId disambiguates which AgentPerson row to update for a
// person who belongs to more than one agent — it cannot be inferred from
// personId alone.
export type ApiRepresentativePatch = ApiPersonPatch & {
  role?: AgentRoleType;
  agentId?: number;
};

// Creates a brand-new contact (Person + AgentPerson membership) on an
// existing agent — distinct from ApiAgentRegister, which always links the
// *authenticated caller's own* person. A contact created this way need not
// have a user account of its own. agentId is carried in the URL, not the body.
export interface ApiAgentContactPost {
  firstName: string;
  lastName: string;
  role: AgentRoleType;
  email?: string;
  phone?: string;
  addressStreet?: string;
  addressPostcode?: string;
}

interface AgentGetList {
  id: number;
  title: string;
  type: AgentType;
  volunteerSearch: AgentVolunteerSearchType;
  trustLevel: AgentTrustType;
  district: OptionById;
  activeVolunteers: number;
  email: string;
  numOpportunities: number;
}
export type ApiAgentGetList = VoidableProps<AgentGetList, "district">;

interface AgentGet extends AgentGetList {
  createdAt: Date;
  updatedAt: Date;
  operator: string;
  representative: ApiRepresentativeGet;
  // Every AgentPerson membership for this agent (representative included), so
  // the profile can list all contacts rather than the single collapsed
  // representative. `representative` is kept for existing consumers that only
  // need the primary contact.
  contacts: ApiAgentMembership[];
  serviceType: AgentServiceType[];
  statusEngagement: AgentEngagementStatusType;
  agentDetails: AgentDetails;
  comments: ApiComment[];
  languages: ApiLanguage[];
}
export type ApiAgentGet = VoidableProps<
  AgentGet,
  "district" | "operator" | "representative" | "serviceType" | "updatedAt"
>;

interface AgentPatch {
  title: string;
  type: AgentType;
  volunteerSearch: AgentVolunteerSearchType;
  trustLevel: AgentTrustType;
  serviceType: AgentServiceType[];
  statusEngagement: AgentEngagementStatusType;
  about: string;
  website: string;
  addressStreet: string;
  addressPostcode: string;
  statusSearch: AgentVolunteerSearchType;
  services: AgentServiceType[];
  languages: OptionById[];
  districtId: number;
}
export type ApiAgentPatch = VoidableProps<AgentPatch>;

// --- Agent self-registration ---------------------------------------------
// An authenticated AGENT user (already created + email-verified via POST /user)
// either JOINs an existing agent or CREATEs a new one through POST /agent/register.
//
// NOTE: the write field names below (`info`, `languages: number[]`) follow the
// registration write contract and intentionally differ from ApiAgentPatch
// (`about`, `languages: OptionById[]`). Do not "align" them — they map to
// different backend handlers.

export interface ApiAgentRegisterNew {
  title: string;
  type?: AgentType;
  info?: string;
  website?: string;
  services?: AgentServiceType[];
  addressStreet?: string;
  addressPostcode?: string;
  districtId?: number;
  languages?: number[];
}

export type ApiAgentRegister =
  | { agentId: number }
  | { agent: ApiAgentRegisterNew };

export enum AgentMembershipStatus {
  ACTIVE = "active",
  PENDING = "pending",
}

export interface ApiAgentRegisterResponse {
  agentId: number;
  membershipStatus: AgentMembershipStatus;
}

// Returned with HTTP 409 when CREATE hits the unique-title constraint, so the
// client can offer to JOIN the existing agent instead of minting a duplicate.
export interface ApiAgentTitleConflict {
  conflict: "title";
  agentId: number;
}

// Returned with HTTP 409 when CREATE's street+postcode already resolve to an
// existing agent (same getAgentByAddress matcher as POST /opportunity/legacy),
// so the client can offer to JOIN it instead of minting a duplicate.
export interface ApiAgentAddressConflict {
  conflict: "address";
  agentId: number;
}

export type ApiAgentRegisterConflict =
  | ApiAgentTitleConflict
  | ApiAgentAddressConflict;

// A person<->agent membership, surfaced to ADMIN/COORDINATOR for moderating
// joins that did not pass domain-match (membershipStatus === PENDING).
export interface ApiAgentMembership {
  id: number;
  agentId: number;
  agentTitle: string;
  person: ApiPersonGet;
  role: AgentRoleType;
  status: AgentMembershipStatus;
}
