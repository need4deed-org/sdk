import { LangProficiency } from "../core";

export interface VolunteerAPI {
  id: string;
  person: PersonAPI;
  deal: DealAPI;
}

export interface AddressAPI {
  id: string;
  street: string;
  city: string;
  postcode: PostcodeAPI;
}

export interface PostcodeAPI {
  id: string;
  code: string;
  latitude: number;
  longitude: number;
}

export enum DealType {
  VOLUNTEER = "volunteer",
  OPPORTUNITY = "opportunity",
}

export interface DealAPI {
  id: string;
  type: DealType;
  profile: ProfileAPI;
  location: LocationAPI[];
  time: TimeAPI[];
}

export interface ProfileAPI {
  id: string;
  info: string;
  confidential: string;
  category: CategoryAPI;
  activities: ActivityAPI[];
  skills: SkillAPI[];
  languages: LanguageAPI[];
}

export interface CategoryAPI {
  id: string;
  title: string;
}

export interface ActivityAPI {
  id: string;
  title: string;
  category: CategoryAPI;
}

export interface SkillAPI {
  id: string;
  title: string;
}

export enum LangPurposeType {
  GENERAL = "general",
  INTERPRETATION = "interpretation",
}

export interface LanguageAPI {
  id: string;
  title: string;
  proficiency?: LangProficiency;
  purpose: LangPurposeType;
}

export interface SkillAPI {
  id: string;
  title: string;
}

export enum LocationType {
  ADDRESS = "address",
  DISTRICT = "district",
  POSTCODE = "postcode",
}

export interface LocationAPI {
  id: string;
  type: LocationType;
  address?: AddressAPI;
  district?: DistrictAPI;
  postcode?: PostcodeAPI;
}

export interface DistrictAPI {
  id: string;
  title: string;
  postcodes: PostcodeAPI[];
}

export interface PersonAPI {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: AddressAPI;
}

export interface TimeAPI {
  id: string;
  description: string;
  start: Date;
  end?: Date;
  rrule?: string;
}
