export enum UserRole {
  USER = "user",
  COORDINATOR = "coordinator",
  AGENT = "agent",
  VOLUNTEER = "volunteer",
  ADMIN = "admin",
}

export interface ApiUserGet {
  id: number;
  email: string;
  isActive: boolean;
  role: UserRole;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}
