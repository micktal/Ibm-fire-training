interface Props {
  /** "dark" = logo blanc sur fond bleu | "light" = logo bleu sur fond clair */
  variant?: "dark" | "light";
  height?: number;
  style?: React.CSSProperties;
}

/**
 * IBM logo — 8-bar version, inline SVG.
 * Renders crisp at any size, no external image, no blend-mode tricks.
 */
export default function IBMLogo({ variant = "light", height = 32, style }: Props) {
  const blue = "#0043ce";
  const color = variant === "dark" ? "#fff" : blue;

  // Proportions based on official IBM 8-bar logo
  // width ≈ 1.95× height
  const w = Math.round(height * 1.95);
  const h = height;

  // Letter widths (relative, total = 100 units)
  // I=22, gap=5, B=35, gap=5, M=33
  const iW = w * 0.20;
  const bW = w * 0.32;
  const mW = w * 0.32;
  const gap = w * 0.08;

  // 8 horizontal bars: 8 bars + 7 gaps in height
  // bar height ≈ h/15, gap between bars ≈ h/15 * 0.6
  const barH = h / 15;
  const barGap = h / 15 * 0.75;
  const totalBars = 8;
  const barsH = totalBars * barH + (totalBars - 1) * barGap;
  const topPad = (h - barsH) / 2;

  const bars = Array.from({ length: totalBars }, (_, i) => topPad + i * (barH + barGap));

  // Letter shapes as clip paths
  // I: simple rect
  // B: rect with two bumps on right
  // M: two diagonals in middle

  const iX = 0;
  const bX = iX + iW + gap;
  const mX = bX + bW + gap;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IBM"
      role="img"
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      {/* Define letter clip paths */}
      <defs>
        {/* I letter */}
        <clipPath id={`ibm-i-${variant}`}>
          <rect x={iX} y={0} width={iW} height={h} />
        </clipPath>

        {/* B letter */}
        <clipPath id={`ibm-b-${variant}`}>
          <path d={`
            M ${bX} 0
            H ${bX + bW * 0.6}
            Q ${bX + bW} 0 ${bX + bW} ${h * 0.22}
            Q ${bX + bW} ${h * 0.44} ${bX + bW * 0.7} ${h * 0.5}
            Q ${bX + bW} ${h * 0.56} ${bX + bW} ${h * 0.78}
            Q ${bX + bW} ${h} ${bX + bW * 0.6} ${h}
            H ${bX} Z
          `} />
        </clipPath>

        {/* M letter */}
        <clipPath id={`ibm-m-${variant}`}>
          <path d={`
            M ${mX} 0
            H ${mX + mW * 0.22}
            L ${mX + mW * 0.5} ${h * 0.42}
            L ${mX + mW * 0.78} 0
            H ${mX + mW}
            V ${h}
            H ${mX + mW * 0.78}
            V ${h * 0.3}
            L ${mX + mW * 0.5} ${h * 0.62}
            L ${mX + mW * 0.22} ${h * 0.3}
            V ${h}
            H ${mX} Z
          `} />
        </clipPath>
      </defs>

      {/* Draw 8 bars clipped to each letter */}
      {bars.map((y, idx) => (
        <g key={idx}>
          <rect x={iX} y={y} width={iW} height={barH} fill={color} clipPath={`url(#ibm-i-${variant})`} />
          <rect x={bX} y={y} width={bW} height={barH} fill={color} clipPath={`url(#ibm-b-${variant})`} />
          <rect x={mX} y={y} width={mW} height={barH} fill={color} clipPath={`url(#ibm-m-${variant})`} />
        </g>
      ))}
    </svg>
  );
}
