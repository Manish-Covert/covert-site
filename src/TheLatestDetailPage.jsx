import { useParams, Link, Navigate } from 'react-router-dom'
import { LATEST_CONTENT } from './latestContent'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import './App.css'
import './ServicePage.css'
import './TheLatest.css'

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function TheLatestDetailPage() {
  const { slug } = useParams()
  const post = LATEST_CONTENT[slug]
  useReveal()

  // Unknown slug → back to the index.
  if (!post) return <Navigate to="/the-latest" replace />

  return (
    <>
      <SiteNav />

      <main className="latest-detail">
        {/* ---------- HEADER ---------- */}
        <header className="latest-detail__head">
          <div className="container container--narrow">
            <Link to="/the-latest" className="latest-detail__back">◂ Back to The Latest</Link>
            <div className="latest-detail__meta">
              {post.source && <span className="latest-detail__source">{post.source}</span>}
              {post.date && <span className="latest-detail__date">{formatDate(post.date)}</span>}
            </div>
            <h1 className="latest-detail__title">{post.title}</h1>
          </div>
        </header>

        {post.vimeoId ? (
          <div className="container container--narrow">
            <div className="latest-detail__video">
              <iframe
                src={`https://player.vimeo.com/video/${post.vimeoId}?badge=0&autopause=0`}
                title={post.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        ) : post.img && (
          <div className="container container--narrow">
            <img className="latest-detail__hero-img" src={post.img} alt={post.title} />
          </div>
        )}

        {/* ---------- BODY (source HTML) ---------- */}
        <article className="container container--narrow latest-prose">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <div className="container container--narrow latest-detail__footer">
          <Link to="/the-latest" className="btn btn--outline-pill"><span>◂ Back to The Latest</span></Link>
          {post.sourceUrl && (
            <a className="btn btn--green" href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
              View original &rarr;
            </a>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
