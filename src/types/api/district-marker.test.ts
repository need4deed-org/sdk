import { describe, expectTypeOf, it } from "vitest";
import {
  LanguageMatch,
  QueryParamsKeys,
  type ApiOpportunityDistrictMarkerQuery,
  type ApiVolunteerDistrictAggregateQuery,
  type ApiVolunteerDistrictMarkerQuery,
} from "../..";

describe("volunteer district language filtering", () => {
  it("supports optional language matching on both volunteer map endpoints", () => {
    expectTypeOf<
      NonNullable<ApiVolunteerDistrictAggregateQuery["filter"]>[QueryParamsKeys.LANGUAGE_MATCH]
    >().toEqualTypeOf<LanguageMatch | undefined>();
    expectTypeOf<
      NonNullable<ApiVolunteerDistrictMarkerQuery["filter"]>[QueryParamsKeys.LANGUAGE_MATCH]
    >().toEqualTypeOf<LanguageMatch | undefined>();
  });

  it("keeps language match out of the opportunity map contract", () => {
    expectTypeOf<
      NonNullable<ApiOpportunityDistrictMarkerQuery["filter"]>
    >().not.toHaveProperty(QueryParamsKeys.LANGUAGE_MATCH);
  });
});
