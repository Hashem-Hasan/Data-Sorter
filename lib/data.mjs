export const SAMPLE = [
  { project: 'Website redesign', team: 'Design', status: 'In progress', budget: 4200, hours: 36 },
  { project: 'API integration', team: 'Engineering', status: 'Review', budget: 6800, hours: 54 },
  { project: 'Brand refresh', team: 'Design', status: 'Complete', budget: 2400, hours: 22 },
  {
    project: 'Customer portal',
    team: 'Engineering',
    status: 'In progress',
    budget: 9200,
    hours: 82,
  },
  { project: 'Launch campaign', team: 'Marketing', status: 'Planned', budget: 3100, hours: 28 },
  { project: 'Product photography', team: 'Creative', status: 'Complete', budget: 1800, hours: 16 },
  { project: 'Analytics setup', team: 'Engineering', status: 'Review', budget: 2600, hours: 24 },
  { project: 'Content system', team: 'Marketing', status: 'Planned', budget: 3600, hours: 32 },
];
export function parseCSV(text) {
  const records = [];
  let row = [],
    cell = '',
    quoted = false,
    closed = false;
  const finish = () => {
    row.push(cell);
    cell = '';
    closed = false;
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else cell += c;
      continue;
    }
    if (c === '"') {
      if (cell || closed) throw Error('Unexpected quote. Quote the entire CSV field.');
      quoted = true;
    } else if (c === ',') finish();
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      finish();
      if (row.some((v) => v !== '')) records.push(row);
      row = [];
    } else {
      if (closed && !/\s/.test(c)) throw Error('Unexpected text after closing quote.');
      if (!closed) cell += c;
    }
  }
  if (quoted) throw Error('A CSV quoted field is not closed.');
  finish();
  if (row.some((v) => v !== '')) records.push(row);
  if (records.length < 2) throw Error('CSV needs headers and at least one data row.');
  const headers = records.shift().map((v) => v.trim());
  if (headers.some((h) => !h) || new Set(headers).size !== headers.length)
    throw Error('Column names must be unique and nonempty.');
  return records.map((r, i) => {
    if (r.length !== headers.length)
      throw Error(`Row ${i + 2} has ${r.length} fields; expected ${headers.length}.`);
    return Object.fromEntries(headers.map((h, j) => [h, r[j]]));
  });
}
export function parseData(text) {
  if (text.length > 5_000_000) throw Error('Keep input below 5 MB.');
  const trimmed = text.trim().replace(/^\uFEFF/, '');
  let rows;
  try {
    rows =
      trimmed.startsWith('[') || trimmed.startsWith('{') ? JSON.parse(trimmed) : parseCSV(trimmed);
  } catch (e) {
    throw Error(`Could not read the data. ${e.message}`);
  }
  if (!Array.isArray(rows) || !rows.length)
    throw Error('Use a nonempty JSON array of objects, or CSV with headers.');
  if (rows.length > 5000) throw Error('This workspace supports up to 5,000 rows.');
  if (rows.some((r) => !r || typeof r !== 'object' || Array.isArray(r)))
    throw Error('Every row must be an object with named columns.');
  const columns = [...new Set(rows.flatMap(Object.keys))];
  if (!columns.length || columns.length > 128) throw Error('Use between 1 and 128 columns.');
  return { rows, columns };
}
export function display(value) {
  return value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
}
export function uniqueRows(rows) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = JSON.stringify(
      Object.keys(row)
        .sort()
        .map((k) => [k, row[k]])
    );
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
export function sortRows(rows, key, direction = 'asc', algorithm = 'native') {
  const numeric = (v) =>
    (typeof v === 'number' || typeof v === 'string') &&
    String(v).trim() !== '' &&
    Number.isFinite(Number(v));
  let comparisons = 0;
  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  const compare = (a, b) => {
    comparisons++;
    const av = a[key],
      bv = b[key];
    const ae = av == null || av === '',
      be = bv == null || bv === '';
    if (ae || be) return ae === be ? 0 : ae ? 1 : -1;
    const value =
      numeric(av) && numeric(bv)
        ? Number(av) - Number(bv)
        : collator.compare(display(av), display(bv));
    return direction === 'desc' ? -value : value;
  };
  const output = [...rows];
  if (algorithm === 'selection') {
    if (rows.length > 500)
      throw Error('Selection sort is limited to 500 rows. Choose native sort for larger data.');
    for (let i = 0; i < output.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < output.length; j++) if (compare(output[j], output[min]) < 0) min = j;
      if (min !== i) {
        const [item] = output.splice(min, 1);
        output.splice(i, 0, item);
      }
    }
  } else output.sort(compare);
  return { rows: output, comparisons };
}
export function toCSV(rows, columns) {
  const escape = (value) => {
    let s = display(value);
    if (typeof value === 'string' && /^[\s\t\r]*[=+@-]/.test(s)) s = "'" + s;
    return '"' + s.replaceAll('"', '""') + '"';
  };
  return (
    '\uFEFF' +
    [
      columns.map(escape).join(','),
      ...rows.map((r) => columns.map((c) => escape(r[c])).join(',')),
    ].join('\r\n')
  );
}
