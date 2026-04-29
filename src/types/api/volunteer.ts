import { DocumentStatusType, Id } from "../core";
import { OptionById, OptionId } from "./common";
import { ApiLanguage } from "./language";
import { ApiOpportunityGetList, OpportunityVolunteer } from "./opportunity";
import { OptionItem } from "./option";
import { ApiPersonGet, PreferredCommunicationType } from "./person";
import { ProfileVolunteeringType } from "./profile";
import { ApiAvailability, TimedText } from "./time";

export interface Volunteer {
  origin_opportunity: number | undefined;
  full_name: string;
  phone: string;
  email: string;
  postal_code: number;
  good_conduct_certificate: "Yes" | "No";
  if_measles_vaccination: boolean;
  lead_from: string;
  schedule: [number, OptionId][];
  preferred_berlin_locations: OptionId[];
  activities: OptionId[];
  skills: OptionId[];
  nativeLanguages: OptionId[];
  fluentLanguages: OptionId[];
  intermediateLanguages: OptionId[];
  comments: string;
}

export interface VolunteerLegacyFormData {
  origin_opportunity?: number;
  full_name: string;
  phone: string;
  email: string;
  postal_code: number;
  good_conduct_certificate: "Yes" | "No";
  if_measles_vaccination: boolean;
  lead_from: string;
  schedule: [number, string][];
  preferred_berlin_locations: string[];
  activities: string[];
  skills: string[];
  native_languages: string[];
  fluent_languages: string[];
  intermediate_languages: string[];
  comments: string;
  language: string;
}

export interface VolunteerFormData {
  opportunityId?: Id;
  fullName: string;
  phone: string;
  email: string;
  postcode: number;
  goodConductCertificate: DocumentStatusType;
  measlesVaccination: DocumentStatusType;
  schedule: [number, OptionId][];
  districts: OptionId[];
  languages: ApiLanguage[];
  activities: OptionId[];
  skills: OptionId[];
  leadFrom: OptionId[];
  comments: string;
}

export enum VolunteerStateEngagementType {
  NEW = "vol-new",
  ACTIVE = "vol-active",
  AVAILABLE = "vol-available",
  TEMP_UNAVAILABLE = "vol-temp-unavailable",
  INACTIVE = "vol-inactive",
  UNRESPONSIVE = "vol-unresponsive",
}

export enum VolunteerStateCommunicationType {
  CALLED = "called",
  EMAIL_SENT = "email-sent",
  BRIEFED = "briefed",
  TRIED_CALL = "tried-call",
  NOT_RESPONDING = "not-responding",
}

export enum VolunteerStateAppreciationType {
  T_SHIRT = "t-shirt",
  BENEFIT_CARD = "benefit-card",
  TOTE_BAG = "tote-bag",
}

export const VolunteerStateTypeType = ProfileVolunteeringType;
export type VolunteerStateTypeType = ProfileVolunteeringType;

export enum VolunteerStateCGCType {
  UPLOADED = "uploaded",
  MISSING = "missing",
}

export enum VolunteerStateType {
  NEW = "New",
  OPPORTUNITY_SENT = "Opportunity sent",
  MATCHED = "Matched",
  ACTIVE_REGULAR = "Active regular",
  ACTIVE_ACCOMPANY = "Active accompany",
  ACTIVE_FEST = "Active fest",
  TO_REMATCH = "To rematch",
  TEMP_INACTIVE = "Temp inactive",
  INACTIVE = "Inactive",
}

export enum VolunteerStateMatchType {
  NO_MATCHES = "vol-no-matches",
  PENDING_MATCH = "vol-pending-match",
  MATCHED = "vol-matched",
  NEEDS_REMATCH = "vol-needs-rematch",
  PAST = "vol-past",
}

export const VolunteerCommunicationType = PreferredCommunicationType;
export type VolunteerCommunicationType = PreferredCommunicationType;

export interface ApiVolunteerGetList {
  id: number;
  statusEngagement: VolunteerStateEngagementType;
  statusType: VolunteerStateTypeType;
  name: string;
  avatarUrl: string;
  languages: ApiLanguage[];
  availability: ApiAvailability[];
  activities: OptionItem[];
  skills: OptionItem[];
  locations: OptionItem[];
}

export interface ApiVolunteerGet {
  id: number;
  person: ApiPersonGet;
  statusEngagement: VolunteerStateEngagementType;
  statusCommunication: VolunteerStateCommunicationType;
  statusAppreciation: VolunteerStateAppreciationType;
  statusType: VolunteerStateTypeType;
  statusMatch: VolunteerStateMatchType;
  statusCgcProcess: VolunteerStateCGCType;
  dateReturn: Date | null;
  preferredCommunicationType: VolunteerCommunicationType[];
  createdAt: Date;
  updatedAt: Date;
  goodConductCertificate: DocumentStatusType;
  measlesVaccination: DocumentStatusType;
  infoAbout: string;
  infoExperience: string;
  timelineLogs: TimedText[];
  comments: TimedText[];
  opportunities: ApiOpportunityGetList[];
  opportunitiesApplied: OptionItem[];
  opportunitiesMatched: OptionItem[];
  languages: ApiLanguage[];
  availability: ApiAvailability[];
  activities: OptionItem[];
  skills: OptionItem[];
  locations: OptionItem[];
}

export interface VolunteerPatchBodyData extends Partial<ApiVolunteerGet> {}

export interface ApiVolunteerOpportunityGet extends OpportunityVolunteer {
  name: string;
  avatarUrl: string;
  volunteeringType: ProfileVolunteeringType;
  engagement: VolunteerStateEngagementType;
  languages: ApiLanguage[];
  availability: ApiAvailability[];
  activities: OptionItem[];
  skills: OptionItem[];
  locations: OptionItem[];
}

export interface ApiVolunteerOpportunityGetList extends ApiOpportunityGetList {
  languages: ApiLanguage[];
  activities: OptionById[];
  location: OptionById[];
  availability: ApiAvailability[];
}
