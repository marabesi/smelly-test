import { test, describe, expect, afterEach, beforeEach } from 'vitest';
import { parse } from 'node-html-parser';
import { ExportOptions } from '../src/reporters/types';
import { rmSync } from 'fs';
import { buildEmptyHtmlReportForTestSmells } from './html-report-builder';

describe('html report', () => {
  const exportsOptions: ExportOptions = { to: '.' };
  const filePath = `${exportsOptions.to}/smelly-report.html`;

  beforeEach(() => {
    rmSync(filePath, { force: true });
  });

  afterEach(() => {
    rmSync(filePath, { force: true });
  });

  test('renders empty table when no tests are found', async () => {
    const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelectorAll('table tbody tr').length).toEqual(0);
  });

  test('renders report title', async () => {
    const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelector('[data-testid="report-title"]')?.textContent).toEqual('Test smells report');
  });

  test('renders total number of smells found', async () => {
    const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelector('[data-testid="total-smells-found"]')?.textContent).toEqual('0');
    expect(root.querySelector('[data-testid="title-smells-found"]')?.textContent).toEqual('Test smells');
  });

  test('renders the number of test files', async () => {
    const generatedHtml = await buildEmptyHtmlReportForTestSmells(exportsOptions, filePath);
    const root = parse(generatedHtml);

    expect(root.querySelector('[data-testid="total-test-files"]')?.textContent).toEqual('0');
    expect(root.querySelector('[data-testid="title-test-files"]')?.textContent).toEqual('Test files');
  });
});

