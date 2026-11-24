import { Lang } from "../core";

export enum EmailTemplateName {
  SUGGESTION = "suggestion",
  SUGGESTION_ACCOMPANYING = "suggestionaccompanying",
  INTRODUCTION = "introduction",
  CONFIRMATION = "confirmation",
  CONFIRMATION_ACCOMPANYING = "confirmationaccompanying",
  CHECKUP = "checkup",
  ACCOMPANY_MATCH_VOLUNTEER = "accompanymatchvolunteer",
  ACCOMPANY_MATCH = "accompanymatch",
  ACCOMPANY_NOT_FOUND = "accompanynotfound",
  REGISTRATION = "registration",
  VERIFICATION = "verification",
  PASSWORD_RESET = "password-reset",
  UPDATE = "update",
  STALE = "stale",
  TAGGED = "tagged",
  SUGGESTION_REQUEST = "suggestion-request",
  CGC_APPLICATION = "cgcapplication",
}

export type EmailTemplateContent = {
  subject: string;
  labels?: Record<string, string>;
} & ({ text: string; html?: string } | { text?: string; html: string });

export type EmailTemplateManifest =
  | (EmailTemplateContent & Partial<Record<Lang, never>>)
  | ({ subject?: never; text?: never; html?: never; labels?: never } &
      (
        | { [Lang.EN]: EmailTemplateContent; [Lang.DE]?: EmailTemplateContent }
        | { [Lang.EN]?: EmailTemplateContent; [Lang.DE]: EmailTemplateContent }
      ));

export type EmailTemplateField = "subject" | "text" | "html";

export interface EmailTemplatePlaceholder {
  name: string;
  allowedIn: EmailTemplateField[];
  required: boolean;
  requiredIn: EmailTemplateField[];
}

export interface EmailTemplatePlaceholders {
  language: Lang | null;
  placeholders: EmailTemplatePlaceholder[];
}

export type ApiAdminEmailTemplateListGet = EmailTemplateName[];

export interface ApiAdminEmailTemplateGet {
  name: EmailTemplateName;
  manifest: EmailTemplateManifest;
  allowedPlaceholders: EmailTemplatePlaceholders[];
}

export interface ApiAdminEmailTemplatePut {
  manifest: EmailTemplateManifest;
}

export interface ApiAdminEmailTemplatePutResponse {
  cachePropagationSeconds: number;
}

export type EmailTemplatePlaceholderErrorCode =
  | "missing-placeholder"
  | "unknown-placeholder";

export interface EmailTemplatePlaceholderError {
  code: EmailTemplatePlaceholderErrorCode;
  name: string;
  language: Lang | null;
  field?: EmailTemplateField;
}

export interface ApiAdminEmailTemplateError {
  message: string;
  code: "invalid-placeholders";
  errors: EmailTemplatePlaceholderError[];
}
