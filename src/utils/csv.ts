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

const escapePairName = (name: string) =>
  name
    .split(CSV_ESCAPE)
    .join(CSV_ESCAPE + CSV_ESCAPE)
    .split(CSV_PAIR_SEPARATOR)
    .join(CSV_ESCAPE + CSV_PAIR_SEPARATOR);

const unescapePairName = (name: string) => {
  let result = "";
  for (let i = 0; i < name.length; i++) {
    const next = name[i + 1];
    if (
      name[i] === CSV_ESCAPE &&
      (next === CSV_ESCAPE || next === CSV_PAIR_SEPARATOR)
    ) {
      result += next;
      i++;
    } else {
      result += name[i];
    }
  }
  return result.trim();
};

const lastUnescapedPairSeparator = (item: string) => {
  for (let at = item.length - 1; at >= 0; at--) {
    if (item[at] !== CSV_PAIR_SEPARATOR) continue;
    let escapes = 0;
    while (item[at - 1 - escapes] === CSV_ESCAPE) escapes++;
    if (escapes % 2 === 0) return at;
  }
  return -1;
};

export const joinCsvPair = (name: string, value?: string): string =>
  value
    ? `${escapePairName(name)}${CSV_PAIR_SEPARATOR}${value}`
    : escapePairName(name);

export const splitCsvPair = <TValue extends string>(
  item: string,
  values: readonly TValue[],
): [string, TValue | undefined] => {
  const at = lastUnescapedPairSeparator(item);
  const wanted = item
    .slice(at + 1)
    .trim()
    .toLowerCase();
  const value = values.find((known) => known.toLowerCase() === wanted);
  if (at !== -1 && !wanted) {
    return [unescapePairName(item.slice(0, at)), undefined];
  }
  const name = unescapePairName(item.slice(0, at));
  if (at === -1 || value === undefined || !name) {
    return [unescapePairName(item), undefined];
  }
  return [name, value];
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

const FORMULA_GUARD = "'";
const GUARDED_FORMULA = /^'*[=+\-@\t\r]/;

const needsFormulaGuard = (value: string) => GUARDED_FORMULA.test(value);

export const toCsvCell = (value: string): string =>
  needsFormulaGuard(value) ? FORMULA_GUARD + value : value;

export const fromCsvCell = (cell: string): string =>
  cell.startsWith(FORMULA_GUARD) && needsFormulaGuard(cell.slice(1))
    ? cell.slice(1)
    : cell;
