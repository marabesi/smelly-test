export type Smell = {
  type: string;
  lineStart: number;
  lineEnd: number;
  startAt: number;
  endsAt: number;
  description: string; //supports markdown
  diagnostic: string; //no support for markdown
};

export interface SmellsFinder {
  searchSmells(): Smell[];
}

export enum SupportedLanguages {
  javascript = 'javascript',
  typescript = 'typescript'
}

export enum SmellType {
  IF_STATEMENT = 'if-statement',
  FOR_LOOP_STATEMENT = 'for-of-statement'
}