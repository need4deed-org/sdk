import { DocumentStatusType, Id } from "../core";
import { Option, OptionId } from "./common";
import { ApiLanguage } from "./language";
import { Address } from "./location";
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
  name: string;
  avatarUrl: string;
  languages: ApiLanguage[];
  availability: Availability[];
  activities: string[];
  skills: string[];
  locations: string[];
}

export interface ApiVolunteerGet extends ApiVolunteerGetList {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: Address;
  goodConductCertificate: DocumentStatusType;
  measlesVaccination: DocumentStatusType;
  infoAbout: string;
  infoExperience: string;
  timelineLogs: TimedText[];
  comments: TimedText[];
  opportunitiesApplied: Option[];
  opportunitiesMatched: Option[];
}
