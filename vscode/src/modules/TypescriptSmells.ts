import * as ts from 'typescript';

import { SmellsFinder } from "./SmellsFinder";
import { Smell } from "./types";

export class TypescriptSmells implements SmellsFinder {

  constructor(private code: string) { }

  searchSmells(): Smell[] {
    // wondering why createSource? https://stackoverflow.com/a/60462133/2258921
    const ast = ts.createSourceFile('temp.ts', this.code, ts.ScriptTarget.ES2020, true);
    const nodes = this.findIfStatements(ast);

    return nodes.map(ifStmt => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, ifStmt.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, ifStmt.getEnd());

      return {
        type: 'if-statement',
        lineStart: startLine + 1,
        lineEnd: endLine + 1,
        startAt: character,
        endsAt: endCharacter - 1,
        description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
        diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
      };
    });
  }

  findIfStatements(node: ts.Node, ifStatements: ts.IfStatement[] = []): ts.IfStatement[] {
    if (ts.isIfStatement(node)) {
      ifStatements.push(node);
    }

    node.forEachChild(child => {
      this.findIfStatements(child, ifStatements);
    });

    return ifStatements;
  }
}
