import { UserRole } from "../core";

export interface ApiUserGet {
  id: number;
  email: string;
  isActive: boolean;
  role: UserRole;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}
