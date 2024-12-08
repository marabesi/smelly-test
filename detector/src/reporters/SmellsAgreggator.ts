import { SmellsList, TestCase } from '../types';
import { HtmlOutput } from './Output';
import { AgreggatorSmellls, ExportOptions } from './types';

export class SmellsAggreagtor implements AgreggatorSmellls {
  constructor(
    private readonly result: TestCase[],
    private readonly totalTestFiles: SmellsList[],
    private readonly exportOptions: ExportOptions
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
        totalTestCases: this.result.length,
      }, this.exportOptions);
    } catch (err) {
      console.log(err);
    }
  }
}