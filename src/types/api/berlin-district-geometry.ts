export type GeoJsonPosition = [
  longitude: number,
  latitude: number,
  ...additionalDimensions: number[],
];

export type GeoJsonLinearRing = GeoJsonPosition[];
export type GeoJsonPolygonCoordinates = GeoJsonLinearRing[];
export type GeoJsonMultiPolygonCoordinates = GeoJsonPolygonCoordinates[];

export type BerlinBezirkGeometry =
  | {
      type: "Polygon";
      coordinates: GeoJsonPolygonCoordinates;
    }
  | {
      type: "MultiPolygon";
      coordinates: GeoJsonMultiPolygonCoordinates;
    };

export type BerlinBezirkFeature = {
  type: "Feature";
  id: string;
  properties: {
    districtCode: string;
    name: string;
  };
  geometry: BerlinBezirkGeometry;
};

export type BerlinBezirkeGeoJson = {
  type: "FeatureCollection";
  features: BerlinBezirkFeature[];
};