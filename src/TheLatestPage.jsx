import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LATEST, LATEST_CATEGORIES } from './data'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import { useSEO } from './useSEO'
import './App.css'
import './ServicePage.css'
import './TheLatest.css'

const PAGE_SIZE = 27      // cards shown initially
const LOAD_STEP = 12      // revealed per "Load More" click
const FALLBACK_IMG = '/about/about-podcasts-rollover.webp'

export default function TheLatestPage() {
  const [active, setActive] = useState('All')
  const [visible, setVisible] = useState(PAGE_SIZE)
  useReveal()

  useSEO({
    title: 'The Latest — Insights, Podcasts & Updates | Covert Communication',
    description:
      'The latest from Covert Communication — marketing insights, podcast episodes, and updates on brand building, media, and technology.',
    path: '/the-latest',
    ogType: 'website',
  })

  const items = useMemo(
    () => (active === 'All' ? LATEST : LATEST.filter(p => p.category === active)),
    [active]
  )

  // Reset the visible count whenever the active filter changes.
  useEffect(() => { setVisible(PAGE_SIZE) }, [active])

  const shown = items.slice(0, visible)

  return (
    <>
      <SiteNav />

      <main className="svcd">
        {/* ---------- HERO: centered title + category filter pills ---------- */}
        <section className="latest__hero">
          <div className="container">
            <h1 className="latest__title reveal">The Latest</h1>

            <div className="latest__filters reveal" role="tablist" aria-label="Filter by category">
              {LATEST_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active === cat}
                  className={`svcd__chip latest__filter${active === cat ? ' latest__filter--active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CARD GRID (image + title only) ---------- */}
        <section className="latest__body">
          <div className="container">
            <div className="svci__grid latest__grid">
              {shown.map(p => (
                <Link
                  key={p.id}
                  to={`/the-latest/${p.slug}`}
                  className="svci-card latest-card"
                >
                  <div className="svci-card__media latest-card__media">
                    <img
                      className="svci-card__img"
                      src={p.img || FALLBACK_IMG}
                      alt={p.title}
                      loading="lazy"
                      onError={e => { e.currentTarget.src = FALLBACK_IMG }}
                    />
                  </div>
                  <h2 className="latest-card__title">{p.title}</h2>
                </Link>
              ))}
            </div>

            {items.length === 0 && (
              <p className="latest__empty">Nothing here yet — check back soon.</p>
            )}

            {visible < items.length && (
              <div className="latest__loadmore">
                <button
                  type="button"
                  className="btn btn--outline-pill"
                  onClick={() => setVisible(v => v + LOAD_STEP)}
                >
                  <span>Load More</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
