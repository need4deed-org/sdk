import { Id } from "..";
import { ApiAddressGet } from "./address";
import { AgentType, ApiAgentGet } from "./agent";
import { ApiAvailability } from "./time";
import { ApiComment } from "./comment";
import { OptionById, OptionId } from "./common";
import { ApiLanguage } from "./language";
import { PrefferedCommunicationType } from "./person";
import { ProfileVolunteeringType } from "./profile";
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
  NEW = "new",
  SEARCHING = "searching",
  ACTIVE = "active",
  PAST = "past",
}

export enum OpportunityMatchStatus {
  PENDING_MATCH = "pending-match",
  MATCHED = "matched",
  NEEDS_REMATCH = "needs-rematch",
  UNMATCHED = "unmatched",
}

export enum OpportunityVolunteerStatusType {
  SUGGESTED = "pending",
  MATCHED = "matched",
  ACTIVE = "active",
  PAST = "past",
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

export interface ApiOpportunityAgent {
  type: AgentType;
  name: string;
  address: string;
  district: OptionById;
}

export interface ApiOpportunityContact {
  name: string;
  phone: string;
  email: string;
  waysToContact: PrefferedCommunicationType[];
}

export interface ApiOpportunityAccompanyingDetails {
  appointmentAddress?: string;
  appointmentDate?: Date;
  appointmentTime?: Date;
  refugeeNumber?: string;
  refugeeName?: string;
  languageToTranslate?: TranslatedIntoType;
}

export interface ApiOpportunityGetList {
  id: Id;
  title: string;
  category: OptionById;
  volunteerType: VolunteerStateTypeType;
  statusOpportunity: OpportunityStatusType;
}

export interface ApiOpportunityGet extends ApiOpportunityGetList {
  createdAt: Date;
  languages: ApiLanguage[];
  activities: OptionById[];
  skills: OptionById[];
  location: OptionById[];
  availability: ApiAvailability[];
  comments: ApiComment[];
  contact: ApiOpportunityContact;
  agent: ApiOpportunityAgent;
  accompanyingDetails: ApiOpportunityAccompanyingDetails;
}
