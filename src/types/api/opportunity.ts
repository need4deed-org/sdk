import { Id, Lang, VoidableProps, VoidableUndefined } from "..";
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

export enum OpportunityLegacyType {
  VOLUNTEERING = "volunteering",
  ACCOMPANYING = "accompanying",
}

export enum TranslatedIntoType {
  DEUTSCHE = "deutsche",
  ENGLISH_OK = "englishOk",
  NO_TRANSLATION = "noTranslation",
}

export enum OpportunityStatusType {
  NEW = "opp-new",
  SEARCHING = "opp-searching",
  ACTIVE = "opp-active",
  INACTIVE = "opp-inactive",
  PAST = "opp-past",
}

export enum OpportunityMatchStatusType {
  PENDING_MATCH = "opp-vol-pending-match",
  NO_MATCHES = "opp-vol-no-matches",
  MATCHED = "opp-vol-matched",
  NEEDS_REMATCH = "opp-vol-needs-rematch",
  UNMATCHED = "opp-vol-unmatched",
  PAST = "opp-vol-past",
}

export enum OpportunityMatchStatus {
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

export interface OpportunityLegacyFormDataProps {
  title: string;
  rac_email?: string;
  rac_full_name?: string;
  rac_phone?: string;
  rac_address?: string;
  rac_plz?: string;
  agent_id?: number;
  submitted_by_id?: number;
  opportunity_type: OpportunityLegacyType;
  accomp_address?: string;
  accomp_postcode?: string;
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
export type OpportunityLegacyFormData =
  VoidableUndefined<OpportunityLegacyFormDataProps>;

/**
 * Body for `POST /opportunity` — the dashboard's typed create-opportunity
 * form. Unlike `OpportunityLegacyFormData` (free-text/ISO-code strings from
 * the public form, resolved by title lookup), activities/skills/languages/
 * districts here are numeric option ids from `GET /option/*`, resolved by id.
 * Deliberately not derived from `OpportunityLegacyFormDataProps`: the two
 * shapes look similar but mean different things, and overloading one type for
 * both invites exactly the id-vs-title mismatch this type exists to prevent.
 */
export interface OpportunityCreateFormDataProps {
  title: string;
  agent_id?: number;
  submitted_by_id?: number;
  opportunity_type: OpportunityLegacyType;
  accomp_address?: string;
  accomp_postcode?: string;
  accomp_datetime?: string;
  accomp_name?: string;
  accomp_phone?: string;
  accomp_information?: string;
  accomp_translation?: `${TranslatedIntoType}`;
  districtIds?: number[];
  languageIds: number[];
  activityIds: number[];
  skillIds: number[];
  timeslots?: [number, string][];
  onetime_date_time?: string;
  volunteers_number: number;
  vo_information?: string;
  category: string;
  category_id: OptionId;
  last_edited_time_notion?: string;
  language: `${Lang}`;
}
export type OpportunityFormDataWithAgentSubmitter =
  VoidableUndefined<OpportunityCreateFormDataProps>;

export interface ApiOpportunityAgent {
  id: number;
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
  district: OptionById;
  volunteerType: VolunteerStateTypeType;
  statusOpportunity: OpportunityStatusType;
  statusMatch: OpportunityMatchStatusType;
  numberOfVolunteers: number;
  createdAt: Date;
  activities: OptionById[];
  languages: ApiLanguage[];
  availability: ApiAvailability[];
  location: OptionById[];
  accompanyingDetails: ApiOpportunityAccompanyingDetails;
  agentTitle: string;
  agentId: number | null;
  // Names of the volunteers matched (m2m) to the opportunity (named
  // `volunteerNames`, not `volunteers`, to avoid implying volunteer objects).
  // PII-masked per caller role by the API. Populated on GET /opportunity
  // (list); optional so the interfaces extending this base needn't supply it.
  volunteerNames?: string[];
}

export interface ApiOpportunityGet extends ApiOpportunityGetList {
  description: string;
  skills: OptionById[];
  comments: ApiComment[];
  contact: ApiOpportunityContact;
  agent: ApiOpportunityAgent;
  event?: {
    date: string;
    time: string;
  };
}

export type ApiOpportunityLean = Omit<ApiOpportunityGet, "comments">;

export type ApiOpportunityPatch = VoidableProps<{
  title: string;
  statusOpportunity: OpportunityStatusType;
  numberVolunteers: number;
  description: string;
  languagesMain: OptionItem[];
  languagesResidents: OptionItem[];
  activities: OptionItem[];
  skills: OptionItem[];
  schedule: ApiAvailability[];
  opportunity_type: OpportunityType;
  event: {
    date: string;
    time: string;
  };
  contact: {
    id: number;
    name: string;
    phone: string;
    email: string;
    waysToContact: PreferredCommunicationType[];
  };
  agent: {
    id?: number;
    /** @deprecated free-text in-place edit; use `id` to re-link. BE only applies `name`. */
    name?: string;
    /** @deprecated not persisted by the backend */
    address?: string;
    /** @deprecated not persisted by the backend */
    district?: string;
  };
  accompanyingDetails: ApiOpportunityAccompanyingDetails;
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

/**
 * A volunteer linked to an opportunity, as surfaced on an agent's opportunity
 * list. Person fields (`name`, `avatarUrl`) are PII-masked per caller role by
 * the API, so they may be absent or redacted.
 */
export interface ApiAgentOpportunityVolunteer {
  id: number;
  volunteerId: number;
  status: OpportunityVolunteerStatusType;
  name?: string;
  avatarUrl?: string;
}

/**
 * One of an agent's opportunities with the volunteers linked to it. Response
 * item of `GET /agent/:id/opportunity-linked`.
 */
export interface ApiAgentOpportunity extends Pick<
  ApiOpportunityGetList,
  | "volunteerType"
  | "languages"
  | "activities"
  | "availability"
  | "location"
  | "district"
> {
  id: Id;
  title: string;
  statusOpportunity: OpportunityStatusType;
  statusMatch: OpportunityMatchStatusType;
  numberOfVolunteers: number;
  createdAt: Date;
  volunteers: ApiAgentOpportunityVolunteer[];
}
