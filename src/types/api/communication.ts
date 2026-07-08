export enum ContactType {
  CALL = "called",
  TRIED_CALL = "tried-to-call",
  TEXT_EMAIL = "texted-or-emailed",
  OTHER = "other",
}

export enum ContactMethodType {
  EMAIL = "email",
  PHONE = "phone-number",
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  SIGNAL = "signal",
  SMS = "sms",
  VOICENOTE = "voicenote",
  VIDEO_CALL = "video-call",
}

export enum CommunicationType {
  BRIEF = "briefed",
  FIRST_INQUIRY = "first-inquiry-sent",
  OPPORTUNITY_LIST = "opportunity-list-sent",
  STATUS_UPDATE = "status-update",
  POST_FOLLOWUP = "post-match-followup",
  ACCOMPANYING_MATCHED = "accompanying-matched",
  MATCHED = "matched",
  OPPORTUNITY_CONFIRMATION = "opportunity-confirmation",
  ACCOMPANYING_NOT_FOUND = "accompanying-not-found",
  OPPORTUNITY_UPDATED = "opportunity-updated",
}

export interface ApiCommunicationPost {
  contactType: ContactType;
  contactMethod: ContactMethodType;
  communicationType: CommunicationType;
  date: Date;
}

export type ApiCommunicationPatch = Partial<ApiCommunicationPost>;

export interface ApiCommunicationGet extends ApiCommunicationPost {
  id: number;
  volunteerId?: number;
  agentId?: number;
  opportunityId?: number;
  userId: number;
}

export interface ApiVolunteerCommunicationPost extends ApiCommunicationPost {}
export type ApiVolunteerCommunicationPatch = ApiCommunicationPatch;
