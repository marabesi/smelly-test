import { JavascriptSmells } from './JavascriptSmells';
import { TypescriptSmells } from './TypescriptSmells';
import { Smell } from './types';

export class SmellDetector {

  constructor(private code: string, private language: string) { }

  findAll(): Smell[] {
    if (this.language === 'javascript') {
      const finder = new JavascriptSmells(this.code);
      return finder.searchSmells();
    }

    return new TypescriptSmells(this.code).searchSmells();
  }
}