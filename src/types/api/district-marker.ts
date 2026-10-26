import { Id } from "../core";

export type ApiDistrictMarker = {
  lat: number;
  lon: number;
  label: string;
  children: Array<{ id: Id; title: string; language?: string; availability?: string; type?: string; avatarUrl?: string; }>;
  entity: "agent" | "volunteer" | "opportunity";
};

export type ApiSingleDistrictMarker = {
  id: Id;
  lat: number;
  lon: number;
  label: string;
  title: string;
  language: string;
  availability: string;
  entity: "volunteer" | "opportunity";
  avatarUrl?: string;
};

//RACs from 3rd party data, gdi.berlin
export type BerlinRacMarker = {
  id: string;
  lat: number;
  lon: number;
  type: string;
  district: string;
  area: string;
  street: string;
};

export type ApiDistrictMarkerGet = {
  markers: ApiDistrictMarker[];
  truncated: boolean;
};