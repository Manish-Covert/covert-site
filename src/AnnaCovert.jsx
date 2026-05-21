import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from './useReveal'
import './App.css'

export default function AnnaCovert() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <Link className="brand" to="/" aria-label="Covert Communication home">
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 60 60">
                <path d="M44 18 A20 20 0 1 0 44 42"
                  fill="none" stroke="url(#bg)" strokeWidth="9" strokeLinecap="round" />
                <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c8f95a" />
                  <stop offset="100%" stopColor="#2f7d3a" />
                </linearGradient></defs>
              </svg>
            </span>
            <span className="brand__text">
              <strong>COVERT</strong>
              <em>COMMUNICATION</em>
            </span>
          </Link>

          <nav className="nav__links">
            <Link to="/" className="nav__link">Home</Link>
            <Link to="/#about" className="nav__link">About</Link>
            <Link to="/#why" className="nav__link">Why Us</Link>
            <Link to="/anna-covert" className="nav__link nav__link--active">Anna Covert</Link>
            <Link to="/#contact" className="btn btn--pill-white">Book a Meeting</Link>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="anna">
          <div className="container container--narrow">
            <p className="section__eyebrow reveal">Meet</p>
            <h1 className="section__title reveal">Anna Covert</h1>
            <p className="anna__role reveal">Founder &amp; CEO, Covert Communication</p>

            <div className="anna__portrait reveal" aria-label="Anna Covert portrait">
              <div className="portrait__frame">
                <div className="portrait__placeholder">
                  <span>Anna Covert</span>
                  <small>swap <code>/anna.png</code></small>
                </div>
              </div>
            </div>

            <div className="anna__body">
              <p className="reveal">
                Anna Covert is a serial entrepreneur, advertising veteran, and the founder of
                Covert Communication &mdash; a full-service agency built on the belief that
                great brands deserve great media. Over a career spanning three decades, she
                has helped launch, scale, and reinvent some of the most recognizable names in
                consumer and B2B marketing.
              </p>
              <p className="reveal">
                Her work pioneered the use of real-time, programmatic targeting long before
                it became an industry standard, and she continues to push the agency forward
                with proprietary tools for audience intelligence, fraud protection, and
                creative measurement.
              </p>

              <h2 className="reveal">The Covert Code</h2>
              <p className="reveal">
                Anna is also the author of <em>The Covert Code</em>, a practical playbook for
                marketers who want to cut through the noise of modern advertising. The book
                distills the lessons of her career into a repeatable framework for turning
                attention into action &mdash; covering audience strategy, creative discipline,
                channel mix, and the measurement habits that separate brands that grow from
                brands that simply spend.
              </p>

              <h2 className="reveal">Beyond the Agency</h2>
              <p className="reveal">
                Outside of client work, Anna mentors founders, speaks on marketing strategy
                and ad-tech, and advises companies on building category-defining brands. She
                splits her time between strategic counsel for long-term agency partners and
                hands-on work with the leadership teams of early-stage businesses.
              </p>

              <blockquote className="anna__quote reveal">
                &ldquo;The brands that win don&rsquo;t shout the loudest &mdash; they show up
                in the right place, at the right moment, with something genuinely useful to
                say.&rdquo;
              </blockquote>

              <div className="anna__cta reveal">
                <Link to="/#contact" className="btn btn--green">Work With Anna</Link>
                <Link to="/" className="btn btn--outline">Back to Home</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__art" aria-hidden="true" />
        <div className="footer__inner">
          <span className="footer__mark" aria-hidden="true">
            <svg viewBox="0 0 60 60">
              <path d="M44 18 A20 20 0 1 0 44 42"
                fill="none" stroke="#0a0a0a" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </span>
          <div className="footer__social" aria-label="Social links">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">&#9678;</a>
          </div>
        </div>
        <div className="footer__legalbar">
          <p className="footer__legal">
            Copyright 2026 Covert Communication LLC | All Rights Reserved | Privacy Policy |
            Cookie Preferences | Terms of Service | Site Map | 808-272-9952
          </p>
        </div>
      </footer>
    </>
  )
}
