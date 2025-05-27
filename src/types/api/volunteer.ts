import { OptionId } from "./common";

export interface Volunteer {
  origin_opportunity: number | undefined;
  full_name: string;
  phone: string;
  email: string;
  postal_code: number;
  good_conduct_certificate: "Yes" | "No";
  if_measles_vaccination: boolean;
  lead_from: string;
  schedule: [number, OptionId][];
  preferred_berlin_locations: OptionId[];
  activities: OptionId[];
  skills: OptionId[];
  native_languages: OptionId[];
  fluent_languages: OptionId[];
  intermediate_languages: OptionId[];
  comments: string;
}
