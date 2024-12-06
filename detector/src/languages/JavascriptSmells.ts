import { Program, Syntax } from 'esprima';
import { Smell, SmellsFinder } from '../types';
import { SmellsBuilder } from '../smells-builder';

export class JavascriptSmells implements SmellsFinder {
  
  constructor(private readonly ast: Program) {}

  searchSmells(): Smell[] {
    const smells: Smell[] = [];

    const ast = this.ast;

    const ifs: any[] = [];
    const forOfs: any[] = [];
    const forIns: any[] = [];
    const fors: any[] = [];
    const timeouts: any[] = [];
    const consoles: any[] = [];

    this.findIfStatements(ast, ifs).filter((item: any) => item.type === Syntax.IfStatement);

    for (const statement of ifs) {
      smells.push(SmellsBuilder.ifStatement(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column,
      ));
    }

    this.findForStatements(ast, forOfs, Syntax.ForOfStatement).filter((item: any) => item.type === Syntax.ForOfStatement);

    for (const statement of forOfs) {
      smells.push(SmellsBuilder.forOfStatement(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column
      ));
    }

    this.findForStatements(ast, forIns, Syntax.ForInStatement).filter((item: any) => item.type === Syntax.ForInStatement);
    for (const statement of forIns) {
      smells.push(SmellsBuilder.forInStatement(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column
      ));
    }

    this.findForStatements(ast, fors, Syntax.ForStatement).filter((item: any) => item.type === Syntax.ForStatement);
    for (const statement of fors) {
      smells.push(SmellsBuilder.forStatement(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column
      ));
    }

    this.findSetTimeouts(ast, timeouts);

    for (const statement of timeouts) {
      smells.push(SmellsBuilder.timeout(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column
      ));
    }

    this.findConsoleLogs(ast, consoles);

    for (const statement of consoles) {
      smells.push(SmellsBuilder.console(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column
      ));
    }

    return smells;
  }

  private findConsoleLogs(node: any, results: any[] = []) {
    if ((node.type === 'CallExpression' &&
      node.callee.type === 'MemberExpression' &&
      node.callee.object.name === 'console') &&
      (node.callee.property.name === 'log' || node.callee.property.name === 'info' || node.callee.property.name === 'error')) {
      results.push(node);
    }

    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        this.findConsoleLogs(node[key], results);
      }
    }
    return results;
  }

  private findSetTimeouts(node: any, results: any[] = []) {
    if (node.type === 'CallExpression' && node.callee.name === 'setTimeout') {
      results.push(node);
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        this.findSetTimeouts(node[key], results);
      }
    }
    return results;
  }

  private findIfStatements(node: any, ifStatements: any[] = []) {
    if (node.type === Syntax.IfStatement) {
      ifStatements.push(node);
    }

    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        this.findIfStatements(node[key], ifStatements);
      }
    }

    return ifStatements;
  }

  private findForStatements(node: any, forStatements: any[] = [], forType: string) {
    if (node.type === forType) {
      forStatements.push(node);
    }

    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        this.findForStatements(node[key], forStatements, forType);
      }
    }

    return forStatements;
  }
}
