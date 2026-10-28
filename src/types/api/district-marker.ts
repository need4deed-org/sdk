import { EntityTableName, Id, QueryParamsKeys } from "../core";
import { ApiLanguage } from "./language";
import { OpportunityType } from "./opportunity";
import { ApiAvailability } from "./time";
import { VolunteerType } from "./volunteer";

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
      QueryParamsKeys.LIMIT | QueryParamsKeys.ORDER | QueryParamsKeys.PAGE
    >,
    ApiDistrictMarkerFilterValue
  >
>;

// entity-specific routes determine the entity type. (e.g. /volunteer/districts)
export type ApiDistrictMarkerQuery = {
  district?: number;
  // Uses the same filter keys and values as the corresponding profile list endpoint.
  filter?: ApiDistrictMarkerFilters;
};

export type ApiDistrictMarkerChild = {
  id: Id;
  title: string;
  language?: ApiLanguage[];
  availability?: ApiAvailability[];
  type?: OpportunityType | VolunteerType;
  avatarUrl?: string;
};

export type ApiDistrictMarker = {
  lat: number;
  lon: number;
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
