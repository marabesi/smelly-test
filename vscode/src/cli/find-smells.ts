import fs from 'node:fs/promises';
import { SmellDetector } from '../modules/smells-detector';

const args = process.argv;
const fileName = args[2];

if (!fileName) {
  console.error('[SMELLY] please provide a test file');
  process.exit();
}

async function execute() {
  try {
    const fileContents = await fs.readFile(fileName, { encoding: 'utf8' });
    const smellDetector = new SmellDetector(fileContents);
    console.info(smellDetector.findAll());
  } catch (err) {
    console.log(`[SMELLY] error: ${err}`);
  }
}

execute();