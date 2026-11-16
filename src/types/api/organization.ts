import { ApiAddress } from "./location";
import { ApiAgentMembership, Service } from "./agent";
import { OptionById } from "./common";

export interface ApiOrganizationAgent {
  id: number;
  title: string;
  district: OptionById;
}

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: string;
  address: ApiAddress;
  about?: string;
  email?: string;
  phone?: string;
  landline?: string;
  services?: Service[];
  contacts: ApiAgentMembership[];
  agents: ApiOrganizationAgent[];
}

export type ApiOrganizationPatch = Partial<ApiOrganizationGet>;

export type ApiOrganizationGetList = Pick<ApiOrganizationGet, "id" | "title">;
