import { parseScript, Program, Syntax } from 'esprima';
import { Smell } from './types';

export class SmellDetector {

  private ast: Program;

  constructor(private code: string) {
    this.ast = parseScript(this.code, { loc: true });
  }

  findAll(): Smell[] {
    const smells: Smell[] = [];

    const ifs = containsIfStatement(this.ast).filter((item: any) => item.type === Syntax.IfStatement);

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

function containsIfStatement(node: any) {
  if (node.type === Syntax.IfStatement) {
    return node;
  }
  for (const key in node) {
    if (node[key] && typeof node[key] === 'object') {
      if (containsIfStatement(node[key])) {
        return node[key];
      }
    }
  }
  return false;
}