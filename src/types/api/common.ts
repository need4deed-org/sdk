import { Lang } from "../core";
import { PartialBy } from "../utils";

export type OptionTitle = Partial<{
  [key in Lang]: string;
}>;

export type OptionId = string | number;

export interface Option {
  id: OptionId;
  title: OptionTitle;
}

export type OptionById = PartialBy<Option, "title">;
