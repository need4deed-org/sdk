export enum OpportunityAuditLogType {
  STATUS_CHANGED = "status_changed",
  DETAILS_CHANGED = "details_changed",
  CONTACT_CHANGED = "contact_changed",
  NGO_CHANGED = "ngo_changed",
  MATCH_CHANGED = "match_changed",
}

export interface ApiOpportunityAuditLogGet {
  id: number;
  opportunityId: number;
  type: OpportunityAuditLogType;
  detail: string;
  actorUserId: number | null;
  occurredAt: Date;
}
