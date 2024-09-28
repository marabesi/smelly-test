// @ts-ignore
import fs from 'node:fs/promises';
import { ExportOptions } from "./Html";

export interface Output {
  writeTo: (content: string, exportOptions: ExportOptions) => Promise<void>
}

export class HtmlOutput implements Output {
  async writeTo(content: string, exportOptions: ExportOptions) {
    await fs.writeFile(`${exportOptions.to}/smelly-report.html`, content, { encoding: "utf8" });
  }
}