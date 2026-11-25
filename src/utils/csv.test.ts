import { describe, expect, it } from "vitest";
import {
  agentOpportunityExportPath,
  agentVolunteerExportPath,
  CSV_UTF8_BOM,
  csvColumnFromHeader,
  joinCsvList,
  joinCsvPair,
  OPPORTUNITY_EXPORT_CSV_HEADERS,
  OpportunityVolunteerStatusType,
  splitCsvList,
  splitCsvPair,
  VOLUNTEER_CSV_COLUMNS,
  VOLUNTEER_EXPORT_CSV_HEADERS,
} from "..";

describe("csv list cells", () => {
  it("round-trips items containing the separator and escape", () => {
    const items = ["Kochen | Backen", "a\\b", "Mitte"];
    expect(splitCsvList(joinCsvList(items))).toEqual(items);
  });

  it("trims and drops empty items", () => {
    expect(splitCsvList(" Mitte | |Pankow ")).toEqual(["Mitte", "Pankow"]);
  });

  it("keeps a lone backslash that escapes nothing", () => {
    expect(splitCsvList("C:\\Kurse|Mitte")).toEqual(["C:\\Kurse", "Mitte"]);
  });

  it("splits a pair only on a known value", () => {
    const statuses = Object.values(OpportunityVolunteerStatusType);
    expect(
      splitCsvPair(joinCsvPair("Kurs: Deutsch", "opp-active"), statuses),
    ).toEqual(["Kurs: Deutsch", OpportunityVolunteerStatusType.ACTIVE]);
    expect(splitCsvPair("Kurs: Deutsch", statuses)).toEqual([
      "Kurs: Deutsch",
      undefined,
    ]);
    expect(splitCsvPair("Deutsch", statuses)).toEqual(["Deutsch", undefined]);
  });
});

describe("csv headers", () => {
  it("resolves exported headers of every language back to the column", () => {
    for (const headers of Object.values(VOLUNTEER_EXPORT_CSV_HEADERS)) {
      for (const [column, label] of Object.entries(headers)) {
        expect(csvColumnFromHeader(label, VOLUNTEER_EXPORT_CSV_HEADERS)).toBe(
          column,
        );
      }
    }
  });

  it("ignores a BOM and columns outside the allowed set", () => {
    expect(
      csvColumnFromHeader(
        CSV_UTF8_BOM + "Vorname",
        VOLUNTEER_EXPORT_CSV_HEADERS,
      ),
    ).toBe("firstName");
    expect(
      csvColumnFromHeader(
        "Total hours",
        VOLUNTEER_EXPORT_CSV_HEADERS,
        VOLUNTEER_CSV_COLUMNS,
      ),
    ).toBeUndefined();
  });

  it("resolves column keys loosely and ignores unknown headers", () => {
    expect(
      csvColumnFromHeader("first_name", VOLUNTEER_EXPORT_CSV_HEADERS),
    ).toBe("firstName");
    expect(csvColumnFromHeader("e-mail", VOLUNTEER_EXPORT_CSV_HEADERS)).toBe(
      "email",
    );
    expect(
      csvColumnFromHeader("Lieblingsfarbe", OPPORTUNITY_EXPORT_CSV_HEADERS),
    ).toBeUndefined();
  });
});

describe("csv header labels", () => {
  const normalize = (text: string) => text.toLowerCase().replace(/[\s_-]/g, "");

  it.each([
    ["volunteer", VOLUNTEER_EXPORT_CSV_HEADERS],
    ["opportunity", OPPORTUNITY_EXPORT_CSV_HEADERS],
  ] as const)("never collide across languages for %s", (_, headersByLang) => {
    const columnByLabel = new Map<string, string>();
    for (const headers of Object.values(headersByLang)) {
      for (const [column, label] of Object.entries(
        headers as Record<string, string>,
      )) {
        for (const text of [column, label]) {
          const owner = columnByLabel.get(normalize(text)) ?? column;
          expect(owner).toBe(column);
          columnByLabel.set(normalize(text), column);
        }
      }
    }
  });
});

describe("export paths", () => {
  it("builds the agent export paths", () => {
    expect(agentVolunteerExportPath(7)).toBe("/agent/7/volunteer/export");
    expect(agentOpportunityExportPath(7)).toBe("/agent/7/opportunity/export");
  });
});
