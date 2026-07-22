import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Adds .is-visible to any .reveal element once it reaches the viewport.
   Mirrors the smooth scroll-reveal feel of the reference site.

   Uses IntersectionObserver for the normal "scroll into view" reveal (which
   works with the Lenis smooth-scroll in use). IO only fires when an element
   *enters* view, so it has a blind spot: an element that is already scrolled
   *past* — above the viewport — is reported as non-intersecting and never
   revealed. That happens on a refresh when the browser restores scroll to the
   bottom of the page (e.g. the footer form). The sweep below covers it by
   revealing anything already in or above the viewport, re-checked across the
   frames where scroll restoration may land. Re-runs on route changes so a new
   page's elements (like the global footer form) get picked up. */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
    if (!els.length) return

    const reveal = (el) => el.classList.add('is-visible')

    if (!('IntersectionObserver' in window)) {
      els.forEach(reveal)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))

    // Reveal anything already in or above the viewport (IO's blind spot).
    const sweep = () => {
      els.forEach((el) => {
        if (el.classList.contains('is-visible')) return
        if (el.getBoundingClientRect().top < window.innerHeight) {
          reveal(el)
          io.unobserve(el)
        }
      })
    }
    const raf = requestAnimationFrame(sweep)
    const timer = setTimeout(sweep, 300)
    window.addEventListener('load', sweep)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      window.removeEventListener('load', sweep)
      io.disconnect()
    }
  }, [pathname])
}
