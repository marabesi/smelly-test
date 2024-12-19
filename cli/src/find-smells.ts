import path from 'path';
import fs from 'node:fs/promises';
import { glob } from 'glob';
import { Smell, SmellDetector, TestCase } from 'smelly-detector';
import { SmellsAggreagtor, SmellsList } from 'smelly-detector/reports';
import { statSync } from 'fs';

const args = process.argv;
const fileName = args[2];
const report = args[3];
const reportOutput = args[4];

if (!fileName) {
  console.error('[SMELLY] please provide a test file or a regex to search for test files');
  process.exit();
}

function isDirectorySync(path: string): boolean {
  try {
    const stats = statSync(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

async function execute() {
  try {
    if (isDirectorySync(fileName)) {
      console.info('[SMELLY] please use a regex or a file');
      return;
    }

    const allFiles = await glob(fileName);
    const pathWithAllFilesFound = allFiles.flat(Number.POSITIVE_INFINITY);

    if (report) {
      const aggregator: SmellsList[] = [];
      const testCases: TestCase[] = [];

      for (const file of pathWithAllFilesFound) {
        const fileContent = await fs.readFile(file, { encoding: 'utf8' });
        const smellDetector = new SmellDetector(file, fileContent);
        const smells = smellDetector.findAll();
        aggregator.push(smells.smellsList);
        testCases.push(...smells.testCases);
      }

      const to = path.resolve(reportOutput.replace('--report-output=', ''));
      const report = new SmellsAggreagtor(testCases, aggregator, { to });
      await report.build();

      console.info('Report HTML generated');
      return;
    }

    const output: any[] = [];
    for (const file of pathWithAllFilesFound) {
      const fileContents = await fs.readFile(file, { encoding: 'utf8' });
      const smellDetector = new SmellDetector(file, fileContents);
      const result = smellDetector.findAll().smellsList.smells;

      if (result.length) {
        result.forEach((e: Smell) => {
          output.push({ ...e, file });
        });
      }
    }

    console.info(output.flat(Number.POSITIVE_INFINITY));
  } catch (err) {
    console.log(`[SMELLY] error: ${err}`);
    console.log(err);
  }
}

execute();