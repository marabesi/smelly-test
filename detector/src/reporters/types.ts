import { Smell, SupportedLanguages } from "../types";

export interface SmellsList {
  language: SupportedLanguages;
  fileName: string;
  smells: Smell[];
}

export interface AgreggatorSmellls {
  build: () => Promise<void>
}

export interface AggregatedData {
  data: SmellsList[],
  totalSmells: number
}

export interface ExportOptions {
  to: string
}

