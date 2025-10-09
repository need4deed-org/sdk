import { Address } from "./location";

export interface ApiPersonGet {
  id: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  address: Address;
}
