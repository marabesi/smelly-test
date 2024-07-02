import * as vscode from 'vscode';
import TelemetryReporter from '@vscode/extension-telemetry';
import path from 'path';
import { SmellDetector } from '../smells-finder/smells-detector';
import { Smell, SupportedLanguages } from '../smells-finder/types';
import { supportedLanguages } from '../smells-finder/languages/Supported';
import { ComposedSmell, SmellyConfiguration } from './extension.types';
import { Logger } from '../trace/logger';
import { setupConfiguration } from './configuration';

let logger: Logger;
let reporter: TelemetryReporter;
let currentDecoration: vscode.TextEditorDecorationType;
let ranges: ComposedSmell[] = [];
let hovers: vscode.Disposable[] = [];
let collection: vscode.DiagnosticCollection;

function fetchConfiguration(): SmellyConfiguration {
  return vscode.workspace.getConfiguration().get('smelly') || {};
}

export function activate(context: vscode.ExtensionContext) {
  const { version, appInsightsKey } = context.extension.packageJSON;

  reporter = new TelemetryReporter(appInsightsKey);
  logger = new Logger(reporter);
  collection =  vscode.languages.createDiagnosticCollection("smelly");

  logger.info('smelly-test is now active, started process');

  vscode.window.onDidChangeActiveTextEditor(() => {
    generateHighlighting(context);
  }, null, context.subscriptions);

  vscode.workspace.onDidSaveTextDocument(() => {
    generateHighlighting(context);
  }, null, context.subscriptions);

  vscode.workspace.onDidChangeConfiguration(e => {
    currentDecoration = setupConfiguration(fetchConfiguration(), logger);
  }, null, context.subscriptions);

  const disposable = vscode.commands.registerCommand('extension.smelly-test.find-smells', () => {
    generateHighlighting(context);
  });
  context.subscriptions.push(disposable);
  context.subscriptions.push(reporter);

  // is there a way to test drive this?
  generateHighlighting(context);

  logger.info('smelly-test active process done');
  vscode.window.showInformationMessage(`Smelly version ${version} is now activated 🚀`);
}

function drawHover(context: vscode.ExtensionContext) {
  logger.debug('drawing hovers');
  ranges.forEach(({ range, smell }) => {
    const disposableHover = vscode.languages.registerHoverProvider(supportedLanguages, {
      provideHover(document, position, token) {
        const contents = new vscode.MarkdownString(smell.description);
        contents.supportHtml = true;
        contents.isTrusted = true;

        if (range.contains(position)) {
          return {
            contents: [contents],
            range
          };
        }
      }
    });

    hovers.push(disposableHover);
    context.subscriptions.push(disposableHover);
  });

  logger.debug('drawing hovers done');

  populateDiagnosticPanel();
}

function populateDiagnosticPanel() {
  const uri = vscode.window.activeTextEditor?.document.uri;

  if (uri) {
    logger.debug('populating diagnostics');
    collection.set(uri, undefined);

    const diagnosticCollection = ranges.map((smell) => {
      const diagnostic: vscode.Diagnostic = {
        severity: vscode.DiagnosticSeverity.Warning,
        range: smell.range,
        message: smell.smell.diagnostic,
        source: 'smelly-test'
      };
      return diagnostic;
    });

    collection.set(uri, diagnosticCollection);
    logger.debug('populating diagnostics done');
  }
}

function isFileNameTestFile(fileName: string) {
  const fileNameAndPath = path.basename(fileName);
  return !fileNameAndPath.includes('test') && !fileNameAndPath.includes('spec');
}

function generateHighlighting(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor ) {
    logger.debug(`editor has no active text`);
    return;
  }

  const language = editor.document.languageId as SupportedLanguages;
  if (!supportedLanguages.includes(language)) {
    logger.debug(`or language not avaialble: language ${language}`);
  }

  const fileName = editor.document.fileName;
  if (isFileNameTestFile(fileName)) {
    logger.debug(`the current file ${fileName} is not a test file, the file must have 'test' in its name`);
    clearDiagnostics();
    return;
  }

  logger.debug('Finding smells...');

  if (!editor) {
    logger.debug('editor not available');
    return;
  }

  ranges = [];

  const text = editor.document.getText();

  resetDecorations(editor);
  disposeHovers();

  logger.debug(`finding match for ${language}`);
  findMatch(text, language);
  logger.debug(`finding match for ${language} done`);

  logger.debug(`highlight selection match`);
  highlightSelections(editor);
  logger.debug(`highlight selection match done`);

  drawHover(context);
}

const findSmells = (text: string, language: string): Smell[] => {
  const detect = new SmellDetector(text, language);
  return detect.findAll();
};

export function findMatch(text: string, language: string): void {
  const types: string[] = [];
  findSmells(text, language).forEach(element => {
    const range = new vscode.Range(element.lineStart - 1, element.startAt, element.lineEnd - 1, element.endsAt);
    ranges.push({
      smell: element,
      range,
    });

    types.push(element.type);
  });
  logger.info(`found ${ranges.length} smells`, { smellsFound: types });
}

function resetAllDecorations() {
  vscode.window.visibleTextEditors.forEach(textEditor => {
    resetDecorations(textEditor);
  });
}

function resetDecorations(textEditor: vscode.TextEditor) {
  highlightSelections(textEditor);
}

function highlightSelections(editor: vscode.TextEditor) {
  editor.setDecorations(currentDecoration, ranges);
}

function disposeHovers() {
  hovers.forEach(hover => hover.dispose());
}

function clearDiagnostics() {
  const uri = vscode.window.activeTextEditor?.document.uri;

  if (uri) {
    logger.debug(`cleaning collection`);
    collection.clear();
    logger.debug(`cleaning collection done`);
  }
}

export function deactivate() {
  logger.debug(`disposing`);
  resetAllDecorations();
  disposeHovers();
  collection.dispose();
  logger.info('smelly-test is now deactivated');
}
