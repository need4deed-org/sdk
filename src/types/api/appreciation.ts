import { VolunteerStateAppreciationType } from "./volunteer";

export enum AppreciationStatusType {
  RECEIVED = "appr-received",
  PENDING = "appr-pending",
  POST = "appr-post",
}

export interface ApiAppreciationGet {
  id: number;
  userId?: number;
  volunteerId: number;
  opportunityId?: number;
  title: VolunteerStateAppreciationType;
  status: AppreciationStatusType;
  dateDue: Date | null;
  dateDelivery?: Date | null;
}

export interface ApiAppreciationPost
  extends Omit<ApiAppreciationGet, "id" | "userId" | "volunteerId"> {}

export type ApiAppreciationPatch = Partial<ApiAppreciationPost>;
