import path from 'path';
import fs, { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { Smell, SmellDetector, SupportedLanguages } from 'smelly-detector';
import { SmellsAggreagtor, SmellsList } from 'smelly-detector/reports';

const args = process.argv;
const fileName = args[2];
const language = args[3] as SupportedLanguages || SupportedLanguages.javascript;
const report = args[4];
const reportOutput = args[5];

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
    const pathWithAllFilesFound = allFiles.flat(Number.POSITIVE_INFINITY);

    if (report) {
      const aggregator: SmellsList[] = [];

      for (const file of pathWithAllFilesFound) {
        const fileContents = await fs.readFile(file, { encoding: 'utf8' });
        const smellDetector = new SmellDetector(fileContents, language);
        const smells = smellDetector.findAll().smells;
        aggregator.push({ fileName: file, smells, language });
      }

      const to = path.resolve(reportOutput);
      const report = new SmellsAggreagtor(aggregator, { to });
      report.build();

      console.info('Report HTML generated');
      return;
    }

    const output: any[] = [];
    for (const file of pathWithAllFilesFound) {
      const fileContents = await fs.readFile(file, { encoding: 'utf8' });
      const smellDetector = new SmellDetector(fileContents, language);
      const result = smellDetector.findAll().smells;

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