import { SmellsList } from '../types';

export interface AgreggatorSmellls {
  build: () => Promise<void>
}

export interface AggregatedData {
  data: SmellsList[],
  totalSmells: number,
  averageSmellsPerTestFile: number,
  totalTestCases: number,
}

export interface ExportOptions {
  to: string
}

