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
}

export type Id = string | number;

export type SomeType = "some" | "type";
