import { EntityTableName, Id, Lang, QueryParamsKeys } from "../core";
import { AgentType } from "./agent";
import { ApiLanguage } from "./language";
import { District } from "./location";
import { ApiAvailability } from "./time";

export const apiDistrictMarkerMaxEntities = 500;

export type ApiDistrictMarkerFilterValue =
  | string
  | number
  | boolean
  | Array<string | number>;

export type ApiDistrictMarkerFilters = Partial<
  Record<
    Exclude<
      QueryParamsKeys,
      QueryParamsKeys.LIMIT | QueryParamsKeys.ORDER | QueryParamsKeys.PAGE | QueryParamsKeys.LANGUAGE
    >,
    ApiDistrictMarkerFilterValue
  >
>;

// entity-specific routes determine the entity type. (e.g. /volunteer/map)
export type ApiDistrictMarkerQuery = {
  districtId?: number;
  // Uses the same filter keys and values as the corresponding profile list endpoint.
  filter?: ApiDistrictMarkerFilters;
};

export type ApiDistrictMarkerChild = {
  id: Id;
  title: string;
  language?: ApiLanguage[];
  availability?: ApiAvailability[];
  type?: AgentType["title"];
  district?: District["title"];
  avatarUrl?: string;
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
  // True when total exceeds apiDistrictMarkerMaxEntities.
  truncated: boolean;
};
