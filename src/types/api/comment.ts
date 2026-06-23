export interface ApiCommentTaggedPerson {
  id: number;
  readAt: Date | null;
}

export interface ApiComment {
  id: number;
  content: string;
  entityId?: number;
  entityType?: string;
  authorName: string;
  timestamp: Date;
  taggedPersons: ApiCommentTaggedPerson[];
}
