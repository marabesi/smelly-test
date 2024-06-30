import { Syntax, parseScript } from "esprima";
import { Smell, SmellsFinder } from "../types";
import { SmellsBuilder } from "../smells-builder";

export class JavascriptSmells implements SmellsFinder {
  
  constructor(private code: string) {}

  searchSmells(): Smell[] {
    const smells: Smell[] = [];

    const ast = parseScript(this.code, { loc: true });

    const ifs: any[] = [];
    const fors: any[] = [];

    this.findIfStatements(ast, ifs).filter((item: any) => item.type === Syntax.IfStatement);

    for (const statement of ifs) {
      smells.push(SmellsBuilder.ifStatement(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column,
      ));
    }

    this.findForStatements(ast, fors).filter((item: any) => item.type === Syntax.ForOfStatement);

    for (const statement of fors) {
      smells.push(SmellsBuilder.forOfStatement(
        statement.loc.start.line,
        statement.loc.end.line,
        statement.loc.start.column,
        statement.loc.end.column
      ));
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
