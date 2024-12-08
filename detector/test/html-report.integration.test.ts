import { test, describe, expect, afterEach, beforeEach } from 'vitest';
import { parse } from 'node-html-parser';
import { AggregatedData, ExportOptions } from '../src/reporters/types';
import { rmSync } from 'fs';
import { buildEmptyHtmlReportForTestSmells, buildHtmlReportForTestSmellsFor } from './html-report-builder';
import { SmellsBuilder } from '../src/smells-builder';
import { Smell, SmellsList, SupportedLanguages } from '../src/types';

describe('html report', () => {
  const exportsOptions: ExportOptions = { to: '.' };
  const filePath = `${exportsOptions.to}/smelly-report.html`;

  beforeEach(() => {
    rmSync(filePath, { force: true });
  });

  afterEach(() => {
    rmSync(filePath, { force: true });
  });

  describe('when no smells are found', () => {

    test('renders empty table when no tests are found', async () => {
      const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
      const root = parse(generatedHtml);
  
      expect(root.querySelectorAll('table tbody tr').length).toEqual(0);
    });
  
    test('renders report title', async () => {
      const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
      const root = parse(generatedHtml);
  
      expect(root.querySelector('[data-testid="report-title"]')?.textContent).toEqual('Test smells report');
    });
  
    test('renders total number of smells found', async () => {
      const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
      const root = parse(generatedHtml);
  
      expect(root.querySelector('[data-testid="total-smells-found"]')?.textContent).toEqual('0');
      expect(root.querySelector('[data-testid="title-smells-found"]')?.textContent).toEqual('Test smells');
    });
  
    test('renders the number of test files', async () => {
      const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
      const root = parse(generatedHtml);
  
      expect(root.querySelector('[data-testid="total-test-files"]')?.textContent).toEqual('0');
      expect(root.querySelector('[data-testid="title-test-files"]')?.textContent).toEqual('Test files');
    });

    test('renders the number of test cases', async () => {
      const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
      const root = parse(generatedHtml);
  
      expect(root.querySelector('[data-testid="total-test-cases"]')?.textContent).toEqual('0');
      expect(root.querySelector('[data-testid="title-test-cases"]')?.textContent).toEqual('Test cases');
    });
  });

  describe('when there are test smells', () => {
    const buildAggregatedData = (): AggregatedData => {
      const smell: Smell = SmellsBuilder.console(0, 1, 10, 20);
      const smellsFound: SmellsList[] = [
        {
          smells: [smell, smell, smell, smell],
          language: SupportedLanguages.javascript,
          fileName: 'first_test.js',
          fileContent: 'console.log("Hello world")',
        },
      ];

      return { data: smellsFound, totalSmells: 0, averageSmellsPerTestFile: 0, totalTestCases: 0 };
    };

    test('renders number of test smell for a given file', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, buildAggregatedData());
      const root = parse(generatedHtml);

      expect(root.querySelector('table tbody tr')?.textContent).toContain('4');
    });
    
    test('renders file name', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, buildAggregatedData());
      const root = parse(generatedHtml);

      expect(root.querySelector('table tbody tr')?.textContent).toContain('first_test.js');
    });

    test('renders test file code', async () => {
      const aggregatedData = buildAggregatedData();
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, aggregatedData);
      const root = parse(generatedHtml);

      expect(root.querySelector('[data-testid="0-code"]')?.textContent).toContain('console.log("Hello world")');
    });

    test('renders language', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, buildAggregatedData());
      const root = parse(generatedHtml);

      expect(root.querySelector('table tbody tr')?.textContent).toContain('javascript');
    });
  });
});

