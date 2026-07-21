import { Link } from 'react-router-dom'
import { SERVICES } from './data'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import { useSEO } from './useSEO'
import './App.css'
import './ServicePage.css'
import './AboutPage.css'

export default function ServicesIndexPage() {
  useReveal()
  const total = SERVICES.reduce((n, s) => n + (s.count || 0), 0)

  useSEO({
    title: 'Services — Full-Service Marketing Agency | Covert Communication',
    description: `A full-service agency under one roof — ${SERVICES.length} disciplines and ${total} specialties spanning brand building, programmatic, SEO, social, fraud protection, and technology.`,
    path: '/services',
    ogType: 'website',
  })

  return (
    <>
      <SiteNav />

      <main className="svcd">
        {/* ---------- HERO (same as /about) ---------- */}
        <section className="about-hero" style={{ backgroundImage: 'url(/about/about-hero-texture.webp)' }}>
          <img className="about-hero__emblem" src="/about/about-hero-emblem.webp" alt="" aria-hidden="true" />
          <div className="about-hero__content">
            <h1 className="about-hero__title">
              <span className="about-hero__title-accent">Services</span>
            </h1>
            <p className="about-hero__lead">
              A full-service agency under one roof — {SERVICES.length} disciplines and {total}
              &nbsp;specialties working together to build, grow, and protect your brand across
              every channel that matters.
            </p>
          </div>
        </section>

        {/* ---------- SERVICES GRID ---------- */}
        <section className="svci__body">
          <div className="container">
            <div className="svci__grid">
              {SERVICES.map((s, i) => (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="svci-card reveal"
                  style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                >
                  <div className="svci-card__media">
                    <img className="svci-card__img" src={s.img} alt={s.title} loading="lazy" />
                    <img className="svci-card__img svci-card__img--hover" src={s.hoverImg} alt="" aria-hidden="true" loading="lazy" />
                    <span className="svci-card__count">{s.count} services</span>
                  </div>
                  <div className="svci-card__body">
                    <div className="svci-card__head">
                      <img className="svci-card__icon" src={s.icon} alt="" aria-hidden="true" />
                      <h2 className="svci-card__title">{s.title}</h2>
                    </div>
                    <ul className="svci-card__subs">
                      {s.subs.map(sub => <li key={sub}>{sub}</li>)}
                    </ul>
                    <span className="svci-card__link">Explore {s.title} <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="svcd__cta">
          <div className="container svcd__cta-inner reveal">
            <h2 className="svcd__cta-title">Not sure where to start?</h2>
            <p className="svcd__cta-copy">Tell us your goals and we’ll build the right mix of services around them.</p>
            <div className="svcd__cta-btns">
              <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
              <Link to="/" className="btn btn--outline">← Back to Home</Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
