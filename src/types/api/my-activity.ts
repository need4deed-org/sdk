import { EntityTableName } from "../core";
import { OpportunityAuditLogType } from "./opportunity-audit-log";
import { VolunteerAuditLogType } from "./volunteer-audit-log";

export enum MyActivityKind {
  COMMENT = "comment",
  CHANGE = "change",
}

export type MyActivityEntityType =
  | EntityTableName.AGENT
  | EntityTableName.OPPORTUNITY
  | EntityTableName.VOLUNTEER;

export interface ApiMyActivityItem {
  id: string;
  kind: MyActivityKind;
  occurredAt: Date;
  entityType: MyActivityEntityType;
  entityId: number;
  entityTitle: string;
  text: string;
  changeType?: OpportunityAuditLogType | VolunteerAuditLogType;
}

export interface ApiMyActivityQuery {
  limit?: number;
}
