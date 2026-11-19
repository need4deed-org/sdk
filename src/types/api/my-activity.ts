import { EntityTableName } from "../core";
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
  changeType?: VolunteerAuditLogType;
}

export interface ApiMyActivityQuery {
  limit?: number;
}
