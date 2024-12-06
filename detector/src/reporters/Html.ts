import { HtmlOutput } from './Output';
import { AgreggatorSmellls, ExportOptions, SmellsList } from "./types";

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