import { EntityTableName } from "../core";
import { VoidableProps } from "../utils";

export interface OptionItem {
  title: string;
  id: number;
  // Only ever populated for EntityTableName.LANGUAGE items — the stable
  // ISO 639-1 code (e.g. "de", "en"), unlike `title`, which is translated
  // into whatever language the list was requested in.
  isoCode?: string;
}

export type ApiOptionLists = VoidableProps<
  Record<EntityTableName, OptionItem[]>
>;
