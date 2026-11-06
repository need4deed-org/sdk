import { Id } from "..";

export interface ApiCommuteRange {
  min: number;
  max: number;
}

export interface ApiVolunteerCommuteQuery {
  opportunity: Id | Id[];
}

export interface ApiVolunteerCommute {
  opportunityId: Id;
  commute: ApiCommuteRange | null;
}
