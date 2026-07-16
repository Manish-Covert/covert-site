import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from './useReveal'
import { SERVICES } from './data'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import './App.css'
import './HomeV2.css'

/* ---------- Local page content ---------- */

const HERO_STATS = [
  { value: 250, suffix: '+', label: 'Projects delivered' },
  { value: 312, suffix: '%', label: 'Avg. revenue lift' },
  { value: 18, suffix: 'yrs', label: 'In the industry' },
  { value: 40, suffix: '+', label: 'Experts on the team' },
]

const IMPACT_STATS = [
  { value: '$480M', label: 'Client revenue influenced' },
  { value: '4.7×', label: 'Average return on ad spend' },
  { value: '98', label: 'Avg. Lighthouse performance' },
  { value: '99.9%', label: 'Platform uptime delivered' },
]

const PROCESS = [
  { no: '01', title: 'Discover', copy: 'We dig into your market, audience, and data to find the real levers of growth — no assumptions, just evidence.' },
  { no: '02', title: 'Design', copy: 'Strategy, brand, and experience come together into a plan and a look that are impossible to ignore.' },
  { no: '03', title: 'Build', copy: 'Our engineers and creatives ship fast, accessible products and campaigns built to convert and scale.' },
  { no: '04', title: 'Grow', copy: 'Always-on optimization turns launch into momentum — measured, reported, and compounding month over month.' },
]

const WHY = [
  { icon: '⚡', title: 'Full-service under one roof', copy: 'Strategy, brand, media, and engineering in a single team — no hand-offs, no finger-pointing, one accountable partner.' },
  { icon: '🎯', title: 'Outcomes over vanity metrics', copy: 'Every engagement is tied to pipeline, revenue, and ROAS. If it doesn’t move the number, we don’t ship it.' },
  { icon: '🛡️', title: 'Fraud-safe media', copy: 'Our fraud-protection gurus keep your spend clean, so every dollar reaches a real human, not a bot farm.' },
  { icon: '🤖', title: 'AI-native marketing', copy: 'We optimize for tomorrow’s answer engines today — structured so ChatGPT, Gemini, and Perplexity cite you first.' },
  { icon: '🚀', title: 'Production-grade engineering', copy: 'Sub-second load times, 99.9% uptime, and zero vendor lock-in. Marketing with a real technical backbone.' },
  { icon: '🤝', title: 'Partners, not vendors', copy: 'Senior people who answer their phones, share our dashboards, and treat your P&L like our own.' },
]

const CASES = [
  { img: '/home-v2/case-growth.svg', tag: 'Programmatic · SEO', title: 'DTC brand scales to 8 figures', metric: '+312% revenue in 9 months', copy: 'An always-on programmatic engine paired with technical SEO turned a stalled DTC label into a category leader.' },
  { img: '/home-v2/case-brand.svg', tag: 'Brand Creation', title: 'A fintech rebrand that stuck', metric: '3.2× brand recall', copy: 'A complete identity system and messaging framework repositioned a fintech for its Series B raise.' },
  { img: '/home-v2/case-app.svg', tag: 'Technology · Social', title: 'From idea to 250K downloads', metric: '4.9★ average rating', copy: 'We designed, built, and launched a cross-platform app — then fueled it with paid social that actually converts.' },
]

const TESTIMONIALS = [
  { quote: 'Covert is the first agency that felt like an extension of our own team. They moved our numbers in the first quarter and never looked back.', name: 'Jordan Ellis', role: 'VP Marketing, Northwind' },
  { quote: 'They rebuilt our site, cleaned up our ad spend, and relaunched the brand — all without a single dropped ball. Rare.', name: 'Priya Nair', role: 'Founder, Lumen Labs' },
  { quote: 'The transparency is unreal. We see the same dashboards they do, and the results speak for themselves.', name: 'Marcus Bell', role: 'CEO, Halcyon Group' },
]

const LOGOS = ['NORTHWIND', 'LUMEN', 'HALCYON', 'VERTEX', 'AURORA', 'MERIDIAN', 'KESTREL', 'NOVA']

/* ---------- Count-up hook for the hero stats ---------- */
function useCountUp(target, active, duration = 1600) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return n
}

function HeroStat({ value, suffix, label, active }) {
  const n = useCountUp(value, active)
  return (
    <div className="hv2-hstat">
      <span className="hv2-hstat__num">{n}{suffix}</span>
      <span className="hv2-hstat__label">{label}</span>
    </div>
  )
}

