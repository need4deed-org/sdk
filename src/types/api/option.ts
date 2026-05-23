import { EntityTableName } from "../core";
import { VoidableProps } from "../utils";

export interface OptionItem {
  title: string;
  id: number;
}

export type ApiOptionLists = VoidableProps<
  Record<EntityTableName, OptionItem[]>
>;
