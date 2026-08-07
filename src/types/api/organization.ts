import { ApiAddress } from "./location";

export interface ApiOrganizationGet {
  id: number;
  title: string;
  website: string;
  address: ApiAddress;
}

export type ApiOrganizationPatch = Partial<ApiOrganizationGet>;

// Dropdown row for picking an agent's operator (Träger), e.g. IB/DRK/Albatros
// (be#843). Picked from ApiOrganizationGet rather than hand-duplicated, so it
// can't drift from the canonical shape (see AgentGetList/AgentGet in
// agent.ts for the same derive-from-canonical convention). Organizations
// aren't translated reference data, so this doesn't go through the generic
// EntityTableName/ApiOptionLists mechanism used by Skill/Language/Activity.
export type ApiOrganizationGetList = Pick<ApiOrganizationGet, "id" | "title">;