export default function HomeV2() {
  useReveal()
  const [statsActive, setStatsActive] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); io.disconnect() } },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <SiteNav />

      <main className="hv2">
        {/* ==================== HERO ==================== */}
        <section className="hv2-hero">
          <div className="hv2-hero__grid" aria-hidden="true" />
          <div className="hv2-hero__glow" aria-hidden="true" />
          <div className="hv2-hero__inner container">
            <div className="hv2-hero__copy">
              <span className="hv2-badge reveal">
                <span className="hv2-badge__dot" /> Full-service digital &amp; creative agency
              </span>
              <h1 className="hv2-hero__title reveal">
                We build brands the<br />
                world can’t <span className="hv2-grad">ignore.</span>
              </h1>
              <p className="hv2-hero__lead reveal">
                Strategy, brand, media, and engineering — one covert team turning
                ambitious ideas into measurable growth across every screen.
              </p>
              <div className="hv2-hero__cta reveal">
                <Link to="/#contact" className="btn btn--green">Start a project</Link>
                <Link to="/services" className="btn-gradient"><span>Explore services →</span></Link>
              </div>

              <div className="hv2-hero__stats" ref={statsRef}>
                {HERO_STATS.map((s, i) => (
                  <HeroStat key={i} {...s} active={statsActive} />
                ))}
              </div>
            </div>

            <div className="hv2-hero__visual reveal">
              <img src="/home-v2/hero-visual.svg" alt="" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ==================== LOGO MARQUEE ==================== */}
        <section className="hv2-logos">
          <p className="hv2-logos__eyebrow">Trusted by ambitious teams worldwide</p>
          <div className="hv2-marquee" aria-hidden="true">
            <div className="hv2-marquee__track">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <span className="hv2-marquee__item" key={i}>{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SERVICES ==================== */}
        <section className="hv2-services">
          <div className="container">
            <div className="hv2-sec-head reveal">
              <p className="hv2-eyebrow">What we do</p>
              <h2 className="hv2-title">Everything your brand needs,<br /><span className="hv2-grad">from one covert team.</span></h2>
            </div>
            <div className="hv2-svc-grid">
              {SERVICES.map((s, i) => (
                <Link to={`/services/${s.id}`} key={s.id} className="hv2-svc-card reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <div className="hv2-svc-card__top">
                    <img src={s.icon} alt="" aria-hidden="true" className="hv2-svc-card__icon" />
                    <span className="hv2-svc-card__count">{String(s.count).padStart(2, '0')}</span>
                  </div>
                  <h3 className="hv2-svc-card__title">{s.title}</h3>
                  <p className="hv2-svc-card__subs">{s.subs.slice(0, 3).join(' · ')}</p>
                  <span className="hv2-svc-card__arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== IMPACT STATS BAND ==================== */}
        <section className="hv2-impact">
          <div className="container hv2-impact__grid">
            {IMPACT_STATS.map((s, i) => (
              <div className="hv2-impact__cell reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="hv2-impact__num hv2-grad">{s.value}</span>
                <span className="hv2-impact__label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== PROCESS ==================== */}
        <section className="hv2-process">
          <div className="container">
            <div className="hv2-sec-head reveal">
              <p className="hv2-eyebrow">How we work</p>
              <h2 className="hv2-title">A proven path from<br /><span className="hv2-grad">idea to impact.</span></h2>
            </div>
            <div className="hv2-steps">
              {PROCESS.map((p, i) => (
                <div className="hv2-step reveal" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="hv2-step__no">{p.no}</span>
                  <h3 className="hv2-step__title">{p.title}</h3>
                  <p className="hv2-step__copy">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== WHY US ==================== */}
        <section className="hv2-why">
          <div className="container">
            <div className="hv2-sec-head reveal">
              <p className="hv2-eyebrow">Why Covert</p>
              <h2 className="hv2-title">The advantages that<br /><span className="hv2-grad">actually compound.</span></h2>
            </div>
            <div className="hv2-why-grid">
              {WHY.map((w, i) => (
                <div className="hv2-why-card reveal" key={i} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                  <span className="hv2-why-card__icon" aria-hidden="true">{w.icon}</span>
                  <h3 className="hv2-why-card__title">{w.title}</h3>
                  <p className="hv2-why-card__copy">{w.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CASE STUDIES ==================== */}
        <section className="hv2-cases">
          <div className="container">
            <div className="hv2-sec-head hv2-sec-head--row reveal">
              <div>
                <p className="hv2-eyebrow">Selected work</p>
                <h2 className="hv2-title">Results we’re<br /><span className="hv2-grad">proud to show.</span></h2>
              </div>
              <Link to="/services" className="btn-gradient hv2-cases__all"><span>View all work →</span></Link>
            </div>
            <div className="hv2-case-grid">
              {CASES.map((c, i) => (
                <article className="hv2-case reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="hv2-case__media">
                    <img src={c.img} alt={c.title} loading="lazy" />
                  </div>
                  <div className="hv2-case__body">
                    <span className="hv2-case__tag">{c.tag}</span>
                    <h3 className="hv2-case__title">{c.title}</h3>
                    <p className="hv2-case__metric">{c.metric}</p>
                    <p className="hv2-case__copy">{c.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== TESTIMONIALS ==================== */}
        <section className="hv2-quotes">
          <div className="container">
            <div className="hv2-sec-head reveal">
              <p className="hv2-eyebrow">In their words</p>
              <h2 className="hv2-title">Clients who’d<br /><span className="hv2-grad">work with us again.</span></h2>
            </div>
            <div className="hv2-quote-grid">
              {TESTIMONIALS.map((t, i) => (
                <figure className="hv2-quote reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="hv2-quote__mark" aria-hidden="true">“</span>
                  <blockquote className="hv2-quote__text">{t.quote}</blockquote>
                  <figcaption className="hv2-quote__cap">
                    <span className="hv2-quote__avatar" aria-hidden="true">{t.name.charAt(0)}</span>
                    <span>
                      <strong>{t.name}</strong>
                      <em>{t.role}</em>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CTA BAND ==================== */}
        <section className="hv2-cta">
          <div className="container hv2-cta__inner reveal">
            <div className="hv2-cta__glow" aria-hidden="true" />
            <h2 className="hv2-cta__title">Ready to build something<br /><span className="hv2-grad">the world can’t ignore?</span></h2>
            <p className="hv2-cta__lead">Tell us where you want to grow. We’ll bring the strategy, the craft, and the covert edge.</p>
            <div className="hv2-cta__actions">
              <Link to="/#contact" className="btn btn--green">Book a meeting →</Link>
              <Link to="/services" className="btn btn--outline-pill">See our services</Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
