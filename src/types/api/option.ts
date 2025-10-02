import { EntityTableName } from "../core"; 

export type ApiOptionLists = Partial<Record<EntityTableName, { title: string; id: number }[]>>;
