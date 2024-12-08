import { describe, expect, test } from 'vitest';
import { SmellDetector } from '../src/index';
import { CONSOLE, FOR, FOR_IN, FOR_OF, IF_STATEMENT, JAVASCRIPT, MOCKERY, TIMEOUT, TYPESCRIPT } from './smells-detector-builder';


describe('Smelly Test Smell Detection Suite', () => {
  describe.each([[{
    code: `const a = 1;
if (a === 1) {}`,
    language: JAVASCRIPT,
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
    language: JAVASCRIPT,
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
    language: JAVASCRIPT,
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
    language: JAVASCRIPT,
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
    language: JAVASCRIPT,
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
    language: JAVASCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: JAVASCRIPT,
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
    language: TYPESCRIPT,
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
    language: JAVASCRIPT,
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
    language: JAVASCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
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
    language: TYPESCRIPT,
    index: 0,
    type: MOCKERY,
    lineStart: 1,
    lineEnd: 11,
    startAt: 0,
    endsAt: 16,
    total: 1,
    description: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
    diagnostic: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
  }]
  ])(`detect test smell for %s %s: type %s %s at index %s`, ({ code, language, index, type, lineStart, lineEnd, startAt, endsAt, total, description, diagnostic }) => {
    
    test(`should find ${total} test smells`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
  
      expect(result.length).toEqual(total);
    });

    test(`at ${index} should match ${type}`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
  
      expect(result[index].type).toEqual(type);
    });

    test(`at ${index} should find line start`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
  
      expect(result[index].lineStart).toEqual(lineStart);
    });

    test(`at ${index} should find line end`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
  
      expect(result[index].lineEnd).toEqual(lineEnd);
    });
    
    test(`at ${index} should find column start at`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
  
      expect(result[index].startAt).toEqual(startAt);
    });

    test(`at ${index} should find column ends at`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
  
      expect(result[index].endsAt).toEqual(endsAt);
    });

    test(`at ${index} should find description`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
      
      expect(result[index].description).toEqual(description);
    });
 
    test(`at ${index} should find diagnostic`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().smells;
      
      expect(result[index].diagnostic).toEqual(diagnostic);
    });
  });

  test('should identify the test cases that exists in the file', () => {
    const code = 'it("a", () => {});';
    const smellDetector = new SmellDetector('my-file.ts', code, TYPESCRIPT);
    const result = smellDetector.findAll().testCases;

    expect(result).toHaveLength(1);
  });

   describe.each([
   [{
      index: 0,
     code: `it("a", () => {
});`,
     language: TYPESCRIPT,
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
     language: TYPESCRIPT,
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
     language: TYPESCRIPT,
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
   ])('testCases', ({ index, code, language, testCases }) => {
    test(`should line start for test case at index ${index}`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().testCases;
 
      expect(result[index].lineStart).toEqual(testCases[index].lineStart);
    });

    test(`should  column start for test case at index ${index}`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().testCases;
 
      expect(result[index].startAt).toEqual(testCases[index].startAt);
    });
    
    test(`should line end for test case at index ${index}`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().testCases;
 
      expect(result[index].lineEnd).toEqual(testCases[index].lineEnd);
    });

    test(`should  column end for test case at index ${index}`, () => {
      const smellDetector = new SmellDetector('my-file', code, language);
      const result = smellDetector.findAll().testCases;
 
      expect(result[index].endsAt).toEqual(testCases[index].endsAt);
    });
   });
});
