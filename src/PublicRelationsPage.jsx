import { useEffect, useRef, useState } from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import { useSEO } from './useSEO'
import { PR_CLIENTS } from './publicRelationsData'
import './PublicRelations.css'

const PARTICLES = Array.from({ length: 160 }, (_, i) => ({
  '--angle': `${i * 137.508}deg`,
  '--distance': `${70 + (i * 73 % 160)}px`,
  '--delay': `${(i % 17) * 0.025}s`,
  '--size': `${2 + i % 3}px`,
}))

export default function PublicRelationsPage() {
  useSEO({ title: 'Break Out PR — Public Relations | Covert Communication', description: 'Explore Covert’s breakout public relations campaigns and earned-media coverage for Diamond Bakery, Love’s Bakery, Mokulele Airlines and more.', path: '/break-out-pr', ogType: 'website' })
  const [active, setActive] = useState(0)
  const [burst, setBurst] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const players = useRef(new Map())
  const client = PR_CLIENTS[active]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setReduced(media.matches)
    media.addEventListener('change', change)
    return () => media.removeEventListener('change', change)
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const timer = window.setInterval(() => {
      if (document.hidden) return
      setActive(index => (index + 1) % PR_CLIENTS.length)
      setBurst(value => value + 1)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [paused, reduced, burst])

  useEffect(() => {
    const onMessage = event => {
      if (event.origin !== 'https://player.vimeo.com') return
      if (![...players.current.values()].some(frame => frame?.contentWindow === event.source)) return
      let data = event.data
      if (typeof data === 'string') { try { data = JSON.parse(data) } catch { return } }
      if (data?.event === 'play') setPaused(true)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const select = index => {
    setPaused(true)
    setActive(index)
    setBurst(value => value + 1)
  }

  return (
    <>
      <SiteNav />
      <main className="pr-page container">
        <header className="pr-page__intro">
          <h1>Break Out with<br /><span>Covert PR</span></h1>
          <p>Big ideas. Real stories. Remarkable coverage. We create breakout moments that put your brand in the spotlight, through creative PR campaigns and earned media. Explore our clients’ stories below.</p>
        </header>
        <div className={`pr-burst${paused ? ' pr-burst--paused' : ''}${reduced ? ' pr-burst--reduced' : ''}`}>
          <div key={burst} className="pr-burst__particles" aria-hidden="true">
            {PARTICLES.map((style, index) => <i key={index} style={style} />)}
          </div>
          <span key={`${burst}-label`} className="pr-burst__label">{client.name}</span>
        </div>
        <div className="pr-controls">
          <nav className="pr-clients" aria-label="Public relations clients">
            {PR_CLIENTS.map((item, index) => <button key={item.id} type="button" aria-pressed={index === active} aria-controls="pr-coverage" onClick={() => select(index)}>{item.name}</button>)}
          </nav>
          {!reduced && <button type="button" className="pr-controls__pause" onClick={() => setPaused(value => !value)}>{paused ? 'Resume client rotation' : 'Pause client rotation'}</button>}
        </div>
        <section id="pr-coverage" className="pr-coverage" aria-labelledby="pr-client-title">
          <h2 id="pr-client-title">{client.name}</h2>
          <div className="pr-videos" key={client.id}>
            {client.videos.map((video, index) => <article key={`${video.id}-${index}`} className="pr-video">
              <iframe
                ref={frame => { const key = `${client.id}-${index}`; if (frame) players.current.set(key, frame); else players.current.delete(key) }}
                src={`https://player.vimeo.com/video/${video.id}?autoplay=0&autopause=1&dnt=1`}
                title={`${client.name} — ${video.title} (${index + 1})`}
                loading="lazy" allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen
                onFocus={() => setPaused(true)}
                onLoad={event => event.currentTarget.contentWindow?.postMessage(JSON.stringify({ method: 'addEventListener', value: 'play' }), 'https://player.vimeo.com')}
              />
              <h3>{video.title}</h3>
            </article>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
