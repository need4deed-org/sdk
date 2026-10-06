import { OptionTitle } from "./common";

// Generic statistics: "count X per month / quarter / year, split by Y".
// GET /statistics/:metric, coordinator/admin only.

export enum StatisticsMetric {
  NEW_VOLUNTEERS = "new-volunteers",
  REQUESTS = "requests",
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

export interface ApiStatisticsQuery {
  granularity: StatisticsGranularity;
  // ISO dates; `from` inclusive, `to` exclusive.
  from?: string;
  to?: string;
  groupBy?: StatisticsGroupBy;
}

export interface ApiStatisticsGroup {
  key: string;
  title: OptionTitle;
}

export interface ApiStatisticsPeriod {
  // "2026-10" | "2026-Q4" | "2026"
  period: string;
  // ISO date of the period's first day.
  start: string;
  // Group key -> count; a missing key means 0.
  counts: Record<string, number>;
}

export interface ApiStatisticsGet {
  metric: StatisticsMetric;
  granularity: StatisticsGranularity;
  groupBy: StatisticsGroupBy;
  allowedGroupBy: StatisticsGroupBy[];
  groups: ApiStatisticsGroup[];
  // Every period in the range, empty ones included.
  periods: ApiStatisticsPeriod[];
  // LEAD_FROM only: counts collected before per-answer tracking started.
  totalsBeforeTracking?: Record<string, number>;
}
