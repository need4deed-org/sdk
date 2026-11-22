import { VoidableProps } from "../utils";
import { Address } from "./location";

export enum PreferredCommunicationType {
  EMAIL = "email",
  MOBILE_PHONE = "mobilePhone",
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
  SMS = "sms",
}

interface PersonFields {
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

type NullablePersonColumn =
  | "avatarUrl"
  | "lastName"
  | "middleName"
  | "phone"
  | "landline"
  | "email";

export type ApiPersonGet = Omit<PersonFields, NullablePersonColumn> & {
  [K in NullablePersonColumn]: PersonFields[K] | null;
} & { id: number };

export type ApiPersonPatch = Partial<
  VoidableProps<
    Omit<PersonFields, "address">,
    "avatarUrl" | "middleName" | "phone" | "landline" | "email"
  > & { address: Partial<VoidableProps<Address, "street" | "city">> }
>;
