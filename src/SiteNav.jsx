import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MEGA_ABOUT, MEGA_SERVICES } from './data'

/* Shared site header navigation.
   Desktop (>1080px): inline links with hover mega-menus.
   Tablet / mobile (<=1080px): hamburger toggles a full drawer with
   collapsible About / Services sections. */
export default function SiteNav() {
  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mAbout, setMAbout] = useState(false)
  const [mServices, setMServices] = useState(false)

  const location = useLocation()

  const closeDrawer = () => { setDrawerOpen(false); setMAbout(false); setMServices(false) }

  // Close every menu (desktop mega + mobile drawer) — used on link clicks
  const closeAll = () => {
    setMegaOpen(false); setAboutOpen(false)
    setHoveredAbout(null); setHoveredMegaService(null)
    closeDrawer()
  }

  // Any route change closes all menus so they never linger open
  useEffect(() => { closeAll() }, [location.pathname, location.hash])

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link className="brand" to="/" aria-label="Covert Communication home" onClick={closeDrawer}>
          <img src="/logo-horiz.png" alt="Covert Communication" className="brand__logo" />
        </Link>

        {/* ---------- DESKTOP LINKS ---------- */}
        <div className="nav__links">
          {/* ABOUT MEGA */}
          <div
            className="nav__item nav__item--mega"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => { setAboutOpen(false); setHoveredAbout(null) }}
          >
            <Link to="/about" className="nav__link nav__link--trigger" aria-expanded={aboutOpen} onClick={closeAll}>
              About
              <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className={`mega mega--about ${aboutOpen ? 'mega--open' : ''}`}>
              <div className="mega-about__grid">
                {MEGA_ABOUT.map(item => (
                  <Link key={item.id} to={item.href} onClick={closeAll}
                    className={`ma-card${hoveredAbout === item.id ? ' ma-card--hovered' : ''}`}
                    onMouseEnter={() => setHoveredAbout(item.id)}
                    onMouseLeave={() => setHoveredAbout(null)}>
                    <div className="ma-card__bg" style={{ backgroundImage: `url(${item.img})` }} />
                    <div className="ma-card__inner">
                      <img className="ma-card__icon" src={item.icon} alt="" aria-hidden="true" />
                      <span className="ma-card__label">{item.label}</span>
                      {item.badge && <span className="ma-card__badge">{item.badge}</span>}
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
            <Link to="/services" className="nav__link nav__link--trigger" aria-expanded={megaOpen}
              onClick={closeAll}>
              Services
              <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className={`mega mega--services ${megaOpen ? 'mega--open' : ''}`}>
              <div className="mega-services__grid">
                {MEGA_SERVICES.map(item => (
                  <Link key={item.id} to={`/services/${item.id}`} onClick={closeAll}
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
          <Link to="/the-latest" className="nav__link" onClick={closeAll}>The Latest</Link>
          <Link to="/contact" className="nav__link" onClick={closeAll}>Contact</Link>
        </div>

        <div className="nav__cta">
          <Link to="/contact" className="btn btn--pill-outline" onClick={closeAll}>Book a Meeting &rarr;</Link>
        </div>

        {/* ---------- MOBILE HAMBURGER ---------- */}
        <button
          type="button"
          className={`nav__burger${drawerOpen ? ' nav__burger--open' : ''}`}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ---------- MOBILE DRAWER ---------- */}
      <div
        className={`nav-drawer__scrim${drawerOpen ? ' nav-drawer__scrim--open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside className={`nav-drawer${drawerOpen ? ' nav-drawer--open' : ''}`}>
        <div className="nav-drawer__inner">
          {/* About */}
          <div className="nav-drawer__group">
            <button type="button" className="nav-drawer__toggle" aria-expanded={mAbout}
              onClick={() => setMAbout(v => !v)}>
              About
              <svg className={`nav-drawer__chev${mAbout ? ' nav-drawer__chev--open' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`nav-drawer__sub${mAbout ? ' nav-drawer__sub--open' : ''}`}>
              <Link to="/about" className="nav-drawer__sublink" onClick={closeDrawer}>All About</Link>
              {MEGA_ABOUT.map(item => (
                <Link key={item.id} to={item.href} className="nav-drawer__sublink" onClick={closeDrawer}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="nav-drawer__group">
            <button type="button" className="nav-drawer__toggle" aria-expanded={mServices}
              onClick={() => setMServices(v => !v)}>
              Services
              <svg className={`nav-drawer__chev${mServices ? ' nav-drawer__chev--open' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`nav-drawer__sub${mServices ? ' nav-drawer__sub--open' : ''}`}>
              <Link to="/services" className="nav-drawer__sublink" onClick={closeDrawer}>All Services</Link>
              {MEGA_SERVICES.map(item => (
                <Link key={item.id} to={`/services/${item.id}`} className="nav-drawer__sublink" onClick={closeDrawer}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <a href="#" className="nav-drawer__link" onClick={closeDrawer}>Case Studies</a>
          <Link to="/the-latest" className="nav-drawer__link" onClick={closeDrawer}>The Latest</Link>
          <Link to="/contact" className="nav-drawer__link" onClick={closeDrawer}>Contact</Link>

          <Link to="/contact" className="btn btn--pill-outline nav-drawer__cta" onClick={closeDrawer}>
            Book a Meeting &rarr;
          </Link>
        </div>
      </aside>
    </header>
  )
}
