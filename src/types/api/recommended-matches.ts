import { ApiCommuteRange } from "./commute";
import { ApiOpportunityGetList } from "./opportunity";
import { ApiVolunteerGetList } from "./volunteer";

export const RECOMMENDED_MATCHES_DEFAULT_LIMIT = 3;
export const RECOMMENDED_MATCHES_MAX_LIMIT = 10;

export interface ApiRecommendedMatchesQuery {
  limit?: number;
}

export type ApiRecommendedVolunteer = ApiVolunteerGetList & {
  commute: ApiCommuteRange | null;
};

export type ApiRecommendedOpportunity = ApiOpportunityGetList & {
  commute: ApiCommuteRange | null;
};
