import { VoidableProps } from "../utils";
import { OptionById } from "./common";
import { TranslatedIntoType } from "./opportunity";

interface OpportunityAccompanyingDetails {
  appointmentAddress: string;
  appointmentDate: string;
  appointmentTime: string;
  refugeeNumber: string;
  refugeeName: string;
  appointmentLanguage: TranslatedIntoType;
  refugeeLanguage: OptionById[];
  appointmentPostcode: string;
  appointmentDistrict: OptionById;
}
export type ApiOpportunityAccompanyingDetails =
  VoidableProps<OpportunityAccompanyingDetails>;
