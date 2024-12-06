export type TestCase = {
  lineStart: number;
  lineEnd: number;
  startAt: number;
  endsAt: number;
};

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

export type SmellDetectorRunnerResult = {
  smells: Smell[];
  testCases: TestCase[];
};

export interface SmellDetectorRunner {
  findAll(): SmellDetectorRunnerResult;
}

export enum SupportedLanguages {
  javascript = 'javascript',
  typescript = 'typescript'
}

export enum SmellType {
  ifStatement = 'if-statement',
  forLoopStatement = 'for-of-statement',
  forInLoopStatement = 'for-in-statement',
  forStatement = 'for-statement',
  timeOut = 'timeout',
  consoleStatement = "console-statement",
  jestMock = "excessive-jest-mock",
}