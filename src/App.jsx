import { useState, useRef, Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useReveal } from './useReveal'
import { SERVICES, MEGA_SERVICES, MEGA_ABOUT, HOW_DID_YOU_HEAR, HERO_PILLS } from './data'
import ServicePage from './ServicePage'
import './App.css'

const HeroLogo = lazy(() => import('./HeroLogo'))

export default function App() {
  useReveal()
  const [status, setStatus] = useState('idle')
  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)
  const [hoveredService, setHoveredService] = useState(null)
  const heroRef = useRef(null)

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
    <Routes>
      <Route path="/services/:id" element={<ServicePage />} />
      <Route path="*" element={<HomePage
        status={status} setStatus={setStatus}
        megaOpen={megaOpen} setMegaOpen={setMegaOpen}
        aboutOpen={aboutOpen} setAboutOpen={setAboutOpen}
        hoveredAbout={hoveredAbout} setHoveredAbout={setHoveredAbout}
        hoveredMegaService={hoveredMegaService} setHoveredMegaService={setHoveredMegaService}
        hoveredService={hoveredService} setHoveredService={setHoveredService}
        heroRef={heroRef} handleSubmit={handleSubmit}
      />} />
    </Routes>
  )
}

function HomePage({
  status, setStatus,
  megaOpen, setMegaOpen,
  aboutOpen, setAboutOpen,
  hoveredAbout, setHoveredAbout,
  hoveredMegaService, setHoveredMegaService,
  hoveredService, setHoveredService,
  heroRef, handleSubmit,
}) {
  return (
    <>
      {/* ===================== NAV ===================== */}
      <header className="nav-wrap">
        <nav className="nav">
          <a className="brand" href="#top" aria-label="Covert Communication home">
            <img src="/logo-horiz.png" alt="Covert Communication" className="brand__logo" />
          </a>

          <div className="nav__links">
            {/* ---- ABOUT MEGA ---- */}
            <div
              className="nav__item nav__item--mega"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => { setAboutOpen(false); setHoveredAbout(null); }}
            >
              <button
                type="button"
                className="nav__link nav__link--trigger"
                aria-expanded={aboutOpen}
                onClick={() => setAboutOpen(v => !v)}
              >
                About
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor"
                    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className={`mega mega--about ${aboutOpen ? 'mega--open' : ''}`}>
                <div className="mega-about__grid">
                  {MEGA_ABOUT.map(item => (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`ma-card${hoveredAbout === item.id ? ' ma-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredAbout(item.id)}
                      onMouseLeave={() => setHoveredAbout(null)}
                    >
                      <div
                        className="ma-card__bg"
                        style={{ backgroundImage: `url(${item.img})` }}
                      />
                      <div className="ma-card__inner">
                        <img className="ma-card__icon" src={item.icon} alt="" aria-hidden="true" />
                        <span className="ma-card__label">{item.label}</span>
                        {item.badge && <span className="ma-card__badge">{item.badge}</span>}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- SERVICES MEGA ---- */}
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

              <div className={`mega mega--services ${megaOpen ? 'mega--open' : ''}`}>
                <div className="mega-services__grid">
                  {MEGA_SERVICES.map(item => (
                    <Link
                      key={item.id}
                      to={`/services/${item.id}`}
                      className={`ms-card${hoveredMegaService === item.id ? ' ms-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredMegaService(item.id)}
                      onMouseLeave={() => setHoveredMegaService(null)}
                    >
                      <div className="ms-card__bg" style={{ backgroundImage: `url(${item.img})` }} />
                      <div className="ms-card__inner">
                        <img className="ms-card__icon" src={item.icon} alt="" aria-hidden="true" />
                        <span className="ms-card__title">{item.title}</span>
                        <span className="ms-card__count">{item.count}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <a href="#" className="nav__link">Case Studies</a>
            <a href="#" className="nav__link">The Latest</a>
            <a href="#contact" className="nav__link">Contact</a>
          </div>
          <div className="nav__cta">
            <a href="#contact" className="btn btn--pill-outline">
              Book a Meeting &rarr;
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="hero" ref={heroRef}>
          <div className="hero__container">
            {/* Pills orbit CW then CCW around the logo */}
            <div className="hero__pills-orbit">
              {HERO_PILLS.map((pill, i) => (
                <a
                  key={i}
                  href="#services"
                  className="hero__pill"
                  style={{ left: pill.left, top: pill.top }}
                >
                  {pill.label.split('\n').map((line, j) => (
                    <span key={j}>{line}</span>
                  ))}
                </a>
              ))}
            </div>

            {/* Center 3D logo */}
            <div className="hero__logo-wrap">
              <Suspense fallback={
                <img src="/hero-logo.png" alt="Covert Communication" className="hero__logo-fallback" />
              }>
                <HeroLogo containerRef={heroRef} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* ===================== WE DO IT ALL ===================== */}
        <section id="about" className="about">
          <div className="container">
            <p className="section__eyebrow reveal">WE DO IT ALL</p>
            <h2 className="section__title reveal">
              Lorem ipsum dolor sit amet,<br />
              consectetue Lorem ipsum dolor<br />
              sit amet, consectetuer
            </h2>
            <div className="about__actions reveal">
              <a href="#contact" className="btn btn--outline-pill">Get Started</a>
            </div>
          </div>
        </section>

        {/* ===================== SERVICES GRID ===================== */}
        <section id="services" className="services-hero">
          <div className="services-grid">
            {SERVICES.map(svc => (
              <Link
                key={svc.id}
                to={`/services/${svc.id}`}
                className={`svc-card${hoveredService === svc.id ? ' svc-card--hovered' : ''}`}
                onMouseEnter={() => setHoveredService(svc.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="svc-card__bg" style={{ backgroundImage: `url(${svc.img})` }} />
                <div className="svc-card__hover-bg" style={{ backgroundImage: `url(${svc.hoverImg})` }} />
                <div className="svc-card__overlay" />
                <div className="svc-card__header">
                  <h2 className="svc-card__title">{svc.title}</h2>
                  <span className="svc-card__count">{svc.count} Services ▾</span>
                </div>
                {svc.subs && (
                  <ul className="svc-card__subs">
                    {svc.subs.map((s, i) => (
                      <li key={s} style={{ transitionDelay: hoveredService === svc.id ? `${i * 50}ms` : '0ms' }}>
                        <span className="chip-btn">{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <img className="svc-card__icon" src={svc.icon} alt="" aria-hidden="true" />
              </Link>
            ))}
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
                  <label><span>First Name *</span><input name="first_name" type="text" required placeholder="Jane" /></label>
                  <label><span>Last Name *</span><input name="last_name" type="text" required placeholder="Doe" /></label>
                </div>
                <div className="form__row">
                  <label><span>Email *</span><input name="email" type="email" required placeholder="jane@email.com" /></label>
                  <label><span>Phone No *</span><input name="phone" type="tel" required placeholder="808-555-0100" /></label>
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
                  <textarea name="message" rows="4" placeholder="Tell us about your project…" />
                </label>
                <p className="form__consent">
                  I authorize Covert Communication to contact me about products and services.
                  Message and data rates may apply.{' '}
                  <a href="#contact">See our Privacy Policy for more information.</a>
                </p>
                <button className="btn btn--green" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Submit'}
                </button>
                {status === 'error' && <p className="form__error">Something went wrong. Please try again.</p>}
              </form>
            )}
          </div>
        </section>
      </main>

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
