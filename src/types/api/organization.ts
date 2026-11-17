import { ApiAddress } from "./location";
import { ApiAgentTagCandidate, Service } from "./agent";
import { Voidable, VoidableProps } from "../utils";
import { ApiPersonGet } from "./person";

export interface OrganizationContact {
  id: number;
  person: ApiPersonGet;
}

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: Voidable<string>;
  address: Voidable<ApiAddress>;
  about?: Voidable<string>;
  email?: string;
  phone?: string;
  landline?: string;
  services?: Service[];
  contacts: OrganizationContact[];
  agents: ApiAgentTagCandidate[];
}

interface OrganizationPatch {
  title: string;
  website: string;
  address: ApiAddress;
  about: string;
  email: string;
  phone: string;
  serviceIds: number[]; 
  contactIds: number[];
  agentIds: number[];
};

export type ApiOrganizationPatch = VoidableProps<OrganizationPatch>;

export type ApiOrganizationGetList = Pick<ApiOrganizationGet, "id" | "title">;
