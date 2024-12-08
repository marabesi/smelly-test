import { describe, expect, test } from 'vitest';
import { smellDetectorInstance, TYPESCRIPT } from './smells-detector-builder';

describe('Smelly Test Smell Detection Suite', () => {
  test.each([{
    code: `
jest.mock("../");`,
    language: TYPESCRIPT,
  }
  ])(`detect code without smells`, ({ code, language }) => {
    const result = smellDetectorInstance(code, language);
    expect(result.length).toEqual(0);
  });
});
