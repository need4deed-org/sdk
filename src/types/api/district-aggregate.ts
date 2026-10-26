export type ApiDistrictAggregate = {
  districts: Array<{
    districtId: number;
    count: number;
  }>;
  outsideBerlin: number;
  remote: number;
};