import { VoidableProps } from "../utils";
import { ApiPostReactionSummary } from "./post-reaction";

export interface ApiPostPerson {
  id: number;
  fullName: string;
  avatarUrl?: string;
}

export interface ApiPostAgent {
  id: number;
  title: string;
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
  taggedAgents: ApiPostAgent[];
  linkedOpportunities: ApiPostLinkedOpportunity[];
  replyCount: number;
  reactions: ApiPostReactionSummary[];
  myReaction: string | null;
  bookmarked: boolean;
  createdAt: Date;
}

export interface ApiPostListQuery {
  search?: string;
  authorId?: number;
  page?: number;
  limit?: number;
}

export interface ApiPostPost {
  text: string;
  taggedPersonIds?: number[];
  taggedAgentIds?: number[];
  linkedOpportunityIds?: number[];
}

export type ApiPostPatch = VoidableProps<ApiPostPost>;
