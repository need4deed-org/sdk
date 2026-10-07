import { OptionTitle } from "./common";

// Generic statistics: "count X per month / quarter / year, split by Y".
// GET /statistics/:metric, coordinator/admin only.
//
// Rules both sides rely on:
// - Periods are Europe/Berlin calendar periods; `from`/`to` are Berlin dates.
// - `from`/`to` are widened to whole periods, so no period is partial.
// - Without `from`/`to`: the last 12 months, 8 quarters or 5 years, up to now.
// - A `groupBy` not in the metric's `allowedGroupBy` is a 400.

export enum StatisticsMetric {
  // Volunteers by sign-up date.
  NEW_VOLUNTEERS = "new-volunteers",
  // Opportunities (requests) by creation date.
  REQUESTS = "requests",
  // Ticked "where did you hear about us" answers (one volunteer can tick
  // several), grouped by answer.
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

// The only group key when groupBy is NONE.
export const STATISTICS_TOTAL_KEY = "total";
// Records without a value for the groupBy dimension (e.g. no district).
export const STATISTICS_UNKNOWN_KEY = "unknown";

export interface ApiStatisticsQuery {
  granularity: StatisticsGranularity;
  // ISO dates (Berlin); `from` inclusive, `to` exclusive.
  from?: string;
  to?: string;
  // Defaults to NONE.
  groupBy?: StatisticsGroupBy;
}

export interface ApiStatisticsGroup {
  // An id as a string (district id, lead_from option id, ...), or one of the
  // keys above.
  key: string;
  title: OptionTitle;
}

export interface ApiStatisticsPeriod {
  // "2026-10" (month), "2026-Q4" (quarter) or "2026" (year).
  period: string;
  // First day of the period (Berlin).
  start: Date;
  // Group key -> count, for every key in `groups` (zeros included).
  counts: Record<string, number>;
  // Distinct records in the period. Can be less than the sum of `counts` when
  // one record falls into several groups (e.g. a volunteer with two districts).
  total: number;
}

export interface ApiStatisticsGet {
  metric: StatisticsMetric;
  granularity: StatisticsGranularity;
  groupBy: StatisticsGroupBy;
  allowedGroupBy: StatisticsGroupBy[];
  groups: ApiStatisticsGroup[];
  // Every period in the range, empty ones included.
  periods: ApiStatisticsPeriod[];
  // LEAD_FROM only: per-answer counts collected before per-answer tracking
  // started, keyed like `groups`.
  totalsBeforeTracking?: Record<string, number>;
}
