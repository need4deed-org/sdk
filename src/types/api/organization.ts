import { ApiAddress } from "./location";
import {
  AgentMembershipStatus,
  AgentRoleType,
  ApiAgentTagCandidate,
  Service,
} from "./agent";
import { Lang } from "../core";
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
  originalLanguage?: Lang;
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
  originalLanguage: Lang;
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

export interface ApiOrganizationMemberPost {
  email: string;
  role: AgentRoleType;
}

export interface ApiOrganizationMember {
  organizationId: number;
  personId: number;
  role: AgentRoleType;
  status: AgentMembershipStatus;
}
