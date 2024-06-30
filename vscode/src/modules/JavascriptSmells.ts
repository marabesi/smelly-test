import { Syntax, parseScript } from "esprima";
import { SmellsFinder } from "./SmellsFinder";
import { Smell } from "./types";

export class JavascriptSmells implements SmellsFinder {
  
  constructor(private code: string) {}

  searchSmells(): Smell[] {
    const smells: Smell[] = [];

    const ast = parseScript(this.code, { loc: true });

    const ifs: any[] = [];
    const fors: any[] = [];

    this.findIfStatements(ast, ifs).filter((item: any) => item.type === Syntax.IfStatement);

    for (const statement of ifs) {
      smells.push({
        type: 'if-statement',
        lineStart: statement.loc.start.line,
        lineEnd: statement.loc.end.line,
        startAt: statement.loc.start.column,
        endsAt: statement.loc.end.column,
        description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
        diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
      });
    }

    this.findForStatements(ast, fors).filter((item: any) => item.type === Syntax.ForOfStatement);

    for (const statement of fors) {
      smells.push({
        type: 'for-of-statement',
        lineStart: statement.loc.start.line,
        lineEnd: statement.loc.end.line,
        startAt: statement.loc.start.column,
        endsAt: statement.loc.end.column,
        description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
        diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
      });
    }

    return smells;
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

  private findForStatements(node: any, forStatements: any[] = []) {
    if (node.type === 'ForOfStatement') {
      // if (node.type === 'ForStatement' || node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
      forStatements.push(node);
    }

    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        this.findForStatements(node[key], forStatements);
      }
    }

    return forStatements;
  }
}
