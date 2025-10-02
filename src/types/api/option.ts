import { EntityTableName } from "../core"; 

export interface OptionItem { title: string; id: number };

export type ApiOptionLists = Partial<Record<EntityTableName, OptionItem[]>>;
