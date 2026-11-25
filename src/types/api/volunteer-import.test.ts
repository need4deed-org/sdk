import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiVolunteerGet,
  ApiVolunteerImportRow,
  ApiVolunteerImportRowResult,
  OptionItem,
  VolunteerImportSkipReason,
  VolunteerPatchBodyData,
} from "../..";
import {
  ByDay,
  DocumentStatusType,
  LangProficiency,
  OpportunityType,
  OpportunityVolunteerStatusType,
  TimeSlot,
  VolunteerStateEngagementType,
} from "../..";

describe("volunteer import contract", () => {
  it("requires only first name and email", () => {
    expectTypeOf({
      firstName: "Ada",
      email: "ada@example.org",
    }).toExtend<ApiVolunteerImportRow>();
  });

  it("accepts the full profile and NGO opportunities", () => {
    const row: ApiVolunteerImportRow = {
      firstName: "Ada",
      email: "ada@example.org",
      postcode: "10115",
      languages: [{ title: "Deutsch", proficiency: LangProficiency.NATIVE }],
      activities: ["Kinderbetreuung"],
      skills: ["Cooking"],
      districts: ["Mitte"],
      availability: [{ day: ByDay.MO, daytime: TimeSlot.morning }],
      statusTypes: [OpportunityType.REGULAR],
      statusEngagement: VolunteerStateEngagementType.ACTIVE,
      goodConductCertificate: DocumentStatusType.YES,
      measlesVaccination: DocumentStatusType.NO,
      infoAbout: "about",
      infoExperience: "experience",
      opportunities: [
        {
          title: "Homework help",
          status: OpportunityVolunteerStatusType.ACTIVE,
        },
      ],
    };
    expectTypeOf(row).toExtend<ApiVolunteerImportRow>();
  });

  it("requires day and daytime per availability entry", () => {
    expectTypeOf<{}>().not.toExtend<
      NonNullable<ApiVolunteerImportRow["availability"]>[number]
    >();
  });

  it("links opportunities only as matched or active", () => {
    expectTypeOf<
      NonNullable<ApiVolunteerImportRow["opportunities"]>[number]["status"]
    >().toEqualTypeOf<
      | OpportunityVolunteerStatusType.MATCHED
      | OpportunityVolunteerStatusType.ACTIVE
    >();
  });

  it("reports warnings and neutral skip reasons", () => {
    expectTypeOf<ApiVolunteerImportRowResult["warnings"]>().toEqualTypeOf<
      string[] | undefined
    >();
    expectTypeOf<VolunteerImportSkipReason>().toEqualTypeOf<
      "email-in-use" | "connected-existing" | "duplicate-in-import"
    >();
  });

  it("exposes linked NGOs on get but not on patch", () => {
    expectTypeOf<ApiVolunteerGet["linkedAgents"]>().toEqualTypeOf<
      OptionItem[]
    >();
    expectTypeOf<VolunteerPatchBodyData>().not.toHaveProperty("linkedAgents");
  });
});
