import { useState } from 'react'
import './App.css'
import './AdminLeads.css'

const COLUMNS = [
  { key: 'created_at', label: 'Date' },
  { key: 'first_name', label: 'First' },
  { key: 'last_name', label: 'Last' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'referral', label: 'Heard via' },
  { key: 'message', label: 'Message' },
  { key: 'utm_source', label: 'Source' },
  { key: 'utm_medium', label: 'Medium' },
  { key: 'utm_campaign', label: 'Campaign' },
  { key: 'gclid', label: 'gclid' },
  { key: 'fbclid', label: 'fbclid' },
  { key: 'msclkid', label: 'msclkid' },
  { key: 'ad_campaign', label: 'ad_campaign' },
  { key: 'ad_set_id', label: 'ad_set_id' },
  { key: 'ad_id', label: 'ad_id' },
  { key: 'landing_page', label: 'Landing page' },
  { key: 'referrer', label: 'Referrer' },
]

function toCsv(leads) {
  const header = COLUMNS.map(c => c.label)
  const rows = leads.map(l => COLUMNS.map(c => {
    const v = l[c.key] == null ? '' : String(l[c.key])
    return `"${v.replace(/"/g, '""')}"`
  }))
  return [header.join(','), ...rows.map(r => r.join(','))].join('\n')
}

export default function AdminLeadsPage() {
  const [password, setPassword] = useState('')
  const [leads, setLeads] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

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
      if (res.ok) { setLeads(json.leads || []); setStatus('done') }
      else { setError(json.error || 'Failed to load.'); setStatus('idle') }
    } catch {
      setError('Network error.'); setStatus('idle')
    }
  }

  function downloadCsv() {
    const blob = new Blob([toCsv(leads)], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (leads === null) {
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
        <h1 className="admin__title">Leads <span className="admin__count">{leads.length}</span></h1>
        <button type="button" className="btn btn--outline-pill" onClick={downloadCsv} disabled={!leads.length}>
          <span>Export CSV</span>
        </button>
      </div>
      {leads.length === 0 ? (
        <p className="admin__hint">No leads yet.</p>
      ) : (
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>{COLUMNS.map(c => <th key={c.key}>{c.label}</th>)}</tr>
            </thead>
            <tbody>
              {leads.map(l => (
                <tr key={l.id}>
                  {COLUMNS.map(c => (
                    <td key={c.key} title={l[c.key] || ''}>
                      {c.key === 'created_at' && l[c.key]
                        ? new Date(l[c.key]).toLocaleString()
                        : (l[c.key] || '')}
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
