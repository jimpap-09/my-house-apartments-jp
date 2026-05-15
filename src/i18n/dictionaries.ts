import type { Dict } from "./el";
import { el } from "./el";
import { en } from "./en";

export type Locale = "el" | "en";
export const dictionaries = { el, en } as const;
export type Dictionary = Dict;
