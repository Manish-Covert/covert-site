import { useState } from 'react'
import Emblem from './Emblem'
import { useReveal } from './useReveal'
import './App.css'

const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'

const SERVICES = [
  {
    id: 'technology',
    title: 'Technology Consulting',
    count: 3,
    img: '/categories/technology.webp',
    icon: '/icons/tech.svg',
    subs: null,
  },
  {
    id: 'programmatic',
    title: 'Programmatic',
    count: 4,
    img: '/categories/programmatic.webp',
    icon: '/icons/programmatic.svg',
    subs: ['SEM', 'AEO', 'GEO', 'SEO'],
  },
  {
    id: 'social',
    title: 'Social Media',
    count: 4,
    img: '/categories/social.webp',
    icon: '/icons/social.svg',
    subs: null,
  },
  {
    id: 'fraud',
    title: 'Fraud Protection Gurus',
    count: 3,
    img: '/categories/fraud.webp',
    icon: '/icons/fraud.svg',
    subs: null,
  },
  {
    id: 'brand-creation',
    title: 'Brand Creation',
    count: 3,
    img: '/categories/brand-creation.webp',
    icon: '/icons/brand-creation.svg',
    subs: null,
  },
  {
    id: 'trad',
    title: 'Traditional Full Service',
    count: 6,
    img: '/categories/trad-full-service.webp',
    icon: '/icons/trad-full-service.svg',
    subs: null,
  },
  {
    id: 'brand-building',
    title: 'Brand Building',
    count: 4,
    img: '/categories/brand-building.webp',
    icon: '/icons/brand-building.svg',
    subs: null,
  },
  {
    id: 'brand-specialties',
    title: 'Brand Specialties',
    count: 7,
    img: '/categories/brand-specialties.webp',
    icon: '/icons/brand-specialties.svg',
    subs: null,
  },
]

const MEGA_SERVICES = [
  {
    heading: 'Performance',
    items: [
      { title: 'Programmatic', desc: 'Targeted media buying across every channel.' },
      { title: 'SEM / AEO / GEO / SEO', desc: 'Search, answer-engine, and local visibility.' },
      { title: 'Social Media', desc: 'Paid and organic strategy that converts.' },
      { title: 'Fraud Protection', desc: 'Keep your ad spend honest and clean.' },
    ],
  },
  {
    heading: 'Brand & Strategy',
    items: [
      { title: 'Brand Creation', desc: 'Identity systems built to scale.' },
      { title: 'Brand Building', desc: 'Long-term equity, not one-off campaigns.' },
      { title: 'Traditional Full Service', desc: 'TV, print, radio — done right.' },
      { title: 'Technology Consulting', desc: 'The stack and systems behind the brand.' },
    ],
  },
]

const HOW_DID_YOU_HEAR = [
  'Please choose one',
  'Google',
  'Social Media',
  'Referral',
  'Event',
  'Other',
]

