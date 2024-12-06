import { vi,test, describe, expect } from 'vitest';
import { HtmlOutput } from '../src/reporters/Output';
import { SmellsAggreagtor } from '../src/reporters/Html';
import { AggregatedData, ExportOptions, SmellsList } from '../src/reporters/types';

vi.mock('../src/reporters/Input');
vi.mock('../src/reporters/Output');

describe('report html', () => {
  test('no smells for a single file', async () => {
    const smellsFound: SmellsList[] = [];
    const exportsOptions: ExportOptions = { to: '.' };

    HtmlOutput.prototype.writeTo = vi.fn();

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    const aggregationResult: AggregatedData = { data: [], totalSmells: 0 };

    expect(HtmlOutput.prototype.writeTo).toHaveBeenCalledWith(aggregationResult, exportsOptions);
  });
});