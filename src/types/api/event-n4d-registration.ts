import { VolunteerType } from "./volunteer";

export interface ApiEventN4DRegistrationPost {
  eventId: number;
  fullName: string;
  email: string;
  phone?: string | null;
  numberOfPeople: number;
  languagePreference?: string | null;
  message?: string | null;
  isVolunteer?: boolean;
  volunteerTypes?: VolunteerType[];
}

export interface ApiEventN4DRegistrationGet {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  numberOfPeople: number;
  languagePreference: string | null;
  message: string | null;
  createdAt: Date;
  isVolunteer: boolean;
  volunteerTypes: VolunteerType[];
  volunteerId: number | null;
  attended: boolean;
}

export interface ApiEventN4DRegistrationListGet {
  registrations: ApiEventN4DRegistrationGet[];
  totalPeople: number;
}

export interface ApiEventN4DRegistrationPatch {
  attended: boolean;
}

export interface ApiVolunteerEventN4DGet {
  registrationId: number;
  eventId: number;
  title: string;
  date: Date;
  attended: boolean;
}
