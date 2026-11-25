import { describe, expect, it } from "vitest";
import {
  agentOpportunityExportPath,
  agentVolunteerExportPath,
  csvColumnFromHeader,
  joinCsvList,
  joinCsvPair,
  OPPORTUNITY_EXPORT_CSV_HEADERS,
  splitCsvList,
  splitCsvPair,
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

  it("splits a pair on the last separator", () => {
    expect(splitCsvPair(joinCsvPair("Kurs: Deutsch", "opp-active"))).toEqual([
      "Kurs: Deutsch",
      "opp-active",
    ]);
    expect(splitCsvPair("Deutsch")).toEqual(["Deutsch", undefined]);
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

describe("export paths", () => {
  it("builds the agent export paths", () => {
    expect(agentVolunteerExportPath(7)).toBe("/agent/7/volunteer/export");
    expect(agentOpportunityExportPath(7)).toBe("/agent/7/opportunity/export");
  });
});
