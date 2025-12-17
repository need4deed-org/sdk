import { Id } from "..";
import { OptionId } from "./common";
import { ApiLanguage } from "./language";
import { VolunteerStateTypeType } from "./volunteer";

export enum OpportunityType {
  GENERAL = "volunteering",
  ACCOMPANYING = "accompanying",
}

export enum TranslatedIntoType {
  DEUTSCHE = "deutsche",
  ENGLISH_OK = "englishOk",
  NO_TRANSLATION = "noTranslation",
}

export enum OpportunityStatusType {
  NEW = "new",
  ACTIVE = "active",
  PAST = "past"
}

export enum OpportunityMatchStatus {
  MATCHED = "matched",
  NEED_REMATCH = "need_rematch",
  UNMATCHED = "unmatched"
}

export enum OpportunityVolunteerStatusType{
  SUGGESTED = "suggested",
  MATCHED = "matched",
  ACTIVE = "active",
  PAST = "past"
}

export interface Opportunity {
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

export interface ApiOpportunityGetList {
  id: Id;
  title: string;
  volunteerType: VolunteerStateTypeType;
  statusOpportunity: OpportunityStatusType;
}

export interface ApiOpportunityGet extends ApiOpportunityGetList {
  languages: ApiLanguage[];
  activities: string[];
  skills: string[];
  location: string[];
}
