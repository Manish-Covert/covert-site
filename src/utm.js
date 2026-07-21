/* Marketing attribution capture.
   Grabs campaign params from the landing URL and keeps them for the whole
   browser session (first-touch) so they survive react-router page transitions
   and ride along with the contact form submission. */

const ATTRIB_KEYS = [
  'gclid', 'fbclid', 'msclkid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'ad_set_id', 'ad_id', 'ad_campaign',
]
const STORAGE_KEY = 'cc_attrib'

/* Call once on app load (before any in-app navigation). Only stores when the
   landing URL actually carries campaign params, and never overwrites an
   existing first-touch value for the session. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const found = {}
    let any = false
    for (const k of ATTRIB_KEYS) {
      const v = params.get(k)
      if (v) { found[k] = v; any = true }
    }
    if (any) {
      found.landing_page = window.location.href
      found.referrer = document.referrer || ''
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
    }
  } catch { /* sessionStorage unavailable — ignore */ }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}
