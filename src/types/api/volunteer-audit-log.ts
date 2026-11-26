

export enum VolunteerAuditLogType {
  CONTACT_DETAILS_CHANGED = "contact_details_changed",
  AVAILABILITY_CHANGED = "availability_changed",
  OPPORTUNITY_STATUS_CHANGED = "opportunity_status_changed",
  OWNER_CHANGED = "owner_changed",
  AGENT_LINKED = "agent_linked",
  AGENT_UNLINKED = "agent_unlinked",
}

export interface ApiVolunteerAuditLogGet {
  id: number;
  volunteerId: number;
  type: VolunteerAuditLogType;
  detail: string;
  actorUserId: number | null;
  occurredAt: Date;
}
