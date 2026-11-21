export enum OpportunityAuditLogType {
  STATUS_CHANGED = "status-changed",
  DETAILS_CHANGED = "details-changed",
  CONTACT_CHANGED = "contact-changed",
  NGO_CHANGED = "ngo-changed",
  MATCH_CHANGED = "match-changed",
}

export interface ApiOpportunityAuditLogGet {
  id: number;
  opportunityId: number;
  type: OpportunityAuditLogType;
  detail: string;
  actorUserId: number | null;
  occurredAt: Date;
}
