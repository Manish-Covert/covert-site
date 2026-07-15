import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MEGA_ABOUT, MEGA_SERVICES, ABOUT_PODCASTS, ABOUT_BRANDS } from './data'
import SiteFooter from './SiteFooter'
import './App.css'
import './ServicePage.css'
import './AboutPage.css'

export default function AboutPage() {
  const { id } = useParams()
  const item = MEGA_ABOUT.find(a => a.id === id) || MEGA_ABOUT[0]

  const [megaOpen, setMegaOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [hoveredAbout, setHoveredAbout] = useState(null)
  const [hoveredMegaService, setHoveredMegaService] = useState(null)

  return (
    <>
      {/* ===================== NAV ===================== */}
      <header className="nav-wrap">
        <nav className="nav">
          <Link className="brand" to="/" aria-label="Covert Communication home">
            <img src="/logo-horiz.png" alt="Covert Communication" className="brand__logo" />
          </Link>

          <div className="nav__links">
            {/* ABOUT MEGA */}
            <div
              className="nav__item nav__item--mega"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => { setAboutOpen(false); setHoveredAbout(null) }}
            >
              <Link to="/about" className="nav__link nav__link--trigger" aria-expanded={aboutOpen}>
                About
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className={`mega mega--about ${aboutOpen ? 'mega--open' : ''}`}>
                <div className="mega-about__grid">
                  {MEGA_ABOUT.map(a => (
                    <Link key={a.id} to={a.href}
                      className={`ma-card${hoveredAbout === a.id ? ' ma-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredAbout(a.id)}
                      onMouseLeave={() => setHoveredAbout(null)}>
                      <div className="ma-card__bg" style={{ backgroundImage: `url(${a.img})` }} />
                      <div className="ma-card__inner">
                        <img className="ma-card__icon" src={a.icon} alt="" aria-hidden="true" />
                        <span className="ma-card__label">{a.label}</span>
                        {a.badge && <span className="ma-card__badge">{a.badge}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* SERVICES MEGA */}
            <div
              className="nav__item nav__item--mega"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button type="button" className="nav__link nav__link--trigger" aria-expanded={megaOpen}>
                Services
                <svg className="nav__chevron" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`mega mega--services ${megaOpen ? 'mega--open' : ''}`}>
                <div className="mega-services__grid">
                  {MEGA_SERVICES.map(svc => (
                    <Link key={svc.id} to={`/services/${svc.id}`}
                      className={`ms-card${hoveredMegaService === svc.id ? ' ms-card--hovered' : ''}`}
                      onMouseEnter={() => setHoveredMegaService(svc.id)}
                      onMouseLeave={() => setHoveredMegaService(null)}>
                      <div className="ms-card__bg" style={{ backgroundImage: `url(${svc.img})` }} />
                      <div className="ms-card__inner">
                        <img className="ms-card__icon" src={svc.icon} alt="" aria-hidden="true" />
                        <span className="ms-card__title">{svc.title}</span>
                        <span className="ms-card__count">{svc.count}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <a href="#" className="nav__link">Case Studies</a>
            <a href="#" className="nav__link">The Latest</a>
            <Link to="/#contact" className="nav__link">Contact</Link>
          </div>

          <div className="nav__cta">
            <Link to="/#contact" className="btn btn--pill-outline">Book a Meeting &rarr;</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ===================== HERO ===================== */}
        {item.heroBg ? (
          <section className="about-hero" style={{ backgroundImage: `url(${item.heroBg})` }}>
            {item.heroEmblem && (
              <img
                className={`about-hero__emblem${item.heroEmblemWide ? ' about-hero__emblem--wide' : ''}`}
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
  return (
    <section className="svcpage__body">
      <div className="container">
        <div className="about-cards">
          {ABOUT_PODCASTS.map(p => (
            <div key={p.id} className="about-podcast-card">
              <h3 className="about-podcast-card__title">{p.title}</h3>
              <p className="about-podcast-card__subscribers">{p.subscribers}</p>
              <p className="svcpage__copy">{p.copy}</p>
              <a href={p.listenHref} className="btn btn--outline">Listen</a>
            </div>
          ))}
        </div>
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}

function OtherBrandsBody() {
  const featured = ABOUT_BRANDS.find(b => b.featured)
  const rest = ABOUT_BRANDS.filter(b => !b.featured)
  return (
    <section className="svcpage__body">
      <div className="container">
        {featured && (
          <div className="about-split">
            <div className="about-split__brand">{featured.name}</div>
            <div className="about-split__bar" />
            <div className="about-split__copy">
              <h2 className="about-split__title">{featured.name}</h2>
              <p className="svcpage__copy">{featured.copy}</p>
            </div>
          </div>
        )}
        <h3 className="about-brand-grid__title">Other Brands</h3>
        <div className="about-brand-grid">
          {rest.map(b => (
            <a key={b.id} href={b.href} className="about-brand-card">{b.name}</a>
          ))}
        </div>
        {featured && (
          <a href={featured.href} className="btn btn--green about-brand-cta">{featured.name}</a>
        )}
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}

function CovertTeamBody() {
  return (
    <section className="svcpage__body">
      <div className="container container--narrow">
        <h2 className="svcpage__body-title">The Covert Team</h2>
        <p className="svcpage__lead">
          Covert Communication is powered by a team of strategists, creatives, and media specialists
          working across every discipline the agency offers — from programmatic and social to
          traditional advertising and brand building.
        </p>
        <p className="svcpage__copy">
          Team bios and photos are coming soon. In the meantime, reach out and we'll introduce you
          to the people who'll be working on your account.
        </p>
        <div className="svcpage__cta">
          <Link to="/#contact" className="btn btn--green">Book a Meeting &rarr;</Link>
          <Link to="/about" className="btn btn--outline">&larr; Back to About</Link>
        </div>
      </div>
    </section>
  )
}
