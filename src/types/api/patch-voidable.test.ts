import { describe, expectTypeOf, it } from "vitest";
import type {
  Address,
  PreferredCommunicationType,
  ApiActivityLogPatch,
  ApiAgentContactPatch,
  AgentRoleType,
  ApiAppreciationPatch,
  ApiPersonGet,
  ApiPersonPatch,
  ApiRepresentativePatch,
  AppreciationStatusType,
  VolunteerPatchBodyData,
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
    expectTypeOf<
      NonNullable<ApiPersonPatch["address"]>["postcode"]
    >().toEqualTypeOf<Address["postcode"] | undefined>();
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

describe("Volunteer PATCH lead-from changes", () => {
  it("accepts additions and explicitly identifies the answer to correct", () => {
    expectTypeOf<VolunteerPatchBodyData["leadFromChanges"]>().toEqualTypeOf<
      | Array<
          | { action: "add"; optionId: number }
          | { action: "correct"; previousOptionId: number; optionId: number }
        >
      | undefined
    >();
  });

  it("keeps the detail response field out of the write request", () => {
    expectTypeOf<VolunteerPatchBodyData>().not.toHaveProperty("leadFrom");
  });
});

describe("ApiPersonGet returns NULL columns as null", () => {
  it("nullable columns", () => {
    expectTypeOf<ApiPersonGet["email"]>().toEqualTypeOf<string | null>();
    expectTypeOf<ApiPersonGet["phone"]>().toEqualTypeOf<string | null>();
    expectTypeOf<ApiPersonGet["landline"]>().toEqualTypeOf<string | null>();
    expectTypeOf<ApiPersonGet["middleName"]>().toEqualTypeOf<string | null>();
    expectTypeOf<ApiPersonGet["lastName"]>().toEqualTypeOf<string | null>();
    expectTypeOf<ApiPersonGet["avatarUrl"]>().toEqualTypeOf<string | null>();
  });

  it("person PATCH can clear address street and city", () => {
    expectTypeOf<
      NonNullable<ApiPersonPatch["address"]>["street"]
    >().toEqualTypeOf<string | null | undefined>();
    expectTypeOf<
      NonNullable<ApiPersonPatch["address"]>["city"]
    >().toEqualTypeOf<string | null | undefined>();
  });

  it("required columns", () => {
    expectTypeOf<ApiPersonGet["id"]>().toEqualTypeOf<number>();
    expectTypeOf<ApiPersonGet["firstName"]>().toEqualTypeOf<string>();
  });
});
