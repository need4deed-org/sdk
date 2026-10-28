export type ApiDistrictAggregateDistrict = {
  districtId: number;
  count: number;
};

export type ApiDistrictAggregate = {
  districts: ApiDistrictAggregateDistrict[];
  // Entities (vol,opp,agent) with a physical location outside Berlin e.g. Brandenburg.
  outsideBerlin: number;
  // Entities (vol,opp,agent) without a physical location.
  remote: number;
};
