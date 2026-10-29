export type ApiDistrictAggregateDistrict = {
  districtId: number;
  count: number;
};

export type ApiDistrictAggregate = {
  districts: ApiDistrictAggregateDistrict[];
  // Entities (vol,opp,agent, e.g. /volunteer/districts) with a physical location outside Berlin e.g. Brandenburg.
  outsideBerlin: number;
  // Entities (vol,opp,agent, e.g. /volunteer/districts) without a physical location.
  remote: number;
};
