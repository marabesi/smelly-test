import { JavascriptSmells } from './languages/JavascriptSmells';
import { TypescriptSmells } from './languages/TypescriptSmells';
import { Smell, SupportedLanguages } from './types';

export class SmellDetector {

  constructor(private code: string, private language: string) { }

  findAll(): Smell[] {
    if (this.language === SupportedLanguages.javascript) {
      const finder = new JavascriptSmells(this.code);
      return finder.searchSmells();
    }

    return new TypescriptSmells(this.code).searchSmells();
  }
}