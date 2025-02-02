import ts from 'typescript';
import { Smell, TestCase } from '../types';

export class FindDuplicatedTestCases {
  findTestCases(sourceFile: ts.SourceFile): TestCase[] {
    const testCases: TestCase[] = [];

    function traverse(node: ts.Node) {
      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        const isTestCall = ts.isIdentifier(expression) && (expression.text === 'it' || expression.text === 'test');
        if (isTestCall && node.arguments.length > 1) {
          const firstArg = node.arguments[0];
          const secondArg = node.arguments[1];
          if (ts.isStringLiteral(firstArg) && ts.isFunctionLike(secondArg)) {
            const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
            const { line: lineEnd, character: endsAt } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
            // const bodyText = secondArg.getText(sourceFile);
            testCases.push({
              lineStart: line + 1,
              lineEnd: lineEnd + 1,
              startAt: character,
              endsAt: endsAt,
            });
          }
        }
      }

      ts.forEachChild(node, traverse);
    }

    traverse(sourceFile);
    return testCases;
  }

  detectDuplicateTestCases(testCases: TestCase[]): Smell[] {
    const seen = new Map<string, TestCase[]>();
    const duplicates: Smell[] = [];

    for (const testCase of testCases) {
      const key = `${testCase.lineStart}:${testCase.lineEnd}`;
      if (!seen.has(key)) {
        seen.set(key, []);
      }
      seen.get(key)!.push(testCase);
    }

    for (const [key, cases] of seen.entries()) {
      if (cases.length > 1) {
        duplicates.push({
          type: 'duplicated-test-case',
          description: `Duplicated test case: ${key}`,
          diagnostic: `Duplicated test case: ${key}`,
          lineStart: cases[0].lineStart,
          lineEnd: cases[0].lineEnd,
          startAt: cases[0].startAt,
          endsAt: cases[0].endsAt,
        });
      }
    }

    return duplicates;
  }
}