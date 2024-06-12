import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const id = () => "id" + Math.random().toString(16).slice(2);

export const extractField = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  obj: T,
  key: K
) => obj[key];

export const extractFields = <
  T extends Record<string, unknown>[],
  K extends keyof T[number]
>(
  arr: T,
  key: K
) => arr.map((obj) => extractField<T[number], K>(obj, key));

export type EmptyObject = Record<string, never>;

const costFormatter = Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2,
});

function amount(num: number, unit: string, precision = 0) {
  return {
    raw: num,
    formatted: num.toFixed(precision) + " " + unit,
  };
}

function cost(num: number) {
  return {
    raw: num,
    formatted: costFormatter.format(num),
  };
}

function percent(num: number) {
  return {
    raw: num,
    formatted: (num * 100).toFixed(2) + " %",
  };
}

export const format = {
  amount,
  cost,
  percent,
};
