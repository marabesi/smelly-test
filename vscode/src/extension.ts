import 'dotenv/config';
import * as vscode from 'vscode';
import TelemetryReporter from '@vscode/extension-telemetry';
import path from 'path';
import { SmellDetector, Smell, SupportedLanguages, supportedLanguages } from 'smelly-detector';
import { ComposedSmell, EXTENSION_IDENTIFIER, SmellyConfiguration, warningDecorationType } from './extension.types';
import { Logger } from './trace/logger';
import { setupConfiguration } from './configuration';

let logger: Logger;
let reporter: TelemetryReporter;
let currentDecoration: vscode.TextEditorDecorationType = warningDecorationType;
let ranges: ComposedSmell[] = [];
let hovers: vscode.Disposable[] = [];
let collection: vscode.DiagnosticCollection;
export let smellyStatusBar: vscode.StatusBarItem;

function fetchConfiguration(): SmellyConfiguration {
  return vscode.workspace.getConfiguration().get<SmellyConfiguration>(EXTENSION_IDENTIFIER) || {};
}

export function activate(context: vscode.ExtensionContext) {
  logger = new Logger(fetchConfiguration());

  collection = vscode.languages.createDiagnosticCollection(EXTENSION_IDENTIFIER);

  logger.info('smelly-test is now active, started process');

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => {
      generateHighlighting(context);
    }, null, context.subscriptions)
  );

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(() => {
      generateHighlighting(context);
    }, null, context.subscriptions)
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      logger = new Logger(fetchConfiguration());
      currentDecoration = setupConfiguration(fetchConfiguration(), logger);
    }, null, context.subscriptions)
  );

  const smellyCommandSignature = 'extension.smelly-test.find-smells';
  context.subscriptions.push(
    vscode.commands.registerCommand(smellyCommandSignature, () => {
      generateHighlighting(context);
    }));
  context.subscriptions.push(reporter);

  smellyStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  smellyStatusBar.command = smellyCommandSignature;
  context.subscriptions.push(smellyStatusBar);

  // is there a way to test drive this?
  generateHighlighting(context);

  logger.info('smelly-test active process done');
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

function populateStatusBar() {
  if (ranges.length === 0) {
    smellyStatusBar.text = "Your test is awesome 🚀";
    smellyStatusBar.show();
  } else {
    smellyStatusBar.hide();
  }
}

function isFileNameTestFile(fileName: string): boolean {
  const fileNameOnly = path.basename(fileName);
  const fileTestIdentifier = fetchConfiguration().fileTestIdentifier;

  if (!fileTestIdentifier) {
    return fileNameOnly.includes('test') || fileNameOnly.includes('spec');
  }

  const regex = new RegExp(fileTestIdentifier);
  const match = regex.exec(fileNameOnly);

  if (!match) {
    return false;
  }

  return match.length > 0;
}

function generateHighlighting(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    logger.debug(`editor has no active text`);
    return;
  }

  const language = editor.document.languageId as SupportedLanguages;

  const matches = supportedLanguages.filter((item: SupportedLanguages) => language.includes(item));

  if (matches.length === 0) {
    logger.debug(`language not supported: ${language}`);
    return;
  }

  const fileName = editor.document.fileName;

  if (!isFileNameTestFile(fileName)) {
    logger.debug(`the current file ${fileName} is not a test file, the file must have 'test' in its name or needs to match the file identifier in the vscode configuration`);
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
  findMatch(fileName, text);
  logger.debug(`finding match for ${language} done`);

  logger.debug(`highlight selection match`);
  highlightSelections(editor);
  logger.debug(`highlight selection match done`);

  drawHover(context);
  populateDiagnosticPanel();
  populateStatusBar();
}

const findSmells = (fileName: string, text: string): Smell[] => {
  const detect = new SmellDetector(fileName, text);
  return detect.findAll().smellsList.smells;
};

export function findMatch(fileName: string, text: string): void {
  const types: string[] = [];
  findSmells(fileName, text).forEach(element => {
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
  collection = vscode.languages.createDiagnosticCollection(EXTENSION_IDENTIFIER);
  smellyStatusBar.dispose();

  logger.info('smelly-test is now deactivated');
}
