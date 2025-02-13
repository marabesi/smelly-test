import * as ts from 'typescript';
import { TypescriptSmells } from './languages/TypescriptSmells';
import { SmellDetectorRunnerResult, SupportedLanguages, TestCase } from './types';

export class SmellDetector {

  constructor(
    private readonly fileName: string,
    private readonly code: string
  ) { }

  findAll(): SmellDetectorRunnerResult {
    // wondering why createSource? https://stackoverflow.com/a/60462133/2258921
    const ast = ts.createSourceFile('temp.ts', this.code, ts.ScriptTarget.ES2020, true);

    const testCases = this.findItCalls(ast).map(({ lineStart, startAt, lineEnd, endsAt }) => ({
      lineStart,
      startAt: startAt,
      lineEnd,
      endsAt: endsAt,
    }));

    const language = this.isJavascriptFile() ? SupportedLanguages.javascript : SupportedLanguages.typescript;

    const foundItEachCalls = this.findItEachCalls(ast);
    testCases.push(...foundItEachCalls);
    testCases.push(...this.findItSkipCalls(ast));

    const smells = new TypescriptSmells(ast).searchSmells();

    const smellsList = {
      fileName: this.fileName,
      fileContent: this.code,
      smells,
      language 
    };

    return { smellsList, testCases };
  }

  private isJavascriptFile() {
    return this.fileName.endsWith('.js') || this.fileName.endsWith('.jsx');
  }

  private findItCalls(sourceFile: ts.SourceFile): { lineStart: number, startAt: number, lineEnd: number, endsAt: number }[] {
    const itCalls: { lineStart: number, startAt: number, lineEnd: number, endsAt: number }[] = [];

    function traverse(node: ts.Node) {
      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        const isItCall = ts.isIdentifier(expression) && expression.text === 'it';
        const isTestCall = ts.isIdentifier(expression) && expression.text === 'test';
        if (isItCall || isTestCall) {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
          const { line: lineEnd, character: endsAt } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
          itCalls.push({
            lineStart: line + 1,
            startAt: character,
            lineEnd: lineEnd + 1,
            endsAt,
          });
        }
      }

      ts.forEachChild(node, traverse);
    }

    traverse(sourceFile);
    return itCalls;
  }

  private findItEachCalls(sourceFile: ts.SourceFile): TestCase[] {
    const testCases: TestCase[] = [];

    function traverse(node: ts.Node) {
      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        const isItEachExpression = ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === 'it' && expression.name.text === 'each';
        const isTestEachExpression = ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === 'test' && expression.name.text === 'each';

        if (isItEachExpression || isTestEachExpression) {
          const { line: startLine, character: startCharacter } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
          const { line: endLine, character: endCharacter } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
          const arrayArgument = node.arguments[0];
          if (ts.isArrayLiteralExpression(arrayArgument)) {
            arrayArgument.elements.forEach(() => {
              testCases.push({
                lineStart: startLine + 1,
                startAt: startCharacter,
                lineEnd: endLine + 1,
                endsAt: endCharacter,
              });
            });
          }
        }
      }

      ts.forEachChild(node, traverse);
    }

    traverse(sourceFile);
    return testCases;
  }

  private findItSkipCalls(sourceFile: ts.SourceFile): TestCase[] {
    const testCases: TestCase[] = [];

    function traverse(node: ts.Node) {
      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        const isItSkipExpression = ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === 'it' && expression.name.text === 'skip';
        const isTestSkipExpression = ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === 'test' && expression.name.text === 'skip';

        if (isItSkipExpression || isTestSkipExpression) {
          const { line: startLine, character: startCharacter } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
          const { line: endLine, character: endCharacter } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
          testCases.push({
            lineStart: startLine + 1,
            startAt: startCharacter,
            lineEnd: endLine + 1,
            endsAt: endCharacter,
          });
        }
      }

      ts.forEachChild(node, traverse);
    }

    traverse(sourceFile);
    return testCases;
  }
}
