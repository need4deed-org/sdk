import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiFieldTranslationPatch,
  ApiFieldTranslationPost,
  ApiOriginalLanguagePut,
  ApiOpportunityPatch,
  EntityTableName,
  Lang,
  TranslatedEntityType,
  TranslationFieldsByEntity,
} from "../..";

describe("translation request contracts", () => {
  it("exports the opportunity create request with registered fields", () => {
    expectTypeOf<
      Extract<ApiFieldTranslationPost, { entityType: EntityTableName.OPPORTUNITY }>
    >().toEqualTypeOf<{
      entityType: EntityTableName.OPPORTUNITY;
      entityId: number;
      fieldName: "title" | "info";
      language: Lang;
      text: string;
      original: string;
    }>();
  });

  it("supports every registered entity, including reference translations", () => {
    expectTypeOf<TranslatedEntityType>().toEqualTypeOf<
      | EntityTableName.OPPORTUNITY
      | EntityTableName.LANGUAGE
      | EntityTableName.CATEGORY
      | EntityTableName.ACTIVITY
      | EntityTableName.SKILL
      | EntityTableName.AGENT_TYPE
      | EntityTableName.SERVICE
      | EntityTableName.LEAD
    >();
    expectTypeOf<
      Extract<ApiFieldTranslationPost, { entityType: EntityTableName.CATEGORY }>["fieldName"]
    >().toEqualTypeOf<"title" | "description">();
    expectTypeOf<
      Extract<ApiFieldTranslationPost, { entityType: EntityTableName.SKILL }>["fieldName"]
    >().toEqualTypeOf<"title">();
  });

  it("exports the field map for shared backend validation", () => {
    expectTypeOf<keyof TranslationFieldsByEntity>().toEqualTypeOf<TranslatedEntityType>();
    expectTypeOf<TranslationFieldsByEntity[EntityTableName.OPPORTUNITY]>().toEqualTypeOf<"title" | "info">();
    expectTypeOf<TranslationFieldsByEntity[EntityTableName.CATEGORY]>().toEqualTypeOf<"title" | "description">();
    expectTypeOf<TranslationFieldsByEntity[EntityTableName.SKILL]>().toEqualTypeOf<"title">();
  });

  it("rejects unsupported entities and mismatched fields", () => {
    expectTypeOf<EntityTableName.NONE>().not.toExtend<TranslatedEntityType>();
    expectTypeOf<EntityTableName.DISTRICT>().not.toExtend<TranslatedEntityType>();
    expectTypeOf<EntityTableName.COMMENT>().not.toExtend<TranslatedEntityType>();
    expectTypeOf<{
      entityType: EntityTableName.OPPORTUNITY;
      entityId: number;
      fieldName: "description";
      language: Lang;
      text: string;
      original: string;
    }>().not.toExtend<ApiFieldTranslationPost>();
    expectTypeOf<{
      entityType: EntityTableName.SKILL;
      entityId: number;
      fieldName: "info";
      language: Lang;
      text: string;
      original: string;
    }>().not.toExtend<ApiFieldTranslationPost>();
  });

  it("exports the update request with required text and original", () => {
    expectTypeOf<ApiFieldTranslationPatch>().toEqualTypeOf<{
      text: string;
      original: string;
    }>();
  });

  it("requires the original the translation was written against", () => {
    expectTypeOf<{ text: string }>().not.toExtend<ApiFieldTranslationPatch>();
    expectTypeOf<{
      entityType: EntityTableName.OPPORTUNITY;
      entityId: number;
      fieldName: "title";
      language: Lang;
      text: string;
    }>().not.toExtend<ApiFieldTranslationPost>();
  });

  it("preserves the original-language request contract", () => {
    expectTypeOf<ApiOriginalLanguagePut>().toEqualTypeOf<{ language: Lang }>();
  });

  it("allows an optional original language on opportunity updates", () => {
    expectTypeOf<Pick<ApiOpportunityPatch, "originalLanguage">>().toEqualTypeOf<{
      originalLanguage?: Lang;
    }>();
  });

  it("preserves existing nullable opportunity update fields", () => {
    expectTypeOf<ApiOpportunityPatch["title"]>().toEqualTypeOf<string | null | undefined>();
    expectTypeOf<ApiOpportunityPatch["description"]>().toEqualTypeOf<string | null | undefined>();
  });
});
