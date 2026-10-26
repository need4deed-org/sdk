import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiFieldTranslationPatch,
  ApiFieldTranslationPost,
  ApiOriginalLanguagePut,
  ApiOpportunityPatch,
  EntityTableName,
  Lang,
} from "../..";

describe("translation request contracts", () => {
  it("exports the create request with all required fields", () => {
    expectTypeOf<ApiFieldTranslationPost>().toEqualTypeOf<{
      entityType: EntityTableName;
      entityId: number;
      fieldName: string;
      language: Lang;
      text: string;
    }>();
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
});
