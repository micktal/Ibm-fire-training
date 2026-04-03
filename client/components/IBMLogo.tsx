const SRC = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F1ac059a1aaf744118c1cadad8da9b861?format=webp&width=400";

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
        // Sur fond clair : mix-blend-mode multiply efface le blanc → logo bleu visible
        // Sur fond sombre : invert donne logo blanc
        ...(variant === "light"
          ? { mixBlendMode: "multiply" }
          : { filter: "brightness(0) invert(1)" }),
        ...style,
      }}
    />
  );
}
