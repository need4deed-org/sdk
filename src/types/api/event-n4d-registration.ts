import { VolunteerType } from "./volunteer";

export const EVENT_SIGN_UP_QUESTION_MAX_LENGTH = 200;
export const EVENT_SIGN_UP_ANSWER_MAX_LENGTH = 500;

export interface ApiEventN4DRegistrationPost {
  eventId: number;
  fullName: string;
  email: string;
  numberOfPeople: number;
  signUpAnswer?: string | null;
  message?: string | null;
  isVolunteer?: boolean;
  volunteerTypes?: VolunteerType[];
}

export interface ApiEventN4DRegistrationGet {
  id: number;
  fullName: string;
  email: string;
  numberOfPeople: number;
  signUpAnswer: string | null;
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
