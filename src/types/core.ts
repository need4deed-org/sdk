export enum Lang {
  EN = "en",
  DE = "de",
}

export enum LangProficiency {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  FLUENT = "fluent",
  NATIVE = "native",
}

export enum LangPurpose {
  GENERAL = "general",
  TRANSLATION = "translation",
  RECIPIENT = "recipient",
}

export enum HttpMethod {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  TRACE = "TRACE",
  OPTIONS = "OPTIONS",
  CONNECT = "CONNECT",
  PATCH = "PATCH",
}

export enum DocumentStatusType {
  UNDEFINED = "undefined",
  YES = "yes",
  NO = "no",
  ASKED_TO_APPLY = "asked_to_apply",
  APPLIED_SELF = "applied_self",
  APPLIED_N4D = "applied_n4d",
}

export enum TimedTextType {
  CREATE = "create",
  UPDATE = "update",
  REMOVE = "remove",
  COMMENT = "comment",
  STATUS = "status",
  MATCHING = "matching",
}

export type Id = string | number;

export enum VolunteerStateType {
  NEW = "New",
  OPPORTUNITY_SENT = "Opportunity sent",
  MATCHED = "Matched",
  ACTIVE_REGULAR = "Active regular",
  ACTIVE_ACCOMPANY = "Active accompany",
  ACTIVE_FEST = "Active fest",
  TO_REMATCH = "To rematch",
  TEMP_INACTIVE = "Temp inactive",
  INACTIVE = "Inactive",
}

export enum VolunteerStateEngagementType {
  NEW = "new",
  ACTIVE = "active",
  AVAILABLE = "available",
  TEMP_UNAVAILABLE = "temp-unavailable",
  INACTIVE = "inactive",
  UNRESPONSIVE = "unresponsive",
}

export enum VolunteerStateCommunicationType {
  CALLED = "called",
  EMAIL_SENT = "email-sent",
  BRIEFED = "briefed",
  TRIED_CALL = "tried-call",
  NOT_RESPONDING = "not-responding",
}

export enum VolunteerStateAppreciationType {
  T_SHIRT = "t-shirt",
  BENEFIT_CARD = "benefit-card",
  TOTE_BAG = "tote-bag",
}

export enum VolunteerStateTypeType {
  ACCOMPANYING = "accompanying",
  GENERAL = "general",
  EVENT = "event",
  FESTIVAL = "festival",
  WEEKEND_ONLY = "weekend-only",
}

export enum VolunteerStateMatchType {
  MATCHED = "matched",
  NEEDS_REMATCHING = "needs-rematching",
}

export enum VolunteerStateCGCType {
  UPLOADED = "uploaded",
  MISSING = "missing",
}

export enum SortOrder {
  NewToOld = "new-old",
  OldToNew = "old-new",
}

export type SomeType = "some" | "type";

export enum QueryParams {
  Language = "language",
  Search = "search",
}

export enum EntityTableName {
  NONE = "none",
  ACTIVITY = "activity",
  SKILL = "skill",
  CATEGORY = "category",
  LANGUAGE = "language",
  LEAD = "lead_from",
  DISTRICT = "district",
  VOLUNTEER = "volunteer",
}

