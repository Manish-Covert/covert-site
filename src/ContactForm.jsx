import { useState } from 'react'
import { HOW_DID_YOU_HEAR } from './data'

/* Shared contact form (fields + submit logic) used by the global footer
   and the dedicated /contact page. */
export default function ContactForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.target))
    if (!window.WEB3FORMS_KEY || window.WEB3FORMS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      setTimeout(() => setStatus('ok'), 700)
      e.target.reset()
      return
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: window.WEB3FORMS_KEY, ...data }),
      })
      const json = await res.json()
      if (json.success) { setStatus('ok'); e.target.reset() }
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
        <input name="phone" type="tel" required placeholder="Phone No*" aria-label="Phone No" />
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
