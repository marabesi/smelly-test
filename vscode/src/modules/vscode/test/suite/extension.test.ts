import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';

const testFolderLocationForJavascript = '../../../../../../src/modules/vscode/dataset/javascript';
const testFolderLocationForTypescript = '../../../../../../src/modules/vscode/dataset/typescript';

suite('Smelly Extension Test Suite', () => {
  [
    { language: 'javascript', file: testFolderLocationForJavascript + '/script_with_if.test.js', expectedTestSmell: 1 },
    { language: 'javascript', file: testFolderLocationForJavascript + '/real_test_with_if.test.js', expectedTestSmell: 7 },
    { language: 'javascript', file: testFolderLocationForJavascript + '/script_with_for.test.js', expectedTestSmell: 1 },
    { language: 'typescript', file: testFolderLocationForTypescript + '/script_with_if.test.ts', expectedTestSmell: 1 },
  ].forEach(({ language, file, expectedTestSmell }) => {
    test(`Shows smelly in diagnostics panel, language: ${language}, file: ${file}, expected smells: ${expectedTestSmell}`, async () => {
      const currentFile = path.join(__dirname + file);
      const uri = vscode.Uri.file( currentFile);

      const document = await vscode.workspace.openTextDocument(uri);
      const editor = await vscode.window.showTextDocument(document);

      const result = await vscode.commands.executeCommand('extension.smelly-test.find-smells');

      assert.equal(undefined, result);
      assert.equal(editor.document.languageId, language);

      const diagnostics = vscode.languages.getDiagnostics(uri);

      assert.deepEqual(diagnostics.length, expectedTestSmell);
    });
  });

  test('ignores files that are not for test', async () => {
    const file = testFolderLocationForJavascript + '/script_with_if.js';
    const language = 'javascript';

    const currentFile = path.join(__dirname + file);
    const uri = vscode.Uri.file(currentFile);

    const document = await vscode.workspace.openTextDocument(uri);
    const editor = await vscode.window.showTextDocument(document);

    const result = await vscode.commands.executeCommand('extension.smelly-test.find-smells');

    assert.equal(undefined, result);
    assert.equal(editor.document.languageId, language);

    const diagnostics = vscode.languages.getDiagnostics(uri);

    assert.deepEqual(diagnostics.length, 0);
  });
});
