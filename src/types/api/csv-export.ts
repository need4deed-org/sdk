import { Lang, QueryParamsKeys, SortOrder } from "../core";
import {
  ApiOpportunityGet,
  OpportunitySortField,
  OpportunityStatusType,
  OpportunityType,
} from "./opportunity";
import { ApiVolunteerImportRow } from "./volunteer";

export const CSV_EXPORT_CONTENT_TYPE = "text/csv; charset=utf-8";
export const CSV_UTF8_BOM = "\uFEFF";
export const CSV_LIST_SEPARATOR = "|";
export const CSV_PAIR_SEPARATOR = ":";
export const CSV_ESCAPE = "\\";

export const VOLUNTEER_CSV_COLUMNS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "postcode",
  "languages",
  "activities",
  "skills",
  "districts",
  "availability",
  "statusTypes",
  "statusEngagement",
  "goodConductCertificate",
  "measlesVaccination",
  "infoAbout",
  "infoExperience",
  "opportunities",
] as const satisfies readonly (keyof ApiVolunteerImportRow)[];

export type VolunteerCsvColumn = (typeof VOLUNTEER_CSV_COLUMNS)[number];

export const VOLUNTEER_EXPORT_CSV_COLUMNS = [
  ...VOLUNTEER_CSV_COLUMNS,
  "totalHours",
  "appreciations",
] as const;

export type VolunteerExportCsvColumn =
  (typeof VOLUNTEER_EXPORT_CSV_COLUMNS)[number];

export const OPPORTUNITY_EXPORT_CSV_COLUMNS = [
  "title",
  "agentTitle",
  "category",
  "volunteerType",
  "statusOpportunity",
  "statusMatch",
  "availability",
  "appointmentDate",
  "appointmentTime",
  "address",
  "postcode",
  "district",
  "languages",
  "activities",
  "skills",
  "description",
  "numberOfVolunteers",
  "volunteerNames",
  "matchedVolunteerCount",
  "createdAt",
] as const satisfies readonly (
  keyof ApiOpportunityGet | "matchedVolunteerCount"
)[];

export type OpportunityExportCsvColumn =
  (typeof OPPORTUNITY_EXPORT_CSV_COLUMNS)[number];

export const VOLUNTEER_EXPORT_CSV_HEADERS: Record<
  Lang,
  Record<VolunteerExportCsvColumn, string>
> = {
  [Lang.EN]: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    postcode: "Postcode",
    languages: "Languages",
    activities: "Activities",
    skills: "Skills",
    districts: "Districts",
    availability: "Availability",
    statusTypes: "Volunteering type",
    statusEngagement: "Engagement status",
    goodConductCertificate: "Certificate of good conduct",
    measlesVaccination: "Measles vaccination",
    infoAbout: "About",
    infoExperience: "Experience",
    opportunities: "Opportunities",
    totalHours: "Total hours",
    appreciations: "Appreciations",
  },
  [Lang.DE]: {
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon",
    postcode: "PLZ",
    languages: "Sprachen",
    activities: "Tätigkeiten",
    skills: "Fähigkeiten",
    districts: "Bezirke",
    availability: "Verfügbarkeit",
    statusTypes: "Art des Engagements",
    statusEngagement: "Engagement-Status",
    goodConductCertificate: "Führungszeugnis",
    measlesVaccination: "Masernimpfung",
    infoAbout: "Über mich",
    infoExperience: "Erfahrung",
    opportunities: "Einsätze",
    totalHours: "Stunden gesamt",
    appreciations: "Anerkennungen",
  },
};

export const OPPORTUNITY_EXPORT_CSV_HEADERS: Record<
  Lang,
  Record<OpportunityExportCsvColumn, string>
> = {
  [Lang.EN]: {
    title: "Title",
    agentTitle: "Project",
    category: "Category",
    volunteerType: "Volunteering type",
    statusOpportunity: "Status",
    statusMatch: "Match status",
    availability: "Schedule",
    appointmentDate: "Appointment date",
    appointmentTime: "Appointment time",
    address: "Address",
    postcode: "Postcode",
    district: "District",
    languages: "Languages",
    activities: "Activities",
    skills: "Skills",
    description: "Description",
    numberOfVolunteers: "Volunteers needed",
    volunteerNames: "Matched volunteers",
    matchedVolunteerCount: "Matched volunteers count",
    createdAt: "Created at",
  },
  [Lang.DE]: {
    title: "Titel",
    agentTitle: "Projekt",
    category: "Kategorie",
    volunteerType: "Art des Engagements",
    statusOpportunity: "Status",
    statusMatch: "Vermittlungsstatus",
    availability: "Zeiten",
    appointmentDate: "Termin Datum",
    appointmentTime: "Termin Uhrzeit",
    address: "Adresse",
    postcode: "PLZ",
    district: "Bezirk",
    languages: "Sprachen",
    activities: "Tätigkeiten",
    skills: "Fähigkeiten",
    description: "Beschreibung",
    numberOfVolunteers: "Benötigte Freiwillige",
    volunteerNames: "Vermittelte Freiwillige",
    matchedVolunteerCount: "Anzahl vermittelte Freiwillige",
    createdAt: "Erstellt am",
  },
};

type FilterValue = string | string[];

type OwnerAgentFilter = "none" | `${number}`;

export interface ApiVolunteerListFilter {
  type?: FilterValue;
  search?: string;
  language?: FilterValue;
  activity?: FilterValue;
  skill?: FilterValue;
  availability?: FilterValue;
  district?: FilterValue;
  [QueryParamsKeys.OWNER_AGENT]?: OwnerAgentFilter | OwnerAgentFilter[];
  engagement?: FilterValue;
  match?: FilterValue;
  [QueryParamsKeys.COMMUTE_OPPORTUNITY_ID]?: number;
  [QueryParamsKeys.MAX_COMMUTE_MINUTES]?: number;
}

export interface ApiOpportunityListFilter {
  search?: string;
  activity?: FilterValue;
  skill?: FilterValue;
  language?: string[];
  district?: string[];
  availability?: FilterValue;
  type?: OpportunityType[];
  agentId?: number | number[];
  status?: OpportunityStatusType[];
  match?: FilterValue;
  [QueryParamsKeys.COMMUTE_VOLUNTEER_ID]?: number;
  [QueryParamsKeys.MAX_COMMUTE_MINUTES]?: number;
}

export interface ApiAgentVolunteerExportQuery {
  language?: Lang;
  sortOrder?: SortOrder;
  filter?: ApiVolunteerListFilter;
}

export interface ApiAgentOpportunityExportQuery {
  language?: Lang;
  sortOrder?: SortOrder;
  sortBy?: OpportunitySortField;
  appointmentDateFrom?: string;
  appointmentDateTo?: string;
  hasAppointmentDate?: boolean;
  excludeAccompanying?: boolean;
  filter?: ApiOpportunityListFilter;
}
