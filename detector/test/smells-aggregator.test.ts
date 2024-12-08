import { vi,test, describe, expect } from 'vitest';
import { HtmlOutput } from '../src/reporters/Output';
import { SmellsBuilder } from '../src/smells-builder';
import { SmellsAggreagtor } from '../src/reporters/SmellsAgreggator';
import { ExportOptions } from '../src/reporters/types';
import { Smell, SmellsList, SmellType, SupportedLanguages, TestCase } from '../src/types';

vi.mock('../src/reporters/Output');

function buildListWithSingleSmell(smells: Smell[]): SmellsList[] {
  return [
    {
      smells,
      language: SupportedLanguages.javascript,
      fileName: 'random',
      fileContent: 'console.log("Hello world")',
    },
  ];
}

function createSingleSmell(): Smell {
  return {
    type: SmellType.consoleStatement,
    lineStart: 0,
    lineEnd: 1,
    startAt: 10,
    endsAt: 20,
    description: '',
    diagnostic: ''
  };
}

describe('smells aggregator', () => {
  test('no smells for a single file', async () => {
    const smellsFound: SmellsList[] = [];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor([], smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].totalSmells).toEqual(0);
    expect(write.mock.calls[0][1]).toEqual(exportsOptions);
  });

  test('should send file contents to the output', async () => {
    const smellsFound: SmellsList[] = buildListWithSingleSmell([createSingleSmell()]);
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor([], smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].data[0].fileContent).toEqual('console.log("Hello world")');
  });

  test('should send total of test cases to the output', async () => {
    const smellsFound: SmellsList[] = buildListWithSingleSmell([createSingleSmell()]);
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor([], smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].data[0].fileContent).toEqual('console.log("Hello world")');
  });

  test('match detected smells found to write in the output', async () => {
    const smellsFound: SmellsList[] = buildListWithSingleSmell([createSingleSmell()]);
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor([], smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].data).toEqual(smellsFound);
  });

  test('compute smells for a single file', async () => {
    const smellsFound: SmellsList[] = buildListWithSingleSmell([createSingleSmell()]);
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor([], smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].totalSmells).toEqual(1);
  });

  test('compute test cases for a single file', async () => {
    const smellsFound: SmellsList[] = buildListWithSingleSmell([createSingleSmell()]);
    const testCases: TestCase[] = [
      {
        lineStart: 0,
        lineEnd: 0,
        startAt: 0,
        endsAt: 0
      }
    ];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor(testCases, smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].totalTestCases).toEqual(1);
  });

  test('two test file with 5 smells each, should have average of 5 smells per test file', async () => {
    const smell: Smell = SmellsBuilder.console(0, 1, 10, 20);
    const smellsFound: SmellsList[] = [
      {
        smells: [smell, smell, smell, smell, smell],
        language: SupportedLanguages.javascript,
        fileName: 'first_test.js',
        fileContent: 'console.log("Hello world")',
      },
      {
        smells: [smell, smell, smell, smell, smell],
        language: SupportedLanguages.javascript,
        fileName: 'second_test.js',
        fileContent: 'var content = 0',
      },
    ];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor([], smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].averageSmellsPerTestFile).toEqual(5);
  });
  
  test('two test file with 4 smells in one of them, should have average of 2 smells per test file', async () => {
    const smell: Smell = SmellsBuilder.console(0, 1, 10, 20);
    const smellsFound: SmellsList[] = [
      {
        smells: [smell, smell, smell, smell],
        language: SupportedLanguages.javascript,
        fileName: 'first_test.js',
        fileContent: 'console.log("Hello world")',
      },
      {
        smells: [],
        language: SupportedLanguages.javascript,
        fileName: 'second_test.js',
        fileContent: 'console.log("Hello world")',
      },
    ];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor([], smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].averageSmellsPerTestFile).toEqual(2);
  });
});
