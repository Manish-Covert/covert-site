import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Adds .is-visible to any .reveal element once it reaches the viewport.
   Mirrors the smooth scroll-reveal feel of the reference site.

   Scroll-based (not IntersectionObserver) on purpose: an element that gets
   scrolled *past* — e.g. the footer form after a refresh restores scroll to
   the bottom — is above the viewport, a state IntersectionObserver reports as
   "not intersecting" and never fires for. Here we reveal anything whose top
   has passed 92% of the viewport height, which covers both in-view and
   scrolled-past elements. Re-runs on route changes so elements rendered by a
   new page (e.g. the global footer form) get picked up. */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'))
    if (!pending.length) return

    const check = () => {
      const line = window.innerHeight * 0.92
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.classList.add('is-visible')
          return false
        }
        return true
      })
      if (!pending.length) teardown()
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { ticking = false; check() })
    }

    function teardown() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', check)
    // Defer a frame so the browser's scroll restoration (on refresh) has
    // applied before the first measurement.
    const raf = requestAnimationFrame(check)

    return () => { cancelAnimationFrame(raf); teardown() }
  }, [pathname])
}
