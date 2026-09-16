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

        <section className="csindex__grid-wrap">
          <div className="container">
            <div className="cs-grid">
              {CASE_STUDIES_WITH_NEW_DAY_SOLAR.map(s => <CaseCard key={s.slug} study={s} />)}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
