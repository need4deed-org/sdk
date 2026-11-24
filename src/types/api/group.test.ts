import { describe, expect, expectTypeOf, it } from "vitest";
import { Endpoint } from "../..";
import type {
  ApiAgentGroupGet,
  ApiGroupCounts,
  ApiGroupDeleteResponse,
  ApiGroupGet,
  ApiGroupGetList,
  ApiGroupPatch,
  ApiGroupPost,
  ApiOrganizationGroupGet,
} from "../..";

describe("group contract", () => {
  it("exposes the /group endpoint", () => {
    expect(Endpoint.GROUP).toBe("/group");
  });

  it("narrows group scope between Träger and single Einrichtung", () => {
    const scopeTitle = (group: ApiGroupGet) =>
      group.organizationId !== null
        ? group.organizationTitle
        : group.agentTitle;
    expectTypeOf(scopeTitle).returns.toEqualTypeOf<string>();

    const narrowed = (group: ApiGroupGet) => {
      if (group.organizationId !== null) {
        expectTypeOf(group).toEqualTypeOf<ApiOrganizationGroupGet>();
      } else {
        expectTypeOf(group).toEqualTypeOf<ApiAgentGroupGet>();
      }
    };
    expectTypeOf(narrowed).toBeFunction();
  });

  it("requires exactly one non-null scope on group get", () => {
    expectTypeOf<{
      id: number;
      title: string;
      organizationId: number;
      organizationTitle: string;
      agentId: number;
      agentTitle: string;
      counts: ApiGroupCounts;
      createdAt: Date;
    }>().not.toExtend<ApiGroupGet>();

    expectTypeOf<{
      id: number;
      title: string;
      organizationId: null;
      organizationTitle: null;
      agentId: null;
      agentTitle: null;
      counts: ApiGroupCounts;
      createdAt: Date;
    }>().not.toExtend<ApiGroupGet>();
  });

  it("includes volunteer, opportunity and account counts on list and get", () => {
    expectTypeOf<ApiGroupGet["counts"]>().toEqualTypeOf<ApiGroupCounts>();
    expectTypeOf<ApiGroupGetList["counts"]>().toEqualTypeOf<ApiGroupCounts>();
    expectTypeOf<ApiGroupCounts>().toEqualTypeOf<{
      volunteers: number;
      opportunities: number;
      accounts: number;
    }>();
  });

  it("accepts exactly one scope on POST /group", () => {
    expectTypeOf<{
      title: string;
      organizationId: number;
    }>().toExtend<ApiGroupPost>();
    expectTypeOf<{
      title: string;
      agentId: number;
    }>().toExtend<ApiGroupPost>();

    expectTypeOf<{
      title: string;
      organizationId: number;
      agentId: number;
    }>().not.toExtend<ApiGroupPost>();
    expectTypeOf<{ title: string }>().not.toExtend<ApiGroupPost>();
    expectTypeOf<{ organizationId: number }>().not.toExtend<ApiGroupPost>();
    expectTypeOf<{
      title: string;
      organizationId: null;
    }>().not.toExtend<ApiGroupPost>();
  });

  it("only allows renaming on PATCH /group/:id", () => {
    expectTypeOf<ApiGroupPatch>().toEqualTypeOf<{ title: string }>();
    expectTypeOf<ApiGroupPatch>().not.toHaveProperty("organizationId");
    expectTypeOf<ApiGroupPatch>().not.toHaveProperty("agentId");
  });

  it("reports handed-back counts and erased persons on DELETE /group/:id", () => {
    expectTypeOf<ApiGroupDeleteResponse>().toEqualTypeOf<{
      id: number;
      counts: ApiGroupCounts;
      erasedPersons: number;
    }>();
  });
});
