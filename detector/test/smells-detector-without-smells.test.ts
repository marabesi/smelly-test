import { describe, expect, test } from 'vitest';
import { smellDetectorInstance, TYPESCRIPT_FILE } from './smells-detector-builder';

describe('Smelly Test Smell Detection Suite', () => {
  test.each([{
    code: `
jest.mock("../");`,
    fileName: TYPESCRIPT_FILE,
  }
  ])(`detect code without smells`, ({ code, fileName }) => {
    const result = smellDetectorInstance(code, fileName);
    expect(result.length).toEqual(0);
  });
});
