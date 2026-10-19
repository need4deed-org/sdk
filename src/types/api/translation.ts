import { Lang } from "..";

export enum TranslationOrigin {
  REFERENCE = "reference",
  MACHINE = "machine",
  HUMAN = "human",
}

export enum TranslationStatus {
  PENDING = "pending",
  DONE = "done",
  FAILED = "failed",
}

export type TranslationErrorCode =
  | "empty"
  | "length_ratio"
  | "token_missing"
  | "untranslated"
  | "source_is_target"
  | "wrong_language"
  | "bad_response"
  | "provider_unavailable";

export interface ApiFieldTranslation {
  id: number;
  text: string | null;
  origin: TranslationOrigin;
  status: TranslationStatus;
  lastErrorCode?: TranslationErrorCode;
}

export interface ApiFieldTranslationGet {
  fieldName: string;
  original: string;
  originalLanguage?: Lang;
  translations: Partial<Record<Lang, ApiFieldTranslation>>;
}

export interface ApiOriginalLanguagePut {
  language: Lang;
}
