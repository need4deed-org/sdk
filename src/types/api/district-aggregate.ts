import {
  ApiAgentDistrictFilters,
  ApiDistrictMarkerFilters,
  ApiOpportunityDistrictFilters,
  ApiVolunteerDistrictFilters,
} from "./district-marker";

export type ApiDistrictAggregateDistrict = {
  districtId: number;
  count: number;
};

export type ApiDistrictAggregateQuery<TFilters = ApiDistrictMarkerFilters> = {
  filter?: TFilters;
};

export type ApiAgentDistrictAggregateQuery =
  ApiDistrictAggregateQuery<ApiAgentDistrictFilters>;

export type ApiOpportunityDistrictAggregateQuery =
  ApiDistrictAggregateQuery<ApiOpportunityDistrictFilters>;

export type ApiVolunteerDistrictAggregateQuery =
  ApiDistrictAggregateQuery<ApiVolunteerDistrictFilters>;

export type ApiDistrictAggregate = {
  districts: ApiDistrictAggregateDistrict[];
  unassignedBerlin: number;
  // Entities (vol,opp,agent, e.g. /volunteer/districts) with a physical location outside Berlin e.g. Brandenburg.
  outsideBerlin: number;
  // Entities (vol,opp,agent, e.g. /volunteer/districts) without a physical location.
  remote: number;
};
