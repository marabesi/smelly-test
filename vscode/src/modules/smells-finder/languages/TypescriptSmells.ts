import * as ts from 'typescript';

import { Smell, SmellsFinder } from "../types";
import { SmellsBuilder } from '../smells-builder';

export class TypescriptSmells implements SmellsFinder {

  constructor(private code: string) { }

  searchSmells(): Smell[] {
    // wondering why createSource? https://stackoverflow.com/a/60462133/2258921
    const ast = ts.createSourceFile('temp.ts', this.code, ts.ScriptTarget.ES2020, true);
    const nodes = this.findIfStatements(ast);

    return nodes.map(ifStmt => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, ifStmt.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, ifStmt.getEnd());

      return SmellsBuilder.ifStatement(
        startLine + 1,
        endLine + 1,
        character,
        endCharacter,
      );
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
