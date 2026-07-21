import { useParams, Link, Navigate } from 'react-router-dom'
import { CASE_STUDIES } from './data'
import CaseCard from './CaseCard'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import { useSmoothScroll } from './useSmoothScroll'
import { useSEO } from './useSEO'
import './App.css'
import './ServicePage.css'
import './CaseStudies.css'

export default function CaseStudyPage() {
  const { slug } = useParams()
  useReveal()
  useSmoothScroll()

  const study = CASE_STUDIES.find(s => s.slug === slug)

  useSEO({
    title: study ? `${study.title} — Case Study | Covert Communication` : 'Case Study | Covert Communication',
    description: study
      ? (study.excerpt || (study.description || '').replace(/\n+/g, ' ')).slice(0, 160)
      : 'Case studies from Covert Communication.',
    path: study ? `/case-studies/${study.slug}` : '/case-studies',
    ogType: 'article',
    image: study?.cover,
    jsonLd: study && {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.title,
      image: study.cover ? `https://covertcommunication.com${study.cover}` : undefined,
      author: { '@type': 'Organization', name: 'Covert Communication LLC' },
      publisher: { '@type': 'Organization', name: 'Covert Communication LLC' },
      url: `https://covertcommunication.com/case-studies/${study.slug}`,
    },
  })

  if (!study) return <Navigate to="/case-studies" replace />

  // Two other studies for the "Next Case Studies" section.
  const idx = CASE_STUDIES.findIndex(s => s.slug === slug)
  const next = [CASE_STUDIES[(idx + 1) % CASE_STUDIES.length], CASE_STUDIES[(idx + 2) % CASE_STUDIES.length]]

  return (
    <>
      <SiteNav />

      <main className="csd">
        {/* ---------- STICKY INFO (left) + SCROLLING IMAGES (right) ---------- */}
        <section className="csd__hero">
          <div className="container csd__hero-grid">
            <div className="csd__info">
              <div className="csd__info-sticky">
                <h1 className="csd__title">{study.title}</h1>
                <div className="csd__tags">
                  {study.tags.map(t => <span className="csd__tag" key={t}>{t}</span>)}
                </div>
                {study.description.split('\n\n').map((p, i) => (
                  <p className="csd__copy" key={i}>{p}</p>
                ))}
                <Link to="/case-studies" className="btn btn--outline-pill csd__back">
                  <span>◂ View all case studies</span>
                </Link>
              </div>
            </div>

            <div className="csd__media">
              {study.images.map((src, i) => (
                <img key={i} className="csd__img" src={src} alt={`${study.title} ${i + 1}`} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- NEXT CASE STUDIES ---------- */}
        <section className="csd__next">
          <div className="container">
            <h2 className="csd__next-title reveal">Next Case Studies</h2>
            <div className="cs-grid">
              {next.map(s => <CaseCard key={s.slug} study={s} />)}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
