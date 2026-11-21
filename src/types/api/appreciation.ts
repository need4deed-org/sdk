import { VoidableProps } from "../utils";
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

export interface ApiAppreciationPost extends Omit<
  ApiAppreciationGet,
  "id" | "userId" | "volunteerId"
> {}

// Nullable columns may be cleared with `null`; title/status may only be changed.
export type ApiAppreciationPatch = Partial<
  VoidableProps<
    ApiAppreciationPost,
    "opportunityId" | "dateDue" | "dateDelivery"
  >
>;
