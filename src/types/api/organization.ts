import { ApiAddress } from "./location";

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: string;
  address: ApiAddress;
}
