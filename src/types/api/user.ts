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
  firstName: string;
  fullName: string;
  avatarUrl: string;
  isoCode: string;
  timezone: string;
}
