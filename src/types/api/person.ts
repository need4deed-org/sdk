import { VoidableProps } from "../utils";
import { Address } from "./location";

export enum PreferredCommunicationType {
  EMAIL = "email",
  MOBILE_PHONE = "mobilePhone",
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
  SMS = "sms",
}

export interface ApiPersonGet {
  id: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  landline: string;
  email: string;
  address: Address;
  preferredComm?: PreferredCommunicationType[];
}

// Nullable columns may be cleared with `null`; names may only be changed.
// `id` is the route param, never part of the body.
export type ApiPersonPatch = Partial<
  VoidableProps<
    Omit<ApiPersonGet, "id">,
    "avatarUrl" | "middleName" | "phone" | "landline" | "email"
  >
>;
