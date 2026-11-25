import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiCommunicationGet,
  ApiCommunicationPatch,
  ApiCommunicationPost,
  ApiVolunteerCommunicationPatch,
  ApiVolunteerCommunicationPost,
} from "../..";

describe("planned communication contract", () => {
  it("lets a post plan the entry for a date", () => {
    expectTypeOf<ApiCommunicationPost["remindOn"]>().toEqualTypeOf<
      string | undefined
    >();
    expectTypeOf<ApiVolunteerCommunicationPost["remindOn"]>().toEqualTypeOf<
      string | undefined
    >();
  });

  it("lets a patch clear the plan", () => {
    expectTypeOf<ApiCommunicationPatch["remindOn"]>().toEqualTypeOf<
      string | null | undefined
    >();
    expectTypeOf<ApiVolunteerCommunicationPatch["remindOn"]>().toEqualTypeOf<
      string | null | undefined
    >();
  });

  it("tells whether a got entry is still planned", () => {
    expectTypeOf<ApiCommunicationGet["isPlanned"]>().toEqualTypeOf<boolean>();
    expectTypeOf<ApiCommunicationGet["remindOn"]>().toEqualTypeOf<
      string | undefined
    >();
  });
});
