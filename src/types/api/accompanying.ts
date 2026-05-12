import { OptionById } from "./common";
import { TranslatedIntoType } from "./opportunity";

export interface ApiOpportunityAccompanyingDetails {
  appointmentAddress?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  refugeeNumber?: string;
  refugeeName?: string;
  appointmentLanguage?: TranslatedIntoType;
  refugeeLanguage?: OptionById[];
}
