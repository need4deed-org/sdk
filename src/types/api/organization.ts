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

export const ORGANIZATION_ABOUT_MAX_LENGTH = 2000;

interface OrganizationPatch {
  title: string;
  about: string;
  website: string;
  email: string;
  phone: string;
  addressStreet: string;
  addressPostcode: string;
}

export type ApiOrganizationPatch = Partial<
  VoidableProps<
    OrganizationPatch,
    | "about"
    | "website"
    | "email"
    | "phone"
    | "addressStreet"
    | "addressPostcode"
  >
>;

export type ApiOrganizationGetList = Pick<ApiOrganizationGet, "id" | "title">;
