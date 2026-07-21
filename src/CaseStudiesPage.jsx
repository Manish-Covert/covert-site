import { CASE_STUDIES } from './data'
import CaseCard from './CaseCard'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import { useSmoothScroll } from './useSmoothScroll'
import './App.css'
import './ServicePage.css'
import './CaseStudies.css'

export default function CaseStudiesPage() {
  useReveal()
  useSmoothScroll()

  return (
    <>
      <SiteNav />

      <main className="csindex">
        {/* ---------- HEADER: title left, description right ---------- */}
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

        {/* ---------- TWO-COLUMN PORTFOLIO GRID ---------- */}
        <section className="csindex__grid-wrap">
          <div className="container">
            <div className="cs-grid">
              {CASE_STUDIES.map(s => <CaseCard key={s.slug} study={s} />)}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
