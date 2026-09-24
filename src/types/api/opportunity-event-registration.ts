export interface ApiOpportunityEventRegistrationPost {
  opportunityId: number;
  fullName: string;
  email: string;
  phone?: string | null;
  numberOfPeople: number; // default 1
  languagePreference?: string | null;
  message?: string | null; // max 500 chars
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
