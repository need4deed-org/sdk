import { LangProficiency, LangPurpose } from "../core";

export interface ApiLanguage {
  id: number;
  title: string;
  proficiency?: LangProficiency;
  purpose?: LangPurpose;
}

export interface ApiLanguageGet extends ApiLanguage {}
