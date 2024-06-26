import * as assert from 'assert';
import { suite, test } from 'mocha';
import { SmellDetector } from './smells-detector';

suite('Extension Test Suite', () => {
  test('find if in the test code', () => {
    const code = `const a = 1;
if (a === 1) {}`;

    const smellDetector = new SmellDetector(code);
    const result = smellDetector.findAll();

    assert.equal(result[0].type, 'if-statement');
    assert.equal(result[0].lineStart, 2);
    assert.equal(result[0].lineEnd, 2);
    assert.equal(result[0].startAt, 0);
    assert.equal(result[0].endsAt, 15);
  });
});
