import { OptionTitle } from "./common";

// Periods are Europe/Berlin calendar periods, widened to whole periods.

export enum StatisticsMetric {
  NEW_VOLUNTEERS = "new-volunteers",
  REQUESTS = "requests",
  // Counts ticked answers: one volunteer can tick several.
  LEAD_FROM = "lead-from",
  // Matched, active and past matches, in the month the match was created.
  MATCHED_VOLUNTEERS = "matched-volunteers",
  MATCHED_OPPORTUNITIES = "matched-opportunities",
  // Created in the period and never matched.
  UNMATCHED_OPPORTUNITIES = "unmatched-opportunities",
  // Created in the period.
  NEW_OPPORTUNITIES = "new-opportunities",
  // In the month the opportunity first entered that status.
  PAST_OPPORTUNITIES = "past-opportunities",
  VALIDATED_OPPORTUNITIES = "validated-opportunities",
  // Volunteers in that status at the end of the month.
  ACTIVE_VOLUNTEERS = "active-volunteers",
  AVAILABLE_VOLUNTEERS = "available-volunteers",
}

export enum StatisticsGranularity {
  MONTH = "month",
  QUARTER = "quarter",
  YEAR = "year",
}

export enum StatisticsGroupBy {
  NONE = "none",
  DISTRICT = "district",
  OPPORTUNITY_TYPE = "opportunity-type",
  VOLUNTEER_TYPE = "volunteer-type",
  LEAD_FROM = "lead-from",
}

export const STATISTICS_TOTAL_KEY = "total";
export const STATISTICS_UNKNOWN_KEY = "unknown";

export interface ApiStatisticsQuery {
  granularity: StatisticsGranularity;
  // `from` inclusive, `to` exclusive.
  from?: string;
  to?: string;
  groupBy?: StatisticsGroupBy;
}

export interface ApiStatisticsGroup {
  key: string;
  title: OptionTitle;
}

export interface ApiStatisticsPeriod {
  period: string;
  start: Date;
  counts: Record<string, number>;
  // Distinct records: less than the sum of counts when one record is in several groups.
  total: number;
}

export interface ApiStatisticsGet {
  metric: StatisticsMetric;
  granularity: StatisticsGranularity;
  groupBy: StatisticsGroupBy;
  allowedGroupBy: StatisticsGroupBy[];
  groups: ApiStatisticsGroup[];
  periods: ApiStatisticsPeriod[];
  totalsBeforeTracking?: Record<string, number>;
}
