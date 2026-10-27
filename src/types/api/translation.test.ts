import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiFieldTranslationPatch,
  ApiFieldTranslationPost,
  ApiOriginalLanguagePut,
  ApiOpportunityPatch,
  EntityTableName,
  Lang,
  TranslatedEntityType,
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

  it("rejects unsupported entities and mismatched fields", () => {
    expectTypeOf<EntityTableName.NONE>().not.toMatchTypeOf<TranslatedEntityType>();
    expectTypeOf<EntityTableName.DISTRICT>().not.toMatchTypeOf<TranslatedEntityType>();
    expectTypeOf<EntityTableName.COMMENT>().not.toMatchTypeOf<TranslatedEntityType>();
    expectTypeOf<{
      entityType: EntityTableName.OPPORTUNITY;
      entityId: number;
      fieldName: "description";
      language: Lang;
      text: string;
    }>().not.toMatchTypeOf<ApiFieldTranslationPost>();
    expectTypeOf<{
      entityType: EntityTableName.SKILL;
      entityId: number;
      fieldName: "info";
      language: Lang;
      text: string;
    }>().not.toMatchTypeOf<ApiFieldTranslationPost>();
  });

  it("exports the update request with required text", () => {
    expectTypeOf<ApiFieldTranslationPatch>().toEqualTypeOf<{ text: string }>();
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
