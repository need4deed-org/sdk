import { describe, expect, expectTypeOf, it } from "vitest";
import {
  Endpoint,
  SearchScope,
  SearchSuggestionCategory,
  type ApiSearchSuggestion,
  type ApiSearchSuggestQuery,
} from "../..";

describe("search suggest contract", () => {
  it("types the query and a suggestion", () => {
    expectTypeOf<ApiSearchSuggestQuery>().toEqualTypeOf<{
      scope: SearchScope;
      q: string;
      limit?: number;
    }>();
    expectTypeOf<ApiSearchSuggestion>().toEqualTypeOf<{
      category: SearchSuggestionCategory;
      label: string;
      id?: number;
      filterKey?: string;
      filterValue?: string;
    }>();
    expect(Endpoint.SEARCH_SUGGEST).toBe("/search/suggest");
  });
});
