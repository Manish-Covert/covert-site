import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOW_DID_YOU_HEAR } from './data'
import { getAttribution } from './utm'

/* Format keystrokes into US phone format: (123) 456-7890 */
function formatUSPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 10)
  const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6, 10)
  if (d.length > 6) return `(${a}) ${b}-${c}`
  if (d.length > 3) return `(${a}) ${b}`
  if (d.length > 0) return `(${a}`
  return ''
}

/* Shared contact form (fields + submit logic) used by the global footer
   and the dedicated /contact page. */
export default function ContactForm({ formName = 'contact' }) {
  const [status, setStatus] = useState('idle')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = Object.fromEntries(new FormData(form))
    // Attach the form name + campaign attribution captured on landing (if any).
    const payload = { ...data, ...getAttribution(), form: formName }
    const succeed = () => { form.reset(); setPhone(''); navigate('/thank-you?form=contact') }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      // No serverless functions in local `vite dev` → the SPA rewrite returns
      // index.html (200 non-JSON) or 404. Treat that as a dev success.
      if (res.status === 404) { succeed(); return }
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.ok) succeed()
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'ok') {
    return (
      <div className="form__success">
        <strong>Thank you!</strong> Your message has been sent. We&rsquo;ll be in touch shortly.
      </div>
    )
  }

  return (
    <form className="form reveal" onSubmit={handleSubmit}>
      <div className="form__row">
        <input name="first_name" type="text" required placeholder="First Name*" aria-label="First Name" />
        <input name="last_name" type="text" required placeholder="Last Name*" aria-label="Last Name" />
      </div>
      <div className="form__row">
        <input name="email" type="email" required placeholder="Email*" aria-label="Email" />
        <input
          name="phone"
          type="tel"
          required
          placeholder="(555) 123-4567"
          aria-label="Phone No"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={e => setPhone(formatUSPhone(e.target.value))}
        />
      </div>
      <p className="form__question">How did you hear about us?</p>
      <div className="form__row">
        <select name="referral" aria-label="How did you hear about us?" defaultValue="">
          {HOW_DID_YOU_HEAR.map(o => (
            <option key={o} value={o === 'Please choose one' ? '' : o}>{o}</option>
          ))}
        </select>
      </div>
      <textarea name="message" rows="7" placeholder="Message" aria-label="Message" />
      <label className="form__consent">
        <input type="checkbox" name="consent" required />
        <span>
          I authorize Covert Communication to contact me about products and services.
          Message and data rates may apply.<br />
          See our <a href="#contact">Privacy Policy</a> for more information.
        </span>
      </label>
      <button className="form__submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit'}
      </button>
      {status === 'error' && <p className="form__error">Something went wrong. Please try again.</p>}
    </form>
  )
}
