import { JavascriptSmells } from './languages/JavascriptSmells';
import { TypescriptSmells } from './languages/TypescriptSmells';
import { SmellDetectorRunnerResult, SupportedLanguages } from './types';

export class SmellDetector {

  constructor(private code: string, private language: string) { }

  findAll(): SmellDetectorRunnerResult {
    if (this.language === SupportedLanguages.javascript) {
      const finder = new JavascriptSmells(this.code);
      return { smells: finder.searchSmells(), testCases: [] };
    }

    return { smells: new TypescriptSmells(this.code).searchSmells(), testCases: [] };
  }
}