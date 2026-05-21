import './Emblem.css'

/* The glowing circular "C" tech-emblem from the design, rebuilt as
   layered animated SVG: segmented outer arcs, dashed tracking rings,
   and a clean open "C" core. Rotates + pulses (Lesse-style polish). */
export default function Emblem() {
  return (
    <div className="emblem">
      <div className="emblem__glow" />

      {/* Dashed tracking rings — rotate slowly */}
      <svg className="emblem__ring emblem__ring--outer" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="186" fill="none" stroke="url(#g-dash)"
          strokeWidth="2" strokeDasharray="2 11" strokeLinecap="round" opacity="0.55" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="url(#g-dash)"
          strokeWidth="1.5" strokeDasharray="20 12" opacity="0.35" />
        <defs>
          <linearGradient id="g-dash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6f23c" />
            <stop offset="100%" stopColor="#34c7a0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Segmented chunky arcs — counter-rotate */}
      <svg className="emblem__ring emblem__ring--mid" viewBox="0 0 400 400" aria-hidden="true">
        <g fill="none" strokeLinecap="butt">
          {/* top-right block */}
          <path d="M214 58 a142 142 0 0 1 70 26" stroke="url(#g-arc)" strokeWidth="30" opacity="0.95" />
          {/* right arc */}
          <path d="M330 120 a142 142 0 0 1 8 120" stroke="url(#g-arc)" strokeWidth="20" opacity="0.8" />
          {/* bottom-right block */}
          <path d="M300 300 a142 142 0 0 1 -78 40" stroke="url(#g-arc)" strokeWidth="26" opacity="0.9" />
          {/* bottom-left small */}
          <path d="M118 332 a142 142 0 0 1 -52 -48" stroke="url(#g-arc)" strokeWidth="16" opacity="0.7" />
          {/* left arc */}
          <path d="M58 214 a142 142 0 0 1 -2 -52" stroke="url(#g-arc)" strokeWidth="18" opacity="0.75" />
          {/* top-left block */}
          <path d="M96 92 a142 142 0 0 1 64 -34" stroke="url(#g-arc)" strokeWidth="24" opacity="0.85" />
        </g>
        <defs>
          <linearGradient id="g-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8f95a" />
            <stop offset="55%" stopColor="#3f9d3a" />
            <stop offset="100%" stopColor="#1c5f33" />
          </linearGradient>
        </defs>
      </svg>

      {/* The bold open "C" core — static, glowing */}
      <svg className="emblem__core" viewBox="0 0 400 400" aria-hidden="true">
        <path d="M278 132 A 92 92 0 1 0 278 268"
          fill="none" stroke="url(#g-core)" strokeWidth="52" strokeLinecap="round" />
        <defs>
          <linearGradient id="g-core" x1="0.15" y1="0.05" x2="0.85" y2="0.95">
            <stop offset="0%" stopColor="#d6fb6a" />
            <stop offset="48%" stopColor="#62bd3f" />
            <stop offset="100%" stopColor="#246b33" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
