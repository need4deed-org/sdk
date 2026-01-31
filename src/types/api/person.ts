import { Address } from "./location";

export enum PrefferedCommunicationType {
  CALLED = "called",
  EMAIL_SENT = "email-sent",
  BRIEFED = "briefed",
  TRIED_CALL = "tried-call",
  NOT_RESPONDING = "not-responding",
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
  preferredComm?: PrefferedCommunicationType;
}
