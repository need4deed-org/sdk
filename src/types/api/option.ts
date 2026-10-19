import { EntityTableName } from "../core";
import { VoidableProps } from "../utils";

export interface OptionItem {
  title: string;
  id: number;
  isoCode?: string;
}

export type ApiOptionLists = VoidableProps<
  Record<EntityTableName, OptionItem[]>
>;
