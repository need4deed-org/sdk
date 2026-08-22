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

export interface ApiEventN4DGet extends EventN4D {}

// The per-language translated content of an event (be#458: EventN4D splits
// structural fields from an EventTranslation row per language). A coordinator
// submits one entry per language they've filled in — today's dashboard form
// only fills one, but this doesn't foreclose adding a second later via the
// same PATCH.
export interface ApiEventN4DTranslationInput {
  language: Lang;
  title: string;
  subTitle?: string;
  menuTitle: string;
  time: string;
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
