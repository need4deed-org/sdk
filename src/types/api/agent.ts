import { Voidable, VoidableProps } from "../utils";
import { ApiComment } from "./comment";
import { OptionById } from "./common";
import { ApiLanguage } from "./language";
import { OptionItem } from "./option";
import { ApiPersonGet, ApiPersonPatch } from "./person";

// Canonical seed values for the `agent_type` reference table (see AgentType
// below) — not used directly in any API contract.
export enum AgentTypeKey {
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

// Canonical seed values for the `service` reference table (see Service
// below) — not used directly in any API contract.
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

// Translated reference data: an id resolving to an en/de title via
// field_translation, rather than a bare enum value.
export type AgentType = OptionById;
export type Service = OptionById;

export interface AgentDetails {
  about: string;
  website?: Voidable<string>;
  address: string;
  organizationType: AgentType;
  operator: string;
  services: Service[];
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
  middleName?: string;
  lastName: string;
  role: AgentRoleType;
  email?: string;
  phone?: string;
  landline?: string;
  addressStreet?: string;
  addressPostcode?: string;
}

// Updates an existing contact (Person + AgentPerson membership) on an agent.
// Every field optional (partial update). agentId + membershipId are carried
// in the URL, not the body — unlike ApiRepresentativePatch, which patches a
// person by personId and disambiguates the membership via an agentId field
// in the body, this targets one membership row directly, so it works for
// any contact (not just a self-patch or the collapsed representative).
export type ApiAgentContactPatch = Partial<ApiAgentContactPost>;

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
  services: Service[];
  statusEngagement: AgentEngagementStatusType;
  agentDetails: AgentDetails;
  comments: ApiComment[];
  languages: ApiLanguage[];
}
export type ApiAgentGet = VoidableProps<
  AgentGet,
  "district" | "operator" | "representative" | "services" | "updatedAt"
>;

interface AgentPatch {
  title: string;
  typeId: number;
  volunteerSearch: AgentVolunteerSearchType;
  trustLevel: AgentTrustType;
  statusEngagement: AgentEngagementStatusType;
  about: string;
  website: string;
  addressStreet: string;
  addressPostcode: string;
  statusSearch: AgentVolunteerSearchType;
  serviceIds: number[];
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
  typeId?: number;
  info?: string;
  website?: string;
  serviceIds?: number[];
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
