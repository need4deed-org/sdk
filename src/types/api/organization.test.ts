import { describe, expectTypeOf, it } from "vitest";
import type { ApiOrganizationPatch } from "../..";

describe("organization patch contract", () => {
  it("never lets the title be cleared", () => {
    expectTypeOf<ApiOrganizationPatch["title"]>().toEqualTypeOf<
      string | undefined
    >();
  });

  it("lets the optional details be cleared", () => {
    expectTypeOf<ApiOrganizationPatch["email"]>().toEqualTypeOf<
      string | null | undefined
    >();
  });

  it("has no Einrichtung or contact links", () => {
    expectTypeOf<ApiOrganizationPatch>().not.toHaveProperty("agentIds");
    expectTypeOf<ApiOrganizationPatch>().not.toHaveProperty("contactIds");
  });
});
