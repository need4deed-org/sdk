import { Lang, VoidableProps } from "..";

export enum EventN4DType {
  PARTY = "party",
  WORKSHOP = "workshop",
}

export interface EventN4D {
  id: number | string;
  active: boolean;
  title: string;
  subTitle?: string;
  menuTitle: string;
  hostName?: string;
  date: Date;
  dateEnd?: Date;
  type: EventN4DType;
  pic?: string;
  time?: string;
  address: string;
  locationLink?: string;
  locationComment?: string;
  description: string;
  shortDescription: string;
  linkRSVP: string;
  followUpText?: string;
  followUpLink?: string;
  additionalTitle?: string;
  additionalInfo?: string[];
  outro?: string;
}

export interface ApiEventN4DGetList {
  id: number;
  active: boolean;
  title: string;
  subTitle?: string;
  menuTitle: string;
  date: Date;
  dateEnd?: Date;
  type: EventN4DType;
  pic?: string;
  address: string;
  locationComment?: string;
  description: string;
  shortDescription: string;
  linkRSVP: string;
  hostName?: string;
  additionalTitle?: string;
  additionalInfo?: string[];
}

export interface ApiEventN4DGet extends ApiEventN4DGetList {
  time?: string;
  locationLink?: string;
  followUpText?: string;
  followUpLink?: string;
  outro?: string;
}

export interface ApiEventN4DTranslationInput {
  language: Lang;
  title: string;
  subTitle?: string;
  menuTitle: string;
  time?: string;
  locationComment?: string;
  description: string;
  shortDescription: string;
  additionalTitle?: string;
  additionalInfo?: string[];
  outro?: string;
  followUpText?: string;
}

export interface ApiEventN4DCreate {
  date: Date;
  dateEnd?: Date;
  type: EventN4DType;
  pic?: string;
  locationLink?: string;
  linkRSVP: string;
  followUpLink?: string;
  address: string;
  hostName?: string;
  active?: boolean;
  translations: ApiEventN4DTranslationInput[];
}

export type ApiEventN4DPatch = VoidableProps<
  Omit<ApiEventN4DCreate, "translations">
> & {
  translations?: ApiEventN4DTranslationInput[];
};
