// Use the latest uploaded IBM logo PNG
const SRC = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2Fd0a2b81559804b25afb103183f9944e8?format=webp&width=400";

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
          // Sur fond clair : multiply efface le fond blanc → logo bleu visible
          ? { mixBlendMode: "multiply" }
          // Sur fond sombre :
          // 1. invert(1)        → fond blanc → noir, barres bleues → orange/clair
          // 2. brightness(100)  → noir reste noir, couleurs claires → blanc pur
          // 3. screen           → noir invisible sur fond sombre, blanc reste blanc
          // Résultat : barres IBM blanches, fond sombre inchangé
          : { filter: "invert(1) brightness(100)", mixBlendMode: "screen" }),
        ...style,
      }}
    />
  );
}
