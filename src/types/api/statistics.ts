import { OptionTitle } from "./common";

// Periods are Europe/Berlin calendar periods, widened to whole periods.

export enum StatisticsMetric {
  NEW_VOLUNTEERS = "new-volunteers",
  REQUESTS = "requests",
  // Counts ticked answers: one volunteer can tick several.
  LEAD_FROM = "lead-from",
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
  // "2026-10", "2026-Q4" or "2026".
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
