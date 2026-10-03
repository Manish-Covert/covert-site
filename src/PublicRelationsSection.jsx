import { Link } from 'react-router-dom'
import './PublicRelations.css'

export default function PublicRelationsSection() {
  return (
    <section id="public-relations" className="pr-section">
      <div className="container pr-section__inner">
        <div>
          <p className="section__eyebrow">MAKE YOUR STORY HEARD</p>
          <h2>Public Relations</h2>
          <p className="pr-section__copy">Build visibility and credibility for executives, founders, experts and individuals through earned-media strategy.</p>
          <ul className="pr-section__list">
            <li>PR strategy</li><li>Story development</li><li>Earned media outreach</li>
          </ul>
          <Link to="/break-out-pr" className="btn btn--outline-pill"><span>Break Out PR →</span></Link>
        </div>
        <div className="pr-section__art" aria-hidden="true">
          <svg viewBox="0 0 360 260" fill="none">
            <defs><linearGradient id="pr-green"><stop stopColor="#a6f23c"/><stop offset="1" stopColor="#3f9d3a"/></linearGradient></defs>
            <path d="M89 105 206 62v137L89 156Z" fill="#8bd419" fillOpacity=".08" stroke="url(#pr-green)" strokeWidth="3"/>
            <rect x="65" y="104" width="27" height="53" rx="7" fill="url(#pr-green)"/>
            <path d="M120 168v32h26v-23" stroke="url(#pr-green)" strokeWidth="3"/>
            <path className="pr-wave pr-wave--1" d="M228 96c27 18 27 51 0 69" stroke="#a6f23c" strokeWidth="3" strokeLinecap="round"/>
            <path className="pr-wave pr-wave--2" d="M251 77c45 27 45 82 0 110" stroke="#8bd419" strokeWidth="3" strokeLinecap="round"/>
            <path className="pr-wave pr-wave--3" d="M276 56c59 38 59 114 0 152" stroke="#8bd419" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
