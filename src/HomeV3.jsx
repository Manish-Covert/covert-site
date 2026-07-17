import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from './useReveal'
import { SERVICES } from './data'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import './App.css'
import './HomeV3.css'

/* ---------- Page content ---------- */

const CAPABILITIES = [
  { k: 'Strategy',     v: 'Positioning, research & growth planning grounded in evidence.' },
  { k: 'Brand',       v: 'Identity systems and messaging the market can’t ignore.' },
  { k: 'Web & Product', v: 'Sub-second, accessible builds engineered to convert.' },
  { k: 'Media',       v: 'Fraud-safe paid programs measured against real revenue.' },
]

const METRICS = [
  { value: '250+',  label: 'Projects shipped' },
  { value: '$480M', label: 'Revenue influenced' },
  { value: '4.7×',  label: 'Avg. return on ad spend' },
  { value: '18yrs', label: 'In the industry' },
]

/* ============================================================
   Signal-network canvas hero.
   A living constellation of nodes that drift, link to their
   neighbours, and lean toward the cursor — a visual metaphor
   for covert communication running under the surface.
   ============================================================ */
function SignalCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes = []
    const mouse = { x: -9999, y: -9999, active: false }
    const PALETTE = ['166,242,60', '52,199,160', '56,198,232']

    function resize() {
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const density = Math.max(36, Math.min(90, Math.round((w * h) / 16000)))
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.8 + 0.8,
        c: PALETTE[(Math.random() * PALETTE.length) | 0],
      }))
    }

    const LINK = 132

    function frame() {
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        // subtle attraction toward the cursor
        if (mouse.active) {
          const dx = mouse.x - n.x, dy = mouse.y - n.y
          const d2 = dx * dx + dy * dy
          if (d2 < 200 * 200) {
            const f = (1 - Math.sqrt(d2) / 200) * 0.04
            n.vx += dx * f * 0.02
            n.vy += dy * f * 0.02
          }
        }
        // gentle speed cap
        n.vx = Math.max(-0.6, Math.min(0.6, n.vx))
        n.vy = Math.max(-0.6, Math.min(0.6, n.vy))
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK) {
            const o = (1 - dist / LINK) * 0.5
            ctx.strokeStyle = `rgba(52,199,160,${o})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // cursor links
      if (mouse.active) {
        for (const n of nodes) {
          const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y)
          if (dist < 200) {
            const o = (1 - dist / 200) * 0.85
            ctx.strokeStyle = `rgba(166,242,60,${o})`
            ctx.lineWidth = 0.9
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${n.c},0.9)`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${n.c},0.6)`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      raf = requestAnimationFrame(frame)
    }

    let raf
    resize()
    if (reduce) { frame(); cancelAnimationFrame(raf) } else { raf = requestAnimationFrame(frame) }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999 }

    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hv3-canvas" aria-hidden="true" />
}

export default function HomeV3() {
  useReveal()
  const [tab, setTab] = useState(0)

  return (
    <>
      <SiteNav />

      <main className="hv3">
        {/* ==================== HERO ==================== */}
        <section className="hv3-hero">
          <SignalCanvas />
          <div className="hv3-hero__vignette" aria-hidden="true" />
          <div className="hv3-hero__inner container">
            <span className="hv3-badge reveal">
              <span className="hv3-badge__pulse" /> Full-service digital &amp; creative agency
            </span>
            <h1 className="hv3-hero__title reveal">
              Signals worth<br />
              <span className="hv3-grad">building around.</span>
            </h1>
            <p className="hv3-hero__lead reveal">
              We connect strategy, brand, media, and engineering into one covert
              network — turning ambitious ideas into growth the market can’t ignore.
            </p>
            <div className="hv3-hero__cta reveal">
              <Link to="/#contact" className="btn btn--green">Start a project</Link>
              <Link to="/services" className="btn-gradient"><span>Explore services →</span></Link>
            </div>

            <div className="hv3-hero__metrics reveal">
              {METRICS.map((m, i) => (
                <div className="hv3-metric" key={i}>
                  <span className="hv3-metric__v">{m.value}</span>
                  <span className="hv3-metric__l">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hv3-hero__scroll" aria-hidden="true">
            <span>scroll</span><i />
          </div>
        </section>

        {/* ==================== CAPABILITIES / TABS ==================== */}
        <section className="hv3-cap">
          <div className="container">
            <div className="hv3-sec-head reveal">
              <p className="hv3-eyebrow">The network</p>
              <h2 className="hv3-title">Four disciplines,<br /><span className="hv3-grad">one wavelength.</span></h2>
            </div>
            <div className="hv3-cap__wrap">
              <div className="hv3-cap__tabs" role="tablist">
                {CAPABILITIES.map((c, i) => (
                  <button
                    key={c.k}
                    role="tab"
                    aria-selected={tab === i}
                    className={`hv3-cap__tab${tab === i ? ' is-active' : ''}`}
                    onClick={() => setTab(i)}
                    onMouseEnter={() => setTab(i)}
                  >
                    <span className="hv3-cap__no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hv3-cap__k">{c.k}</span>
                  </button>
                ))}
              </div>
              <div className="hv3-cap__panel reveal" key={tab}>
                <p className="hv3-cap__v">{CAPABILITIES[tab].v}</p>
                <Link to="/services" className="hv3-cap__link">See how we work →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SERVICES ==================== */}
        <section className="hv3-services">
          <div className="container">
            <div className="hv3-sec-head reveal">
              <p className="hv3-eyebrow">What we do</p>
              <h2 className="hv3-title">Everything your brand needs,<br /><span className="hv3-grad">wired to one team.</span></h2>
            </div>
            <div className="hv3-svc-grid">
              {SERVICES.map((s, i) => (
                <Link to={`/services/${s.id}`} key={s.id} className="hv3-svc reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <div className="hv3-svc__glow" aria-hidden="true" />
                  <div className="hv3-svc__top">
                    <img src={s.icon} alt="" aria-hidden="true" className="hv3-svc__icon" />
                    <span className="hv3-svc__no">{String(s.count).padStart(2, '0')}</span>
                  </div>
                  <h3 className="hv3-svc__title">{s.title}</h3>
                  <p className="hv3-svc__subs">{s.subs.slice(0, 3).join(' · ')}</p>
                  <span className="hv3-svc__arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CTA BAND ==================== */}
        <section className="hv3-cta">
          <div className="container hv3-cta__inner reveal">
            <div className="hv3-cta__glow" aria-hidden="true" />
            <p className="hv3-eyebrow">Let’s connect</p>
            <h2 className="hv3-cta__title">Ready to light up<br /><span className="hv3-grad">your signal?</span></h2>
            <p className="hv3-cta__lead">Tell us where you want to grow. We’ll bring the strategy, the craft, and the covert edge.</p>
            <div className="hv3-cta__actions">
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
