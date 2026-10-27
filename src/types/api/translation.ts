import { EntityTableName, Lang } from "..";

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

/** @deprecated Use ApiOpportunityPatch.originalLanguage when the backend replacement is available. */
export interface ApiOriginalLanguagePut {
  language: Lang;
}

type TranslationFieldsByEntity = {
  [EntityTableName.OPPORTUNITY]: "title" | "info";
  [EntityTableName.LANGUAGE]: "title";
  [EntityTableName.CATEGORY]: "title" | "description";
  [EntityTableName.ACTIVITY]: "title";
  [EntityTableName.SKILL]: "title";
  [EntityTableName.AGENT_TYPE]: "title";
  [EntityTableName.SERVICE]: "title";
  [EntityTableName.LEAD]: "title";
};

export type TranslatedEntityType = keyof TranslationFieldsByEntity;

export type ApiFieldTranslationPost = {
  [Entity in TranslatedEntityType]: {
    entityType: Entity;
    entityId: number;
    fieldName: TranslationFieldsByEntity[Entity];
    language: Lang;
    text: string;
  };
}[TranslatedEntityType];

export interface ApiFieldTranslationPatch {
  text: string;
}
