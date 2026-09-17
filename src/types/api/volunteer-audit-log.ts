// Read-only audit trail of things that change on a volunteer's record
// (be#919). Distinct from ApiActivityLogGet/ApiActivityLogEntry
// (./activity-log.ts), an unrelated hours-worked ledger per
// opportunity-volunteer pairing that happens to share a similar name.
export enum VolunteerAuditLogType {
  CONTACT_DETAILS_CHANGED = "contact_details_changed",
  AVAILABILITY_CHANGED = "availability_changed",
  OPPORTUNITY_STATUS_CHANGED = "opportunity_status_changed",
}

export interface ApiVolunteerAuditLogGet {
  id: number;
  volunteerId: number;
  type: VolunteerAuditLogType;
  // Human-readable, pre-rendered description (e.g. "Status changed from
  // Active to Temporarily unavailable") rather than structured before/after
  // values — this is a read-only trail, not something the fe reconstructs
  // diffs from.
  detail: string;
  actorUserId: number | null;
  occurredAt: Date;
}
