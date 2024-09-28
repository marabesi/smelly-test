import sinon from 'sinon';
import { ExportOptions, SmellsAggreagtor, SmellsList } from "../src/reporters/Html";
import { HtmlOutput } from '../src/reporters/Output';
import { ReadHtml } from '../src/reporters/Input';

describe('report html', () => {
  let input: sinon.SinonStub;
  let output: sinon.SinonMock;

  beforeEach(() => {
    input = sinon.stub(ReadHtml.prototype, 'readTeamplate');
    output = sinon.mock(HtmlOutput.prototype);
  });

  afterEach(() => {
    input.restore();
    output.restore();
  });

  it('no smells for a single file', async () => {
    const smellsFound: SmellsList[] = [];
    const exportsOptions: ExportOptions = { to: '.' };

    input.resolves('fake data');
    output.expects('writeTo').once().withArgs('fake data', exportsOptions);

    const reporter = new SmellsAggreagtor(smellsFound, exportsOptions);

    await reporter.build();

    sinon.verify();
  });
});