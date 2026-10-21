export enum DocumentType {
  MEASLES_VACCINATION = "measles-vacc-cert",
  CGC = "good-conduct-cert",
  CGC_APPLICATION = "CGC-application",
  PASSPORT_ID = "passport-copy",
}

export interface ApiDocumentGet {
  id: number;
  type: DocumentType;
  originalName: string;
  url: string;
  mimeType: string;
  createdAt: Date;
}

export interface ApiVolunteerApplicationEmailPost {
  sentAt: Date;
}

export type ApplicationEmailFailureReason =
  | "attachment-unavailable"
  | "email-invalid"
  | "send-failed";

export interface ApiVolunteerApplicationEmailError {
  error: string;
  message: string;
  reason: ApplicationEmailFailureReason;
}
