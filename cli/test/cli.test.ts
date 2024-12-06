import { test, describe, expect } from 'vitest';
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

describe('cli', () => {

  test('find no smells for a given path', async () => {
    const { stdout } = await execPromise(`npm run cli -- fake-data/no-smells/ javascript --report=html --report-output=$(pwd)`);

    expect(stdout).toContain("Report HTML generated");
  });
});