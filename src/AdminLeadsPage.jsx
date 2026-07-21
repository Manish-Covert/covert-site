import { useState, useMemo } from 'react'
import './App.css'
import './AdminLeads.css'

// Preferred column order; any other keys found in the data are appended after.
const PINNED = [
  'created_at', 'form', 'first_name', 'last_name', 'email', 'phone', 'referral', 'message',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'msclkid', 'ad_campaign', 'ad_set_id', 'ad_id',
  'landing_page', 'referrer',
]
const HIDDEN = new Set(['id', 'name', 'data'])

function humanize(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/* Flatten a DB row (first-class cols + JSONB data) into one display object. */
function flatten(row) {
  const data = row.data && typeof row.data === 'object' ? row.data : {}
  return {
    id: row.id,
    created_at: row.created_at,
    form: row.form || data.form || '',
    email: row.email || data.email || '',
    ...data,
  }
}

function toCsv(rows, columns) {
  const header = columns.map(humanize)
  const body = rows.map(r => columns.map(c => `"${String(r[c] ?? '').replace(/"/g, '""')}"`))
  return [header.join(','), ...body.map(r => r.join(','))].join('\n')
}

export default function AdminLeadsPage() {
  const [password, setPassword] = useState('')
  const [rows, setRows] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [formFilter, setFormFilter] = useState('All')

  async function load(e) {
    e?.preventDefault()
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.status === 401) { setError('Incorrect password.'); setStatus('idle'); return }
      const json = await res.json()
      if (res.ok) { setRows((json.leads || []).map(flatten)); setStatus('done') }
      else { setError([json.error, json.detail].filter(Boolean).join(' — ') || 'Failed to load.'); setStatus('idle') }
    } catch {
      setError('Network error.'); setStatus('idle')
    }
  }

  const forms = useMemo(
    () => ['All', ...Array.from(new Set((rows || []).map(r => r.form).filter(Boolean)))],
    [rows]
  )
  const filtered = useMemo(
    () => (formFilter === 'All' ? (rows || []) : (rows || []).filter(r => r.form === formFilter)),
    [rows, formFilter]
  )
  // Columns = pinned keys present in the data, then any extra keys discovered.
  const columns = useMemo(() => {
    const present = new Set()
    filtered.forEach(r => Object.keys(r).forEach(k => { if (!HIDDEN.has(k)) present.add(k) }))
    const pinned = PINNED.filter(k => present.has(k))
    const extra = [...present].filter(k => !PINNED.includes(k)).sort()
    return [...pinned, ...extra]
  }, [filtered])

  function downloadCsv() {
    const blob = new Blob([toCsv(filtered, columns)], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (rows === null) {
    return (
      <main className="admin">
        <form className="admin__gate" onSubmit={load}>
          <h1 className="admin__title">Leads</h1>
          <p className="admin__hint">Enter the admin password to view submitted leads.</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Admin password"
            autoFocus
          />
          <button type="submit" className="btn btn--green" disabled={status === 'loading' || !password}>
            {status === 'loading' ? 'Checking…' : 'View leads'}
          </button>
          {error && <p className="admin__error">{error}</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="admin admin--wide">
      <div className="admin__bar">
        <h1 className="admin__title">Leads <span className="admin__count">{filtered.length}</span></h1>
        <div className="admin__controls">
          {forms.length > 2 && (
            <label className="admin__filter">
              Form:&nbsp;
              <select value={formFilter} onChange={e => setFormFilter(e.target.value)}>
                {forms.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </label>
          )}
          <button type="button" className="btn btn--outline-pill" onClick={downloadCsv} disabled={!filtered.length}>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="admin__hint">No leads yet.</p>
      ) : (
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>{columns.map(c => <th key={c}>{humanize(c)}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  {columns.map(c => (
                    <td key={c} title={r[c] == null ? '' : String(r[c])}>
                      {c === 'created_at' && r[c]
                        ? new Date(r[c]).toLocaleString()
                        : (r[c] == null ? '' : String(r[c]))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
