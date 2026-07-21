import { useState, useMemo } from 'react'
import './App.css'
import './AdminLeads.css'

const ATTRIB = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'msclkid', 'ad_campaign', 'ad_set_id', 'ad_id',
  'landing_page', 'referrer',
]
const CONTACT_FIELDS = ['first_name', 'last_name', 'email', 'phone', 'referral', 'message']
const HIDDEN = new Set(['id', 'name', 'data', 'form', 'created_at'])

function humanize(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
function fullName(r) {
  return `${r.first_name || ''} ${r.last_name || ''}`.trim() || r.email || '—'
}

/* Flatten a DB row (first-class cols + JSONB data) into one display object. */
function flatten(row) {
  const data = row.data && typeof row.data === 'object' ? row.data : {}
  return {
    id: row.id,
    created_at: row.created_at,
    form: row.form || data.form || '',
    ...data,
    email: row.email || data.email || '',
  }
}

function allColumns(rows) {
  const set = new Set()
  rows.forEach(r => Object.keys(r).forEach(k => { if (k !== 'data') set.add(k) }))
  const order = ['created_at', 'form', ...CONTACT_FIELDS, ...ATTRIB]
  const pinned = order.filter(k => set.has(k))
  const extra = [...set].filter(k => !order.includes(k) && k !== 'id').sort()
  return ['id', ...pinned, ...extra]
}

function toCsv(rows, columns) {
  const header = columns.map(humanize)
  const body = rows.map(r => columns.map(c => `"${String(r[c] ?? '').replace(/"/g, '""')}"`))
  return [header.join(','), ...body.map(r => r.join(','))].join('\n')
}

/* ---- Detail modal ---- */
function LeadDetail({ lead, onClose }) {
  const section = (title, keys) => {
    const present = keys.filter(k => lead[k])
    if (!present.length) return null
    return (
      <div className="lead__section" key={title}>
        <h3 className="lead__section-title">{title}</h3>
        <dl className="lead__grid">
          {present.map(k => (
            <div className="lead__pair" key={k}>
              <dt>{humanize(k)}</dt>
              <dd>{String(lead[k])}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }
  const known = new Set([...CONTACT_FIELDS, ...ATTRIB, ...HIDDEN])
  const other = Object.keys(lead).filter(k => !known.has(k))

  return (
    <div className="lead__scrim" onClick={onClose}>
      <div className="lead__modal" onClick={e => e.stopPropagation()}>
        <div className="lead__head">
          <div>
            <h2 className="lead__name">{fullName(lead)}</h2>
            <p className="lead__meta">
              {lead.form && <span className="lead__badge">{lead.form}</span>}
              {lead.created_at && new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
          <button type="button" className="lead__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="lead__body">
          {section('Contact', CONTACT_FIELDS)}
          {section('Attribution', ATTRIB)}
          {section('Other', other)}
        </div>
      </div>
    </div>
  )
}

export default function AdminLeadsPage() {
  const [password, setPassword] = useState('')
  const [rows, setRows] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [formFilter, setFormFilter] = useState('All')
  const [selected, setSelected] = useState(null)

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

  function downloadCsv() {
    const cols = allColumns(filtered)
    const blob = new Blob([toCsv(filtered, cols)], { type: 'text/csv' })
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
        <ul className="lead-list">
          {filtered.map(r => (
            <li key={r.id}>
              <button type="button" className="lead-row" onClick={() => setSelected(r)}>
                <span className="lead-row__name">{fullName(r)}</span>
                <span className="lead-row__email">{r.email}</span>
                {r.utm_source && <span className="lead-row__src">{r.utm_source}</span>}
                {r.form && <span className="lead-row__form">{r.form}</span>}
                <span className="lead-row__date">
                  {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && <LeadDetail lead={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}
