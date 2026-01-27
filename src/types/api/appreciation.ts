import { VolunteerStateAppreciationType } from "./volunteer";

export interface ApiAppreciationGet {
  id: number;
  userId?: number;
  volunteerId: number;
  opportunityId?: number;
  title: VolunteerStateAppreciationType;
  dateDue: Date | null;
  dateDelivery?: Date | null;
}

export interface ApiAppreciationPost
  extends Omit<ApiAppreciationGet, "id" | "userId" | "volunteerId"> {}

export type ApiAppreciationPatch = Partial<ApiAppreciationPost>;
