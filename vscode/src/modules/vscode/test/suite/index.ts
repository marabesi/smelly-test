import * as path from 'path';
import Mocha from 'mocha';
import glob from 'glob';
import * as vscode from 'vscode';

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true,
		timeout: 10000
	});

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise((c, e) => {
		glob('**/**.test.js', { cwd: testsRoot }, (err: null | Error, files: any[]) => {
			if (err) {
				return e(err);
			}

			// Add files to the test suite
			files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

			try {
				// Run the mocha test
				mocha.run((failures: number) => {
					if (failures > 0) {
						e(new Error(`${failures} tests failed.`));
					} else {
						c();
					}
				});
			} catch (err) {
				console.error(err);
				e(err);
			}
		});
	});
}

export const deleteWorkSpaceConfiguration = () => {
	return vscode.workspace
		.getConfiguration('smelly')
		.update('fileTestIdentifier', undefined, vscode.ConfigurationTarget.Global, true);

};

export function fileForJavascript(file: string) {
  const testFolderLocationForJavascript = '../../../../../../src/modules/vscode/dataset/javascript';
  return testFolderLocationForJavascript + '/' + file;
}

export function fileFortypescript(file: string) {
  const testFolderLocationForTypescript = '../../../../../../src/modules/vscode/dataset/typescript';
  return testFolderLocationForTypescript + '/' + file;
}

export function fileFromFilesPattern(file: string) {
  const testFolderLocationForJavascript = '../../../../../../src/modules/vscode/dataset/files_pattern';
  return testFolderLocationForJavascript + '/' + file;
}