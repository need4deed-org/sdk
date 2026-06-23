export interface ApiActivityLogEntry {
  id: number;
  date: Date;
  hours: number;
}

export interface ApiActivityLogGet {
  data: ApiActivityLogEntry[];
  totalHours: number;
  count: number;
}

export interface ApiActivityLogPost {
  date: Date;
  hours: number;
}

export type ApiActivityLogPatch = Partial<ApiActivityLogPost>;
