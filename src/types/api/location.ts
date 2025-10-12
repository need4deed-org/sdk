export interface Address {
  id: number;
  street: string;
  city: string;
  postcode: Postcode;
}

export interface Postcode {
  id: number;
  code: string;
  latitude: number;
  longitude: number;
}

export enum LocationType {
  ADDRESS = "address",
  DISTRICT = "district",
  POSTCODE = "postcode",
}

export interface Location {
  id: string;
  type: LocationType;
  address?: Address;
  district?: District;
  postcode?: Postcode;
}

export interface District {
  id: string;
  title: string;
  postcodes: Postcode[];
}
