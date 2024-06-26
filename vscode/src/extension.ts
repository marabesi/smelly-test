// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Smell, SmellDetector } from './modules/smells-detector';

export const unusedNamespaceDecorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: 'rgba(255,0,0, 0.5)',
  light: {
    borderColor: 'darkblue'
  },
  dark: {
    borderColor: 'lightblue'
  }
});

let currentDecoration = unusedNamespaceDecorationType;
let ranges: vscode.Range[] = [];


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('smelly-test is now active!');

  vscode.window.onDidChangeActiveTextEditor(() => {
    generateHighlighting();
  }, null, context.subscriptions);

  vscode.workspace.onDidSaveTextDocument(() => {
    generateHighlighting();
  }, null, context.subscriptions);

  vscode.workspace.onDidChangeConfiguration(e => {
    // currentDecoration = setupConfiguration();
  }, null, context.subscriptions);

  let disposable = vscode.commands.registerCommand('extension.smelly-test.find-smells', () => {
    generateHighlighting();
  });

  context.subscriptions.push(disposable);

  // currentDecoration = setupConfiguration();
  generateHighlighting();
}


function generateHighlighting() {
  const editor = vscode.window.activeTextEditor;

  const supportedLanguages = ['javascript'];
  if (!editor || !supportedLanguages.includes(editor.document.languageId)) {
    return;
  }

  console.log('Finding smells...');

  if (!editor) {
    return;
  }

  ranges = [];

  const text = editor.document.getText();

  resetDecorations(editor);

  findMatch(editor, text);

  highlightSelections(editor);
}


const findSmells = (text: string): Smell[] => {
  const detect = new SmellDetector(text);
  return detect.findAll();
};

export function findMatch(editor: vscode.TextEditor, text: string): void {
  findSmells(text).forEach(element => {
    ranges.push(new vscode.Range(element.lineStart -1, element.startAt, element.lineEnd -1, element.endsAt));
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

// This method is called when your extension is deactivated
export function deactivate() {
  resetAllDecorations();
}
