import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MEGA_ABOUT, MEGA_SERVICES } from './data'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useSEO } from './useSEO'
import { useReveal } from './useReveal'
import './App.css'
import './ServicePage.css'
import './AboutPage.css'

export default function AboutIndexPage() {
  useReveal()
  useSEO({
    title: 'About Us — The Team Behind the Brand | Covert Communication',
    description:
      'Meet Covert Communication — the full-service agency behind the brand: our founder, our team, our books and podcasts, and the ventures we build.',
    path: '/about',
    ogType: 'website',
  })

  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)

  return (
    <>
      {/* ===================== NAV ===================== */}
      <SiteNav />

      <main>
        {/* ===================== HERO (same as /about/covertcom) ===================== */}
        <section className="about-hero" style={{ backgroundImage: 'url(/about/about-hero-texture.webp)' }}>
          <img className="about-hero__emblem" src="/about/about-hero-emblem.webp" alt="" aria-hidden="true" />
          <div className="about-hero__content">
            <h1 className="about-hero__title">
              About<br />
              <span className="about-hero__title-accent">Us</span>
            </h1>
            <p className="about-hero__lead">
              Lorem ipsum dolor sit amet, consectetuer<br />
              Lorem ipsum dolor sit amet, consectetuer<br />
              adipiscing elit, diam nonummy
            </p>
          </div>
        </section>

        {/* ===================== ABOUT GRID ===================== */}
        <section className="about-index__body">
          <div className="container">
            <div className="about-index__grid">
              {MEGA_ABOUT.map(a => (
                <Link key={a.id} to={a.href} className="ai-card">
                  <div className="ai-card__bg" style={{ backgroundImage: `url(${a.cardBg || a.img})` }} />
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
