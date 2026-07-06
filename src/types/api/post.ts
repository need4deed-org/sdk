import { VoidableProps } from "../utils";

export interface ApiPostPerson {
  id: number;
  fullName: string;
  avatarUrl?: string;
}

export interface ApiPostLinkedOpportunity {
  id: number;
  title: string;
}

export interface ApiPostGet {
  id: number;
  text: string;
  author: ApiPostPerson;
  agentId: number | null;
  taggedPersons: ApiPostPerson[];
  linkedOpportunities: ApiPostLinkedOpportunity[];
  createdAt: Date;
}

export interface ApiPostPost {
  text: string;
  taggedPersonIds?: number[];
  linkedOpportunityIds?: number[];
}

export type ApiPostPatch = VoidableProps<ApiPostPost>;
