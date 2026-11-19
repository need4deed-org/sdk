export enum SearchScope {
  VOLUNTEER = "volunteer",
  OPPORTUNITY = "opportunity",
  AGENT = "agent",
}

export enum SearchSuggestionCategory {
  NAME = "name",
  CONTACT = "contact",
  DISTRICT = "district",
  LANGUAGE = "language",
  SKILL = "skill",
  ACTIVITY = "activity",
  TYPE = "type",
  STATUS = "status",
  NGO = "ngo",
  TEXT = "text",
}

export interface ApiSearchSuggestQuery {
  scope: SearchScope;
  q: string;
  limit?: number;
}

export interface ApiSearchSuggestion {
  category: SearchSuggestionCategory;
  label: string;
  id?: number;
  filterKey?: string;
  filterValue?: string;
}
