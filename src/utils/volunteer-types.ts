import { OpportunityType } from "../types/api/opportunity";
import { ProfileVolunteeringType } from "../types/api/profile";
import type { VolunteerType } from "../types/api/volunteer";

export function volunteerTypesFromStatusType(
  statusType: ProfileVolunteeringType | null | undefined,
): VolunteerType[] {
  if (!statusType) {
    return [];
  }
  if (statusType === ProfileVolunteeringType.REGULAR_ACCOMPANYING) {
    return [OpportunityType.REGULAR, OpportunityType.ACCOMPANYING];
  }
  return [statusType];
}
