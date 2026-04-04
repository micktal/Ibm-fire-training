// Logo IBM officiel — IBM_logo®_pos_blue60_CMYK
const SRC =
  "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F8641a9ebabdc41b086b234efa6ff32bc?format=webp&width=800";

interface Props {
  /** "dark" = logo blanc sur fond bleu marine | "light" = logo bleu sur fond clair */
  variant?: "dark" | "light";
  height?: number;
  style?: React.CSSProperties;
}

export default function IBMLogo({ variant = "light", height = 32, style }: Props) {
  if (variant === "dark") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "#0D47A1",
          borderRadius: "7px",
          padding: "5px 11px",
          flexShrink: 0,
          ...style,
        }}
      >
        <img
          src={SRC}
          alt="IBM"
          style={{
            height: `${height}px`,
            width: "auto",
            display: "block",
            // invert(1)        : white-bg → black | blue-bars → orange-yellow
            // brightness(100)  : orange → clamps to white | black stays black
            // screen blend     : black × blue-bg → blue (bg disappears) | white × blue-bg → white (bars visible)
            // Result: IBM stripes appear WHITE, white background disappears into the blue container
            filter: "invert(1) brightness(100)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    );
  }

  return (
    <img
      src={SRC}
      alt="IBM"
      style={{
        height: `${height}px`,
        width: "auto",
        display: "block",
        flexShrink: 0,
        // multiply : fond blanc de l'image × fond blanc de la page = invisible
        // barres bleues × fond blanc = bleues → logo bleu visible
        mixBlendMode: "multiply",
        ...style,
      }}
    />
  );
}
