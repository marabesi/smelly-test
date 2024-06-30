import { Smell } from "./types";

export interface SmellsFinder {
  searchSmells(): Smell[];
}