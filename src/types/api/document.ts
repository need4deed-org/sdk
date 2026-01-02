export enum DocumentType {
  MEASLES_VACCINATION = "measles-vacc-cert",
  CGC = "good-conduct-cert",
  CGC_APPLICATION = "CGC-application",
  PASSPORT_ID = "passport-copy",
}

export interface ApiDocumentGet {
  id: number;
  type: DocumentType;
  originalName: string;
  url: string;
  mimeType: string;
}
