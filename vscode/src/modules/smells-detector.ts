import { parseScript, Program, Syntax, Token } from 'esprima';

export type Smell = {
  type: string;
  lineStart: number;
  lineEnd: number;
  startAt: number;
  endsAt: number;
};

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
        endsAt: statement.loc.end.column
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