export default function App() {
  useReveal()
  const [status, setStatus] = useState('idle')
  const [megaOpen, setMegaOpen] = useState(false)
  const [hoveredService, setHoveredService] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.target))
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      setTimeout(() => setStatus('ok'), 700)
      e.target.reset()
      return
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...data }),
      })
      const json = await res.json()
      if (json.success) { setStatus('ok'); e.target.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ===================== NAV ===================== */}
      <header className="nav">
        <div className="nav__inner">
          <a className="brand" href="#top" aria-label="Covert Communication home">
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 60 60">
                <path d="M44 18 A20 20 0 1 0 44 42"
                  fill="none" stroke="url(#ng)" strokeWidth="9" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c8f95a" />
                    <stop offset="100%" stopColor="#2f7d3a" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="brand__text">
              <strong>COVERT</strong>
              <em>COMMUNICATION</em>
            </span>
          </a>

          <nav className="nav__links">
            <a href="#about" className="nav__link">About</a>

            <div
              className="nav__item nav__item--mega"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                type="button"
                className="nav__link nav__link--trigger"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen(v => !v)}
              >
                Services
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor"
                    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className={`mega ${megaOpen ? 'mega--open' : ''}`}>
                <div className="mega__inner">
                  <div className="mega__cols">
                    {MEGA_SERVICES.map(col => (
                      <div className="mega__col" key={col.heading}>
                        <p className="mega__heading">{col.heading}</p>
                        {col.items.map(item => (
                          <a href="#services" className="mega__item" key={item.title}>
                            <span className="mega__item-title">{item.title}</span>
                            <span className="mega__item-desc">{item.desc}</span>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mega__feature">
                    <p className="mega__feature-eyebrow">Why Covert</p>
                    <h4 className="mega__feature-title">One team, every channel.</h4>
                    <p className="mega__feature-copy">
                      Strategy, media, and brand under one roof — built to move fast.
                    </p>
                    <a href="#contact" className="btn btn--green mega__feature-btn">Book Meeting &rarr;</a>
                  </div>
                </div>
              </div>
            </div>

            <a href="#case-studies" className="nav__link">Case Studies</a>
            <a href="#latest" className="nav__link">The Latest</a>
            <a href="#contact" className="nav__link">Contact</a>
            <a href="#contact" className="btn btn--pill-white">Book a Meeting &rarr;</a>
          </nav>
        </div>
      </header>

      {/* ===================== HERO — SERVICE GRID ===================== */}
      <main id="top">
        <section id="services" className="services-hero">
          <div className="services-grid">
            {SERVICES.map(svc => (
              <article
                key={svc.id}
                className={`svc-card${hoveredService === svc.id ? ' svc-card--hovered' : ''}`}
                onMouseEnter={() => setHoveredService(svc.id)}
                onMouseLeave={() => setHoveredService(null)}
                style={{ backgroundImage: `url(${svc.img})` }}
              >
                <div className="svc-card__overlay" />

                <img className="svc-card__icon" src={svc.icon} alt="" aria-hidden="true" />

                <div className="svc-card__body">
                  {svc.subs && hoveredService === svc.id ? (
                    <ul className="svc-card__subs">
                      {svc.subs.map(s => (
                        <li key={s}>
                          <a href="#contact">{s}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="svc-card__footer">
                    <h2 className="svc-card__title">{svc.title}</h2>
                    <span className="svc-card__count">{svc.count} Services</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== WE DO IT ALL ===================== */}
        <section id="about" className="about">
          <div className="container">
            <p className="section__eyebrow reveal">WE DO IT ALL</p>
            <h2 className="section__title reveal">
              Your full-service partner for brand, media, and technology.
            </h2>
            <p className="section__lead reveal">
              From programmatic media buying to brand identity, fraud protection to technology
              consulting — Covert Communication brings every discipline under one roof so your
              strategy moves fast and stays cohesive.
            </p>
            <div className="about__actions reveal">
              <a href="#contact" className="btn btn--green">Get Started</a>
            </div>
          </div>
        </section>

        {/* ===================== CASE STUDIES ===================== */}
        <section id="case-studies" className="case-studies">
          <div className="container">
            <p className="section__eyebrow reveal">Case Studies</p>
            <h2 className="section__title reveal">Work that moved the needle</h2>
            <p className="section__lead reveal">
              Selected results across brand, performance, and full-service campaigns.
            </p>
          </div>
        </section>

        {/* ===================== THE LATEST ===================== */}
        <section id="latest" className="latest">
          <div className="container">
            <p className="section__eyebrow reveal">The Latest</p>
            <h2 className="section__title reveal">News &amp; insights</h2>
            <p className="section__lead reveal">
              Updates from the Covert Communication team.
            </p>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="contact">
          <div className="contact__bg" aria-hidden="true" />
          <div className="container container--narrow">
            <p className="section__eyebrow reveal">Book a Meeting</p>
            <h2 className="section__title reveal">Let&rsquo;s Get Started</h2>
            <p className="contact__sub reveal">
              Call 808-518-4298 or fill out the form below to learn more about our services
              and innovative agency approach.
            </p>

            {status === 'ok' ? (
              <div className="form__success reveal">
                <strong>Thank you!</strong> Your message has been sent. We&rsquo;ll be in touch shortly.
              </div>
            ) : (
              <form className="form reveal" onSubmit={handleSubmit}>
                <div className="form__row">
                  <label>
                    <span>First Name *</span>
                    <input name="first_name" type="text" required placeholder="Jane" />
                  </label>
                  <label>
                    <span>Last Name *</span>
                    <input name="last_name" type="text" required placeholder="Doe" />
                  </label>
                </div>
                <div className="form__row">
                  <label>
                    <span>Email *</span>
                    <input name="email" type="email" required placeholder="jane@email.com" />
                  </label>
                  <label>
                    <span>Phone No *</span>
                    <input name="phone" type="tel" required placeholder="808-555-0100" />
                  </label>
                </div>
                <label>
                  <span>How did you hear about us?</span>
                  <select name="referral">
                    {HOW_DID_YOU_HEAR.map(o => (
                      <option key={o} value={o === 'Please choose one' ? '' : o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows="4"
                    placeholder="Tell us about your project…" />
                </label>
                <p className="form__consent">
                  I authorize Covert Communication to contact me about products and services.
                  Message and data rates may apply.{' '}
                  <a href="#contact">See our Privacy Policy for more information.</a>
                </p>
                <button className="btn btn--green" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Submit'}
                </button>
                {status === 'error' && (
                  <p className="form__error">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="footer__art" aria-hidden="true" />
        <div className="footer__inner">
          <span className="footer__mark" aria-hidden="true">
            <svg viewBox="0 0 60 60">
              <path d="M44 18 A20 20 0 1 0 44 42"
                fill="none" stroke="#0a0a0a" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </span>
          <div className="footer__social" aria-label="Social links">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">&#9678;</a>
          </div>
          <p className="footer__legal">
            Copyright 2026 Covert Communication LLC | All Rights Reserved | Privacy Policy |
            Cookie Preferences | Terms of Service | Site Map | 808-272-9952
          </p>
        </div>
      </footer>
    </>
  )
}
