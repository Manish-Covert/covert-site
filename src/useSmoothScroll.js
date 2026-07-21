import { useEffect } from 'react'
import Lenis from 'lenis'

/* Momentum/smooth page scrolling (à la the reference site).
   Scoped per-page: created on mount, destroyed on unmount so other pages
   keep native scrolling. */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
}
