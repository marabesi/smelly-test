import { Smell, SupportedLanguages } from "../types";

export interface SmellsList {
  language: SupportedLanguages;
  fileName: string;
  smells: Smell[];
  fileContent: string;
}

export interface AgreggatorSmellls {
  build: () => Promise<void>
}

export interface AggregatedData {
  data: SmellsList[],
  totalSmells: number,
  averageSmellsPerTestFile: number,
}

export interface ExportOptions {
  to: string
}

