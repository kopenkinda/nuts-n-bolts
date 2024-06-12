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
