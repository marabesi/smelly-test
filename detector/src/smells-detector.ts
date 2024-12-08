import { parseScript } from 'esprima';
import * as ts from 'typescript';
import { JavascriptSmells } from './languages/JavascriptSmells';
import { TypescriptSmells } from './languages/TypescriptSmells';
import { SmellDetectorRunnerResult, SupportedLanguages } from './types';

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
      return { smellsList: { fileName: this.fileName, fileContent: this.code, smells: finder.searchSmells(), language: this.language }, testCases: [] };
    }

    // wondering why createSource? https://stackoverflow.com/a/60462133/2258921
    const ast = ts.createSourceFile('temp.ts', this.code, ts.ScriptTarget.ES2020, true);

    const testCases = findItCalls(ast).map(({ lineStart, columnStart, lineEnd, columnEnd }) => ({
      lineStart,
      startAt: columnStart,
      lineEnd,
      endsAt: columnEnd,
    }));

    return { smellsList: { fileName: this.fileName, fileContent: this.code, smells: new TypescriptSmells(ast).searchSmells(), language: SupportedLanguages.typescript }, testCases };
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