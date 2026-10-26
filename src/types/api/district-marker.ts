export type ApiDistrictMarker = {
  lat: number;
  lon: number;
  label: string;
  children: Array<{ title: string; id: string; language: string; availability: string }>;
  entity: "agent" | "volunteer" | "opportunity";
  avatarUrl?: string;
};

export type ApiSingleDistrictMarker = {
  lat: number;
  lon: number;
  label: string;
  title: string;
  link: string;
  language: string;
  availability: string;
  entity: "agent" | "volunteer" | "opportunity";
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