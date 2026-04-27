import { Id, Lang } from "..";
import { ApiOpportunityAccompanyingDetails } from "./accompanying";
import { AgentType } from "./agent";
import { ApiComment } from "./comment";
import { OptionById, OptionId } from "./common";
import { ApiLanguage } from "./language";
import { OptionItem } from "./option";
import { PreferredCommunicationType } from "./person";
import { ProfileVolunteeringType } from "./profile";
import { ApiAvailability } from "./time";
import { VolunteerStateTypeType } from "./volunteer";

export const { REGULAR_ACCOMPANYING, ...OpportunityType } =
  ProfileVolunteeringType;
export type OpportunityType = Exclude<
  ProfileVolunteeringType,
  ProfileVolunteeringType.REGULAR_ACCOMPANYING
>;

export enum TranslatedIntoType {
  DEUTSCHE = "deutsche",
  ENGLISH_OK = "englishOk",
  NO_TRANSLATION = "noTranslation",
}

export enum OpportunityStatusType {
  NEW = "opp-new",
  SEARCHING = "opp-searching",
  ACTIVE = "opp-active",
  PAST = "opp-past",
}

export enum OpportunityMatchStatus {
  PENDING_MATCH = "opp-pending-match",
  MATCHED = "opp-matched",
  NEEDS_REMATCH = "opp-needs-rematch",
  UNMATCHED = "opp-unmatched",
}

export enum OpportunityMatchStatusType {
  NO_MATCHES = "vol-no-matches",
  PENDING_MATCH = "vol-pending-match",
  MATCHED = "vol-matched",
  PAST = "vol-past",
}

export enum OpportunityVolunteerStatusType {
  PENDING = "opp-pending",
  MATCHED = "opp-matched",
  ACTIVE = "opp-active",
  PAST = "opp-past",
}

export interface OpportunityFormData {
  title: string;
  rac_email: string;
  rac_full_name: string;
  rac_phone: string;
  rac_address: string;
  rac_plz: string;
  opportunity_type: OpportunityType;
  accomp_address: string;
  accomp_postcode: string;
  accomp_datetime?: string;
  accomp_name?: string;
  accomp_phone?: string;
  accomp_information?: string;
  accomp_translation?: TranslatedIntoType;
  berlin_locations?: OptionId[];
  languages: OptionId[];
  activities: OptionId[];
  skills: OptionId[];
  timeslots?: [number, OptionId][];
  volunteers_number: number;
  vo_information?: string;
  category: string;
  category_id: OptionId;
  last_edited_time_notion?: string;
}

export interface OpportunityLegacyFormData {
  title: string;
  rac_email: string;
  rac_full_name: string;
  rac_phone: string;
  rac_address: string;
  rac_plz: string;
  opportunity_type: "accompanying" | "volunteering";
  accomp_address: string;
  accomp_postcode: string;
  accomp_datetime?: string;
  accomp_name?: string;
  accomp_phone?: string;
  accomp_information?: string;
  accomp_translation?: `${TranslatedIntoType}`;
  berlin_locations?: string[];
  languages: string[];
  activities: string[];
  skills: string[];
  timeslots?: [number, string][];
  onetime_date_time?: string;
  volunteers_number: number;
  vo_information?: string;
  category: string;
  category_id: OptionId;
  last_edited_time_notion?: string;
  language: `${Lang}`;
}

export interface ApiOpportunityAgent {
  type: AgentType;
  name: string;
  address: string;
  district: OptionById;
}

export interface ApiOpportunityContact {
  id: number;
  name: string;
  phone: string;
  email: string;
  waysToContact: PreferredCommunicationType[];
}

export interface ApiOpportunityGetList {
  id: Id;
  title: string;
  category: OptionById;
  volunteerType: VolunteerStateTypeType;
  statusOpportunity: OpportunityStatusType;
  statusMatch: OpportunityMatchStatusType;
  createdAt: Date;
  activities: OptionById[];
  languages: ApiLanguage[];
  availability: ApiAvailability[];
}

export interface ApiOpportunityGet extends ApiOpportunityGetList {
  createdAt: Date;
  numberOfVolunteers: number;
  description: string;
  skills: OptionById[];
  location: OptionById[];
  comments: ApiComment[];
  contact: ApiOpportunityContact;
  agent: ApiOpportunityAgent;
  accompanyingDetails: ApiOpportunityAccompanyingDetails;
}

export type ApiOpportunityLean = Omit<ApiOpportunityGet, "comments">;

export type ApiOpportunityPatch = Partial<{
  statusOpportunity: OpportunityStatusType;
  numberVolunteers: number;
  description: string;
  languagesMain: OptionItem[];
  languagesResidents: OptionItem[];
  activities: OptionItem[];
  skills: OptionItem[];
  schedule: ApiAvailability[];
  contact: {
    id: number;
    name: string;
    phone: string;
    email: string;
    waysToContact: PreferredCommunicationType[];
  };
  agent: {
    name: string;
    address: string;
    district: string;
  };
  accompanyingDetails: {
    appointmentAddress: string;
    appointmentDate: string;
    appointmentTime: string;
    refugeeNumber: string;
    refugeeName: string;
    languagesToTranslate: number;
  };
}>;

export interface OpportunityVolunteer {
  id: number;
  status: OpportunityVolunteerStatusType;
  opportunityId: number;
  volunteerId: number;
  updatedAt: Date;
}

export interface ApiOpportunityVolunteerGet extends OpportunityVolunteer {
  title: string;
}
