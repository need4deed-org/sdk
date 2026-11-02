import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from "geojson";

export type ApiDistrictGeometry = Polygon | MultiPolygon;

export type ApiDistrictGeometryProperties = {
  districtId: number;
  title: string;
};

export type ApiDistrictGeometryFeature = Feature<
  ApiDistrictGeometry,
  ApiDistrictGeometryProperties
>;

export type ApiDistrictGeometryCollection = FeatureCollection<
  ApiDistrictGeometry,
  ApiDistrictGeometryProperties
>;
