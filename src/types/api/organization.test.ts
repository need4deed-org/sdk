import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiAgentGet,
  ApiAgentGetList,
  ApiAgentOrganization,
  ApiOrganizationPatch,
} from "../..";

describe("organization contracts", () => {
  it("keeps the organization patch narrow, with a non-null title", () => {
    expectTypeOf<ApiOrganizationPatch>().toEqualTypeOf<{
      title?: string;
      website?: string | null;
      email?: string | null;
      phone?: string | null;
      addressStreet?: string | null;
      addressPostcode?: string | null;
    }>();
  });

  it("links an Einrichtung to its Träger", () => {
    expectTypeOf<
      ApiAgentGetList["organization"]
    >().toEqualTypeOf<ApiAgentOrganization | null>();
    expectTypeOf<
      ApiAgentGet["organization"]
    >().toEqualTypeOf<ApiAgentOrganization | null>();
  });
});
