import { Address } from "./location";

export enum PreferredCommunicationType {
  EMAIL = "email",
  MOBILE_PHONE = "mobilePhone",
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
}

export interface ApiPersonGet {
  id: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  address: Address;
  preferredComm?: PreferredCommunicationType;
}

export type ApiPersonPatch = Partial<ApiPersonGet>;
