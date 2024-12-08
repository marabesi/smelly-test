import { AggregatedData, ExportOptions, SmellsList } from '../src/reporters/types';
import { HtmlOutput } from '../src/reporters/Output';
import { readFileSync } from 'fs';

export async function buildEmptyHtmlReportForTestSmells(exportsOptions: ExportOptions, filePath: string) {
  const smellsFound: SmellsList[] = [];
  const aggregatedData: AggregatedData = {
    data: smellsFound,
    totalSmells: 0,
    averageSmellsPerTestFile: 0,
    totalTestCases: 0,
  };

  const reporter = new HtmlOutput();
  await reporter.writeTo(aggregatedData, exportsOptions);

  return readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
}

export async function buildHtmlReportForTestSmellsFor(
  exportsOptions: ExportOptions,
  filePath: string,
  aggregatedData: AggregatedData
) {
  const reporter = new HtmlOutput();
  await reporter.writeTo(aggregatedData, exportsOptions);

  return readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
}
