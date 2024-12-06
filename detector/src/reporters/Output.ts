import fs from 'node:fs/promises';
import { ReadHtml } from './Input';
import { AggregatedData, ExportOptions } from './types';
import Handlebars from 'handlebars';

export interface Output {
  writeTo: (content: AggregatedData, exportOptions: ExportOptions) => Promise<void>
}

export class HtmlOutput implements Output {
  async writeTo(content: AggregatedData, exportOptions: ExportOptions) {
      const read = new ReadHtml();
      const data = await read.readTeamplate();

      const template = Handlebars.compile(data);
      const html = template(content);

    await fs.writeFile(`${exportOptions.to}/smelly-report.html`, html, { encoding: "utf8" });
  }
}