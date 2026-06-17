import { useState } from 'react'
import Emblem from './Emblem'
import { useReveal } from './useReveal'
import './App.css'

/* ---- Replace this with your own Web3Forms access key (free at web3forms.com) ---- */
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'

const SERVICES_LEFT = [
  { lines: ['Programmatic', 'SEM / AEO / GEO / SEO'] },
  { lines: ['Social Media'] },
  { lines: ['Fraud Protection Gurus'] },
  { lines: ['Technology Consulting'] },
]
const SERVICES_RIGHT = [
  { lines: ['Brand Creation'] },
  { lines: ['Traditional Full Service'] },
  { lines: ['Brand Building'] },
  { lines: ['Brand Specialties'] },
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
      { title: 'Traditional Full Service', desc: 'TV, print, radio &mdash; done right.' },
      { title: 'Technology Consulting', desc: 'The stack and systems behind the brand.' },
    ],
  },
]

export default function App() {
  useReveal()
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [megaOpen, setMegaOpen] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.target))

    // If no key is set yet, simulate success so the demo still works.
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
      if (json.success) {
        setStatus('ok')
        e.target.reset()
      } else {
        setStatus('error')
      }
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
            <img src="/logo.png" alt="Covert Communication" className="brand__logo" />
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
                onClick={() => setMegaOpen((v) => !v)}
              >
                Services
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className={`mega ${megaOpen ? 'mega--open' : ''}`}>
                <div className="mega__inner">
                  <div className="mega__cols">
                    {MEGA_SERVICES.map((col) => (
                      <div className="mega__col" key={col.heading}>
                        <p className="mega__heading">{col.heading}</p>
                        {col.items.map((item) => (
                          <a href="#about" className="mega__item" key={item.title}>
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
                      Strategy, media, and brand under one roof &mdash; built to move fast.
                    </p>
                    <a href="#contact" className="btn btn--green mega__feature-btn">Book Meeting &rarr;</a>
                  </div>
                </div>
              </div>
            </div>

            <a href="#case-studies" className="nav__link">Case Studies</a>
            <a href="#latest" className="nav__link">The Latest</a>
            <a href="#contact" className="nav__link">Contact</a>
            <a href="#contact" className="btn btn--pill-white">Book Meeting &rarr;</a>
          </nav>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <main id="top">
        <section className="hero">
          {/* emblem + floating service tags, clipped to this row only */}
          <div className="hero__top">
            <div className="tags tags--left">
              {SERVICES_LEFT.map((s, i) => (
                <Tag key={i} index={i} side="left" lines={s.lines} />
              ))}
            </div>

            <div className="hero__emblem reveal">
              <Emblem />
            </div>

            <div className="tags tags--right">
              {SERVICES_RIGHT.map((s, i) => (
                <Tag key={i} index={i} side="right" lines={s.lines} />
              ))}
            </div>
          </div>

          {/* headline */}
          <div className="hero__copy">
            <p className="hero__eyebrow reveal">WE DO IT ALL</p>
            <h1 className="hero__title reveal">
              Lorem ipsum dolor sit amet, consectetue Lorem ipsum dolor sit amet, consectetuer
            </h1>
            <a href="#contact" className="btn btn--outline reveal">Get Started</a>
          </div>

          {/* portrait */}
          <div className="hero__portrait reveal" aria-label="Founder portrait">
            <div className="portrait__frame">
              <div className="portrait__placeholder">
                <span>Your portrait here</span>
                <small>swap <code>/portrait.png</code></small>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section id="about" className="about">
          <div className="container">
            <p className="section__eyebrow reveal">About</p>
            <h2 className="section__title reveal">Brand Specialties</h2>
            <p className="section__lead reveal">
              Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit. We blend strategy, technology, and creative
              craft to build brands that move.
            </p>
            <div className="cards">
              {['Brand Creation', 'Technology Consulting', 'Fraud Protection Gurus',
                'Traditional Full Service'].map((c, i) => (
                <article className="card reveal" style={{ transitionDelay: `${i * 80}ms` }} key={c}>
                  <span className="card__num">0{i + 1}</span>
                  <h3>{c}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CASE STUDIES ===================== */}
        <section id="case-studies" className="case-studies">
          <div className="container">
            <p className="section__eyebrow reveal">Case Studies</p>
            <h2 className="section__title reveal">Work that moved the needle</h2>
            <p className="section__lead reveal">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Selected results
              across brand, performance, and full-service campaigns.
            </p>
          </div>
        </section>

        {/* ===================== THE LATEST ===================== */}
        <section id="latest" className="latest">
          <div className="container">
            <p className="section__eyebrow reveal">The Latest</p>
            <h2 className="section__title reveal">News &amp; insights</h2>
            <p className="section__lead reveal">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Updates from the
              Covert Communication team.
            </p>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="contact">
          <div className="container container--narrow">
            <p className="section__eyebrow reveal">Book a Meeting</p>
            <h2 className="section__title reveal">Let&rsquo;s get started</h2>

            {status === 'ok' ? (
              <div className="form__success reveal">
                <strong>Thank you!</strong> Your message has been sent. We&rsquo;ll be in touch shortly.
              </div>
            ) : (
              <form className="form reveal" onSubmit={handleSubmit}>
                <div className="form__row">
                  <label>
                    <span>Name</span>
                    <input name="name" type="text" required placeholder="Jane Doe" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" required placeholder="jane@email.com" />
                  </label>
                </div>
                <label>
                  <span>Company</span>
                  <input name="company" type="text" placeholder="Company name" />
                </label>
                <label>
                  <span>How can we help?</span>
                  <textarea name="message" rows="4" required
                    placeholder="Tell us about your project&hellip;" />
                </label>
                <button className="btn btn--green" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending&hellip;' : 'Send Message'}
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
          <img src="/logo.png" alt="Covert Communication" className="footer__logo" />
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

/* ---- Floating service tag (drifts + reveals + hover) ---- */
function Tag({ lines, index, side }) {
  return (
    <span
      className={`tag reveal tag--${side}`}
      style={{
        transitionDelay: `${index * 110}ms`,
        animationDelay: `${index * 0.6}s`,
      }}
    >
      {lines.map((l, i) => (
        <span key={i} className={i === 0 && lines.length > 1 ? 'tag__top' : ''}>{l}</span>
      ))}
    </span>
  )
}
