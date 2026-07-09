import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MEGA_ABOUT, MEGA_SERVICES, ABOUT_BOOKS, ABOUT_PODCASTS, ABOUT_BRANDS } from './data'
import './App.css'
import './ServicePage.css'
import './AboutPage.css'

export default function AboutPage() {
  const { id } = useParams()
  const item = MEGA_ABOUT.find(a => a.id === id) || MEGA_ABOUT[0]

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
        <section className="svcpage__hero" style={{ backgroundImage: `url(${item.img})` }}>
          <div className="svcpage__hero-overlay" />
          <div className="svcpage__hero-content">
            {item.badge && <p className="svcpage__eyebrow">{item.badge}</p>}
            <h1 className="svcpage__title">About<br />{item.label}</h1>
            {item.tagline && <p className="svcpage__lead">{item.tagline}</p>}
            <Link to="/about" className="btn btn--outline about-body__viewall">&larr; View all</Link>
          </div>
        </section>

        {/* ===================== BODY (per-subpage) ===================== */}
        <AboutBody id={item.id} item={item} />
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

function AboutBody({ id, item }) {
  switch (id) {
    case 'covertcom': return <CovertCommunicationBody item={item} />
    case 'anna': return <AnnaCovertBody item={item} />
    case 'books': return <BooksBody />
    case 'podcasts': return <PodcastsBody />
    case 'otherbrands': return <OtherBrandsBody />
    case 'covertteam': return <CovertTeamBody />
    default: return <CovertCommunicationBody item={item} />
  }
}

function CovertCommunicationBody({ item }) {
  return (
    <section className="svcpage__body">
      <div className="container">
        <div className="about-split">
          <div className="about-split__media" style={{ backgroundImage: `url(${item.img})` }} />
          <div className="about-split__bar" />
          <div className="about-split__copy">
            <h2 className="about-split__title">WHO WE ARE</h2>
            <p className="svcpage__copy">
              Covert Communication is a full-service marketing agency built around one idea: great
              marketing should work as hard as the people behind it. From programmatic media and
              social to traditional advertising and brand building, our team runs every discipline
              a modern brand needs under one roof.
            </p>
          </div>
        </div>
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}

function AnnaCovertBody({ item }) {
  return (
    <section className="svcpage__body">
      <div className="container">
        <div className="about-split">
          <img className="about-split__portrait" src={item.img} alt="Anna Covert" />
          <div className="about-split__bar" />
          <div className="about-split__copy">
            <h2 className="about-split__title">MEET ANNA</h2>
            <p className="svcpage__copy">
              Anna Covert is the founder of Covert Communication, a Forbes Books author, and the
              driving force behind the agency's approach to marketing. She's also the voice and
              likeness behind AI Anna, an AI-powered extension of her brand available to answer
              questions any time.
            </p>
            <a href="#" className="btn btn--outline">view AI Anna &rarr;</a>
          </div>
        </div>
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}

function BooksBody() {
  return (
    <section className="svcpage__body">
      <div className="container">
        <div className="about-cards">
          {ABOUT_BOOKS.map(b => (
            <div key={b.id} className="about-book-card">
              <img className="about-book-card__cover" src={b.cover} alt={b.title} />
              <div className="about-book-card__badges">
                {b.badges.map(badge => <span key={badge} className="about-book-card__badge">{badge}</span>)}
              </div>
              <h3 className="about-book-card__title">{b.title}</h3>
              <p className="about-book-card__subtitle">{b.subtitle}</p>
              <p className="svcpage__copy">{b.copy}</p>
              <a href={b.buyHref} className="btn btn--outline">buy</a>
            </div>
          ))}
        </div>
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}

function PodcastsBody() {
  return (
    <section className="svcpage__body">
      <div className="container">
        <div className="about-cards">
          {ABOUT_PODCASTS.map(p => (
            <div key={p.id} className="about-podcast-card">
              <h3 className="about-podcast-card__title">{p.title}</h3>
              <p className="about-podcast-card__subscribers">{p.subscribers}</p>
              <p className="svcpage__copy">{p.copy}</p>
              <a href={p.listenHref} className="btn btn--outline">Listen</a>
            </div>
          ))}
        </div>
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}

function OtherBrandsBody() {
  const featured = ABOUT_BRANDS.find(b => b.featured)
  const rest = ABOUT_BRANDS.filter(b => !b.featured)
  return (
    <section className="svcpage__body">
      <div className="container">
        {featured && (
          <div className="about-split">
            <div className="about-split__brand">{featured.name}</div>
            <div className="about-split__bar" />
            <div className="about-split__copy">
              <h2 className="about-split__title">{featured.name}</h2>
              <p className="svcpage__copy">{featured.copy}</p>
            </div>
          </div>
        )}
        <h3 className="about-brand-grid__title">Other Brands</h3>
        <div className="about-brand-grid">
          {rest.map(b => (
            <a key={b.id} href={b.href} className="about-brand-card">{b.name}</a>
          ))}
        </div>
        {featured && (
          <a href={featured.href} className="btn btn--green about-brand-cta">{featured.name}</a>
        )}
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}

function CovertTeamBody() {
  return (
    <section className="svcpage__body">
      <div className="container container--narrow">
        <h2 className="svcpage__body-title">The Covert Team</h2>
        <p className="svcpage__lead">
          Covert Communication is powered by a team of strategists, creatives, and media specialists
          working across every discipline the agency offers — from programmatic and social to
          traditional advertising and brand building.
        </p>
        <p className="svcpage__copy">
          Team bios and photos are coming soon. In the meantime, reach out and we'll introduce you
          to the people who'll be working on your account.
        </p>
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}
