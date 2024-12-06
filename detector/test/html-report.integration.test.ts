import { test, describe, expect, afterEach, beforeEach } from 'vitest';
import { exec } from "child_process";
import { promisify } from "util";
import { parse } from 'node-html-parser';
import { SmellsBuilder } from '../src/smells-builder';
import { SmellsAggreagtor } from '../src/reporters/SmellsAgreggator';
import { AggregatedData, ExportOptions, SmellsList } from '../src/reporters/types';
import { Smell, SmellType, SupportedLanguages } from '../src/types';
import { HtmlOutput } from '../src/reporters/Output';
import { readFileSync, rmSync } from 'fs';

describe('html report', () => {
  const exportsOptions: ExportOptions = { to: '.' };
  const filePath = `${exportsOptions.to}/smelly-report.html`;

  beforeEach(() => {
    rmSync(filePath, { force: true });
  });

  afterEach(() => {
    rmSync(filePath, { force: true });
  });

  test('renders empty table when no tests are found', async () => {
    const generatedHtml = await buildHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelectorAll('table tbody tr').length).toEqual(0);
  });

  test('renders report title', async () => {
    const generatedHtml = await buildHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelector('[data-testid="report-title"]')?.textContent).toEqual('Test smells report');
  });

  test('renders total number of smells found', async () => {
    const generatedHtml = await buildHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelector('[data-testid="total-smells-found"]')?.textContent).toEqual('0');
    expect(root.querySelector('[data-testid="title-smells-found"]')?.textContent).toEqual('Test smells');
  });

  test('renders the number of test files', async () => {
    const generatedHtml = await buildHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelector('[data-testid="total-test-files"]')?.textContent).toEqual('0');
    expect(root.querySelector('[data-testid="title-test-files"]')?.textContent).toEqual('Test files');
  });
});

async function buildHtmlReportForTestSmells(exportsOptions: ExportOptions, filePath: string) {
  const smellsFound: SmellsList[] = [];
  const aggregatedData: AggregatedData = { data: smellsFound, totalSmells: 0, averageSmellsPerTestFile: 0 };

  const reporter = new HtmlOutput();
  await reporter.writeTo(aggregatedData, exportsOptions);

  const generatedHtml = readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  return generatedHtml;
}
