import { exec } from "child_process";
import { promisify } from "util";
import * as assert from 'assert';

const execPromise = promisify(exec);

describe('cli', () => {

  it('find no smells for a given path', async () => {
    const { stdout } = await execPromise(`npm run cli -- fake-data/no-smells/ javascript --report=html --report-output=$(pwd)`);

    assert.equal(true, stdout.includes("Report HTML generated"));
  });
});