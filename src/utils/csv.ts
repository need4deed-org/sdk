import {
  CSV_ESCAPE,
  CSV_LIST_SEPARATOR,
  CSV_PAIR_SEPARATOR,
  CSV_UTF8_BOM,
} from "../types/api/csv-export";
import { Lang } from "../types/core";

const escapeListItem = (item: string) =>
  item
    .split(CSV_ESCAPE)
    .join(CSV_ESCAPE + CSV_ESCAPE)
    .split(CSV_LIST_SEPARATOR)
    .join(CSV_ESCAPE + CSV_LIST_SEPARATOR);

export const joinCsvList = (items: string[]): string =>
  items.map(escapeListItem).join(CSV_LIST_SEPARATOR);

export const splitCsvList = (cell: string): string[] => {
  const items: string[] = [];
  let current = "";
  for (let i = 0; i < cell.length; i++) {
    const char = cell[i];
    const next = cell[i + 1];
    if (
      char === CSV_ESCAPE &&
      (next === CSV_ESCAPE || next === CSV_LIST_SEPARATOR)
    ) {
      current += next;
      i++;
    } else if (char === CSV_LIST_SEPARATOR) {
      items.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  items.push(current);
  return items.map((item) => item.trim()).filter(Boolean);
};

export const joinCsvPair = (name: string, value: string): string =>
  `${name}${CSV_PAIR_SEPARATOR}${value}`;

export const splitCsvPair = <TValue extends string>(
  item: string,
  values: readonly TValue[],
): [string, TValue | undefined] => {
  const at = item.lastIndexOf(CSV_PAIR_SEPARATOR);
  const value = item.slice(at + 1).trim();
  if (at === -1 || !values.includes(value as TValue)) {
    return [item.trim(), undefined];
  }
  return [item.slice(0, at).trim(), value as TValue];
};

const normalizeHeader = (header: string) =>
  header
    .replace(CSV_UTF8_BOM, "")
    .toLowerCase()
    .replace(/[\s_-]/g, "");

export const csvColumnFromHeader = <TColumn extends string>(
  header: string,
  headersByLang: Record<Lang, Record<TColumn, string>>,
  columns?: readonly TColumn[],
): TColumn | undefined => {
  const wanted = normalizeHeader(header);
  for (const headers of Object.values(headersByLang) as Record<
    TColumn,
    string
  >[]) {
    for (const [column, label] of Object.entries(headers) as [
      TColumn,
      string,
    ][]) {
      if (columns && !columns.includes(column)) continue;
      if (
        normalizeHeader(column) === wanted ||
        normalizeHeader(label) === wanted
      ) {
        return column;
      }
    }
  }
  return undefined;
};
