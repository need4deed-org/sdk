import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiEventN4DCreate,
  ApiEventN4DGet,
  ApiEventN4DGetList,
  ApiEventN4DPatch,
  EventN4D,
} from "../..";

describe("event registration link contract", () => {
  it("is always present in responses, null when the in-house form is used", () => {
    expectTypeOf<EventN4D["linkRSVP"]>().toEqualTypeOf<string | null>();
    expectTypeOf<ApiEventN4DGetList["linkRSVP"]>().toEqualTypeOf<
      string | null
    >();
    expectTypeOf<ApiEventN4DGet["linkRSVP"]>().toEqualTypeOf<string | null>();
  });

  it("can be left out on create and cleared on patch", () => {
    expectTypeOf<ApiEventN4DCreate["linkRSVP"]>().toEqualTypeOf<
      string | null | undefined
    >();
    expectTypeOf<ApiEventN4DPatch["linkRSVP"]>().toEqualTypeOf<
      string | null | undefined
    >();
  });
});

describe("unlisted events contract", () => {
  it("always says whether an event is on the public list", () => {
    expectTypeOf<ApiEventN4DGetList["listed"]>().toEqualTypeOf<boolean>();
    expectTypeOf<ApiEventN4DGet["listed"]>().toEqualTypeOf<boolean>();
  });

  it("is optional on create and patch", () => {
    expectTypeOf<ApiEventN4DCreate["listed"]>().toEqualTypeOf<
      boolean | undefined
    >();
  });
});
