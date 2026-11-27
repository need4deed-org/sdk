import { Lang } from "../core";

export enum HelpAudience {
  NGO = "ngo",
  COORDINATOR = "coordinator",
}

export const HELP_MAX_DEPTH = 3;

export type ApiHelpBlock =
  | { text: string }
  | { steps: string[] }
  | { list: string[] };

export interface ApiHelpNodeText {
  title: string;
  blocks: ApiHelpBlock[];
}

export interface ApiHelpNode {
  id: string;
  text: Record<Lang, ApiHelpNodeText>;
  related: string[];
  children: ApiHelpNode[];
}

export interface ApiHelpGet {
  audience: HelpAudience;
  editable: boolean;
  version: string;
  nodes: ApiHelpNode[] | null;
}

export interface ApiHelpPut {
  version: string;
  nodes: ApiHelpNode[];
}

export interface ApiHelpPutResponse extends ApiHelpGet {
  nodes: ApiHelpNode[];
  cdnCacheSeconds: number;
}

export type HelpSaveErrorCode =
  | "not_editable"
  | "version_conflict"
  | "duplicate_id"
  | "unknown_related"
  | "blank_title"
  | "blank_block"
  | "too_deep";

export interface ApiHelpSaveError {
  message: string;
  code: HelpSaveErrorCode;
  nodeId?: string;
  lang?: Lang;
}
