import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* Portfolio card with a "View the case study" pill that eases toward the
   cursor while hovering (smoothed via a CSS transition on transform). */
export default function CaseCard({ study, label = 'View the case study' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect()
    if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <Link
      ref={ref}
      to={`/case-studies/${study.slug}`}
      className="cs-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
    >
      <div className="cs-card__media">
        <img src={study.cover} alt={study.title} loading="lazy" />
      </div>
      <span
        className={`cs-card__cursor${hover ? ' is-on' : ''}`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
        aria-hidden="true"
      >
        {label}
      </span>
      <div className="cs-card__caption">
        <h3 className="cs-card__title">{study.title}</h3>
        <div className="cs-card__tags">
          {study.tags.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>
    </Link>
  )
}
