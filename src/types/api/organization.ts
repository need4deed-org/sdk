import { ApiAddress } from "./location";
import { ApiAgentTagCandidate, Service } from "./agent";
import { Voidable, VoidableProps } from "../utils";

export interface ApiOrganizationContact {
  personId: number;
  firstName: string;
  lastName: Voidable<string>;
  email: Voidable<string>;
  phone: Voidable<string>;
}

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: Voidable<string>;
  address: Voidable<ApiAddress>;
  about: Voidable<string>;
  email: Voidable<string>;
  phone: Voidable<string>;
  services: Service[];
  contacts: ApiOrganizationContact[];
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
}

export type ApiOrganizationPatch = Partial<
  VoidableProps<
    OrganizationPatch,
    "website" | "address" | "about" | "email" | "phone"
  >
>;

export type ApiOrganizationGetList = Pick<ApiOrganizationGet, "id" | "title">;
