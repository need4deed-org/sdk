import { DocumentStatusType, Id } from "../core";
import { OptionId } from "./common";
import { ApiLanguage } from "./language";
import { ApiOpportunityGetList } from "./opportunity";
import { OptionItem } from "./option";
import { ApiPersonGet } from "./person";
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
  NEW = "new",
  ACTIVE = "active",
  AVAILABLE = "available",
  TEMP_UNAVAILABLE = "temp-unavailable",
  INACTIVE = "inactive",
  UNRESPONSIVE = "unresponsive",
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

export enum VolunteerStateTypeType {
  ACCOMPANYING = "accompanying",
  REGULAR = "regular",
  EVENTS = "events",
  REGULAR_ACCOMPANYING = "regular-accompanying",
}

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
  NO_MATCHES = "no-matches",
  PENDING_MATCH = "pending-match",
  MATCHED = "matched",
  NEEDS_REMATCH = "needs-rematch",
}

export enum VolunteerCommunicationType {
  EMAIL = "email",
  MOBILE_PHONE = "mobilePhone",
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
}

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
