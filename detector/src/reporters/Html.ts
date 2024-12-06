import Handlebars from "handlebars";
import { Smell, SupportedLanguages } from "..";
import { HtmlOutput } from './Output';

export interface SmellsList {
  language: SupportedLanguages;
  fileName: string;
  smells: Smell[];
}

interface AgreggatorSmellls {
  build: () => Promise<void>
}

export interface AggregatedData {
  data: SmellsList[],
  totalSmells: number
}

export interface ExportOptions {
  to: string
}

export class SmellsAggreagtor implements AgreggatorSmellls {
  constructor(
    private smellLists: SmellsList[],
    private exportOptions: ExportOptions
  ) { }

  async build(): Promise<void> {
    try {
      const totalSmells = this.smellLists.reduce((previous, current) => previous + current.smells.length, 0);

      const output = new HtmlOutput();
      await output.writeTo({ data: this.smellLists, totalSmells}, this.exportOptions);
    } catch (err) {
      console.log(err);
    }
  }
}