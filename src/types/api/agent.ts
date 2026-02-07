import { ApiOrganizationGet } from "./organization";
import { ApiPersonGet } from "./person";

export enum AgentType {
  RAC = "rac",
  NGO = "ngo",
}

export interface ApiAgentGet {
  type: AgentType;
  operator: ApiPersonGet | ApiOrganizationGet;
  contact: ApiPersonGet;
}
