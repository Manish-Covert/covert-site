import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SERVICES, MEGA_ABOUT, MEGA_SERVICES, SERVICE_DETAILS } from './data'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import './App.css'
import './ServicePage.css'
import './AboutPage.css'

export default function ServicePage() {
  const { id } = useParams()
  const svc = SERVICES.find(s => s.id === id) || SERVICES[0]
  const detail = SERVICE_DETAILS[svc.id]
  useReveal()

  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)

  if (detail) return <ServiceDetailPage svc={svc} detail={detail} />

  return (
    <>
      {/* ===================== NAV ===================== */}
      <SiteNav />

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

      {/* ===================== GLOBAL FOOTER (form + footer) ===================== */}
      <SiteFooter />
    </>
  )
}

/* ============================================================
   RICH SERVICE DETAIL PAGE (e.g. Programmatic)
   ============================================================ */
function ServiceDetailPage({ svc, detail }) {
  const { hero, intro, features } = detail
  return (
    <>
      <SiteNav />

      <main className="svcd">
        {/* ---------- HERO ---------- */}
        {/* About-style hero: two-tone title + lead bottom-right, gradient
            "View all services" button bottom-left (mirrors /about subpages). */}
        {hero.bottom ? (
          <section className="about-hero" style={{ backgroundImage: `url(${hero.bg || svc.hoverImg})` }}>
            <div className="about-hero__content">
              <h1 className="about-hero__title">
                {hero.heroTitle}<br />
                <span className="about-hero__title-accent">{hero.heroAccent || hero.title}</span>
              </h1>
              <p className="about-hero__lead">{hero.lead}</p>
            </div>
            <Link to="/services" className="btn-gradient about-hero__viewall">
              <span>&#9666; View all services</span>
            </Link>
          </section>
        ) : (
        <section className="svcd__hero" style={{ backgroundImage: `url(${hero.bg || svc.hoverImg})` }}>
          <div className="svcd__hero-overlay" />
          <div className="svcd__hero-glow" />
          <div className="svcd__hero-content">
            <p className="svcd__eyebrow">{hero.eyebrow}</p>
            <h1 className="svcd__title">{hero.title}</h1>
            <p className="svcd__lead">{hero.lead}</p>
            <div className="svcd__hero-chips">
              {svc.subs?.map(s => <span key={s} className="svcd__chip">{s}</span>)}
            </div>
            <Link to="/services" className="btn btn--outline-pill svcd__hero-back">
              <span>◂ View all services</span>
            </Link>
          </div>
        </section>
        )}

        {/* ---------- INTRO + STATS ---------- */}
        <section className="svcd__intro">
          <div className="container">
            <div className="svcd__intro-grid">
              <div className="reveal">
                <span className="svcd__accent-bar" />
                <h2 className="svcd__intro-title">{intro.title}</h2>
              </div>
              <p className="svcd__intro-copy reveal">{intro.copy}</p>
            </div>
            <div className="svcd__stats">
              {intro.stats.map((s, i) => (
                <div className="svcd__stat reveal" key={s.label} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="svcd__stat-value">{s.value}</span>
                  <span className="svcd__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- ALTERNATING FEATURE ROWS ---------- */}
        <section className="svcd__features">
          <div className="container">
            {features.map((f, i) => (
              <article
                key={f.id}
                className={`svcd__feature ${i % 2 === 1 ? 'svcd__feature--rev' : ''} reveal`}
              >
                <div className="svcd__feature-media">
                  <img src={f.image} alt={`${f.title} illustration`} loading="lazy" />
                </div>
                <div className="svcd__feature-body">
                  <span className="svcd__feature-kicker">{f.kicker}</span>
                  <div className="svcd__feature-head">
                    <span className="svcd__accent-bar" />
                    <h3 className="svcd__feature-title">{f.title}</h3>
                  </div>
                  <p className="svcd__feature-copy">{f.copy}</p>
                  <ul className="svcd__feature-points">
                    {f.points.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="svcd__cta">
          <div className="container svcd__cta-inner reveal">
            <h2 className="svcd__cta-title">Ready to make {svc.title.toLowerCase()} work harder?</h2>
            <p className="svcd__cta-copy">Let’s map a strategy built around your outcomes.</p>
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
