import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiEventN4DCreate,
  ApiEventN4DGetList,
  ApiEventN4DRegistrationGet,
  ApiEventN4DRegistrationPost,
} from "../..";

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

  it("answers the event's optional question; no phone or language", () => {
    expectTypeOf<ApiEventN4DGetList["signUpQuestion"]>().toEqualTypeOf<
      string | null | undefined
    >();
    expectTypeOf<ApiEventN4DCreate["signUpQuestion"]>().toEqualTypeOf<
      string | null | undefined
    >();
    expectTypeOf<ApiEventN4DRegistrationGet["signUpAnswer"]>().toEqualTypeOf<
      string | null
    >();
    expectTypeOf<ApiEventN4DRegistrationPost>().not.toHaveProperty("phone");
    expectTypeOf<ApiEventN4DRegistrationGet>().not.toHaveProperty(
      "languagePreference",
    );
  });
});
