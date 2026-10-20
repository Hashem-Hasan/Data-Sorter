import test from 'node:test';
import assert from 'node:assert/strict';
import { parseData, parseCSV, sortRows, uniqueRows, toCSV } from '../lib/data.mjs';
test('CSV quoted commas, newlines, escaped quotes and Unicode', () => {
  const rows = parseCSV('name,note\r\n"هشام","A, B\n""quoted"""\r\n');
  assert.equal(rows[0].name, 'هشام');
  assert.equal(rows[0].note, 'A, B\n"quoted"');
});
test('malformed CSV and row shapes fail clearly', () => {
  for (const v of ['a,a\n1,2', 'a,b\n1', 'a\n"unclosed']) assert.throws(() => parseCSV(v));
  for (const v of ['[]', '[1]', '{"a":1}']) assert.throws(() => parseData(v));
});
test('numeric sorting and empty values last in both directions', () => {
  const rows = [{ x: null }, { x: '12' }, { x: 2 }, { x: '' }];
  assert.deepEqual(
    sortRows(rows, 'x').rows.map((r) => r.x),
    [2, '12', null, '']
  );
  assert.deepEqual(
    sortRows(rows, 'x', 'desc').rows.map((r) => r.x),
    ['12', 2, null, '']
  );
  assert.equal(rows[0].x, null);
});
test('both algorithms preserve ties and selection counts comparisons', () => {
  const rows = [
    { x: 2, id: 'a' },
    { x: 2, id: 'b' },
    { x: 1, id: 'c' },
  ];
  for (const a of ['native', 'selection'])
    assert.deepEqual(
      sortRows(rows, 'x', 'asc', a).rows.map((r) => r.id),
      ['c', 'a', 'b']
    );
  assert.equal(sortRows(rows, 'x', 'asc', 'selection').comparisons, 3);
});
test('deduplication ignores key order; exports neutralize formulas', () => {
  assert.equal(
    uniqueRows([
      { a: 1, b: 2 },
      { b: 2, a: 1 },
    ]).length,
    1
  );
  assert.ok(toCSV([{ a: '=HYPERLINK("bad")' }], ['a']).includes("'=HYPERLINK"));
});
test('excessive input and quadratic sorting are bounded', () => {
  assert.throws(() =>
    sortRows(
      Array.from({ length: 501 }, (_, i) => ({ x: i })),
      'x',
      'asc',
      'selection'
    )
  );
  assert.throws(() => parseData(JSON.stringify(Array.from({ length: 5001 }, () => ({ x: 1 })))));
});
