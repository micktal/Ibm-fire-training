// Logo IBM officiel — IBM_logo®_pos_blue60_CMYK
const SRC =
  "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F8641a9ebabdc41b086b234efa6ff32bc?format=webp&width=800";

interface Props {
  /** "dark" = logo blanc sur fond sombre | "light" = logo bleu sur fond clair */
  variant?: "dark" | "light";
  height?: number;
  style?: React.CSSProperties;
}

export default function IBMLogo({ variant = "light", height = 28, style }: Props) {
  return (
    <img
      src={SRC}
      alt="IBM"
      style={{
        height: `${height}px`,
        width: "auto",
        display: "block",
        flexShrink: 0,
        ...(variant === "light"
          ? {
              // Fond blanc de l'image × fond blanc de la page = invisible
              // Barres bleues × fond blanc = bleues → logo bleu visible
              mixBlendMode: "multiply",
            }
          : {
              // 1. invert(1)        : fond blanc → noir | barres bleues → clair
              // 2. brightness(100)  : noir reste noir   | clair → blanc pur
              // 3. screen sur fond sombre : noir invisible | blanc reste blanc
              // Résultat : barres IBM blanches, fond sombre intact
              filter: "invert(1) brightness(100)",
              mixBlendMode: "screen",
            }),
        ...style,
      }}
    />
  );
}
