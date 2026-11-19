export interface ApiOpportunityEventSummaryGet {
  id: number;
  title: string;
  date: Date;
}

export interface ApiOpportunityEventRegistrationPost {
  opportunityId: number;
  fullName: string;
  email: string;
  phone?: string | null;
  numberOfPeople: number;
  languagePreference?: string | null;
  message?: string | null;
}

export interface ApiOpportunityEventRegistrationGet {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  numberOfPeople: number;
  languagePreference: string | null;
  message: string | null;
  createdAt: Date;
}
