import { describe, expectTypeOf, it } from "vitest";
import {
  ApiHelpBlock,
  ApiHelpContent,
  ApiHelpGet,
  ApiHelpPageText,
  ApiHelpNode,
  ApiHelpPut,
  ApiHelpPutResponse,
  HelpAudience,
  HelpSaveErrorCode,
} from "./help";
import { helpPath, Lang } from "../..";

describe("help contract", () => {
  it("needs both languages for every node", () => {
    expectTypeOf<{
      id: string;
      text: { de: { title: string; blocks: ApiHelpBlock[] } };
      related: string[];
      children: ApiHelpNode[];
    }>().not.toExtend<ApiHelpNode>();
    expectTypeOf<ApiHelpNode["text"]>().toHaveProperty(Lang.EN);
  });

  it("allows only text, steps and list blocks", () => {
    expectTypeOf<{ text: string }>().toExtend<ApiHelpBlock>();
    expectTypeOf<{ steps: string[] }>().toExtend<ApiHelpBlock>();
    expectTypeOf<{ html: string }>().not.toExtend<ApiHelpBlock>();
  });

  it("makes the page title, question and contact line editable per language", () => {
    expectTypeOf<ApiHelpContent["page"]>().toEqualTypeOf<
      Record<Lang, ApiHelpPageText>
    >();
    expectTypeOf<ApiHelpPageText>().toHaveProperty("contact");
  });

  it("returns null content until something is saved, never after a save", () => {
    expectTypeOf<ApiHelpGet["content"]>().toEqualTypeOf<ApiHelpContent | null>();
    expectTypeOf<ApiHelpPutResponse["content"]>().toEqualTypeOf<ApiHelpContent>();
    expectTypeOf<ApiHelpPut["version"]>().toEqualTypeOf<ApiHelpGet["version"]>();
  });

  it("names every save error", () => {
    expectTypeOf<HelpSaveErrorCode>().toEqualTypeOf<
      | "not_editable"
      | "version_conflict"
      | "duplicate_id"
      | "unknown_related"
      | "blank_page_text"
      | "blank_title"
      | "blank_block"
      | "too_deep"
    >();
  });

  it("builds the path per audience", () => {
    expectTypeOf(helpPath).parameter(0).toEqualTypeOf<HelpAudience>();
  });
});
