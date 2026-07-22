import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Adds .is-visible to any .reveal element as it scrolls into view.
   Mirrors the smooth scroll-reveal feel of the reference site.
   Re-runs on route changes so elements rendered by the new page
   (e.g. the global footer form) get observed too. */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    // Defer a frame so the browser's scroll restoration (on refresh) has
    // settled before we measure. Elements already in or above the viewport
    // are revealed immediately — otherwise a refresh scrolled past them
    // (e.g. the footer form) would leave them stuck at opacity 0, since the
    // observer only fires when an element *enters* view.
    const raf = requestAnimationFrame(() => {
      els.forEach((el) => {
        if (el.classList.contains('is-visible')) return
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-visible')
        } else {
          io.observe(el)
        }
      })
    })
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [pathname])
}
