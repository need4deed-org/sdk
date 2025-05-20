import { Lang } from "./common";

export interface Testimonial {
  name: string;
  pic: string; // base64 encoded thumb most probably
  translated_text: string;
  activities: string[];
}

export enum EventN4DType {
  PARTY = "party",
  WORKSHOP = "workshop",
}

export interface EventN4D {
  active: boolean;
  title: string;
  subTitle?: string;
  menuTitle: string; // for the menu
  hostName?: string;
  date: Date;
  dateEnd?: Date;
  type: EventN4DType;
  pic?: string; // or standard one depending on type
  time: string;
  address: string; // address
  locationLink?: string; // to google maps
  locationComment?: string; // how to spot
  description: string;
  shortDescription: string; // for card view
  linkRSVP: string; // registration form
  followUpText?: string;
  followUpLink?: string; // the adjacent event
  additionalTitle?: string;
  additionalInfo?: string[]; // lineup, content, etc.
  outro?: string;
}

export enum OpportunityType {
  GENERAL = "volunteering",
  ACCOMPANYING = "accompanying",
}

export enum TranslatedIntoType {
  DEUTSCHE = "deutsche",
  ENGLISH_OK = "englishOk",
  NO_TRANSLATION = "noTranslation",
}

export type OptionTitle = Partial<{
  [key in Lang]: string;
}>;

export type OptionId = string | number;

export interface Option {
  id: OptionId;
  title: OptionTitle;
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
}

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
  native_languages: OptionId[];
  fluent_languages: OptionId[];
  intermediate_languages: OptionId[];
  comments: string;
}
