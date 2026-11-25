import { describe, expectTypeOf, it } from "vitest";
import type {
  ApiOpportunityFeedbackGet,
  ApiOpportunityFeedbackPatch,
  ApiOpportunityFeedbackPost,
  UserRole,
} from "../..";

describe("opportunity feedback contract", () => {
  it("returns feedback with its author and role", () => {
    expectTypeOf<ApiOpportunityFeedbackGet>().toEqualTypeOf<{
      id: number;
      opportunityId: number;
      authorUserId: number;
      authorName: string;
      authorRole: UserRole;
      text: string;
      createdAt: Date;
      updatedAt: Date;
    }>();
  });

  it("only takes text on POST and PATCH", () => {
    expectTypeOf<ApiOpportunityFeedbackPost>().toEqualTypeOf<{
      text: string;
    }>();
    expectTypeOf<ApiOpportunityFeedbackPatch>().toEqualTypeOf<{
      text: string;
    }>();
    expectTypeOf<ApiOpportunityFeedbackPost>().not.toHaveProperty(
      "authorUserId",
    );
    expectTypeOf<ApiOpportunityFeedbackPatch>().not.toHaveProperty(
      "opportunityId",
    );
  });
});
