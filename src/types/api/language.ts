import { LangProficiency, LangPurpose } from "../core";

export interface ApiLanguage {
  title: string;
  proficiency?: LangProficiency;
  purpose?: LangPurpose;
}
