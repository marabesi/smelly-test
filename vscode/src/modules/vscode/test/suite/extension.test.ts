import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';

function fileForJavascript(file: string) {
  const testFolderLocationForJavascript = '../../../../../../src/modules/vscode/dataset/javascript';
  return testFolderLocationForJavascript + '/' + file;
}

function fileFortypescript(file: string) {
  const testFolderLocationForTypescript = '../../../../../../src/modules/vscode/dataset/typescript';
  return testFolderLocationForTypescript + '/' + file;
}

suite('Smelly Extension Test Suite', () => {
  // this is a sensitive test as it relies on it being the first one to be executed
  test('find smells automatically', async () => {
    const file = fileForJavascript('real_test_with_if.test.js');
    const language = 'javascript';

    const currentFile = path.join(__dirname + file);
    const uri = vscode.Uri.file(currentFile);

    const document = await vscode.workspace.openTextDocument(uri);
    const editor = await vscode.window.showTextDocument(document);

    assert.equal(editor.document.languageId, language);

    const diagnostics = vscode.languages.getDiagnostics(uri);

    assert.deepEqual(diagnostics.length, 7);
  });

  [
    //javascript
    { language: 'javascript', file: fileForJavascript('script_with_if.test.js'), expectedTestSmell: 1 },
    { language: 'javascript', file: fileForJavascript('script_with_if.spec.js'), expectedTestSmell: 1 },
    { language: 'javascript', file: fileForJavascript('real_test_with_if.test.js'), expectedTestSmell: 7 },
    { language: 'javascript', file: fileForJavascript('script_with_for.test.js'), expectedTestSmell: 3 },
    { language: 'javascript', file: fileForJavascript('script_with_timeout.test.js'), expectedTestSmell: 1 },
    { language: 'javascript', file: fileForJavascript('script_with_console.test.js'), expectedTestSmell: 1 },
    // jsx
    { language: 'javascriptreact', file: fileForJavascript('jsx/if.test.jsx'), expectedTestSmell: 1 },
    { language: 'javascriptreact', file: fileForJavascript('jsx/for.test.jsx'), expectedTestSmell: 1 },
    { language: 'javascriptreact', file: fileForJavascript('jsx/timeout.test.jsx'), expectedTestSmell: 1 },
    // typescript
    { language: 'typescript', file: fileFortypescript('script_with_if.test.ts'), expectedTestSmell: 1 },
    { language: 'typescript', file: fileFortypescript('script_with_for.test.ts'), expectedTestSmell: 3 },
    { language: 'typescript', file: fileFortypescript('script_with_timeout.test.ts'), expectedTestSmell: 1 },
    { language: 'typescript', file: fileFortypescript('script_with_console.test.ts'), expectedTestSmell: 1 },
    // tsx
    { language: 'typescriptreact', file: fileFortypescript('tsx/enzyme.test.tsx'), expectedTestSmell: 0 },
    { language: 'typescriptreact', file: fileFortypescript('tsx/if.test.tsx'), expectedTestSmell: 1 },
    { language: 'typescriptreact', file: fileFortypescript('tsx/for.test.tsx'), expectedTestSmell: 1 },
    { language: 'typescriptreact', file: fileFortypescript('tsx/timeout.test.tsx'), expectedTestSmell: 1 },
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
    const file = fileForJavascript('script_with_if.js');
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
