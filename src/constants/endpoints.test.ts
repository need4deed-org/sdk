import { describe, expect, it } from "vitest";
import { volunteerLinkedAgentPath } from "./endpoints";

describe("volunteerLinkedAgentPath", () => {
  it("builds the volunteer–NGO link path", () => {
    expect(volunteerLinkedAgentPath(3, 7)).toBe("/volunteer/3/linked-agent/7");
  });
});
