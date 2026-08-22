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

// EventN4D above stays as-is for now — it's still used directly by the
// `website` repo's event components (Event.tsx, UpcomingEventCard.tsx,
// PastEventCard.tsx). It'll retire once that code moves into `fe`.

// Every field a list/card context actually reads today (cross-checked
// against website's real, non-legacy event components — EventCard,
// PastEventCard, UpcomingEventCard, the menuTitle-keyed event strip). There's
// no separate single-event fetch anywhere yet — even the full-detail-looking
// UpcomingEventCard renders straight off the list response — so this can't
// be trimmed to a lean summary the way ApiOpportunityGetList is.
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
  additionalTitle?: string;
  additionalInfo?: string[];
}

// Fields defined on EventN4D that no current component reads anywhere —
// reserved here for a future single-event detail view.
export interface ApiEventN4DGet extends ApiEventN4DGetList {
  hostName?: string;
  time: string;
  locationLink?: string;
  followUpText?: string;
  followUpLink?: string;
  outro?: string;
}

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
