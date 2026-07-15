import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MEGA_ABOUT, MEGA_SERVICES } from './data'
import SiteFooter from './SiteFooter'
import './App.css'
import './ServicePage.css'
import './AboutPage.css'

export default function AboutIndexPage() {
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
              <button type="button" className="nav__link nav__link--trigger nav__link--active" aria-expanded={aboutOpen}>
                About
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`mega mega--about ${aboutOpen ? 'mega--open' : ''}`}>
                <div className="mega-about__grid">
                  {MEGA_ABOUT.map(a => (
                    <Link key={a.id} to={a.href}
                      className={`ma-card${hoveredAbout === a.id ? ' ma-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredAbout(a.id)}
                      onMouseLeave={() => setHoveredAbout(null)}>
                      <div className="ma-card__bg" style={{ backgroundImage: `url(${a.img})` }} />
                      <div className="ma-card__inner">
                        <img className="ma-card__icon" src={a.icon} alt="" aria-hidden="true" />
                        <span className="ma-card__label">{a.label}</span>
                        {a.badge && <span className="ma-card__badge">{a.badge}</span>}
                      </div>
                    </Link>
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
                  {MEGA_SERVICES.map(svc => (
                    <Link key={svc.id} to={`/services/${svc.id}`}
                      className={`ms-card${hoveredMegaService === svc.id ? ' ms-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredMegaService(svc.id)}
                      onMouseLeave={() => setHoveredMegaService(null)}>
                      <div className="ms-card__bg" style={{ backgroundImage: `url(${svc.img})` }} />
                      <div className="ms-card__inner">
                        <img className="ms-card__icon" src={svc.icon} alt="" aria-hidden="true" />
                        <span className="ms-card__title">{svc.title}</span>
                        <span className="ms-card__count">{svc.count}</span>
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
        <section className="about-index__hero">
          <div className="about-index__hero-inner">
            <img src="/about/about-us-emblem.webp" alt="" className="about-index__hero-emblem" aria-hidden="true" />
            <div>
              <h1 className="svcpage__title">About Us</h1>
              <p className="svcpage__lead">
                Covert Communication is a full-service marketing agency — meet the people, the brands,
                and the ideas behind the work.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT GRID ===================== */}
        <section className="about-index__body">
          <div className="container">
            <div className="about-index__grid">
              {MEGA_ABOUT.map(a => (
                <Link key={a.id} to={a.href} className="ai-card">
                  <div className="ai-card__bg" style={{ backgroundImage: `url(${a.img})` }} />
                  <div className="ai-card__inner">
                    <img className="ai-card__icon" src={a.icon} alt="" aria-hidden="true" />
                    <span className="ai-card__label">{a.label}</span>
                    {a.badge && <span className="ai-card__badge">{a.badge}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ===================== GLOBAL FOOTER (form + footer) ===================== */}
      <SiteFooter />
    </>
  )
}
