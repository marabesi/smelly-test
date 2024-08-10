import * as assert from 'assert';
import { suite, test } from 'mocha';
import { SmellDetector } from '../smells-detector';

const IF_STATEMENT = 'if-statement';
const FOR_OF = 'for-of-statement';
const FOR_IN = 'for-in-statement';
const FOR = 'for-statement';
const TIMEOUT = 'timeout';
const CONSOLE = 'console-statement';
const MOCKERY = 'excessive-jest-mock';

const JAVASCRIPT = 'javascript';
const TYPESCRIPT = 'typescript';

suite('Smelly Extension Test Suite', () => {
  [{
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {

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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  }
  ].forEach(({ code, language, index, type, lineStart, lineEnd, startAt, endsAt, total }) => {
    test(`detect test smell for ${language}: type ${type} at index ${index}`, () => {
      const smellDetector = new SmellDetector(code, language);
      const result = smellDetector.findAll();

      assert.equal(result.length, total, 'number of detected smells is not correct');
      assert.equal(result[index].type, type, 'type');
      assert.equal(result[index].lineStart, lineStart, 'lineStart');
      assert.equal(result[index].lineEnd, lineEnd, 'lineEnd');
      assert.equal(result[index].startAt, startAt, 'startAt');
      assert.equal(result[index].endsAt, endsAt, 'endsAt');
    });
  });

  [{
    code: `
jest.mock("../");`,
    language: TYPESCRIPT,
  }
  ].forEach(({ code, language  }) => {
    test(`detect code without smells`, () => {
      const smellDetector = new SmellDetector(code, language);
      const result = smellDetector.findAll();

      assert.equal(result.length, 0);
    });
  });
});
