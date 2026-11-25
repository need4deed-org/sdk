import { describe, expect, expectTypeOf, it } from "vitest";
import type {
  ApiAgentOpportunityExportQuery,
  ApiAgentVolunteerExportQuery,
  ApiVolunteerImportRow,
  VolunteerCsvColumn,
} from "../..";
import {
  Endpoint,
  Lang,
  OPPORTUNITY_EXPORT_CSV_COLUMNS,
  OPPORTUNITY_EXPORT_CSV_HEADERS,
  OpportunityStatusType,
  OpportunityType,
  VOLUNTEER_CSV_COLUMNS,
  VOLUNTEER_EXPORT_CSV_COLUMNS,
  VOLUNTEER_EXPORT_CSV_HEADERS,
} from "../..";

describe("csv export contract", () => {
  it("volunteer columns are exactly the import row keys", () => {
    expectTypeOf<VolunteerCsvColumn>().toEqualTypeOf<
      keyof ApiVolunteerImportRow
    >();
    expect(new Set(VOLUNTEER_CSV_COLUMNS).size).toBe(
      VOLUNTEER_CSV_COLUMNS.length,
    );
  });

  it("volunteer export starts with the import columns", () => {
    expect(
      VOLUNTEER_EXPORT_CSV_COLUMNS.slice(0, VOLUNTEER_CSV_COLUMNS.length),
    ).toEqual([...VOLUNTEER_CSV_COLUMNS]);
  });

  it.each(Object.values(Lang))("headers are unique in %s", (lang) => {
    for (const [columns, headers] of [
      [VOLUNTEER_EXPORT_CSV_COLUMNS, VOLUNTEER_EXPORT_CSV_HEADERS[lang]],
      [OPPORTUNITY_EXPORT_CSV_COLUMNS, OPPORTUNITY_EXPORT_CSV_HEADERS[lang]],
    ] as const) {
      const labels = columns.map(
        (column) => (headers as Record<string, string>)[column],
      );
      expect(labels.every(Boolean)).toBe(true);
      expect(new Set(labels).size).toBe(labels.length);
    }
  });

  it("takes the list filters and a header language", () => {
    expectTypeOf({
      language: Lang.DE,
      filter: { language: ["de"], ownerAgent: "12", match: "matched" },
    }).toExtend<ApiAgentVolunteerExportQuery>();
    const opportunityQuery: ApiAgentOpportunityExportQuery = {
      language: Lang.EN,
      filter: {
        type: [OpportunityType.REGULAR],
        status: [OpportunityStatusType.ACTIVE],
        agentId: [3, 4],
      },
    };
    expect(opportunityQuery.filter?.agentId).toEqual([3, 4]);
  });

  it("exposes the export paths", () => {
    expect(Endpoint.AGENT_VOLUNTEER_EXPORT).toBe("/agent/:id/volunteer/export");
    expect(Endpoint.AGENT_OPPORTUNITY_EXPORT).toBe(
      "/agent/:id/opportunity/export",
    );
  });
});
