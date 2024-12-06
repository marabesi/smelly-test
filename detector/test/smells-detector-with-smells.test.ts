import { describe, expect, test } from 'vitest';
import { SmellDetector } from '../src/index';
import { CONSOLE, FOR, FOR_IN, FOR_OF, IF_STATEMENT, JAVASCRIPT, MOCKERY, TIMEOUT, TYPESCRIPT } from './smells-detector-builder';


describe('Smelly Test Smell Detection Suite', () => {
  test.each([[{
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
    const smellDetector = new SmellDetector(code, language);
    const result = smellDetector.findAll();

    expect(result.length).toEqual(total);
    expect(result[index].type).toEqual(type);
    expect(result[index].lineStart).toEqual(lineStart);
    expect(result[index].lineEnd).toEqual(lineEnd);
    expect(result[index].startAt).toEqual(startAt);
    expect(result[index].endsAt).toEqual(endsAt);
    expect(result[index].description).toEqual(description);
    expect(result[index].diagnostic).toEqual(diagnostic);
  });
});
