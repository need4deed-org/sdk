import { VoidableProps } from "../utils";
import { ApiPostPerson } from "./post";
import { ApiPostReactionSummary } from "./post-reaction";

export interface ApiPostReplyGet {
  id: number;
  text: string;
  author: ApiPostPerson;
  postId: number;
  parentReplyId: number | null;
  reactions: ApiPostReactionSummary[];
  myReaction: string | null;
  createdAt: Date;
}

export interface ApiPostReplyPost {
  postId: number;
  text: string;
  parentReplyId?: number;
}

export type ApiPostReplyPatch = VoidableProps<Pick<ApiPostReplyPost, "text">>;
