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

    return smells;
  }
}

function findIfStatements(node: any, ifStatements: any[] = []) {
  if (node.type === 'IfStatement') {
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