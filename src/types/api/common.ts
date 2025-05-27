import { Lang } from "../core";

export type OptionTitle = Partial<{
  [key in Lang]: string;
}>;

export type OptionId = string | number;

export interface Option {
  id: OptionId;
  title: OptionTitle;
}
