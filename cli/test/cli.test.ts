import { test, describe, expect, beforeEach, afterEach } from 'vitest';
import { exec } from "child_process";
import { promisify } from "util";
import { rmSync } from 'fs';

const execPromise = promisify(exec);

describe('cli', () => {
  
  describe('html report', () => {
    const filePath = `./smelly-report.html`;
  
    beforeEach(() => {
      rmSync(filePath, { force: true });
    });
  
    afterEach(() => {
      rmSync(filePath, { force: true });
    });

    test('find no smells for a single file', async () => {
      const { stdout } = await execPromise(`npm run cli -- fake-data/no-smells/no-smells.test.js javascript --report=html --report-output=.`);

      expect(stdout).toContain("Report HTML generated");
      expect(stdout).not.toContain("Error:");
    });

    test('find no smells for a given path', async () => {
      const { stdout } = await execPromise(`npm run cli -- fake-data/no-smells/ javascript --report=html --report-output=$(pwd)`);

      expect(stdout).toContain("Report HTML generated");
      expect(stdout).not.toContain("Error:");
    });
  });
});