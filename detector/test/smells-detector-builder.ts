import { SmellDetector } from "../src";
import { Smell, TestCase } from "../src/types";

export const IF_STATEMENT = 'if-statement';
export const FOR_OF = 'for-of-statement';
export const FOR_IN = 'for-in-statement';
export const FOR = 'for-statement';
export const TIMEOUT = 'timeout';
export const CONSOLE = 'console-statement';
export const MOCKERY = 'excessive-jest-mock';

export const JAVASCRIPT_FILE = 'javascript.js';
export const TYPESCRIPT_FILE = 'javascript.ts';

export function smellDetectorInstance(code: string, language: string): Smell[] {
  const smellDetector = new SmellDetector(language, code);
  return smellDetector.findAll().smellsList.smells;
}

export function totalTestCaseDetectorInstance(code: string, language: string): TestCase[] {
  const smellDetector = new SmellDetector(language, code);
  return smellDetector.findAll().testCases;
}
