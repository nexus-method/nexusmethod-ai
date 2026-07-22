/**
 * NexusMark — Gathering Storm SVG (R4)
 * Animation spec: nexus-logo-animation-spec.md
 * Server Component (no state/effects — CSS animations handle everything)
 */

// 20 particles: [angle_deg, dist_pct, tail_factor]
// Positions computed relative to SVG viewBox 0 0 100 100 (center: 50, 50, radius: 38)
const PARTICLES: [number, number, number][] = [
  // Outer (high velocity, long tails)
  [8, 0.88, 1.0], [52, 0.91, 1.0], [108, 0.86, 1.0], [158, 0.93, 1.0],
  [205, 0.87, 1.0], [258, 0.90, 1.0], [308, 0.88, 1.0],
  // Mid-outer
  [28, 0.71, 0.75], [80, 0.68, 0.75], [133, 0.74, 0.75], [183, 0.69, 0.75],
  [232, 0.73, 0.75], [282, 0.70, 0.75], [332, 0.67, 0.75],
  // Mid-inner (nearly arrived)
  [42, 0.51, 0.5], [150, 0.54, 0.5], [240, 0.48, 0.5], [340, 0.52, 0.5],
  // Innermost (about to merge)
  [95, 0.33, 0.3], [275, 0.36, 0.3],
];

const RADIUS = 38; // viewBox units from center

interface Particle {
  restX: number;
  restY: number;
  startDX: number; // initial translation offset X (particle starts 1.8× farther out)
  startDY: number;
  alpha: number;
  dotR: number;
  tailEndX: number;
  tailEndY: number;
}

function computeParticles(): Particle[] {
  return PARTICLES.map(([angleDeg, distPct, tailFactor]) => {
    const angle = (angleDeg * Math.PI) / 180;
    const restX = 50 + Math.cos(angle) * distPct * RADIUS;
    const restY = 50 + Math.sin(angle) * distPct * RADIUS;
    // Start 0.8× farther from center (so animation drives inward to resting pos)
    const startDX = Math.cos(angle) * distPct * RADIUS * 0.8;
    const startDY = Math.sin(angle) * distPct * RADIUS * 0.8;
    const alpha = 0.3 + (1 - distPct) * 0.7;
    const dotR = 0.016 * RADIUS * (2 - distPct);
    // Tail goes outward from resting position
    const tailLen = distPct * 0.52 * RADIUS * tailFactor;
    const dist = Math.sqrt((restX - 50) ** 2 + (restY - 50) ** 2);
    const outX = dist > 0 ? (restX - 50) / dist : 0;
    const outY = dist > 0 ? (restY - 50) / dist : 0;
    const tailEndX = restX + outX * tailLen;
    const tailEndY = restY + outY * tailLen;
    return { restX, restY, startDX, startDY, alpha, dotR, tailEndX, tailEndY };
  });
}

interface LogoProps {
  /** px size of the SVG mark */
  size?: number;
  /** 'dark' for copper on dark bg (default), 'light' for copper on light bg */
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({
  size = 32,
  variant = "dark",
  className,
}: LogoProps) {
  const particles = computeParticles();

  // Nexus center
  const nexusDotR = 0.038 * RADIUS; // 1.44 viewBox units
  const nexusGlow1R = 0.09 * RADIUS; // 3.42 vbu
  const nexusGlow2R = 0.158 * RADIUS; // 6.00 vbu

  const copperColor = "#c8773a";
  const tailColor = "rgba(200, 119, 58, 0.45)";

  // suppress unused var warning
  void variant;

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Nexus Method mark"
        role="img"
      >
        {/* Static tails — simplified (no per-tail gradient, copper at low opacity) */}
        {particles.map((p, i) => (
          <line
            key={`tail-${i}`}
            className="nm-tail"
            x1={p.restX}
            y1={p.restY}
            x2={p.tailEndX}
            y2={p.tailEndY}
            stroke={tailColor}
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        ))}

        {/* Glow rings behind nexus center */}
        <circle
          cx="50"
          cy="50"
          r={nexusGlow2R}
          fill="rgba(200,119,58,0.04)"
          className="nm-nexus-glow"
          style={{ opacity: 0, animation: `nm-nexus-brighten 0.6s 0.6s ease-out forwards` }}
        />
        <circle
          cx="50"
          cy="50"
          r={nexusGlow1R}
          fill="rgba(200,119,58,0.11)"
          className="nm-nexus-glow"
          style={{ opacity: 0, animation: `nm-nexus-brighten 0.5s 0.55s ease-out forwards` }}
        />

        {/* Particle dots — animated from start offset to resting position */}
        {particles.map((p, i) => (
          <circle
            key={`particle-${i}`}
            className="nm-particle"
            cx={p.restX}
            cy={p.restY}
            r={p.dotR}
            fill={copperColor}
            style={{
              opacity: 0,
              transform: `translate(${p.startDX.toFixed(2)}px, ${p.startDY.toFixed(2)}px)`,
              animation: `nm-particle-arrive 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            }}
          >
            <animate
              attributeName="opacity"
              from="0"
              to={p.alpha.toFixed(2)}
              dur="0.9s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.22 1 0.36 1"
            />
          </circle>
        ))}

        {/* Central nexus */}
        <circle
          className="nm-nexus-dot"
          cx="50"
          cy="50"
          r={nexusDotR}
          fill={copperColor}
          style={{
            opacity: 0,
            transform: "scale(0.7)",
            transformOrigin: "50px 50px",
            animation: `nm-nexus-brighten 0.6s 0.5s ease-out forwards, nm-nexus-pulse 7s 1.2s infinite ease-in-out`,
          }}
        />
      </svg>
    </div>
  );
}
