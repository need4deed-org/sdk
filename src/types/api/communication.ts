export enum ContactType {
  CALL= "called",
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
}

export enum CommunicationType {
  BRIEF = "briefed",
  FIRST_INQUIRY = "first-inquiry-sent",
  OPPORTUNITY_LIST = "opportunity-list-sent",
  STATUS_UPDATE = "status-update",
  POST_FOLLOWUP = "post-match-followup",
}

export interface ApiVolunteerCommunicationPost {
  contactType: ContactType;
  contactMethod: ContactMethodType;
  communicationType: CommunicationType;
  date: Date;
}

export interface ApiCommunicationGet extends ApiVolunteerCommunicationPost {
  id: number;
  volunteerId: number;
  userId: number;
}

