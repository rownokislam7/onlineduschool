/**
 * Site-wide atmospheric background. Rendered once in _app.tsx.
 * All motion is CSS-only; respects prefers-reduced-motion.
 */
export default function AppBackground() {
  return (
    <div className="app-background" aria-hidden="true">
      <div className="app-background__layer app-background__layer--base" />
      <div className="app-background__layer app-background__layer--glow" />
      <div className="app-background__layer app-background__layer--mesh" />
      <div className="app-background__layer app-background__layer--texture" />
      <div className="app-background__layer app-background__layer--aurora app-background__layer--aurora-left" />
      <div className="app-background__layer app-background__layer--aurora app-background__layer--aurora-right" />
      <div className="app-background__layer app-background__layer--grid" />
      <div className="app-background__layer app-background__layer--motifs" aria-hidden="true">
        <svg className="motif motif--formula motif--formula--1" viewBox="0 0 220 80" aria-hidden="true">
          <text x="8" y="48" fill="rgba(255,122,0,0.20)" fontFamily="Inter, sans-serif" fontSize="31" fontStyle="italic">
            E = mc<tspan baselineShift="super" fontSize="18">2</tspan>
          </text>
        </svg>
        <svg className="motif motif--formula motif--formula--2" viewBox="0 0 220 80" aria-hidden="true">
          <text x="8" y="48" fill="rgba(255,176,71,0.16)" fontFamily="Inter, sans-serif" fontSize="30" fontStyle="italic">
            ∫ f(x)dx
          </text>
        </svg>
        <svg className="motif motif--formula motif--formula--3" viewBox="0 0 220 80" aria-hidden="true">
          <text x="8" y="48" fill="rgba(255,122,0,0.18)" fontFamily="Inter, sans-serif" fontSize="30" fontStyle="italic">
            ∑ 1/n<tspan baselineShift="super" fontSize="18">2</tspan>
          </text>
        </svg>
        <svg className="motif motif--formula motif--formula--4" viewBox="0 0 220 80" aria-hidden="true">
          <text x="8" y="47" fill="rgba(255,176,71,0.16)" fontFamily="Inter, sans-serif" fontSize="30" fontStyle="italic">
            π ≈ 3.14
          </text>
        </svg>
        <svg className="motif motif--formula motif--formula--5" viewBox="0 0 260 90" aria-hidden="true">
          <text x="8" y="50" fill="rgba(255,122,0,0.17)" fontFamily="Inter, sans-serif" fontSize="30" fontStyle="italic">
            a<tspan baselineShift="super" fontSize="17">2</tspan> + b<tspan baselineShift="super" fontSize="17">2</tspan> = c<tspan baselineShift="super" fontSize="17">2</tspan>
          </text>
        </svg>
        <svg className="motif motif--formula motif--formula--6" viewBox="0 0 240 90" aria-hidden="true">
          <text x="8" y="50" fill="rgba(255,176,71,0.14)" fontFamily="Inter, sans-serif" fontSize="30" fontStyle="italic">
            √(x<tspan baselineShift="super" fontSize="17">2</tspan> + y<tspan baselineShift="super" fontSize="17">2</tspan>)
          </text>
        </svg>
        <svg className="motif motif--formula motif--formula--7" viewBox="0 0 220 80" aria-hidden="true">
          <text x="8" y="48" fill="rgba(255,122,0,0.15)" fontFamily="Inter, sans-serif" fontSize="30" fontStyle="italic">
            ∂z/∂x
          </text>
        </svg>
        <svg className="motif motif--formula motif--formula--8" viewBox="0 0 230 80" aria-hidden="true">
          <text x="8" y="48" fill="rgba(255,176,71,0.15)" fontFamily="Inter, sans-serif" fontSize="30" fontStyle="italic">
            lim x→∞
          </text>
        </svg>
        <svg className="motif motif--circuit motif--circuit--1" viewBox="0 0 220 220" aria-hidden="true">
          <path d="M22 42h54l26 26h56l20-20" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M22 102h84l28-26h54" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M58 145l22-24 22 24 20-20" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M112 116l18 18" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="22" cy="42" r="3.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="76" cy="68" r="3.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="132" cy="42" r="3.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="152" cy="82" r="3.5" fill="rgba(255,176,71,0.18)" />
        </svg>
        <svg className="motif motif--circuit motif--circuit--2" viewBox="0 0 220 220" aria-hidden="true">
          <path d="M190 30h-42l-24 24h-50l-28 28" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M84 112h42l14-18" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M44 152l24-12 18 16 18-32" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="190" cy="30" r="3.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="126" cy="54" r="3.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="84" cy="112" r="3.5" fill="rgba(255,176,71,0.18)" />
        </svg>
        <svg className="motif motif--circuit motif--circuit--3" viewBox="0 0 220 220" aria-hidden="true">
          <path d="M24 158h56l28-24h38l26 20" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M154 74l14 24" stroke="rgba(255,122,0,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="24" cy="158" r="3.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="80" cy="134" r="3.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="144" cy="110" r="3.5" fill="rgba(255,176,71,0.18)" />
        </svg>
        <svg className="motif motif--book motif--book--1" viewBox="0 0 220 140" aria-hidden="true">
          <path d="M24 34h70c12 0 24 10 24 24v54c0 12-10 22-22 22H24V34Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M118 34h70c12 0 24 10 24 24v54c0 12-10 22-22 22h-72V34Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M92 46l24 14" stroke="rgba(255,255,255,0.10)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="motif motif--book motif--book--2" viewBox="0 0 220 140" aria-hidden="true">
          <path d="M24 34h70c12 0 24 10 24 24v54c0 12-10 22-22 22H24V34Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M118 34h70c12 0 24 10 24 24v54c0 12-10 22-22 22h-72V34Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M92 46l24 14" stroke="rgba(255,255,255,0.10)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="motif motif--book motif--book--3" viewBox="0 0 220 140" aria-hidden="true">
          <path d="M24 36h70c12 0 24 10 24 24v54c0 12-10 22-22 22H24V36Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M118 36h70c12 0 24 10 24 24v54c0 12-10 22-22 22h-72V36Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M92 48l24 14" stroke="rgba(255,255,255,0.10)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="motif motif--book motif--book--4" viewBox="0 0 220 140" aria-hidden="true">
          <path d="M24 36h70c12 0 24 10 24 24v54c0 12-10 22-22 22H24V36Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M118 36h70c12 0 24 10 24 24v54c0 12-10 22-22 22h-72V36Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.6" fill="none" />
          <path d="M92 48l24 14" stroke="rgba(255,255,255,0.10)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <svg className="motif motif--cap motif--cap--1" viewBox="0 0 160 120" aria-hidden="true">
          <path d="M24 56h112c8 0 14 6 14 14v10H10V70c0-8 6-14 14-14Z" fill="url(#motifCapGradient)" opacity="0.12" />
          <path d="M40 72h80" stroke="url(#motifCapGradient)" strokeWidth="4" strokeLinecap="round" />
          <path d="M48 40h64" stroke="url(#motifCapGradient)" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 44v18" stroke="url(#motifCapGradient)" strokeWidth="4" strokeLinecap="round" />
          <path d="M98 44v18" stroke="url(#motifCapGradient)" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 84l8 14" stroke="url(#motifCapGradient)" strokeWidth="3" strokeLinecap="round" />
          <path d="M78 84l-8 14" stroke="url(#motifCapGradient)" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="motifCapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#ff9500" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="motif motif--cap motif--cap--2" viewBox="0 0 160 120" aria-hidden="true">
          <path d="M24 56h112c8 0 14 6 14 14v10H10V70c0-8 6-14 14-14Z" fill="url(#motifCapGradientB)" opacity="0.12" />
          <path d="M40 72h80" stroke="url(#motifCapGradientB)" strokeWidth="4" strokeLinecap="round" />
          <path d="M48 40h64" stroke="url(#motifCapGradientB)" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 44v18" stroke="url(#motifCapGradientB)" strokeWidth="4" strokeLinecap="round" />
          <path d="M98 44v18" stroke="url(#motifCapGradientB)" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 84l8 14" stroke="url(#motifCapGradientB)" strokeWidth="3" strokeLinecap="round" />
          <path d="M78 84l-8 14" stroke="url(#motifCapGradientB)" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="motifCapGradientB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#ff9500" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="motif motif--cap motif--cap--3" viewBox="0 0 160 120" aria-hidden="true">
          <path d="M24 56h112c8 0 14 6 14 14v10H10V70c0-8 6-14 14-14Z" fill="url(#motifCapGradientC)" opacity="0.12" />
          <path d="M40 72h80" stroke="url(#motifCapGradientC)" strokeWidth="4" strokeLinecap="round" />
          <path d="M48 40h64" stroke="url(#motifCapGradientC)" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 44v18" stroke="url(#motifCapGradientC)" strokeWidth="4" strokeLinecap="round" />
          <path d="M98 44v18" stroke="url(#motifCapGradientC)" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 84l8 14" stroke="url(#motifCapGradientC)" strokeWidth="3" strokeLinecap="round" />
          <path d="M78 84l-8 14" stroke="url(#motifCapGradientC)" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="motifCapGradientC" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#ff9500" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="motif motif--cap motif--cap--4" viewBox="0 0 160 120" aria-hidden="true">
          <path d="M24 56h112c8 0 14 6 14 14v10H10V70c0-8 6-14 14-14Z" fill="url(#motifCapGradientD)" opacity="0.12" />
          <path d="M40 72h80" stroke="url(#motifCapGradientD)" strokeWidth="4" strokeLinecap="round" />
          <path d="M48 40h64" stroke="url(#motifCapGradientD)" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 44v18" stroke="url(#motifCapGradientD)" strokeWidth="4" strokeLinecap="round" />
          <path d="M98 44v18" stroke="url(#motifCapGradientD)" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 84l8 14" stroke="url(#motifCapGradientD)" strokeWidth="3" strokeLinecap="round" />
          <path d="M78 84l-8 14" stroke="url(#motifCapGradientD)" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="motifCapGradientD" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#ff9500" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="motif motif--atom motif--atom--1" viewBox="0 0 180 180" aria-hidden="true">
          <circle cx="90" cy="90" r="14" fill="rgba(255,122,0,0.14)" stroke="rgba(255,122,0,0.2)" strokeWidth="1.6" />
          <ellipse cx="90" cy="90" rx="44" ry="24" stroke="rgba(30,255,246,0.18)" strokeWidth="1.2" fill="none" />
          <ellipse cx="90" cy="90" rx="30" ry="46" stroke="rgba(30,255,246,0.18)" strokeWidth="1.2" fill="none" />
          <ellipse cx="90" cy="90" rx="54" ry="12" stroke="rgba(30,255,246,0.16)" strokeWidth="1.2" fill="none" />
          <circle cx="50" cy="90" r="4" fill="rgba(30,255,246,0.26)" />
          <circle cx="128" cy="90" r="4" fill="rgba(30,255,246,0.26)" />
        </svg>
        <svg className="motif motif--atom motif--atom--2" viewBox="0 0 180 180" aria-hidden="true">
          <circle cx="90" cy="90" r="14" fill="rgba(255,122,0,0.14)" stroke="rgba(255,122,0,0.2)" strokeWidth="1.6" />
          <ellipse cx="90" cy="90" rx="44" ry="24" stroke="rgba(30,255,246,0.18)" strokeWidth="1.2" fill="none" />
          <ellipse cx="90" cy="90" rx="30" ry="46" stroke="rgba(30,255,246,0.18)" strokeWidth="1.2" fill="none" />
          <ellipse cx="90" cy="90" rx="54" ry="12" stroke="rgba(30,255,246,0.16)" strokeWidth="1.2" fill="none" />
          <circle cx="48" cy="68" r="4" fill="rgba(30,255,246,0.26)" />
        </svg>
        <svg className="motif motif--atom motif--atom--3" viewBox="0 0 180 180" aria-hidden="true">
          <circle cx="90" cy="90" r="14" fill="rgba(255,122,0,0.14)" stroke="rgba(255,122,0,0.2)" strokeWidth="1.6" />
          <ellipse cx="90" cy="90" rx="44" ry="24" stroke="rgba(30,255,246,0.18)" strokeWidth="1.2" fill="none" />
          <ellipse cx="90" cy="90" rx="30" ry="46" stroke="rgba(30,255,246,0.18)" strokeWidth="1.2" fill="none" />
          <ellipse cx="90" cy="90" rx="54" ry="12" stroke="rgba(30,255,246,0.16)" strokeWidth="1.2" fill="none" />
          <circle cx="132" cy="116" r="4" fill="rgba(30,255,246,0.26)" />
        </svg>
        <svg className="motif motif--binary motif--binary--1" viewBox="0 0 220 70" aria-hidden="true">
          <text x="8" y="44" fill="rgba(255,255,255,0.08)" fontFamily="Inter, sans-serif" fontSize="14">01010</text>
        </svg>
        <svg className="motif motif--binary motif--binary--2" viewBox="0 0 220 70" aria-hidden="true">
          <text x="8" y="44" fill="rgba(255,255,255,0.08)" fontFamily="Inter, sans-serif" fontSize="14">1011 0110</text>
        </svg>
        <svg className="motif motif--binary motif--binary--3" viewBox="0 0 220 70" aria-hidden="true">
          <text x="8" y="44" fill="rgba(255,255,255,0.08)" fontFamily="Inter, sans-serif" fontSize="14">0xFF7A00</text>
        </svg>
        <svg className="motif motif--binary motif--binary--4" viewBox="0 0 220 70" aria-hidden="true">
          <text x="8" y="44" fill="rgba(255,255,255,0.08)" fontFamily="Inter, sans-serif" fontSize="14">2^10 = 1024</text>
        </svg>
        <svg className="motif motif--binary motif--binary--5" viewBox="0 0 220 70" aria-hidden="true">
          <text x="8" y="44" fill="rgba(255,255,255,0.08)" fontFamily="Inter, sans-serif" fontSize="14">11001010</text>
        </svg>
        <svg className="motif motif--node motif--node--1" viewBox="0 0 260 220" aria-hidden="true">
          <line x1="42" y1="40" x2="74" y2="70" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="74" y1="70" x2="118" y2="48" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="118" y1="48" x2="164" y2="86" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="74" y1="70" x2="98" y2="120" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <circle cx="42" cy="40" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="74" cy="70" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="118" cy="48" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="164" cy="86" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="98" cy="120" r="2.8" fill="rgba(255,176,71,0.18)" />
        </svg>
        <svg className="motif motif--node motif--node--2" viewBox="0 0 260 220" aria-hidden="true">
          <line x1="46" y1="82" x2="92" y2="54" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="92" y1="54" x2="136" y2="90" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="136" y1="90" x2="180" y2="72" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="92" y1="54" x2="108" y2="120" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <circle cx="46" cy="82" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="92" cy="54" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="136" cy="90" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="180" cy="72" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="108" cy="120" r="2.8" fill="rgba(255,176,71,0.18)" />
        </svg>
        <svg className="motif motif--node motif--node--3" viewBox="0 0 260 220" aria-hidden="true">
          <line x1="34" y1="46" x2="84" y2="66" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="84" y1="66" x2="122" y2="34" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="122" y1="34" x2="164" y2="86" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <line x1="84" y1="66" x2="98" y2="132" stroke="rgba(255,122,0,0.10)" strokeWidth="1.2" />
          <circle cx="34" cy="46" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="84" cy="66" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="122" cy="34" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="164" cy="86" r="2.5" fill="rgba(255,176,71,0.18)" />
          <circle cx="98" cy="132" r="2.8" fill="rgba(255,176,71,0.18)" />
        </svg>
      </div>
    </div>
  );
}
