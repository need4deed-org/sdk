import { describe, expectTypeOf, it } from "vitest";
import type {
  AgentMembershipStatus,
  AgentRoleType,
  ApiAgentGet,
  ApiAgentGetList,
  ApiAgentOrganization,
  ApiOrganizationMember,
  ApiOrganizationMemberPost,
  ApiOrganizationMembershipSummary,
  ApiOrganizationPatch,
  ApiUserGet,
} from "../..";

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
    expectTypeOf<ApiOrganizationPatch["addressPostcode"]>().toEqualTypeOf<
      string | null | undefined
    >();
  });

  it("has no Einrichtung or contact links", () => {
    expectTypeOf<ApiOrganizationPatch>().not.toHaveProperty("agentIds");
    expectTypeOf<ApiOrganizationPatch>().not.toHaveProperty("contactIds");
  });

  it("has no services, which are derived from the Einrichtungen", () => {
    expectTypeOf<ApiOrganizationPatch>().not.toHaveProperty("serviceIds");
  });
});

describe("Einrichtung to Träger link", () => {
  it("exposes the Träger on the list and the profile", () => {
    expectTypeOf<
      ApiAgentGetList["organization"]
    >().toEqualTypeOf<ApiAgentOrganization | null>();
    expectTypeOf<
      ApiAgentGet["organization"]
    >().toEqualTypeOf<ApiAgentOrganization | null>();
  });
});

describe("Träger members", () => {
  it("lists the caller's Träger memberships separately from NGO memberships", () => {
    expectTypeOf<ApiUserGet["organizationMemberships"]>().toEqualTypeOf<
      ApiOrganizationMembershipSummary[] | undefined
    >();
    expectTypeOf<ApiOrganizationMembershipSummary["role"]>().toEqualTypeOf<AgentRoleType>();
  });

  it("adds a member by email with a role", () => {
    expectTypeOf<ApiOrganizationMemberPost>().toEqualTypeOf<{
      email: string;
      role: AgentRoleType;
    }>();
    expectTypeOf<ApiOrganizationMember["status"]>().toEqualTypeOf<AgentMembershipStatus>();
  });
});
