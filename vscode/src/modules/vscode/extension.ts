import * as vscode from 'vscode';
import path from 'path';
import { SmellDetector } from '../smells-finder/smells-detector';
import { Smell, SupportedLanguages } from '../smells-finder/types';
import { supportedLanguages } from '../smells-finder/languages/Supported';
import { ComposedSmell, warningDecorationType } from './extension.types';

let currentDecoration = warningDecorationType;
let ranges: ComposedSmell[] = [];
let hovers: vscode.Disposable[] = [];
let collection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
  collection =  vscode.languages.createDiagnosticCollection("smelly");
  console.info('[SMELLY] smelly-test is now active!');

  vscode.window.onDidChangeActiveTextEditor(() => {
    generateHighlighting(context);
  }, null, context.subscriptions);

  vscode.workspace.onDidSaveTextDocument(() => {
    generateHighlighting(context);
  }, null, context.subscriptions);

  vscode.workspace.onDidChangeConfiguration(e => {
  }, null, context.subscriptions);

  const disposable = vscode.commands.registerCommand('extension.smelly-test.find-smells', () => {
    generateHighlighting(context);
  });

  context.subscriptions.push(disposable);

  // clearDiagnostics();

  // generateHighlighting();

  // drawHover(context);
  console.info('[SMELLY] smelly-test active process done');
}

function drawHover(context: vscode.ExtensionContext) {
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

  populateDiagnosticPanel();
}

function populateDiagnosticPanel() {
  const uri = vscode.window.activeTextEditor?.document.uri;

  if (uri) {
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
  }
}

function generateHighlighting(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor ) {
    console.info(`[SMELLY] editor has no active text`);
    return;
  }

  const language = editor.document.languageId as SupportedLanguages;
  if (!supportedLanguages.includes(language)) {
    console.info(`[SMELLY] or language not avaialble: language ${language}`);
  }

  const fileName = path.basename(editor.document.fileName);
  if (!fileName.includes('test')) {
    console.info(`[SMELLY] the current file ${fileName} is not a test file, the file must have 'test' in its name`);
    clearDiagnostics();
    return;
  }

  console.log('[SMELLY] Finding smells...');

  if (!editor) {
    console.error('[SMELLY] editor not available');
    return;
  }

  ranges = [];

  const text = editor.document.getText();

  resetDecorations(editor);
  disposeHovers();

  console.log(`[SMELLY] finding match for ${language}`);
  findMatch(text, language);
  console.log(`[SMELLY] finding match for ${language} done`);

  console.log(`[SMELLY] highlight selection match`);
  highlightSelections(editor);
  console.log(`[SMELLY] highlight selection match done`);

  drawHover(context);
}

const findSmells = (text: string, language: string): Smell[] => {
  const detect = new SmellDetector(text, language);
  return detect.findAll();
};

export function findMatch(text: string, language: string): void {
  findSmells(text, language).forEach(element => {
    const range = new vscode.Range(element.lineStart - 1, element.startAt, element.lineEnd - 1, element.endsAt);
    ranges.push({
      smell: element,
      range,
    });
  });
  console.log(`[SMELLY] found ${ranges.length}`);
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
    console.log(`[SMELLY] cleaning collection`);
    collection.clear();
    console.log(`[SMELLY] cleaning collection done`);
  }
}

export function deactivate() {
  console.log(`[SMELLY] disposing`);
  resetAllDecorations();
  disposeHovers();
  collection.dispose();
}
