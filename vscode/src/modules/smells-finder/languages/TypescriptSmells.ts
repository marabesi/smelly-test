import * as ts from 'typescript';

import { Smell, SmellsFinder } from "../types";
import { SmellsBuilder } from '../smells-builder';

export class TypescriptSmells implements SmellsFinder {

  constructor(private code: string) { }

  searchSmells(): Smell[] {
    // wondering why createSource? https://stackoverflow.com/a/60462133/2258921
    const ast = ts.createSourceFile('temp.ts', this.code, ts.ScriptTarget.ES2020, true);
    const nodes = this.findIfStatements(ast);

    const forOfs = this.findForOfStatements(ast).map(forStmt => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, forStmt.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, forStmt.getEnd());

      return SmellsBuilder.forOfStatement(
        startLine + 1,
        endLine + 1,
        character,
        endCharacter,
      );
    });

    const ifs = nodes.map(ifStmt => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, ifStmt.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, ifStmt.getEnd());

      return SmellsBuilder.ifStatement(
        startLine + 1,
        endLine + 1,
        character,
        endCharacter,
      );
    });

    const timeouts = this.findSetTimeouts(ast).map(times => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, times.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, times.getEnd());

      return SmellsBuilder.timeout(
        startLine + 1,
        endLine + 1,
        character,
        endCharacter,
      );
    });

    const result = ifs.concat(forOfs).concat(timeouts);
    return result;
  }

  private findIfStatements(node: ts.Node, ifStatements: ts.IfStatement[] = []): ts.IfStatement[] {
    if (ts.isIfStatement(node)) {
      ifStatements.push(node);
    }

    node.forEachChild(child => {
      this.findIfStatements(child, ifStatements);
    });

    return ifStatements;
  }

  private findForOfStatements(node: ts.Node, forOfStatements: ts.ForOfStatement[] = []): ts.ForOfStatement[] {
    if (ts.isForOfStatement(node)) {
      forOfStatements.push(node);
    }

    node.forEachChild(child => {
      this.findForOfStatements(child, forOfStatements);
    });

    return forOfStatements;
  }

  private findSetTimeouts(node: any, results: any[] = []) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.escapedText === 'setTimeout') {
        results.push(node);
      }
    }

    ts.forEachChild(node, child => {
      this.findSetTimeouts(child, results);
    });

    return results;
  }
}
