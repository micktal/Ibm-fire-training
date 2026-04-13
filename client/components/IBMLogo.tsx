interface Props {
  /** "dark" = white logo (for dark/blue backgrounds) | "light" = IBM blue logo (for white backgrounds) */
  variant?: "dark" | "light";
  height?: number;
  style?: React.CSSProperties;
}

/**
 * IBM 8-bar logo — hand-crafted SVG with precise bar coordinates.
 * ViewBox: 80 × 32. Each letter defined by 8 horizontal bars.
 *
 * I : x=0–11 (solid bars, full width)
 * B : x=15, width varies per bar (top bump narrow, bottom bump large)
 * M : x=50–80, two segments per bar (V-notch opens from top, widens at bottom)
 */
export default function IBMLogo({ variant = "light", height = 32, style }: Props) {
  const color = variant === "dark" ? "#ffffff" : "#0043ce";
  const w = Math.round((height / 32) * 80);

  // 8 equally-spaced bar y-positions (bar height 2.2, gap 1.9)
  const y = [0.55, 4.65, 8.75, 12.85, 16.95, 21.05, 25.15, 29.25];
  const bH = 2.2;

  // B: all bars start at x=15; width varies to form top & bottom bumps
  // Top bump peaks at bar 2 (width 24), bottom bump peaks at bar 6 (width 31)
  const bW = [13, 23, 24, 9, 15, 29, 31, 23];

  // M: two rect segments per bar [x, width].
  // Bar 0 is full-width (letter top). Gap widens toward bar 7 (letter bottom).
  const mSegs: [number, number][][] = [
    [[50, 30]],
    [[50, 14], [66, 14]],
    [[50, 13], [67, 13]],
    [[50, 12], [68, 12]],
    [[50, 10], [70, 10]],
    [[50,  9], [71,  9]],
    [[50,  8], [72,  8]],
    [[50,  7], [73,  7]],
  ];

  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 80 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IBM"
      role="img"
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      <g fill={color}>
        {/* ── I ── */}
        {y.map((yi, i) => (
          <rect key={`i${i}`} x={0} y={yi} width={11} height={bH} />
        ))}

        {/* ── B ── */}
        {bW.map((wi, i) => (
          <rect key={`b${i}`} x={15} y={y[i]} width={wi} height={bH} />
        ))}

        {/* ── M ── */}
        {mSegs.flatMap((segs, i) =>
          segs.map(([x, wi], j) => (
            <rect key={`m${i}-${j}`} x={x} y={y[i]} width={wi} height={bH} />
          ))
        )}
      </g>
    </svg>
  );
}
