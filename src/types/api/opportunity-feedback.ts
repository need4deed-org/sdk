import { UserRole } from "./user";

/** GET /opportunity/:id/feedback: feedback by matched volunteers, the publishing NGO and coordinators. */
export interface ApiOpportunityFeedbackGet {
  id: number;
  opportunityId: number;
  authorUserId: number;
  authorName: string;
  authorRole: UserRole;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

/** POST /opportunity/:id/feedback */
export interface ApiOpportunityFeedbackPost {
  text: string;
}

/** PATCH /opportunity/:id/feedback/:feedbackId: author only. */
export interface ApiOpportunityFeedbackPatch {
  text: string;
}
