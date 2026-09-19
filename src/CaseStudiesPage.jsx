import { useMemo, useState } from 'react'
import { CASE_STUDIES } from './data'
import { replaceWolfRiver } from './newDaySolarCaseStudy'
import CaseCard from './CaseCard'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import { useSmoothScroll } from './useSmoothScroll'
import { useSEO } from './useSEO'
import './App.css'
import './ServicePage.css'
import './CaseStudies.css'

const CASE_STUDIES_WITH_NEW_DAY_SOLAR = replaceWolfRiver(CASE_STUDIES)

export default function CaseStudiesPage() {
  useReveal()
  useSmoothScroll()
  const [query, setQuery] = useState('')

  const filteredStudies = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return CASE_STUDIES_WITH_NEW_DAY_SOLAR

    return CASE_STUDIES_WITH_NEW_DAY_SOLAR.filter((study) =>
      [study.title, study.excerpt, ...(study.tags || [])]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term)),
    )
  }, [query])

  useSEO({
    title: 'Case Studies — Brands We’ve Built & Grown | Covert Communication',
    description:
      'A selection of brands we’ve built, launched, and grown — from identity and packaging to product and platform. Each project a partnership, measured by results.',
    path: '/case-studies',
    ogType: 'website',
  })

  return (
    <>
      <SiteNav />

      <main className="csindex">
        <section className="csindex__head">
          <div className="container csindex__head-inner">
            <h1 className="csindex__title reveal">Case Studies</h1>
            <p className="csindex__lead reveal">
              A selection of brands we&rsquo;ve built, launched, and grown — from identity
              and packaging to product and platform. Each project is a partnership, made to
              last and measured by results.
            </p>
          </div>
        </section>

        <section className="csindex__search-wrap">
          <div className="container">
            <div className="csindex__search reveal">
              <span className="csindex__search-icon" aria-hidden="true">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search case studies by name, service, or summary…"
                aria-label="Search case studies"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear case study search">
                  Clear
                </button>
              )}
            </div>
            <p className="sr-only" aria-live="polite">
              {filteredStudies.length} case {filteredStudies.length === 1 ? 'study' : 'studies'} found.
            </p>
          </div>
        </section>

        <section className="csindex__grid-wrap">
          <div className="container">
            <div className="cs-grid">
              {filteredStudies.map(s => <CaseCard key={s.slug} study={s} />)}
            </div>
            {filteredStudies.length === 0 && (
              <div className="csindex__empty" role="status">
                <h2>No case studies found</h2>
                <p>Try another company name, service, or keyword.</p>
                <button type="button" onClick={() => setQuery('')}>Clear search</button>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
