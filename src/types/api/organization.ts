import { ApiAddress } from "./location";

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: string;
  address: ApiAddress;
}

export type ApiOrganizationPatch = Partial<ApiOrganizationGet>;

// Dropdown row for picking an agent's operator (Träger), e.g. IB/DRK/Albatros
// (be#843). Deliberately its own minimal shape rather than ApiOrganizationGet:
// a picker list has no use for website/address, and organizations aren't
// translated reference data, so this doesn't go through the generic
// EntityTableName/ApiOptionLists mechanism used by Skill/Language/Activity.
export interface ApiOrganizationGetList {
  id: number;
  title: string;
}
