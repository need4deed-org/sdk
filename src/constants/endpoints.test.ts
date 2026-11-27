import { describe, expect, it } from "vitest";
import { HelpAudience } from "../types/api/help";
import { helpPath, volunteerLinkedAgentPath } from "./endpoints";

describe("volunteerLinkedAgentPath", () => {
  it("builds the volunteer–NGO link path", () => {
    expect(volunteerLinkedAgentPath(3, 7)).toBe("/volunteer/3/linked-agent/7");
  });
});

describe("helpPath", () => {
  it("builds the help path per audience", () => {
    expect(helpPath(HelpAudience.NGO)).toBe("/help/ngo");
    expect(helpPath(HelpAudience.COORDINATOR)).toBe("/help/coordinator");
  });
});
