import { useState } from 'react'
import { Link } from 'react-router-dom'
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

export default function App() {
  useReveal()
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

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
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 60 60"><path d="M44 18 A20 20 0 1 0 44 42"
                fill="none" stroke="url(#bg)" strokeWidth="9" strokeLinecap="round" />
                <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c8f95a" /><stop offset="100%" stopColor="#2f7d3a" />
                </linearGradient></defs>
              </svg>
            </span>
            <span className="brand__text">
              <strong>COVERT</strong>
              <em>COMMUNICATION</em>
            </span>
          </a>

          <nav className="nav__links">
            <a href="#about" className="nav__link">About</a>
            <a href="#why" className="nav__link">Why Us</a>
            <Link to="/anna-covert" className="nav__link">Anna Covert</Link>
            <a href="#contact" className="btn btn--pill-white">Book a Meeting</a>
          </nav>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <main id="top">
        <section className="hero">
          {/* floating service tags */}
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

        {/* ===================== WHY US ===================== */}
        <section id="why" className="why">
          <div className="container">
            <p className="section__eyebrow reveal">Why Us</p>
            <h2 className="section__title reveal">
              <span className="why__title-muted">A MODERN APPROACH TO</span>{' '}
              <span className="why__title-accent">REAL-TIME TARGETING</span>
            </h2>
            <p className="section__lead reveal">
              Leverage cutting-edge online solutions to target customers at every stage of
              the purchase funnel. Our advanced strategies and proprietary tools let us
              connect with prospects like no other agency.
            </p>

            <div className="why__grid">
              {[
                {
                  title: 'Awareness',
                  text: 'Broad-based consumer lifestyle and life-stage targeting that introduces your brand to the right audiences at scale.',
                },
                {
                  title: 'Consideration',
                  text: 'Direct response, real-time targeting that keeps your brand front-and-center while prospects are actively evaluating their options.',
                },
                {
                  title: 'Intent',
                  text: 'Competitive and category conquesting that intercepts in-market shoppers the moment they signal purchase intent.',
                },
                {
                  title: 'Action',
                  text: 'Performance optimization that turns engaged online prospects into measurable, paying customers.',
                },
              ].map((item, i) => (
                <article
                  className="why__card reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                  key={item.title}
                >
                  <span className="why__step">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
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
          <span className="footer__mark" aria-hidden="true">
            <svg viewBox="0 0 60 60"><path d="M44 18 A20 20 0 1 0 44 42"
              fill="none" stroke="#0a0a0a" strokeWidth="7" strokeLinecap="round" /></svg>
          </span>
          <div className="footer__social" aria-label="Social links">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">&#9678;</a>
          </div>
        </div>
        <div className="footer__legalbar">
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
