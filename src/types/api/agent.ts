import { VoidableProps } from "../utils";
import { ApiComment } from "./comment";
import { OptionById } from "./common";
import { OptionItem } from "./option";
import { ApiPersonGet } from "./person";

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
  website?: string;
  address: string;
  organizationType: AgentType;
  operator: string;
  services: string;
  clientLanguages: OptionItem[];
}

export interface ApiRepresentativeGet extends ApiPersonGet {
  role: AgentRoleType;
}

export type ApiRepresentativePatch = Partial<ApiRepresentativeGet>;

export interface ApiAgentGetList {
  id: number;
  title: string;
  type: AgentType;
  volunteerSearch: AgentVolunteerSearchType;
  trustLevel: AgentTrustType;
  district?: OptionById;
  activeVolunteers: number;
}

export interface ApiAgentGet extends ApiAgentGetList {
  createdAt: Date;
  updatedAt?: Date;
  operator?: string;
  representative?: ApiRepresentativeGet;
  serviceType?: AgentServiceType[];
  statusEngagement: AgentEngagementStatusType;
  agentDetails: AgentDetails;
  comments: ApiComment[];
}

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
}
export type ApiAgentPatch = VoidableProps<AgentPatch>;
