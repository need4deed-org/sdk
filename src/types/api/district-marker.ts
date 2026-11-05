import { EntityTableName, Id, Lang } from "../core";
import { AgentType } from "./agent";
import { ApiLanguage } from "./language";
import { District } from "./location";
import { ApiAvailability } from "./time";
import { VolunteerType } from "./volunteer";

export const apiDistrictMarkerMaxEntities = 500;

export type ApiDistrictMarkerFilterValue =
  | string
  | number
  | boolean
  | Array<string | number>;

export type ApiAgentDistrictFilters = Partial<
  Record<
    "type" | "status" | "engagementStatus" | "services" | "volunteerSearch",
    ApiDistrictMarkerFilterValue
  >
>;

export type ApiOpportunityDistrictFilters = Partial<
  Record<
    | "type"
    | "status"
    | "activity"
    | "skill"
    | "match"
    | "agentId"
    | "language"
    | "availability",
    ApiDistrictMarkerFilterValue
  >
>;

export type ApiVolunteerDistrictFilters = Partial<
  Record<
    | "type"
    | "language"
    | "activity"
    | "skill"
    | "availability"
    | "engagement"
    | "match",
    ApiDistrictMarkerFilterValue
  >
>;

export type ApiDistrictMarkerFilters =
  | ApiAgentDistrictFilters
  | ApiOpportunityDistrictFilters
  | ApiVolunteerDistrictFilters;

export type ApiDistrictMarkerQuery<TFilters = ApiDistrictMarkerFilters> = {
  districtId: number;
  language: Lang;
  filter?: TFilters;
};

export type ApiAgentDistrictMarkerQuery =
  ApiDistrictMarkerQuery<ApiAgentDistrictFilters>;

export type ApiOpportunityDistrictMarkerQuery =
  ApiDistrictMarkerQuery<ApiOpportunityDistrictFilters>;

export type ApiVolunteerDistrictMarkerQuery =
  ApiDistrictMarkerQuery<ApiVolunteerDistrictFilters>;

export type ApiDistrictMarkerChild = {
  id: Id;
  title: string;
  languages?: ApiLanguage[];
  availability?: ApiAvailability[];
  type?: AgentType;
  statusTypes?: VolunteerType[];
  district?: District;
};

export type ApiDistrictMarker = {
  lat: number | null;
  lon: number | null;
  districtId: number;
  children: Array<ApiDistrictMarkerChild>;
  entity: EntityTableName.AGENT | EntityTableName.OPPORTUNITY | EntityTableName.VOLUNTEER;
};

export type ApiDistrictMarkerGet = {
  markers: ApiDistrictMarker[];
  // Matching entity count before applying the response cap.
  total: number;
  // The server trims children at this limit and omits markers with no children.
  maxEntities: number;
};
