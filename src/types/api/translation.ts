import { Lang } from "..";

// Machine translation of user-entered content (be#1064). Each
// field_translation row records where its text came from and, for machine
// rows, where it is in the translation queue.

export enum TranslationOrigin {
  // Seeded, pre-translated reference data (skills, activities, languages, ...).
  REFERENCE = "reference",
  // Produced by the machine-translation worker.
  MACHINE = "machine",
  // Written or confirmed by a person. Never overwritten by MT while the
  // source text is unchanged.
  HUMAN = "human",
}

export enum TranslationStatus {
  // Queued for the machine-translation worker; no usable text yet.
  PENDING = "pending",
  DONE = "done",
  // Gave up (retries exhausted or output failed validation); readers fall
  // back to the original text.
  FAILED = "failed",
}

// field_translation.last_error_code values: why a machine translation was
// not stored (readers then serve the original text).
export type TranslationErrorCode =
  | "empty"
  | "length_ratio"
  | "token_missing"
  | "untranslated"
  // The text seems to be in the target language already: the entity's
  // original language is probably wrong (a coordinator can correct it).
  | "source_is_target"
  | "wrong_language"
  | "bad_response"
  | "provider_unavailable";

export interface ApiFieldTranslation {
  id: number;
  // null while pending or failed.
  text: string | null;
  origin: TranslationOrigin;
  status: TranslationStatus;
  lastErrorCode?: TranslationErrorCode;
}

// GET /translation/:entityType/:entityId (coordinator, be#1070): one entry
// per translatable field of the entity.
export interface ApiFieldTranslationGet {
  fieldName: string;
  original: string;
  originalLanguage?: Lang;
  translations: Partial<Record<Lang, ApiFieldTranslation>>;
}

// PUT /translation/:entityType/:entityId/original-language (coordinator,
// be#1070): corrects the language the text was typed in; translations are
// re-queued accordingly.
export interface ApiOriginalLanguagePut {
  language: Lang;
}
