import { parseScript } from 'esprima';
import { createSourceFile, ScriptTarget } from 'typescript';
import { JavascriptSmells } from './languages/JavascriptSmells';
import { TypescriptSmells } from './languages/TypescriptSmells';
import { SmellDetectorRunnerResult, SupportedLanguages } from './types';

export class SmellDetector {

  constructor(private readonly code: string, private readonly language: string) { }

  findAll(): SmellDetectorRunnerResult {
    if (this.language === SupportedLanguages.javascript) {
      const ast = parseScript(this.code, { loc: true });

      const finder = new JavascriptSmells(ast);
      return { smells: finder.searchSmells(), testCases: [] };
    }

    // wondering why createSource? https://stackoverflow.com/a/60462133/2258921
    const ast = createSourceFile('temp.ts', this.code, ScriptTarget.ES2020, true);
    return { smells: new TypescriptSmells(ast).searchSmells(), testCases: [] };
  }
}