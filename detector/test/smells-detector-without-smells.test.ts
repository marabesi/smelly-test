import { describe, expect, test } from 'vitest';
import { SmellDetector } from '../src/index';
import { TYPESCRIPT } from './smells-detector-builder';

describe('Smelly Test Smell Detection Suite', () => {
  test.each([{
    code: `
jest.mock("../");`,
    language: TYPESCRIPT,
  }
  ])(`detect code without smells`, ({ code, language }) => {
    const smellDetector = new SmellDetector(code, language);
    const result = smellDetector.findAll();

    expect(result.length).toEqual(0);
  });
});
