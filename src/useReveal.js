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
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
