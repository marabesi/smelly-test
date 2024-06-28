import { parseScript, Program, Syntax } from 'esprima';
import { Smell } from './types';

export class SmellDetector {

  private ast: Program;

  constructor(private code: string) {
    this.ast = parseScript(this.code, { loc: true });
  }

  findAll(): Smell[] {
    const smells: Smell[] = [];
    const ifs: any[] = [];
    const fors: any[] = [];

    findIfStatements(this.ast, ifs).filter((item: any) => item.type === Syntax.IfStatement);

    for (const statement of ifs) {
      smells.push({
        type: 'if-statement',
        lineStart: statement.loc.start.line,
        lineEnd: statement.loc.end.line,
        startAt: statement.loc.start.column,
        endsAt: statement.loc.end.column,
        description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that
        requires different context to run. Split the test case to fit one context per test case.`
      });
    }

    findForStatements(this.ast, fors).filter((item: any) => item.type === Syntax.ForOfStatement);

    for (const statement of fors) {
      smells.push({
        type: 'for-of-statement',
        lineStart: statement.loc.start.line,
        lineEnd: statement.loc.end.line,
        startAt: statement.loc.start.column,
        endsAt: statement.loc.end.column,
        description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that
        requires different context to run. Split the test case to fit one context per test case.`
      });
    }

    return smells;
  }
}

function findIfStatements(node: any, ifStatements: any[] = []) {
  if (node.type === Syntax.IfStatement) {
    ifStatements.push(node);
  }

  // Recursively search in all child nodes
  for (let key in node) {
    if (node[key] && typeof node[key] === 'object') {
      findIfStatements(node[key], ifStatements);
    }
  }

  return ifStatements;
}

function findForStatements(node: any, forStatements: any[] = []) {
  // Check if the current node is a 'for' loop statement
  if (node.type === 'ForOfStatement') {
  // if (node.type === 'ForStatement' || node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
    forStatements.push(node);
  }

  // Recursively search in all child nodes
  for (let key in node) {
    if (node[key] && typeof node[key] === 'object') {
      findForStatements(node[key], forStatements);
    }
  }

  return forStatements;
}