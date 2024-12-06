import { AggregatedData, ExportOptions, SmellsList } from '../src/reporters/types';
import { HtmlOutput } from '../src/reporters/Output';
import { readFileSync } from 'fs';

export async function buildEmptyHtmlReportForTestSmells(exportsOptions: ExportOptions, filePath: string) {
  const smellsFound: SmellsList[] = [];
  const aggregatedData: AggregatedData = { data: smellsFound, totalSmells: 0, averageSmellsPerTestFile: 0 };

  const reporter = new HtmlOutput();
  await reporter.writeTo(aggregatedData, exportsOptions);

  const generatedHtml = readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  return generatedHtml;
}
