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

      expect(stdout).toContain("[SMELLY] please use a regex or a file");
    });
    
    test('find no smells for a path with regex', async () => {
      const { stdout } = await execPromise(`npm run cli -- fake-data/no-smells/**/*test.js javascript --report=html --report-output=$(pwd)`);

      expect(stdout).toContain("Report HTML generated");
      expect(stdout).not.toContain("Error:");
    });

    describe('validations', () => {
      test('generate empty report if path does not exists', async () => {
        const { stdout } = await execPromise(`npm run cli -- /bla/foo/whatever/ javascript --report=html --report-output=$(pwd)`);
  
        expect(stdout).toContain("Report HTML generated");
      });

      test('requires a path to generate report', async () => {
        const { stderr } = await execPromise(`npm run cli`);
  
        expect(stderr).toContain("[SMELLY] please provide a test file or a regex to search for test files");
      });
    });
  });
});