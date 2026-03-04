import { TranslatedIntoType } from "./opportunity";

export interface ApiOpportunityAccompanyingDetails {
  appointmentAddress?: string;
  appointmentDate?: Date;
  appointmentTime?: Date;
  refugeeNumber?: string;
  refugeeName?: string;
  languageToTranslate?: TranslatedIntoType;
}
