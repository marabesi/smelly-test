//@ts-nocheck
import fs, { readdir } from 'node:fs/promises';
import { SmellDetector, SupportedLanguages } from '../index';
import { join } from 'node:path';

const args = process.argv;
const fileName = args[2];
const language = args[3] || SupportedLanguages.javascript;

if (!fileName) {
  console.error('[SMELLY] please provide a test file');
  process.exit();
}

const walk: any = async (dirPath: string) => Promise.all(
  await readdir(dirPath, { withFileTypes: true }).then((entries: any) => entries.map((entry: any) => {
    const childPath = join(dirPath, entry.name);
    return entry.isDirectory() ? walk(childPath) : childPath;
  }))
);

async function execute() {
  try {
    const isFile = await fs.stat(fileName);
    if (isFile && isFile.isFile()) {
      const fileContents = await fs.readFile(fileName, { encoding: 'utf8' });
      const smellDetector = new SmellDetector(fileContents, language);
      console.info(`Detecting for language ${language}`);
      console.info(smellDetector.findAll());
      return;
    }
    const allFiles = await walk(fileName);
    const path = allFiles.flat(Number.POSITIVE_INFINITY);

    const output: any[] = [];
    for (const file of path) {
      const fileContents = await fs.readFile(file, { encoding: 'utf8' });
      const smellDetector = new SmellDetector(fileContents, language);
      const result = smellDetector.findAll();

      if (result.length) {
        result.forEach((e) => {
          output.push({ ...e, file });
        });
      }
    }
    console.info(output.flat(Number.POSITIVE_INFINITY));
  } catch (err) {
    console.log(`[SMELLY] error: ${err}`);
  }
}

execute();