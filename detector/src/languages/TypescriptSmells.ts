import * as ts from 'typescript';

import { Smell, SmellsFinder } from "../types";
import { SmellsBuilder } from '../smells-builder';


export class TypescriptSmells implements SmellsFinder {

  constructor(private readonly ast: ts.SourceFile) { }

  searchSmells(): Smell[] {
    const ast = this.ast;
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

    const forIns = this.findForInStatements(ast).map(forStmt => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, forStmt.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, forStmt.getEnd());

      return SmellsBuilder.forInStatement(
        startLine + 1,
        endLine + 1,
        character,
        endCharacter,
      );
    });

    const fors = this.findForStatements(ast).map(forStmt => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, forStmt.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, forStmt.getEnd());

      return SmellsBuilder.forStatement(
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

    const consoles = this.findConsoleLogs(ast).map(times => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, times.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, times.getEnd());

      return SmellsBuilder.console(
        startLine + 1,
        endLine + 1,
        character,
        endCharacter,
      );
    });

    const jestMocks = this.findJestMocks(ast).map(mockCall => {
      const { line: startLine, character } = ts.getLineAndCharacterOfPosition(ast, mockCall.getStart());
      const { line: endLine, character: endCharacter } = ts.getLineAndCharacterOfPosition(ast, mockCall.getEnd());
      return SmellsBuilder.jestMock(
        startLine + 1,
        endLine + 1,
        character,
        endCharacter,
      );
    });

    const jestMockSmells: Smell[] = [];

    if (jestMocks.length >= 10) {
      const first = 0;
      const last = jestMocks.length - 1;

      jestMockSmells.push(
        SmellsBuilder.jestMock(
          jestMocks[first].lineStart,
          jestMocks[last].lineEnd,
          jestMocks[first].startAt,
          jestMocks[last].endsAt,
        )
      );
    }

    const emptyDescribe = this.findEmptyDescribes(ast);

    const result = ifs.concat(forOfs)
      .concat(forIns)
      .concat(fors)
      .concat(timeouts)
      .concat(consoles)
      .concat(jestMockSmells)
      .concat(emptyDescribe);
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

  private findForStatements(node: ts.Node, forStatements: ts.ForStatement[] = []): ts.ForStatement[] {
    if (ts.isForStatement(node)) {
      forStatements.push(node);
    }

    node.forEachChild(child => {
      this.findForStatements(child, forStatements);
    });

    return forStatements;
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

  private findForInStatements(node: ts.Node, forInStatements: ts.ForInStatement[] = []): ts.ForInStatement[] {
    if (ts.isForInStatement(node)) {
      forInStatements.push(node);
    }

    node.forEachChild(child => {
      this.findForInStatements(child, forInStatements);
    });

    return forInStatements;
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

  private findConsoleLogs(node: any, results: any[] = []) {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if ((
        ts.isPropertyAccessExpression(expression) &&
        expression.expression.kind === ts.SyntaxKind.Identifier &&
        expression.expression.getText() === 'console') && (
        expression.name.escapedText === 'log' || expression.name.escapedText === 'info' || expression.name.escapedText === 'error')) {
        results.push(node);
      }
    }

    ts.forEachChild(node, child => {
      this.findConsoleLogs(child, results);
    });

    return results;
  }

  private findJestMocks(node: ts.Node, functionCalls: any[] = []): any[] {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.expression.getText() === 'jest' &&
      node.expression.name.getText() === 'mock'
    ) {
      functionCalls.push(node);
    }
    ts.forEachChild(node, child => {
      this.findJestMocks(child, functionCalls);
    });
    return functionCalls;
  }

  private findEmptyDescribes(sourceFile: ts.SourceFile): Smell[] {
    const emptyDescribes: Smell[] = [];

    function traverse(node: ts.Node) {
      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        const isDescribeCall = ts.isIdentifier(expression) && expression.text === 'describe';
        if (isDescribeCall && node.arguments.length === 2) {
          const secondArg = node.arguments[1];
          if (ts.isArrowFunction(secondArg) || ts.isFunctionExpression(secondArg)) {
            const body = secondArg.body;
            if (ts.isBlock(body) && body.statements.length === 0) {
              const { line, character: startAt } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
              const { line: lineEnd, character: endsAt } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
              emptyDescribes.push(SmellsBuilder.emptyDescribe(
                line + 1,
                lineEnd + 1,
                startAt,
                endsAt,
              ));
            }
          }
        }
      }

      ts.forEachChild(node, traverse);
    }

    traverse(sourceFile);
    return emptyDescribes;
  }
}
