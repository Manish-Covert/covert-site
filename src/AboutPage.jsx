import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MEGA_ABOUT, MEGA_SERVICES, ABOUT_BRANDS } from './data'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useSEO } from './useSEO'
import './App.css'
import './ServicePage.css'
import './AboutPage.css'

export default function AboutPage() {
  const { id } = useParams()
  const item = MEGA_ABOUT.find(a => a.id === id) || MEGA_ABOUT[0]

  useSEO({
    title: `${item.label} — About | Covert Communication`,
    description: (item.tagline || `Learn more about ${item.label} at Covert Communication.`).slice(0, 160),
    path: `/about/${item.id}`,
    ogType: 'website',
    image: item.heroImg || item.img,
  })

  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)

  return (
    <>
      {/* ===================== NAV ===================== */}
      <SiteNav />

      <main>
        {/* ===================== HERO ===================== */}
        {item.heroBg ? (
          <section className="about-hero" style={{ backgroundImage: `url(${item.heroBg})` }}>
            {item.heroEmblem && (
              <img
                className={`about-hero__emblem${item.heroEmblemWide ? ' about-hero__emblem--wide' : ''}${item.heroEmblemFigure ? ' about-hero__emblem--figure' : ''}`}
                src={item.heroEmblem} alt="" aria-hidden="true"
              />
            )}
            <div className="about-hero__content">
              <h1 className="about-hero__title">
                {item.heroTitle || 'About'}<br />
                <span className="about-hero__title-accent">{item.heroAccent || item.label}</span>
              </h1>
              <p className="about-hero__lead">
                Lorem ipsum dolor sit amet, consectetuer<br />
                Lorem ipsum dolor sit amet, consectetuer<br />
                adipiscing elit, diam nonummy
              </p>
            </div>
            <Link to="/about" className="btn-gradient about-hero__viewall"><span>&#9666; View all</span></Link>
          </section>
        ) : (
          <section className="svcpage__hero" style={{ backgroundImage: `url(${item.heroImg || item.img})` }}>
            <div className="svcpage__hero-overlay" />
            <div className="svcpage__hero-content">
              {item.badge && <p className="svcpage__eyebrow">{item.badge}</p>}
              <h1 className="svcpage__title">About<br />{item.label}</h1>
              {item.tagline && <p className="svcpage__lead">{item.tagline}</p>}
              <Link to="/about" className="btn btn--outline about-body__viewall">&larr; View all</Link>
            </div>
          </section>
        )}

        {/* ===================== BODY (per-subpage) ===================== */}
        <AboutBody id={item.id} item={item} />
      </main>

      {/* ===================== GLOBAL FOOTER (form + footer) ===================== */}
      <SiteFooter />
    </>
  )
}

function AboutBody({ id, item }) {
  switch (id) {
    case 'covertcom': return <CovertCommunicationBody item={item} />
    case 'anna': return <AnnaCovertBody item={item} />
    case 'books': return <BooksBody />
    case 'podcasts': return <PodcastsBody />
    case 'otherbrands': return <OtherBrandsBody />
    case 'covertteam': return <CovertTeamBody />
    default: return <CovertCommunicationBody item={item} />
  }
}

