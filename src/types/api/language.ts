import { LangProficiency, LangPurpose } from "../core";

export interface ApiLanguage {
  languageId: number;
  title: string;
  proficiency?: LangProficiency;
  purpose?: LangPurpose;
}
