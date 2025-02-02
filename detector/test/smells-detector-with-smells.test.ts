import { describe, expect, test } from 'vitest';
import { CONSOLE, FOR, FOR_IN, FOR_OF, IF_STATEMENT, MOCKERY, smellDetectorInstance, TIMEOUT, totalTestCaseDetectorInstance, JAVASCRIPT_FILE, TYPESCRIPT_FILE, EMPTY_DESCRIBE } from './smells-detector-builder';

describe('Smelly Test Smell Detection Suite', () => {
  describe.each([[{
    code: `const a = 1;
if (a === 1) {}`,
    fileName: JAVASCRIPT_FILE,
    index: 0,
    type: IF_STATEMENT,
    lineStart: 2,
    lineEnd: 2,
    startAt: 0,
    endsAt: 15,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
  }],
  [{
    code: `const lists = [{}, {}];
  
for (const i of lists) {

}`,
    fileName: JAVASCRIPT_FILE,
    type: FOR_OF,
    index: 0,
    lineStart: 3,
    lineEnd: 5,
    startAt: 0,
    endsAt: 1,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
  }],
  [{
    code: `const lists = [{}, {}];
  
for (const i in lists) {

}`,
    fileName: JAVASCRIPT_FILE,
    type: FOR_IN,
    index: 0,
    lineStart: 3,
    lineEnd: 5,
    startAt: 0,
    endsAt: 1,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
  }],
  [{
    code: `const lists = [{}, {}];
  
for (let i = 0; i < 1; i++) {

}`,
    fileName: JAVASCRIPT_FILE,
    type: FOR,
    index: 0,
    lineStart: 3,
    lineEnd: 5,
    startAt: 0,
    endsAt: 1,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
  }],
  [{
    code: `setTimeout(() => {
  done();
});`,
    fileName: JAVASCRIPT_FILE,
    index: 0,
    type: TIMEOUT,
    lineStart: 1,
    lineEnd: 3,
    startAt: 0,
    endsAt: 2,
    total: 1,
    description: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed.`,
    diagnostic: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed`,
  }],
  [{
    code: `function done() {};
setTimeout(() => {
  done();
});`,
    fileName: JAVASCRIPT_FILE,
    index: 0,
    type: TIMEOUT,
    lineStart: 2,
    lineEnd: 4,
    startAt: 0,
    endsAt: 2,
    total: 1,
    description: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed.`,
    diagnostic: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed`,
  }],
  [{
    code: `const a: number = 1;
if (a === 1) { }`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: IF_STATEMENT,
    lineStart: 2,
    lineEnd: 2,
    startAt: 0,
    endsAt: 16,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
  }],
  [{

    code: `const a: number = 1;
if (a === 1) { }
if (a === 2) {
  console.log('this is a test');
}`,
    fileName: TYPESCRIPT_FILE,
    index: 1,
    type: IF_STATEMENT,
    lineStart: 3,
    lineEnd: 5,
    startAt: 0,
    endsAt: 1,
    total: 3,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
  }],
  [{
    code: `const lists: any[] = [{}, {}];
  
for (const i of lists) {

}`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: FOR_OF,
    lineStart: 3,
    lineEnd: 5,
    startAt: 0,
    endsAt: 1,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
  }],
  [{
    code: `const lists: any[] = [{}, {}];
  
for (const i in lists) {

}`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: FOR_IN,
    lineStart: 3,
    lineEnd: 5,
    startAt: 0,
    endsAt: 1,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
  }],
  [{
    code: `const lists: any[] = [{}, {}];
  
for (let i =0; i < 2; i++) {

}`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: FOR,
    lineStart: 3,
    lineEnd: 5,
    startAt: 0,
    endsAt: 1,
    total: 1,
    description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
  }],
  [{
    code: `setTimeout(() => {
  done();
});`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: TIMEOUT,
    lineStart: 1,
    lineEnd: 3,
    startAt: 0,
    endsAt: 2,
    total: 1,
    description: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed.`,
    diagnostic: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed`,
  }],
  [{
    code: `function done() {};
setTimeout(() => {
  done();
});`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: TIMEOUT,
    lineStart: 2,
    lineEnd: 4,
    startAt: 0,
    endsAt: 2,
    total: 1,
    description: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed.`,
    diagnostic: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed`,
  }],
  [{
    code: `describe("my test", () => {
  it("a", () => {
console.log(1);
  });
})`,
    fileName: JAVASCRIPT_FILE,
    index: 0,
    type: CONSOLE,
    lineStart: 3,
    lineEnd: 3,
    startAt: 0,
    endsAt: 14,
    total: 1,
    description: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
    diagnostic: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
  }],
  [{
    code: `describe("my test", () => {
  it("a", () => {
console.log(1);
  });
})`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: CONSOLE,
    lineStart: 3,
    lineEnd: 3,
    startAt: 0,
    endsAt: 14,
    total: 1,
    description: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
    diagnostic: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
  }],
  [{
    code: `describe("my test", () => {
  it("a", () => {
console.error(1);
  });
})`,
    fileName: JAVASCRIPT_FILE,
    index: 0,
    type: CONSOLE,
    lineStart: 3,
    lineEnd: 3,
    startAt: 0,
    endsAt: 16,
    total: 1,
    description: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
    diagnostic: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
  }],
  [{
    code: `describe("my test", () => {
  it("a", () => {
console.info(1);
  });
})`,
    fileName: JAVASCRIPT_FILE,
    index: 0,
    type: CONSOLE,
    lineStart: 3,
    lineEnd: 3,
    startAt: 0,
    endsAt: 15,
    total: 1,
    description: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
    diagnostic: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
  }],
  [{
    code: `describe("my test", () => {
  it("a", () => {
console.info(1);
  });
})`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: CONSOLE,
    lineStart: 3,
    lineEnd: 3,
    startAt: 0,
    endsAt: 15,
    total: 1,
    description: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
    diagnostic: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
  }],
  [{
    code: `describe("my test", () => {
  it("a", () => {
console.error(1);
  });
})`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: CONSOLE,
    lineStart: 3,
    lineEnd: 3,
    startAt: 0,
    endsAt: 16,
    total: 1,
    description: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
    diagnostic: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
  }],
  [{
    code: `jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: MOCKERY,
    lineStart: 1,
    lineEnd: 10,
    startAt: 0,
    endsAt: 16,
    total: 1,
    description: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
    diagnostic: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
  }],
  [{
    code: `jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");
jest.mock("../");`,
    fileName: TYPESCRIPT_FILE,
    index: 0,
    type: MOCKERY,
    lineStart: 1,
    lineEnd: 11,
    startAt: 0,
    endsAt: 16,
    total: 1,
    description: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
    diagnostic: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
  }],
  [{
    code: `describe('test', () => {})`,
    fileName: JAVASCRIPT_FILE,
    index: 0,
    type: EMPTY_DESCRIBE,
    lineStart: 1,
    lineEnd: 1,
    startAt: 0,
    endsAt: 26,
    total: 1,
    description: `Smelly: avoid empty test cases.`,
    diagnostic: `Smelly: avoid empty test cases.`,
  }]
  ])(`detect test smell for %s %s: type %s %s at index %s`, ({ code, fileName, index, type, lineStart, lineEnd, startAt, endsAt, total, description, diagnostic }) => {
    test(`should find ${total} test smells`, () => {
      const result = smellDetectorInstance(code, fileName);
  
      expect(result.length).toEqual(total);
    });

    test(`at ${index} should match ${type}`, () => {
      const result = smellDetectorInstance(code, fileName);
  
      expect(result[index].type).toEqual(type);
    });

    test(`at ${index} should find line start`, () => {
      const result = smellDetectorInstance(code, fileName);
  
      expect(result[index].lineStart).toEqual(lineStart);
    });

    test(`at ${index} should find line end`, () => {
      const result = smellDetectorInstance(code, fileName);
  
      expect(result[index].lineEnd).toEqual(lineEnd);
    });
    
    test(`at ${index} should find column start at`, () => {
      const result = smellDetectorInstance(code, fileName);
  
      expect(result[index].startAt).toEqual(startAt);
    });

    test(`at ${index} should find column ends at`, () => {
      const result = smellDetectorInstance(code, fileName);
  
      expect(result[index].endsAt).toEqual(endsAt);
    });

    test(`at ${index} should find description`, () => {
      const result = smellDetectorInstance(code, fileName);
      
      expect(result[index].description).toEqual(description);
    });
 
    test(`at ${index} should find diagnostic`, () => {
      const result = smellDetectorInstance(code, fileName);
      
      expect(result[index].diagnostic).toEqual(diagnostic);
    });
  });

  test.each([
    [{ code: 'it("a", () => {});', expected: 1 }],
    [{ code: `describe("my test", () => {
  it("a", () => {});
});`, expected: 1 }],
  [{ code: `describe("my test", () => {
  it("a", () => {});
  it("b", () => {});
});`, expected: 2 }],
  [{ code: `describe("my test", () => {
  it.each([[1],[2]])("a", () => {});
});`, expected: 2 }],
  [{ code: `describe("my test", () => {
  test.each([[1],[2],[3]])("a", () => {});
});`, expected: 3 }],
  [{ code: `it.skip("a", () => {});`, expected: 1 }],
  [{ code: `test.skip("a", () => {});`, expected: 1 }],
  [{ code: `describe("my test", () => {
    it.skip("a", () => {});
    test.skip("b", () => {});
  });`, expected: 2 }],
  ])('should identify the test cases that exists in the file with .each and with .skip', ({ code, expected }) => {
    const result = totalTestCaseDetectorInstance(code, TYPESCRIPT_FILE);

    expect(result).toHaveLength(expected);
  });

   describe.each([
   [{
      index: 0,
     code: `it("a", () => {
});`,
     fileName: TYPESCRIPT_FILE,
     testCases: [{
       lineStart: 1,
       lineEnd: 2,
       startAt: 0,
       endsAt: 2,
     }]
   }],
   [{
      index: 0,
     code: `test("a", () => {
});`,
     fileName: TYPESCRIPT_FILE,
     testCases: [{
       lineStart: 1,
       lineEnd: 2,
       startAt: 0,
       endsAt: 2,
     }]
   }],
   [{
      index: 1,
     code: `test("a", () => {
});
test("b", () => {});`,
     fileName: TYPESCRIPT_FILE,
     testCases: [{
       lineStart: 1,
       lineEnd: 2,
       startAt: 0,
       endsAt: 2,
     }, {
       lineStart: 3,
       lineEnd: 3,
       startAt: 0,
       endsAt: 19,
     }]
   }],
   ])('testCases', ({ index, code, fileName, testCases }) => {
    test(`should line start for test case at index ${index}`, () => {
      const result = totalTestCaseDetectorInstance(code, fileName);
 
      expect(result[index].lineStart).toEqual(testCases[index].lineStart);
    });

    test(`should  column start for test case at index ${index}`, () => {
      const result = totalTestCaseDetectorInstance(code, fileName);
 
      expect(result[index].startAt).toEqual(testCases[index].startAt);
    });
    
    test(`should line end for test case at index ${index}`, () => {
      const result = totalTestCaseDetectorInstance(code, fileName);
 
      expect(result[index].lineEnd).toEqual(testCases[index].lineEnd);
    });

    test(`should  column end for test case at index ${index}`, () => {
      const result = totalTestCaseDetectorInstance(code, fileName);
 
      expect(result[index].endsAt).toEqual(testCases[index].endsAt);
    });
   });
});