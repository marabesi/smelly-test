import fs from 'node:fs/promises';
import * as path from 'path';

export interface Input {
  readTeamplate: () => Promise<string>;
}

export class ReadHtml implements Input {
  async readTeamplate() : Promise<string> {
    const filePath = path.resolve(__dirname, 'layout/example.html');
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    return data;
  }
}