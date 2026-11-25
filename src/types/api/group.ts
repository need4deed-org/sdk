export interface ApiGroupCounts {
  volunteers: number;
  opportunities: number;
  accounts: number;
};

interface GroupGetBase {
  id: number;
  title: string;
  counts: ApiGroupCounts;
  createdAt: Date;
};

export interface ApiOrganizationGroupGet extends GroupGetBase {
  organizationId: number;
  organizationTitle: string;
  agentId: null;
  agentTitle: null;
};

export interface ApiAgentGroupGet extends GroupGetBase {
  organizationId: null;
  organizationTitle: null;
  agentId: number;
  agentTitle: string;
};

export type ApiGroupGet = ApiOrganizationGroupGet | ApiAgentGroupGet;

export type ApiGroupGetList = ApiGroupGet;

export interface ApiOrganizationGroupPost {
  title: string;
  organizationId: number;
  agentId?: never;
};

export interface ApiAgentGroupPost {
  title: string;
  agentId: number;
  organizationId?: never;
};

export type ApiGroupPost = ApiOrganizationGroupPost | ApiAgentGroupPost;

export interface ApiGroupPatch {
  title: string;
};

export interface ApiGroupDeleteResponse {
  id: number;
  counts: ApiGroupCounts;
  erasedPersons: number;
};
