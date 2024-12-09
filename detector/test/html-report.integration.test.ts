import { test, describe, expect, afterEach, beforeEach } from 'vitest';
import { parse } from 'node-html-parser';
import { AggregatedData, ExportOptions } from '../src/reporters/types';
import { rmSync } from 'fs';
import { buildEmptyHtmlReportForTestSmells, buildHtmlReportForTestSmellsFor } from './html-report-builder';
import { SmellsBuilder } from '../src/smells-builder';
import { Smell, SmellsList, SupportedLanguages } from '../src/types';

const oneFileWithFourConsoleSmells = (): AggregatedData => {
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

const oneFileWithOneConsoleSmells = (): AggregatedData => {
  const smellsFound: SmellsList[] = [
    {
      smells: [
        SmellsBuilder.console(0, 1, 10, 20),
        SmellsBuilder.forOfStatement(0, 2, 11, 22),
      ],
      language: SupportedLanguages.javascript,
      fileName: 'first_test.js',
      fileContent: 'console.log("Hello world")',
    },
  ];

  return { data: smellsFound, totalSmells: 0, averageSmellsPerTestFile: 0, totalTestCases: 0 };
};

const emptySmellsListForSingleFile = (): AggregatedData => {
  const smellsFound: SmellsList[] = [
    {
      smells: [],
      language: SupportedLanguages.javascript,
      fileName: 'first_test.js',
      fileContent: 'console.log("Hello world")',
    },
  ];

  return { data: smellsFound, totalSmells: 0, averageSmellsPerTestFile: 0, totalTestCases: 0 };
};

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
    test('renders number of test smell for a given file', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, oneFileWithFourConsoleSmells());
      const root = parse(generatedHtml);

      expect(root.querySelector('[data-testid="file-list"] tbody tr')?.textContent).toContain('4');
    });
    
    test('renders file name', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, oneFileWithFourConsoleSmells());
      const root = parse(generatedHtml);

      expect(root.querySelector('[data-testid="file-list"] tbody tr')?.textContent).toContain('first_test.js');
    });

    test('renders language', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, oneFileWithFourConsoleSmells());
      const root = parse(generatedHtml);

      expect(root.querySelector('[data-testid="file-list"] tbody tr')?.textContent).toContain('javascript');
    });

    test('renders yellow line when smells exists', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, oneFileWithOneConsoleSmells());
      const root = parse(generatedHtml);

      expect(root.querySelector('[data-testid="file-list"] tbody tr')?.classList.value).toContain('odd:bg-yellow-400');
      expect(root.querySelector('[data-testid="file-list"] tbody tr')?.classList.value).toContain('even:bg-yellow-400');
    });

    test('should not render yellow for file without smells', async () => {
      const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, emptySmellsListForSingleFile());
      const root = parse(generatedHtml);

      expect(root.querySelector('[data-testid="file-list"] tbody tr')?.classList.value).not.toContain('odd:bg-yellow-400');
      expect(root.querySelector('[data-testid="file-list"] tbody tr')?.classList.value).not.toContain('even:bg-yellow-400');
    });

    describe('smells table with smells', () => {
      test('renders info about no smells', async () => {
        const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, emptySmellsListForSingleFile());
        const root = parse(generatedHtml);

        expect(root.querySelectorAll('[data-testid="smells-table-type"]')).toHaveLength(0);
      });
    });

    describe('smells table with smells', () => {
      test('renders smells type', async () => {
        const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, oneFileWithFourConsoleSmells());
        const root = parse(generatedHtml);

        expect(root.querySelector('[data-testid="smells-table-type"]')?.textContent).toContain('Smell type');
      });

      test('renders smells description', async () => {
        const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, oneFileWithFourConsoleSmells());
        const root = parse(generatedHtml);

        expect(root.querySelector('[data-testid="smells-table-description"]')?.textContent).toContain('Smell description');
      });

      test('renders smells start line', async () => {
        const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, oneFileWithFourConsoleSmells());
        const root = parse(generatedHtml);

        expect(root.querySelector('[data-testid="smells-table-start-line"]')?.textContent).toContain('Smell line');
      });

      describe('smells detail', () => {
        test('renders smell for file for one smell', async () => {
          const aggregatedData = oneFileWithOneConsoleSmells();
          const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, aggregatedData);
          const root = parse(generatedHtml);

          expect(root.querySelector('[data-testid="0-smell-name-0"]')?.textContent).toContain('console-statement');
        });

        test('renders smell description', async () => {
          const aggregatedData = oneFileWithOneConsoleSmells();
          const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, aggregatedData);
          const root = parse(generatedHtml);

          expect(root.querySelector('[data-testid="0-smell-description-0"]')?.textContent).toContain('Smelly: Avoid poluting the test output. It is known as the loudmouth');
        });

        test('renders smell start line', async () => {
          const aggregatedData = oneFileWithOneConsoleSmells();
          const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, aggregatedData);
          const root = parse(generatedHtml);

          expect(root.querySelector('[data-testid="0-smell-start-line-0"]')?.textContent).toContain('0');
        });

        test('renders smell for file with two smells', async () => {
          const aggregatedData = oneFileWithOneConsoleSmells();
          const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, aggregatedData);
          const root = parse(generatedHtml);

          expect(root.querySelector('[data-testid="0-smell-name-1"]')?.textContent).toContain('for-of-statement');
        });

        test('renders test file code', async () => {
          const aggregatedData = oneFileWithFourConsoleSmells();
          const generatedHtml = await buildHtmlReportForTestSmellsFor(exportsOptions, filePath, aggregatedData);
          const root = parse(generatedHtml);

          expect(root.querySelector('[data-testid="0-code"]')?.textContent).toContain('console.log("Hello world")');
        });
      });
    });
  });
});

