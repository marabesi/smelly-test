import { parseScript } from 'esprima';
import * as ts from 'typescript';
import { JavascriptSmells } from './languages/JavascriptSmells';
import { TypescriptSmells } from './languages/TypescriptSmells';
import { SmellDetectorRunnerResult, SupportedLanguages, TestCase } from './types';

export class SmellDetector {

  constructor(
    private readonly fileName: string,
    private readonly code: string,
    private readonly language: string
  ) { }

  findAll(): SmellDetectorRunnerResult {
    if (this.language === SupportedLanguages.javascript) {
      const ast = parseScript(this.code, { loc: true });

      const finder = new JavascriptSmells(ast);
      const smellsList = {
        fileName: this.fileName,
        fileContent: this.code,
        smells: finder.searchSmells(),
        language: this.language
      };
      return { smellsList, testCases: [] };
    }

    // wondering why createSource? https://stackoverflow.com/a/60462133/2258921
    const ast = ts.createSourceFile('temp.ts', this.code, ts.ScriptTarget.ES2020, true);

    const testCases = findItCalls(ast).map(({ lineStart, columnStart, lineEnd, columnEnd }) => ({
      lineStart,
      startAt: columnStart,
      lineEnd,
      endsAt: columnEnd,
    }));

    const foundItEachCalls = findItEachCalls(ast);
    testCases.push(...foundItEachCalls);
    testCases.push(...findItSkipCalls(ast));

    const smellsList = {
      fileName: this.fileName,
      fileContent: this.code,
      smells: new TypescriptSmells(ast).searchSmells(), language: SupportedLanguages.typescript
    };
    return { smellsList, testCases };
  }
}

function findItCalls(sourceFile: ts.SourceFile): { lineStart: number, columnStart: number, lineEnd: number, columnEnd: number }[] {
  const itCalls: { lineStart: number, columnStart: number, lineEnd: number, columnEnd: number }[] = [];

  function traverse(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      const isItCall = ts.isIdentifier(expression) && expression.text === 'it';
      const isTestCall = ts.isIdentifier(expression) && expression.text === 'test';
      if (isItCall || isTestCall) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        const { line: lineEnd, character: columnEnd } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
        itCalls.push({
          lineStart: line + 1,
          columnStart: character,
          lineEnd: lineEnd + 1,
          columnEnd, 
        });
      }
    }

    ts.forEachChild(node, traverse);
  }

  traverse(sourceFile);
  return itCalls;
}

function findItEachCalls(sourceFile: ts.SourceFile): TestCase[] {
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

function findItSkipCalls(sourceFile: ts.SourceFile): TestCase[] {
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