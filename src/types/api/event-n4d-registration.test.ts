import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiEventN4DCreate,
  ApiEventN4DGet,
  ApiEventN4DGetList,
  ApiEventN4DPatch,
  ApiEventN4DRegistrationGet,
  ApiEventN4DRegistrationPost,
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

describe("event sign-up contract", () => {
  it("attaches to an event, not an opportunity", () => {
    expectTypeOf<
      ApiEventN4DRegistrationPost["eventId"]
    >().toEqualTypeOf<number>();
    expectTypeOf<ApiEventN4DRegistrationPost>().not.toHaveProperty(
      "opportunityId",
    );
  });

  it("leaves the volunteer link to be (staff only)", () => {
    expectTypeOf<ApiEventN4DRegistrationPost>().not.toHaveProperty(
      "volunteerId",
    );
    expectTypeOf<ApiEventN4DRegistrationGet["volunteerId"]>().toEqualTypeOf<
      number | null
    >();
  });
});
