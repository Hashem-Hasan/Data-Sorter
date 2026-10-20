'use client';
import { useMemo, useRef, useState } from 'react';
import Icon from './components/Icon';
import { SAMPLE, parseData, sortRows, uniqueRows, toCSV, display } from '../lib/data.mjs';
export default function Home() {
  const [source, setSource] = useState(JSON.stringify(SAMPLE, null, 2)),
    [dataset, setDataset] = useState({ rows: SAMPLE, columns: Object.keys(SAMPLE[0]) });
  const [key, setKey] = useState('budget'),
    [direction, setDirection] = useState('desc'),
    [algorithm, setAlgorithm] = useState('native'),
    [query, setQuery] = useState(''),
    [dedupe, setDedupe] = useState(false),
    [error, setError] = useState(''),
    [note, setNote] = useState(
      'Example project data loaded. Select a column heading to change the order.'
    );
  const file = useRef(null);
  const result = useMemo(() => {
    try {
      let rows = dedupe ? uniqueRows(dataset.rows) : dataset.rows;
      if (query.trim())
        rows = rows.filter((r) =>
          Object.values(r).some((v) => display(v).toLowerCase().includes(query.toLowerCase()))
        );
      return { ...sortRows(rows, key, direction, algorithm), error: '' };
    } catch (e) {
      return { rows: [], comparisons: 0, error: e.message };
    }
  }, [dataset, key, direction, algorithm, query, dedupe]);
  const blanks = dataset.rows.reduce(
    (n, row) => n + dataset.columns.filter((c) => row[c] == null || row[c] === '').length,
    0
  );
  function apply(text = source) {
    try {
      const data = parseData(text);
      setDataset(data);
      setSource(text);
      setKey(data.columns[0]);
      setQuery('');
      setError('');
      setNote(
        `${data.rows.length.toLocaleString()} rows imported. Your data stays in this browser tab.`
      );
    } catch (e) {
      setError(e.message);
    }
  }
  async function importFile(f) {
    if (!f) return;
    if (f.size > 5_000_000) {
      setError('Choose a file below 5 MB.');
      return;
    }
    try {
      apply(await f.text());
    } catch {
      setError('The file could not be read. Try CSV or JSON.');
    }
  }
  function download(kind) {
    const content =
      kind === 'csv' ? toCSV(result.rows, dataset.columns) : JSON.stringify(result.rows, null, 2);
    const url = URL.createObjectURL(
      new Blob([content], { type: kind === 'csv' ? 'text/csv;charset=utf-8' : 'application/json' })
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = `rowcraft-export.${kind}`;
    a.click();
    URL.revokeObjectURL(url);
    setNote(`${result.rows.length} rows exported as ${kind.toUpperCase()}.`);
  }
  function headerSort(c) {
    if (c === key) setDirection(direction === 'asc' ? 'desc' : 'asc');
    else {
      setKey(c);
      setDirection('asc');
    }
  }
  return (
    <div className="container">
      <nav className="nav" aria-label="Main">
        <a href="#" className="brand">
          <span className="brandmark">
            <Icon name="sort" />
          </span>
          rowcraft<span className="version">/ 02</span>
        </a>
        <div className="navlinks">
          <a href="#how">How it works</a>
          <a href="https://github.com/Hashem-Hasan/Data-Sorter">
            Source code <Icon size={15} />
          </a>
        </div>
      </nav>
      <main id="main">
        <section className="hero">
          <div>
            <div className="eyebrow">
              <span className="dot" /> A SMALL TOOL FOR BIG SPREADSHEETS
            </div>
            <h1>
              Your data.
              <br />
              <span className="serif">In good order.</span>
            </h1>
            <p>
              From a messy export to a useful dataset. Sort, search and tidy your CSV or JSON in one
              quiet workspace.
            </p>
          </div>
          <div className="hero-note">
            <strong>Private by design.</strong>No uploads. No accounts. Everything happens in your
            browser, and nothing is saved when you leave.
          </div>
        </section>
        <div className="grid3 stats">
          <div className="stat">
            <span>ROWS IN YOUR DATASET</span>
            <strong>
              {dataset.rows.length.toLocaleString()}
              <small> records</small>
            </strong>
          </div>
          <div className="stat">
            <span>COLUMNS DISCOVERED</span>
            <strong>
              {dataset.columns.length.toString().padStart(2, '0')}
              <small> fields</small>
            </strong>
          </div>
          <div className="stat">
            <span>EMPTY CELLS</span>
            <strong>
              {blanks.toLocaleString()}
              <small> to review</small>
            </strong>
          </div>
        </div>
        <div className="workspace">
          <section className="panel" aria-labelledby="input-title">
            <div className="panel-head">
              <h2 id="input-title">
                <span className="step">01</span> Start with your data
              </h2>
              <span className="badge">CSV / JSON</span>
            </div>
            <div className="panel-body">
              <div
                className="dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  importFile(e.dataTransfer.files[0]);
                }}
              >
                <Icon name="upload" size={23} />
                <strong>Drop a file, or browse</strong>
                <span>CSV or JSON · up to 5 MB / 5,000 rows</span>
                <button onClick={() => file.current.click()} className="subtle">
                  Choose file
                </button>
                <input
                  ref={file}
                  type="file"
                  accept=".csv,.json,text/csv,application/json"
                  className="sr-only"
                  aria-label="Import CSV or JSON file"
                  onChange={(e) => {
                    importFile(e.target.files[0]);
                    e.target.value = '';
                  }}
                />
              </div>
              <label htmlFor="source">
                Or paste your data
                <textarea
                  id="source"
                  spellCheck="false"
                  className="mono data-editor"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'input-error' : undefined}
                />
              </label>
              {error && (
                <div className="error" id="input-error" role="alert">
                  {error}
                </div>
              )}
              <div className="actions input-actions">
                <button className="primary" onClick={() => apply()}>
                  Apply data <Icon size={16} />
                </button>
                <button onClick={() => apply(JSON.stringify(SAMPLE, null, 2))}>Load example</button>
              </div>
            </div>
          </section>
          <section className="panel" aria-labelledby="output-title">
            <div className="panel-head">
              <h2 id="output-title">
                <span className="step">02</span> Make it useful
              </h2>
              <span className="badge">
                <span className="dot" /> Local workspace
              </span>
            </div>
            <div className="panel-body">
              <div className="toolbar">
                <label>
                  Sort column
                  <select value={key} onChange={(e) => setKey(e.target.value)}>
                    {dataset.columns.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Direction
                  <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                    <option value="asc">Ascending ↑</option>
                    <option value="desc">Descending ↓</option>
                  </select>
                </label>
                <label>
                  Algorithm
                  <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="native">Native stable sort</option>
                    <option value="selection">Selection sort · learn</option>
                  </select>
                </label>
              </div>
              <div className="filter-row">
                <label className="search">
                  <Icon name="search" size={17} />
                  <input
                    type="search"
                    aria-label="Search all columns"
                    placeholder="Search across all columns…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={dedupe}
                    onChange={(e) => setDedupe(e.target.checked)}
                  />{' '}
                  Remove duplicates
                </label>
              </div>
            </div>
            {result.error ? (
              <div className="error" role="alert">
                {result.error}
              </div>
            ) : (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      {dataset.columns.map((c) => (
                        <th
                          scope="col"
                          key={c}
                          aria-sort={
                            key === c ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'
                          }
                        >
                          <button className="column-sort" onClick={() => headerSort(c)}>
                            {c} {key === c ? (direction === 'asc' ? '↑' : '↓') : ''}
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.slice(0, 250).map((r, i) => (
                      <tr key={i}>
                        <td className="row-num">{String(i + 1).padStart(2, '0')}</td>
                        {dataset.columns.map((c) => (
                          <td key={c} title={display(r[c])}>
                            {display(r[c]) || <span className="muted">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!result.rows.length && (
                  <div className="empty">No matching rows. Try another search.</div>
                )}
              </div>
            )}
            <div className="output-foot">
              <span>
                {result.rows.length} matching rows · {result.comparisons} comparisons
                <br />
                {result.rows.length > 250
                  ? 'Preview shows 250; exports include every matching row.'
                  : 'Stable order. Empty values stay at the end.'}
              </span>
              <div className="actions">
                <button disabled={!result.rows.length} onClick={() => download('csv')}>
                  <Icon name="download" size={16} /> CSV
                </button>
                <button disabled={!result.rows.length} onClick={() => download('json')}>
                  JSON
                </button>
              </div>
            </div>
          </section>
        </div>
        <p className="status-line small" role="status">
          {note}
        </p>
        <section id="how" className="section">
          <div className="section-title">
            <h2>
              Less wrangling.
              <br />
              More understanding.
            </h2>
            <p className="small">A practical workbench with a little computer science inside.</p>
          </div>
          <div className="grid3 explainer">
            <article>
              <span>01 / IMPORT</span>
              <h3>Your format, your columns.</h3>
              <p>
                Quoted CSV fields, Unicode, mixed types and JSON objects. Columns are discovered
                automatically; errors leave your last valid dataset intact.
              </p>
            </article>
            <article>
              <span>02 / TRANSFORM</span>
              <h3>A predictable sort.</h3>
              <p>
                Numbers sort numerically, text sorts naturally, and equal values keep their order.
                Selection-sort mode makes O(n²) comparisons visible, up to 500 rows.
              </p>
            </article>
            <article>
              <span>03 / TAKE IT WITH YOU</span>
              <h3>Ready for the next step.</h3>
              <p>
                Export all matching rows as JSON or spreadsheet-ready CSV. Exports neutralize
                leading formula characters; your original data is unchanged.
              </p>
            </article>
          </div>
        </section>
      </main>
      <footer className="footer">
        <span>Rowcraft / Built by Hashem Hasan</span>
        <a href="https://www.tarneebtech.com/">
          More of my work <Icon size={14} />
        </a>
        <span>No data leaves this workspace.</span>
      </footer>
    </div>
  );
}
