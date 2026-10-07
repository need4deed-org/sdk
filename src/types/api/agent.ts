import { Voidable, VoidableProps } from "../utils";
import { ApiComment } from "./comment";
import { OptionById } from "./common";
import { ApiLanguage } from "./language";
import { OptionItem } from "./option";
import { ApiPersonGet, ApiPersonPatch } from "./person";

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
  INCONTACT = "agent-incontact",
  TRIED_TO_CONTACT = "agent-tried-to-contact",
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

export type ApiRepresentativePatch = ApiPersonPatch & {
  role?: AgentRoleType;
  agentId?: number;
};

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
  unclaimed: boolean;
  lat: number | null;
  lon: number | null;
  statusEngagement: AgentEngagementStatusType;
}
export type ApiAgentGetList = VoidableProps<AgentGetList, "district">;

interface AgentGet extends AgentGetList {
  createdAt: Date;
  updatedAt: Date;
  operator: string;
  representative: ApiRepresentativeGet;
  contacts: ApiAgentMembership[];
  services: Service[];
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
  organizationId: number;
}
export type ApiAgentPatch = VoidableProps<AgentPatch>;

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

export interface ApiAgentCreateResponse {
  agentId: number;
}

export interface ApiAgentTitleConflict {
  conflict: "title";
  agentId: number;
}

export interface ApiAgentAddressConflict {
  conflict: "address";
  agentId: number;
}

export type ApiAgentRegisterConflict =
  | ApiAgentTitleConflict
  | ApiAgentAddressConflict;

export interface ApiAgentMembership {
  id: number;
  agentId: number;
  agentTitle: string;
  person: ApiPersonGet;
  role: AgentRoleType;
  status: AgentMembershipStatus;
}
