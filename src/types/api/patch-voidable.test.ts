import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiActivityLogPatch,
  ApiAgentContactPatch,
  ApiAppreciationPatch,
  ApiPersonPatch,
  AppreciationStatusType,
} from "../..";

describe("PATCH types allow null only on nullable columns", () => {
  it("appreciation", () => {
    expectTypeOf<ApiAppreciationPatch["dateDue"]>().toEqualTypeOf<
      Date | null | undefined
    >();
    expectTypeOf<ApiAppreciationPatch["opportunityId"]>().toEqualTypeOf<
      number | null | undefined
    >();
    expectTypeOf<ApiAppreciationPatch["status"]>().toEqualTypeOf<
      AppreciationStatusType | undefined
    >();
  });

  it("person", () => {
    expectTypeOf<ApiPersonPatch["phone"]>().toEqualTypeOf<
      string | null | undefined
    >();
    expectTypeOf<ApiPersonPatch["firstName"]>().toEqualTypeOf<
      string | undefined
    >();
  });

  it("agent contact", () => {
    expectTypeOf<ApiAgentContactPatch["email"]>().toEqualTypeOf<
      string | null | undefined
    >();
    expectTypeOf<ApiAgentContactPatch["lastName"]>().toEqualTypeOf<
      string | undefined
    >();
  });

  it("activity log has no nullable fields", () => {
    expectTypeOf<ApiActivityLogPatch["hours"]>().toEqualTypeOf<
      number | undefined
    >();
  });
});
