import { ExportOptions, SmellsAggreagtor, SmellsList } from '../src/reporters/Html';
import { HtmlOutput } from '../src/reporters/Output';
import { ReadHtml } from '../src/reporters/Input';
import { vi,test, describe, expect } from 'vitest';

vi.mock('../src/reporters/Input');
vi.mock('../src/reporters/Output');

describe('report html', () => {
  test('no smells for a single file', async () => {
    const smellsFound: SmellsList[] = [];
    const exportsOptions: ExportOptions = { to: '.' };

    ReadHtml.mockImplementation(() => {
      return {
        readTeamplate: () => Promise.resolve('fake data')
      };
    });

    HtmlOutput.prototype.writeTo = vi.fn();

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    expect(HtmlOutput.prototype.writeTo).toHaveBeenCalledWith('fake data', exportsOptions);
  });
});