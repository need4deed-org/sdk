export interface Address {
  id: number;
  street: string;
  city: string;
  postcode: Postcode;
}
export interface ApiAddress extends Address {}
export interface ApiAddressGet extends Address {}

export interface Postcode {
  id: number;
  code: string;
  latitude: number | null;
  longitude: number | null;
}
export interface ApiPostcode extends Postcode {}

/** GET /postcode/check?code= (public): whether a German PLZ is in be's reference list. `code` comes back normalized (`1067` → `01067`). */
export interface ApiPostcodeCheck {
  code: string;
  known: boolean;
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
export interface ApiDistrict extends District {}
