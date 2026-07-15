import { useState } from 'react'
import { HOW_DID_YOU_HEAR } from './data'

/* Global footer: "Let's Get Started" contact form section + site footer,
   shared across all pages. */
export default function SiteFooter() {
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

  return (
    <>
      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="contact">
        <div className="contact__inner">
          <h2 className="contact__title reveal">Let&rsquo;s Get Started</h2>
          <p className="contact__sub reveal">
            Call <strong>808-518-4298</strong> or fill out the form below to learn more about our
            services and innovative agency approach.
          </p>
          {status === 'ok' ? (
            <div className="form__success reveal">
              <strong>Thank you!</strong> Your message has been sent. We&rsquo;ll be in touch shortly.
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="footer__inner">
          <img src="/CC_Icon.png" alt="Covert Communication" className="footer__logo" />
          <div className="footer__social" aria-label="Social links">
            <a href="https://www.linkedin.com/company/covert-communication/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/icons/sm_linkdin.svg" alt="LinkedIn" />
            </a>
            <a href="https://facebook.com/covertcommunication" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/icons/sm_fb.svg" alt="Facebook" />
            </a>
            <a href="mailto:anna@covertcommunication.com" aria-label="Email">
              <img src="/icons/sm_email.svg" alt="Email" />
            </a>
          </div>
          <p className="footer__legal">
            Copyright 2026 Covert Communication LLC | All Rights Reserved |{' '}
            <a href="#">Privacy Policy</a> |{' '}
            <a href="#">Cookie Preferences</a> |{' '}
            <a href="#">Terms of Service</a> |{' '}
            <a href="#">Site Map</a> | 808-272-9952
          </p>
        </div>
      </footer>
    </>
  )
}
