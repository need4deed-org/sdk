

export enum VolunteerAuditLogType {
  CONTACT_DETAILS_CHANGED = "contact_details_changed",
  AVAILABILITY_CHANGED = "availability_changed",
  OPPORTUNITY_STATUS_CHANGED = "opportunity_status_changed",
}

export interface ApiVolunteerAuditLogGet {
  id: number;
  volunteerId: number;
  type: VolunteerAuditLogType;
  detail: string;
  actorUserId: number | null;
  occurredAt: Date;
}
