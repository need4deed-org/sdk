import { ApiAddress } from "./location";
import { ApiAgentTagCandidate, Service } from "./agent";
import { Voidable } from "../utils";

export interface ApiOrganizationContact {
  id: number;
  name: string;
  email: Voidable<string>;
  phone: Voidable<string>;
}

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: Voidable<string>;
  address: Voidable<ApiAddress>;
  about?: Voidable<string>;
  email: Voidable<string>;
  phone: Voidable<string>;
  services?: Service[];
  contacts: ApiOrganizationContact[];
  agents: ApiAgentTagCandidate[];
}

// Einrichtungen and contacts follow the email domain; a site that changes Träger gets a new Einrichtung.
export interface ApiOrganizationPatch {
  title?: string;
  website?: string | null;
  address?: ApiAddress | null;
  about?: string | null;
  email?: string | null;
  phone?: string | null;
  serviceIds?: number[];
}

export type ApiOrganizationGetList = Pick<ApiOrganizationGet, "id" | "title">;
