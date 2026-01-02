export enum DocumentType {
  CGC = "CGC",
  CGC_APPLICATION = "CGC_APPLICATION",
  PASSPORT_ID = "PASSPORT_ID",
}

export interface ApiDocumentGet {
  id: number;
  type: DocumentType;
  title: string;
  url: string;
}
