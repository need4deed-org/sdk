import { Lang } from "../core";

export enum EmailTemplateName {
  ACCOMPANY_MATCH = "accompanymatch",
  ACCOMPANY_MATCH_VOLUNTEER = "accompanymatchvolunteer",
  ACCOMPANY_NOT_FOUND = "accompanynotfound",
  CGC_APPLICATION = "cgcapplication",
  CHECKUP = "checkup",
  CONFIRMATION = "confirmation",
  CONFIRMATION_ACCOMPANYING = "confirmationaccompanying",
  INTRODUCTION = "introduction",
  PASSWORD_RESET = "password-reset",
  REGISTRATION = "registration",
  STALE = "stale",
  SUGGESTION = "suggestion",
  SUGGESTION_ACCOMPANYING = "suggestionaccompanying",
  SUGGESTION_REQUEST = "suggestion-request",
  TAGGED = "tagged",
  UPDATE = "update",
  VERIFICATION = "verification",
}

export enum EmailTemplateLayout {
  SINGLE = "single",
  PER_LANGUAGE = "per-language",
}

export interface ApiEmailTemplateText {
  subject: string;
  text: string;
  labels?: Record<string, string>;
}

export interface ApiEmailTemplateSingle {
  layout: EmailTemplateLayout.SINGLE;
  content: ApiEmailTemplateText;
}

export interface ApiEmailTemplatePerLanguage {
  layout: EmailTemplateLayout.PER_LANGUAGE;
  content: Record<Lang, ApiEmailTemplateText>;
}

export type ApiEmailTemplateContent =
  ApiEmailTemplateSingle | ApiEmailTemplatePerLanguage;

export interface ApiEmailTemplatePlaceholder {
  name: string;
  required: boolean;
}

export interface ApiEmailTemplateListItem {
  name: EmailTemplateName;
  layout: EmailTemplateLayout;
}

export interface ApiEmailTemplateList {
  editable: boolean;
  templates: ApiEmailTemplateListItem[];
}

export interface ApiEmailTemplateGet {
  name: EmailTemplateName;
  editable: boolean;
  version: string;
  template: ApiEmailTemplateContent;
  placeholders: ApiEmailTemplatePlaceholder[];
  labelKeys: string[];
  hasHtml: boolean;
}

export interface ApiEmailTemplatePut {
  version: string;
  template: ApiEmailTemplateContent;
}

export interface ApiEmailTemplatePutResponse extends ApiEmailTemplateGet {
  cdnCacheSeconds: number;
}

export type EmailTemplateSaveErrorCode =
  | "not_editable"
  | "version_conflict"
  | "missing_placeholder"
  | "unknown_placeholder"
  | "blank_field"
  | "unknown_label";

export interface ApiEmailTemplateSaveError {
  message: string;
  code: EmailTemplateSaveErrorCode;
  lang?: Lang;
  placeholders?: string[];
  fields?: (
    Exclude<keyof ApiEmailTemplateText, "labels"> | `labels.${string}`
  )[];
}
