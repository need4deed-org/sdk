export interface ApiComment {
  id: number;
  content: string;
  entityId: number;
  entityType: string;
  authorName: string;
  timestamp: Date;
}
