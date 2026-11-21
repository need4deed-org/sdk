import { LangProficiency, LangPurpose } from "../core";

export interface ApiLanguage {
  id: number;
  title: string;
  proficiency?: LangProficiency;
  purpose?: LangPurpose;
}

export interface ApiLanguageGet extends ApiLanguage {}

/**
 * `filter[languageMatch]` on `GET /volunteer`: how the selected
 * `filter[language]` ids combine. Default `ANY`.
 */
export enum LanguageMatch {
  ALL = "all",
  ANY = "any",
}
