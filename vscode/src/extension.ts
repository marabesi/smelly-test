import * as vscode from 'vscode';
import path from 'path';
import { SmellDetector } from './modules/smells-detector';
import { Smell } from './modules/types';

type ComposedSmell = {
  smell: Smell;
  range: vscode.Range;
};

export const warningDecorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: 'rgba(255,0,0, 0.5)',
  light: {
    borderColor: 'darkblue'
  },
  dark: {
    borderColor: 'lightblue'
  }
});

let currentDecoration = warningDecorationType;
let ranges: ComposedSmell[] = [];
let hovers: vscode.Disposable[] = [];
let collection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
  console.info('[SMELLY] smelly-test is now active!');
  collection =  vscode.languages.createDiagnosticCollection("smelly");

  vscode.window.onDidChangeActiveTextEditor(() => {
    generateHighlighting();
    drawHover(context);
  }, null, context.subscriptions);

  vscode.workspace.onDidSaveTextDocument(() => {
    generateHighlighting();
    drawHover(context);
  }, null, context.subscriptions);

  vscode.workspace.onDidChangeConfiguration(e => {
  }, null, context.subscriptions);

  const disposable = vscode.commands.registerCommand('extension.smelly-test.find-smells', () => {
    generateHighlighting();
    drawHover(context);
  });

  context.subscriptions.push(disposable);

  generateHighlighting();

  drawHover(context);
}

function drawHover(context: vscode.ExtensionContext) {
  disposeHovers();
  ranges.forEach(({ range, smell }) => {
    const disposableHover = vscode.languages.registerHoverProvider(['javascript'], {
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

function generateHighlighting() {
  const editor = vscode.window.activeTextEditor;

  const supportedLanguages = ['javascript'];
  if (!editor || !supportedLanguages.includes(editor.document.languageId)) {
    return;
  }

  const fileName = path.basename(editor.document.fileName);

  if (!fileName.includes('test')) {
    console.info(`[SMELLY] the current file ${fileName} is not a test file, the file must have 'test' in its name`);
    return;
  }

  console.log('Finding smells...');

  if (!editor) {
    return;
  }

  ranges = [];

  const text = editor.document.getText();

  resetDecorations(editor);

  findMatch(text);

  highlightSelections(editor);
}

const findSmells = (text: string): Smell[] => {
  const detect = new SmellDetector(text);
  return detect.findAll();
};

export function findMatch(text: string): void {
  findSmells(text).forEach(element => {
    const range = new vscode.Range(element.lineStart - 1, element.startAt, element.lineEnd - 1, element.endsAt);
    ranges.push({
      smell: element,
      range,
    });
  });
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

export function deactivate() {
  resetAllDecorations();
  disposeHovers();
}