function CovertCommunicationBody({ item }) {
  const galleryImages = [
    item.heroImg || item.img,
    '/categories/programmatic.webp',
    '/categories/technology.webp',
    '/categories/social.webp',
    '/categories/brand-building.webp',
  ]
  return (
    <>
      <ScrollGallery images={galleryImages}>
        <h2 className="about-split__title">WHO WE ARE</h2>
        <p className="svcpage__copy">
          Covert Communication is a full-service marketing agency built around one idea: great
          marketing should work as hard as the people behind it. From programmatic media and
          social to traditional advertising and brand building, our team runs every discipline
          a modern brand needs under one roof.
        </p>
      </ScrollGallery>
      <section className="svcpage__body about-covertcom-cta">
        <div className="container">
          <div className="svcpage__cta">
            <Link to="/#contact" className="btn-gradient"><span>Book a Meeting &rarr;</span></Link>
            <Link to="/about" className="btn-gradient"><span>&larr; Back to About</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}

/* Pins the media frame while a vertical filmstrip of images scrolls through it,
   then releases to the next section. Progress is driven by the page scroll
   position over the tall stage, matching the reference portfolio scroll feel. */
function ScrollGallery({ images, children }) {
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const stripRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const stage = stageRef.current
    const frame = frameRef.current
    const strip = stripRef.current
    if (!stage || !frame || !strip) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = stage.getBoundingClientRect()
      const scrollable = stage.offsetHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
      const maxShift = strip.scrollHeight - frame.clientHeight
      strip.style.transform = `translate3d(0, ${-progress * maxShift}px, 0)`
      setActive(Math.min(images.length - 1, Math.round(progress * (images.length - 1))))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [images])

  return (
    <section ref={stageRef} className="scroll-gallery" style={{ height: `${images.length * 85}vh` }}>
      <div className="scroll-gallery__sticky">
        <div className="container">
          <div className="about-split">
            <div ref={frameRef} className="scroll-gallery__frame">
              <div ref={stripRef} className="scroll-gallery__strip">
                {images.map((src, i) => (
                  <div key={i} className="scroll-gallery__slide" style={{ backgroundImage: `url(${src})` }} />
                ))}
              </div>
              <div className="scroll-gallery__dots" aria-hidden="true">
                {images.map((_, i) => (
                  <span key={i} className={`scroll-gallery__dot${i === active ? ' scroll-gallery__dot--active' : ''}`} />
                ))}
              </div>
            </div>
            <div className="about-split__bar" />
            <div className="about-split__copy">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AnnaCovertBody({ item }) {
  return (
    <section className="svcpage__body about-anna">
      <div className="container">
        <div className="about-anna__split">
          <div className="about-anna__media">
            <img src={item.figure || item.photo || item.img} alt="Anna Covert" />
          </div>
          <div className="about-anna__copy">
            <h2 className="about-anna__title">CAPTION GOES HERE</h2>
            <p className="svcpage__copy">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
              quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
              odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla.
            </p>
            <a href="#" className="btn-gradient about-anna__cta"><span>view AI Anna</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function BooksBody() {
  const books = [
    { id: 'covert-code', img: '/about/book-covert-code.webp', alt: 'The Covert Code' },
    { id: 'solar-coaster', img: '/about/book-solar-coaster.webp', alt: 'The Solar Coaster', badge: 'NEW!' },
  ]
  return (
    <section className="svcpage__body about-books">
      <div className="container">
        <div className="about-books__grid">
          {books.map(b => (
            <div key={b.id} className="about-books__card">
              <div className="about-books__media">
                <img src={b.img} alt={b.alt} />
                {b.badge && <NewBadge label={b.badge} />}
              </div>
              <p className="svcpage__copy about-books__copy">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
              </p>
              <a href="#" className="btn-gradient about-books__cta"><span>buy</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewBadge({ label }) {
  return (
    <span className="about-books__badge" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <polygon
          points="50.0,1.0 59.1,10.0 71.3,5.9 75.6,17.9 88.3,19.4 86.9,32.2 97.8,39.1 91.0,50.0 97.8,60.9 86.9,67.8 88.3,80.6 75.6,82.1 71.3,94.1 59.1,90.0 50.0,99.0 40.9,90.0 28.7,94.1 24.4,82.1 11.7,80.6 13.1,67.8 2.2,60.9 9.0,50.0 2.2,39.1 13.1,32.2 11.7,19.4 24.4,17.9 28.7,5.9 40.9,10.0"
          fill="url(#newGold)"
        />
        <defs>
          <linearGradient id="newGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4d03f" />
            <stop offset="0.5" stopColor="#d4a017" />
            <stop offset="1" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>
      <span className="about-books__badge-text">{label}</span>
    </span>
  )
}

function PodcastsBody() {
  const podcasts = [
    { id: 'covert-code', logo: '/about/podcast-covert-code.webp', alt: 'The Covert Code Podcast', subs: 'Over 150,000+ Subscribers & growing!' },
    { id: 'solar-coaster', logo: '/about/podcast-solar-coaster.webp', alt: 'The Solar Coaster Podcast', subs: 'Over 50,000+ Subscribers & growing!' },
  ]
  return (
    <section className="svcpage__body about-podcasts">
      <div className="container">
        <div className="about-podcasts__grid">
          {podcasts.map(p => (
            <div key={p.id} className="about-podcasts__card">
              <div className="about-podcasts__logo">
                <img src={p.logo} alt={p.alt} />
              </div>
              <p className="about-podcasts__subs">{p.subs}</p>
              <p className="svcpage__copy about-podcasts__copy">
                Lorem ipsum dolor sit amet, consectetuer<br />
                Lorem ipsum dolor sit amet, consectetuer<br />
                adipiscing elit, diam nonummy
              </p>
              <a href="#" className="btn-gradient about-podcasts__cta"><span>Listen</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OtherBrandsBody() {
  const [activeId, setActiveId] = useState(ABOUT_BRANDS[0].id)
  const active = ABOUT_BRANDS.find(b => b.id === activeId) || ABOUT_BRANDS[0]
  return (
    <section className="svcpage__body about-brands">
      <div className="container">
        {/* Featured brand */}
        <div className="about-brands__featured">
          <div className="about-brands__featured-logo">
            <img src={active.logo} alt={active.name} />
          </div>
          <div className="about-brands__bar" />
          <div className="about-brands__featured-copy">
            <h2 className="about-brands__caption">{active.name}</h2>
            <p className="svcpage__copy">{active.copy}</p>
          </div>
        </div>

        {/* Brand grid — fixed positions; click to feature (active marked in place) */}
        <div className="about-brands__lower">
          <h3 className="about-brands__grid-title">Other Brands</h3>
          <div className="about-brands__grid">
            {ABOUT_BRANDS.map(b => (
              <button
                key={b.id}
                type="button"
                className={`about-brands__card${b.id === activeId ? ' about-brands__card--active' : ''}`}
                onClick={() => setActiveId(b.id)}
                aria-pressed={b.id === activeId}
                aria-label={`Show ${b.name}`}
              >
                <img src={b.logo} alt={b.name} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const COVERT_TEAM = [
  { name: 'Pat Monick', role: 'Vice President' },
  { name: 'Christine Sullivan', role: 'Creative Director' },
  { name: 'Christopher Gaspar', role: 'Account Service Director' },
  { name: 'Noah Jesser', role: 'Social Media Director' },
  { name: 'Matthew Etline', role: 'Technology Director' },
  { name: 'Cam Tullos', role: 'Senior Software Engineer' },
  { name: 'Manish Prajapati', role: 'Senior Developer' },
  { name: 'Sam Kuo', role: 'Software Engineer' },
  { name: 'Mohammed Irshadh', role: 'QA Specialist' },
  { name: 'Jocelyn Palafox', role: 'Marketing Director' },
  { name: 'Kapili Moniz', role: 'Account Executive' },
  { name: 'Tharam Singh', role: 'Sr. Accounts Coordinator & Podcast Producer' },
  { name: 'Cheryl Wui', role: 'Technology Specialist' },
  { name: 'Gayatri Prajapati', role: 'Technology Specialist' },
  { name: 'Amber Hadfield', role: 'Account Coordinator' },
  { name: 'Nitesh Thapa', role: 'Art Director' },
  { name: 'Bailey Monick', role: 'Content Manager' },
]

const ANNA_LINKS = [
  { label: 'Watch ThinkTech Hawaii Interview', href: '#' },
  { label: 'Watch GTR Webinar', href: '#' },
  { label: 'Watch Best Company Podcast', href: '#' },
  { label: 'The Covert Code Podcast', href: '#' },
]

/* Full roster (Anna first, then the wider team) used by the rotating
   category spotlight below the hero. */
const TEAM_ROSTER = [
  { name: 'Anna Covert', role: 'Principal', links: ANNA_LINKS },
  ...COVERT_TEAM,
]

/* Each category spotlights the members that belong to it (highlighted green)
   and shows its own caption under the C emblem. Cycles every 5s.
   Branding roster is a placeholder until the final list is provided. */
const TEAM_CATEGORIES = [
  {
    name: 'Technology',
    caption: 'Engineering the tools, sites, and platforms behind every campaign.',
    members: ['Anna Covert', 'Matthew Etline', 'Cam Tullos', 'Manish Prajapati', 'Sam Kuo', 'Mohammed Irshadh', 'Cheryl Wui', 'Gayatri Prajapati'],
  },
  {
    name: 'Marketing',
    caption: 'Strategy, media, and accounts that move brands forward.',
    members: ['Anna Covert', 'Pat Monick', 'Christine Sullivan', 'Christopher Gaspar', 'Jocelyn Palafox', 'Kapili Moniz', 'Tharam Singh', 'Amber Hadfield', 'Nitesh Thapa', 'Bailey Monick'],
  },
  {
    name: 'Creative',
    caption: 'Design, art direction, and the ideas that stand out.',
    members: ['Anna Covert', 'Pat Monick', 'Christine Sullivan', 'Christopher Gaspar', 'Noah Jesser', 'Nitesh Thapa'],
  },
  {
    name: 'Social Media',
    caption: 'Building community and conversation across every channel.',
    members: ['Anna Covert', 'Christopher Gaspar', 'Noah Jesser', 'Jocelyn Palafox', 'Kapili Moniz', 'Tharam Singh', 'Bailey Monick'],
  },
  {
    name: 'Podcast Dev',
    caption: 'Producing and publishing our shows from record to release.',
    members: ['Anna Covert', 'Christopher Gaspar', 'Tharam Singh'],
  },
  {
    name: 'Branding',
    caption: 'Shaping identity, voice, and brand systems that set clients apart.',
    members: ['Anna Covert', 'Pat Monick', 'Christine Sullivan', 'Christopher Gaspar', 'Jocelyn Palafox', 'Kapili Moniz', 'Tharam Singh', 'Nitesh Thapa', 'Bailey Monick'],
  },
]

function CovertTeamBody() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TEAM_CATEGORIES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const category = TEAM_CATEGORIES[active]
  const highlighted = new Set(category.members)

  return (
    <section className="svcpage__body team-cats">
      <div className="container">
        <div className="team-cats__split">
          {/* Left — emblem with rotating category label + caption */}
          <div className="team-cats__aside">
            <div className="team-cats__emblem">
              <img src="/about/about-hero-emblem.webp" alt="" aria-hidden="true" />
              <span key={category.name} className="team-cats__pill">{category.name}</span>
            </div>
            <p key={category.caption} className="team-cats__caption">{category.caption}</p>
          </div>

          {/* Right — full roster, active category highlighted */}
          <ul className="team-cats__list">
            {TEAM_ROSTER.map(m => {
              const on = highlighted.has(m.name)
              return (
                <li key={m.name} className={`team-cats__row${on ? ' team-cats__row--on' : ''}`}>
                  <span className="team-cats__marker" aria-hidden="true">&#9666;</span>
                  <div className="team-cats__person">
                    <span className="team-cats__name">{m.name}</span>
                    <span className="team-cats__sep"> | </span>
                    <span className="team-cats__role">{m.role}</span>
                    {m.links && (
                      <span className="team-cats__links">
                        {m.links.map((l, i) => (
                          <span key={l.label}>
                            <a href={l.href} className="team-cats__link">{l.label}</a>
                            {i < m.links.length - 1 && <span className="team-cats__link-sep"> / </span>}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
