import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SERVICES, MEGA_ABOUT, MEGA_SERVICES } from './data'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
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
