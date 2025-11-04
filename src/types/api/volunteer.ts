import {
  DocumentStatusType,
  Id,
  VolunteerStateAppreciationType,
  VolunteerStateCGCType,
  VolunteerStateCommunicationType,
  VolunteerStateEngagementType,
  VolunteerStateMatchType,
  VolunteerStateType,
  VolunteerStateTypeType,
} from "../core";
import { OptionId } from "./common";
import { ApiLanguage } from "./language";
import { OptionItem } from "./option";
import { ApiPersonGet } from "./person";
import { Availability, TimedText } from "./time";

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

export interface ApiVolunteerGetList {
  id: number;
  statusEngagement: VolunteerStateEngagementType;
  statusType: VolunteerStateTypeType;
  name: string;
  avatarUrl: string;
  languages: ApiLanguage[];
  availability: Availability[];
  activities: OptionItem[];
  skills: OptionItem[];
  locations: OptionItem[];
}

export interface ApiVolunteerGet {
  id: number;
  person: ApiPersonGet;
  status: VolunteerStateType;
  statusEngagement: VolunteerStateEngagementType;
  statusCommunication: VolunteerStateCommunicationType;
  statusAppreciation: VolunteerStateAppreciationType;
  statusType: VolunteerStateTypeType;
  statusMatch: VolunteerStateMatchType;
  statusCgcProcess: VolunteerStateCGCType;
  createdAt: Date;
  updatedAt: Date;
  goodConductCertificate: DocumentStatusType;
  measlesVaccination: DocumentStatusType;
  infoAbout: string;
  infoExperience: string;
  timelineLogs: TimedText[];
  comments: TimedText[];
  opportunitiesApplied: OptionItem[];
  opportunitiesMatched: OptionItem[];
  languages: ApiLanguage[];
  availability: Availability[];
  activities: OptionItem[];
  skills: OptionItem[];
  locations: OptionItem[];
}

export interface VolunteerPatchBodyData extends Partial<ApiVolunteerGet> {}
