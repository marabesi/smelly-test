import * as assert from 'assert';
import { suite, test } from 'mocha';
import { SmellDetector } from '../smells-detector';

const IF_STATEMENT = 'if-statement';
const FOR_OF = 'for-of-statement';
const TIMEOUT = 'timeout';

const JAVASCRIPT = 'javascript';
const TYPESCRIPT = 'typescript';

suite('Smelly Extension Test Suite', () => {
  suite('Javascript', () => {
    test('find if in the test code', () => {
      const code = `const a = 1;
if (a === 1) {}`;
  
      const smellDetector = new SmellDetector(code, JAVASCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type, IF_STATEMENT);
      assert.equal(result[0].lineStart, 2);
      assert.equal(result[0].lineEnd, 2);
      assert.equal(result[0].startAt, 0);
      assert.equal(result[0].endsAt, 15);
    });
  
    test('find for in the test code', () => {
      const code = `const lists = [{}, {}];
  
for (const i of lists) {

}`;

      const smellDetector = new SmellDetector(code, JAVASCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type,FOR_OF);
      assert.equal(result[0].lineStart, 3);
      assert.equal(result[0].lineEnd, 5);
      assert.equal(result[0].startAt, 0);
      assert.equal(result[0].endsAt, 1);
    });
    
    test('find timeout in the test code', () => {
      const code = `setTimeout(() => {
  done();
});`;

      const smellDetector = new SmellDetector(code, JAVASCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type, 'timeout', 'type');
      assert.equal(result[0].lineStart, 1, 'line start');
      assert.equal(result[0].lineEnd, 3, 'line end');
      assert.equal(result[0].startAt, 0, 'start at');
      assert.equal(result[0].endsAt, 2, 'end at');
    });

    test('find timeout with function defined in the test code', () => {
      const code = `function done() {};
setTimeout(() => {
  done();
});`;

      const smellDetector = new SmellDetector(code, JAVASCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type, 'timeout', 'type');
      assert.equal(result[0].lineStart, 2, 'line start');
      assert.equal(result[0].lineEnd, 4, 'line end');
      assert.equal(result[0].startAt, 0, 'start at');
      assert.equal(result[0].endsAt, 2, 'end at');
    });
  });

  suite('Typescript', () => {
    test('find if in the test code', () => {
      const code = `const a: number = 1;
if (a === 1) { }`;

      const smellDetector = new SmellDetector(code, TYPESCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type, IF_STATEMENT);
      assert.equal(result[0].lineStart, 2, 'line start');
      assert.equal(result[0].lineEnd, 2, 'line end');
      assert.equal(result[0].startAt, 0, 'start at');
      assert.equal(result[0].endsAt, 16, 'end at');
    });

    test('find multiple ifs in the test code', () => {
      const code = `const a: number = 1;
if (a === 1) { }
if (a === 2) {
  console.log('this is a test');
}`;

      const smellDetector = new SmellDetector(code, TYPESCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result.length, 2);
    });

    test('detect the second if in the source code', () => {
      const code = `const a: number = 1;
if (a === 1) { }
if (a === 2) {
  console.log('this is a test');
}`;

      const smellDetector = new SmellDetector(code, TYPESCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[1].type, IF_STATEMENT);
      assert.equal(result[1].lineStart, 3, 'line start');
      assert.equal(result[1].lineEnd, 5, 'line end');
      assert.equal(result[1].startAt, 0, 'start at');
      assert.equal(result[1].endsAt, 1, 'end at');
    });

    test('find for in the test code', () => {
      const code = `const lists: any[] = [{}, {}];
  
for (const i of lists) {

}`;

      const smellDetector = new SmellDetector(code, TYPESCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type,FOR_OF);
      assert.equal(result[0].lineStart, 3);
      assert.equal(result[0].lineEnd, 5);
      assert.equal(result[0].startAt, 0);
      assert.equal(result[0].endsAt, 1);
    });

    test('find timeout in the test code', () => {
      const code = `setTimeout(() => {
  done();
});`;

      const smellDetector = new SmellDetector(code, TYPESCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type, TIMEOUT, 'type');
      assert.equal(result[0].lineStart, 1, 'line start');
      assert.equal(result[0].lineEnd, 3, 'line end');
      assert.equal(result[0].startAt, 0, 'start at');
      assert.equal(result[0].endsAt, 2, 'end at');
    });

    test('find timeout and function in the test code', () => {
      const code = `function done() {};
setTimeout(() => {
  done();
});`;
  
      const smellDetector = new SmellDetector(code, TYPESCRIPT);
      const result = smellDetector.findAll();
  
      assert.equal(result[0].type, TIMEOUT, 'type');
      assert.equal(result[0].lineStart, 2, 'line start');
      assert.equal(result[0].lineEnd, 4, 'line end');
      assert.equal(result[0].startAt, 0, 'start at');
      assert.equal(result[0].endsAt, 2, 'end at');
    });
  });
});
