import { HtmlOutput } from './Output';
import { AgreggatorSmellls, ExportOptions, SmellsList } from './types';

export class SmellsAggreagtor implements AgreggatorSmellls {
  constructor(
    private totalTestFiles: SmellsList[],
    private exportOptions: ExportOptions
  ) { }

  async build(): Promise<void> {
    try {
      const totalFiles = this.totalTestFiles.length;
      const totalSmells = this.totalTestFiles.reduce((previous, current) => previous + current.smells.length, 0);

      const output = new HtmlOutput();
      await output.writeTo({
        totalSmells,
        data: this.totalTestFiles,
        averageSmellsPerTestFile: totalSmells / totalFiles,
        totalTestCases: 0,
      }, this.exportOptions);
    } catch (err) {
      console.log(err);
    }
  }
}