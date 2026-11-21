import { describe, expectTypeOf, it } from "vitest";
import type {
  Address,
  PreferredCommunicationType,
  ApiActivityLogPatch,
  ApiAgentContactPatch,
  AgentRoleType,
  ApiAppreciationPatch,
  ApiPersonPatch,
  ApiRepresentativePatch,
  AppreciationStatusType,
  VolunteerStateAppreciationType,
} from "../..";

type Clearable<T> = T | null | undefined;

describe("PATCH types allow null only on nullable columns", () => {
  it("appreciation", () => {
    expectTypeOf<ApiAppreciationPatch["dateDue"]>().toEqualTypeOf<
      Clearable<Date>
    >();
    expectTypeOf<ApiAppreciationPatch["dateDelivery"]>().toEqualTypeOf<
      Clearable<Date>
    >();
    expectTypeOf<ApiAppreciationPatch["opportunityId"]>().toEqualTypeOf<
      number | undefined
    >();
    expectTypeOf<ApiAppreciationPatch["status"]>().toEqualTypeOf<
      AppreciationStatusType | undefined
    >();
    expectTypeOf<ApiAppreciationPatch["title"]>().toEqualTypeOf<
      VolunteerStateAppreciationType | undefined
    >();
  });

  it("person and representative", () => {
    expectTypeOf<ApiPersonPatch["avatarUrl"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiPersonPatch["middleName"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiPersonPatch["phone"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiPersonPatch["landline"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiPersonPatch["email"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiPersonPatch["firstName"]>().toEqualTypeOf<
      string | undefined
    >();
    expectTypeOf<ApiPersonPatch["lastName"]>().toEqualTypeOf<
      string | undefined
    >();
    expectTypeOf<ApiPersonPatch["address"]>().toEqualTypeOf<
      Address | undefined
    >();
    expectTypeOf<ApiPersonPatch["preferredComm"]>().toEqualTypeOf<
      PreferredCommunicationType[] | undefined
    >();
    expectTypeOf<ApiPersonPatch>().not.toHaveProperty("id");
    expectTypeOf<ApiRepresentativePatch["phone"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiRepresentativePatch["role"]>().toEqualTypeOf<
      AgentRoleType | undefined
    >();
    expectTypeOf<ApiRepresentativePatch["agentId"]>().toEqualTypeOf<
      number | undefined
    >();
    expectTypeOf<ApiRepresentativePatch>().not.toHaveProperty("id");
  });

  it("agent contact", () => {
    expectTypeOf<ApiAgentContactPatch["middleName"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiAgentContactPatch["email"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiAgentContactPatch["phone"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiAgentContactPatch["landline"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiAgentContactPatch["addressStreet"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiAgentContactPatch["addressPostcode"]>().toEqualTypeOf<
      Clearable<string>
    >();
    expectTypeOf<ApiAgentContactPatch["firstName"]>().toEqualTypeOf<
      string | undefined
    >();
    expectTypeOf<ApiAgentContactPatch["lastName"]>().toEqualTypeOf<
      string | undefined
    >();
    expectTypeOf<ApiAgentContactPatch["role"]>().toEqualTypeOf<
      AgentRoleType | undefined
    >();
  });

  it("activity log has no nullable fields", () => {
    expectTypeOf<ApiActivityLogPatch["date"]>().toEqualTypeOf<
      Date | undefined
    >();
    expectTypeOf<ApiActivityLogPatch["hours"]>().toEqualTypeOf<
      number | undefined
    >();
  });
});
