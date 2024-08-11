import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { fileFromFilesPattern } from '.';
import { EXTENSION_IDENTIFIER } from '../../extension.types';

suite('Smelly Extension Configuration Test Suite', () => {

  test('configure smelly to use a path for finding smells', async () => {
    const file = fileFromFilesPattern('random_suffix.my.js');
    const language = 'javascript';

    const currentFile = path.join(__dirname + file);
    const uri = vscode.Uri.file(currentFile);

    await vscode.workspace
      .getConfiguration(EXTENSION_IDENTIFIER)
      .update('fileTestIdentifier', 'my', vscode.ConfigurationTarget.Global, false);

    const document = await vscode.workspace.openTextDocument(uri);
    const editor = await vscode.window.showTextDocument(document);

    assert.equal(editor.document.languageId, language);

    const diagnostics = vscode.languages.getDiagnostics(uri);

    assert.deepEqual(diagnostics.length, 1);
  });
});
