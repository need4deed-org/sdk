import { ApiAddress } from "./location";

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: string;
  address: ApiAddress;
}

export type ApiOrganizationPatch = Partial<ApiOrganizationGet>;

export type ApiOrganizationGetList = Pick<ApiOrganizationGet, "id" | "title">;
