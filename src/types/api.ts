export interface Testimonial {
  name: string;
  pic: string; // base64 encoded thumb most probably
  translated_text: string;
  activities: string[];
}

export enum EventN4DType {
  PARTY = "party",
  WORKSHOP = "workshop",
}

export interface EventN4D {
  active: boolean;
  title: string;
  subTitle?: string;
  menuTitle: string; // for the menu
  hostName?: string;
  date: Date;
  dateEnd?: Date;
  type: EventN4DType;
  pic?: string; // or standard one depending on type
  time: string;
  location: string; // address
  locationLink?: string; // to google maps
  locationComment?: string; // how to spot
  description: string;
  shortDescription: string; // for card view
  linkRSVP: string; // registration form
  followUpText?: string;
  followUpLink?: string; // the adjacent event
  additionalTitle?: string;
  additionalInfo?: string[]; // lineup, content, etc.
  outro?: string;
}
