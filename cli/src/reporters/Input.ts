import fs from 'node:fs/promises';

export interface Input {
  readTeamplate: () => Promise<string>;
}

export class ReadHtml implements Input {
  async readTeamplate() : Promise<string> {
    const data = await fs.readFile(`${__dirname}/layout/example.html`, { encoding: 'utf8' });
    return data;
  }

}