import { describe, expect, it } from "vitest";
import { LanguageMatch, QueryParamsKeys } from "../..";

describe("volunteer language match filter", () => {
  it("exposes the filter key and its values", () => {
    expect(QueryParamsKeys.LANGUAGE_MATCH).toBe("languageMatch");
    expect(Object.values(LanguageMatch)).toEqual(["all", "any"]);
  });
});
