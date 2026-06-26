import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SERVICES, MEGA_ABOUT, MEGA_SERVICES } from './data'
import './App.css'
import './ServicePage.css'

export default function ServicePage() {
  const { id } = useParams()
  const svc = SERVICES.find(s => s.id === id) || SERVICES[0]

  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)

  return (
    <>
      {/* ===================== NAV ===================== */}
      <header className="nav-wrap">
        <nav className="nav">
          <Link className="brand" to="/" aria-label="Covert Communication home">
            <img src="/logo-horiz.png" alt="Covert Communication" className="brand__logo" />
          </Link>

          <div className="nav__links">
            {/* ABOUT MEGA */}
            <div
              className="nav__item nav__item--mega"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => { setAboutOpen(false); setHoveredAbout(null) }}
            >
              <button type="button" className="nav__link nav__link--trigger" aria-expanded={aboutOpen}>
                About
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`mega mega--about ${aboutOpen ? 'mega--open' : ''}`}>
                <div className="mega-about__grid">
                  {MEGA_ABOUT.map(item => (
                    <a key={item.id} href={item.href}
                      className={`ma-card${hoveredAbout === item.id ? ' ma-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredAbout(item.id)}
                      onMouseLeave={() => setHoveredAbout(null)}>
                      <div className="ma-card__bg" style={{ backgroundImage: `url(${item.img})` }} />
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

            {/* SERVICES MEGA */}
            <div
              className="nav__item nav__item--mega"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button type="button" className="nav__link nav__link--trigger" aria-expanded={megaOpen}>
                Services
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`mega mega--services ${megaOpen ? 'mega--open' : ''}`}>
                <div className="mega-services__grid">
                  {MEGA_SERVICES.map(item => (
                    <Link key={item.id} to={`/services/${item.id}`}
                      className={`ms-card${hoveredMegaService === item.id ? ' ms-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredMegaService(item.id)}
                      onMouseLeave={() => setHoveredMegaService(null)}>
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
            <Link to="/#contact" className="nav__link">Contact</Link>
          </div>

          <div className="nav__cta">
            <Link to="/#contact" className="btn btn--pill-outline">Book a Meeting &rarr;</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ===================== HERO ===================== */}
        <section className="svcpage__hero" style={{ backgroundImage: `url(${svc.hoverImg})` }}>
          <div className="svcpage__hero-overlay" />
          <div className="svcpage__hero-content">
            <p className="svcpage__eyebrow">{svc.count} Services</p>
            <h1 className="svcpage__title">{svc.title}</h1>
            <div className="svcpage__subs">
              {svc.subs.map(s => (
                <span key={s} className="chip-btn">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CONTENT ===================== */}
        <section className="svcpage__body">
          <div className="container container--narrow">
            <h2 className="svcpage__body-title">What We Do</h2>
            <p className="svcpage__lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="svcpage__copy">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p className="svcpage__copy">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
              eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            <div className="svcpage__cta">
              <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
              <Link to="/" className="btn btn--outline">← Back to Home</Link>
            </div>
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
