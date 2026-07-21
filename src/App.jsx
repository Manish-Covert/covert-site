import { useState, useRef, useEffect, useLayoutEffect, Suspense, lazy } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useReveal } from './useReveal'
import { useSEO } from './useSEO'
import { SERVICES, MEGA_SERVICES, MEGA_ABOUT, HERO_PILLS } from './data'
import ServicePage from './ServicePage'
import ServicesIndexPage from './ServicesIndexPage'
import ContactPage from './ContactPage'
import ThankYouPage from './ThankYouPage'
import CaseStudiesPage from './CaseStudiesPage'
import CaseStudyPage from './CaseStudyPage'
import AboutPage from './AboutPage'
import AboutIndexPage from './AboutIndexPage'
import TheLatestPage from './TheLatestPage'
import HomeV2 from './HomeV2'
import HomeV3 from './HomeV3'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import './App.css'

const HeroLogo = lazy(() => import('./HeroLogo'))
// Lazy so the large article-body module (latestContent.js) is its own chunk.
const TheLatestDetailPage = lazy(() => import('./TheLatestDetailPage'))
const AdminLeadsPage = lazy(() => import('./AdminLeadsPage'))

export default function App() {
  useReveal()
  const location = useLocation()
  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)
  const [hoveredService, setHoveredService] = useState(null)
  const heroRef = useRef(null)

  useEffect(() => {
    setMegaOpen(false)
    setAboutOpen(false)
    setHoveredAbout(null)
    setHoveredMegaService(null)
    setHoveredService(null)
  }, [location.pathname])

  // Reset scroll before paint so the fresh page enters from the top —
  // unless the URL targets a specific section via hash.
  useLayoutEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    // 'instant' overrides the global `scroll-behavior: smooth` so a new page
    // simply appears at the top instead of visibly scrolling up.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  return (
    <Routes>
      <Route path="/home-v2" element={<HomeV2 />} />
      <Route path="/home-v3" element={<HomeV3 />} />
      <Route path="/services" element={<ServicesIndexPage />} />
      <Route path="/services/:id" element={<ServicePage />} />
      <Route path="/about" element={<AboutIndexPage />} />
      <Route path="/about/:id" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
      <Route path="/admin" element={
        <Suspense fallback={null}><AdminLeadsPage /></Suspense>
      } />
      <Route path="/the-latest" element={<TheLatestPage />} />
      <Route path="/the-latest/:slug" element={
        <Suspense fallback={null}><TheLatestDetailPage /></Suspense>
      } />
      <Route path="*" element={<HomePage
        megaOpen={megaOpen} setMegaOpen={setMegaOpen}
        aboutOpen={aboutOpen} setAboutOpen={setAboutOpen}
        hoveredAbout={hoveredAbout} setHoveredAbout={setHoveredAbout}
        hoveredMegaService={hoveredMegaService} setHoveredMegaService={setHoveredMegaService}
        hoveredService={hoveredService} setHoveredService={setHoveredService}
        heroRef={heroRef}
      />} />
    </Routes>
  )
}

function HomePage({
  megaOpen, setMegaOpen,
  aboutOpen, setAboutOpen,
  hoveredAbout, setHoveredAbout,
  hoveredMegaService, setHoveredMegaService,
  hoveredService, setHoveredService,
  heroRef,
}) {
  useSEO({
    title: 'Covert Communication — Full-Service Marketing & Brand Agency',
    description:
      'Covert Communication is a full-service agency: brand building, programmatic, SEM/SEO/GEO/AEO, social media, fraud protection, and technology consulting. We do it all.',
    path: '/',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Covert Communication LLC',
      url: 'https://covertcommunication.com',
      logo: 'https://covertcommunication.com/logo-horiz.png',
      description:
        'Full-service marketing agency: brand building, programmatic, SEM/SEO/GEO/AEO, social media, fraud protection, and technology consulting.',
    },
  })
  return (
    <>
      {/* ===================== NAV ===================== */}
      <SiteNav />

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="hero" ref={heroRef}>
          <h1 className="sr-only">
            Covert Communication — full-service brand building, marketing, and technology agency
          </h1>
          <div className="hero__container">
            {/* Pills orbit CW then CCW around the logo */}
            <div className="hero__pills-orbit">
              {HERO_PILLS.map((pill, i) => {
                // Equal angular spacing around the logo; start at the top (-90°).
                const angle = ((-90 + i * (360 / HERO_PILLS.length)) * Math.PI) / 180
                const slotStyle = {
                  '--x': Math.cos(angle).toFixed(4),
                  '--y': Math.sin(angle).toFixed(4),
                }
                return (
                  <div key={i} className="hero__pill-slot" style={slotStyle}>
                    <a href="#services" className="hero__pill">
                      {pill.label.split('\n').map((line, j) => (
                        <span key={j}>{line}</span>
                      ))}
                    </a>
                  </div>
                )
              })}
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
          <div className="services-hero__cta">
            <Link to="/services" className="btn btn--outline-pill"><span>View all services →</span></Link>
          </div>
        </section>

      </main>

      {/* ===================== GLOBAL FOOTER (form + footer) ===================== */}
      <SiteFooter />
    </>
  )
}
