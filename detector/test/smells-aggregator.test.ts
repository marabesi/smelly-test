import { vi,test, describe, expect } from 'vitest';
import { HtmlOutput } from '../src/reporters/Output';
import { SmellsBuilder } from '../src/smells-builder';
import { SmellsAggreagtor } from '../src/reporters/SmellsAgreggator';
import { ExportOptions, SmellsList } from '../src/reporters/types';
import { Smell, SmellType, SupportedLanguages } from '../src/types';

vi.mock('../src/reporters/Output');

describe('smells aggregator', () => {
  test('no smells for a single file', async () => {
    const smellsFound: SmellsList[] = [];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].totalSmells).toEqual(0);
    expect(write.mock.calls[0][1]).toEqual(exportsOptions);
  });

  test('match detected smells found to write in the output', async () => {
    const smell: Smell = {
      type: SmellType.consoleStatement,
      lineStart: 0,
      lineEnd: 1,
      startAt: 10,
      endsAt: 20,
      description: '',
      diagnostic: ''
    };

    const smellsFound: SmellsList[] = [
      {
        smells: [smell],
        language: SupportedLanguages.javascript,
        fileName: 'random'
      },
    ];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].data).toEqual(smellsFound);
  });

  test('compute smells for a single file', async () => {
    const smell: Smell = {
      type: SmellType.consoleStatement,
      lineStart: 0,
      lineEnd: 1,
      startAt: 10,
      endsAt: 20,
      description: '',
      diagnostic: ''
    };

    const smellsFound: SmellsList[] = [
      {
        smells: [smell],
        language: SupportedLanguages.javascript,
        fileName: 'random'
      },
    ];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].totalSmells).toEqual(1);
  });

  test('two test file with 5 smells each, should have average of 5 smells per test file', async () => {
    const smell: Smell = SmellsBuilder.console(0, 1, 10, 20);
    const smellsFound: SmellsList[] = [
      {
        smells: [smell, smell, smell, smell, smell],
        language: SupportedLanguages.javascript,
        fileName: 'first_test.js'
      },
      {
        smells: [smell, smell, smell, smell, smell],
        language: SupportedLanguages.javascript,
        fileName: 'second_test.js'
      },
    ];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].averageSmellsPerTestFile).toEqual(5);
  });
  
  test('two test file with 4 smells in one of them, should have average of 2 smells per test file', async () => {
    const smell: Smell = SmellsBuilder.console(0, 1, 10, 20);
    const smellsFound: SmellsList[] = [
      {
        smells: [smell, smell, smell, smell],
        language: SupportedLanguages.javascript,
        fileName: 'first_test.js'
      },
      {
        smells: [],
        language: SupportedLanguages.javascript,
        fileName: 'second_test.js'
      },
    ];
    const exportsOptions: ExportOptions = { to: '.' };

    const write = vi.mocked(HtmlOutput.prototype.writeTo = vi.fn());

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    expect(write.mock.calls[0][0].averageSmellsPerTestFile).toEqual(2);
  });
});