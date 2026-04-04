interface Props {
  /** "dark" = barres blanches sur fond sombre | "light" = barres bleues sur fond clair */
  variant?: "dark" | "light";
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Logo IBM 8 barres — SVG pur, aucun fond, aucune image.
 * Fonctionne sur n'importe quelle couleur de fond.
 *
 * Structure : 8 barres horizontales forment les lettres I, B, M
 *   I  → colonne simple, 8 barres pleines
 *   B  → barres 3 et 6 plus courtes (bumps caractéristiques du B)
 *   M  → barres 3 et 6 coupées au centre (V du M)
 */
export default function IBMLogo({ variant = "light", height = 28, style }: Props) {
  const fill = variant === "dark" ? "#ffffff" : "#0043ce";

  // 8 barres : hauteur 4px, gap 2.5px → stride 6.5px, total ≈ 46px
  const Y = [0, 6.5, 13, 19.5, 26, 32.5, 39, 45.5];
  const BH = 4;

  // Positions X :  I(0–18)  gap(8)  B(26–62)  gap(8)  M(70–124)
  const IX = 0,  IW = 18;
  const BX = 26, BW_FULL = 36, BW_SHORT = 28;
  const MX = 70, MW_FULL = 54;
  // Pour les barres fendues du M : deux demi-barres
  const ML_W = 16, MR_X = 108, MR_W = 16;

  return (
    <svg
      viewBox="0 0 124 50"
      height={height}
      width="auto"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IBM"
      role="img"
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      {Y.map((y, i) => {
        const isSplit = i === 2 || i === 5; // barres 3 et 6 (index 2 et 5)
        return (
          <g key={i}>
            {/* Lettre I */}
            <rect x={IX} y={y} width={IW} height={BH} fill={fill} />

            {/* Lettre B — barres courtes aux positions split */}
            <rect
              x={BX}
              y={y}
              width={isSplit ? BW_SHORT : BW_FULL}
              height={BH}
              fill={fill}
            />

            {/* Lettre M — barres coupées au centre aux positions split */}
            {isSplit ? (
              <>
                <rect x={MX}   y={y} width={ML_W} height={BH} fill={fill} />
                <rect x={MR_X} y={y} width={MR_W} height={BH} fill={fill} />
              </>
            ) : (
              <rect x={MX} y={y} width={MW_FULL} height={BH} fill={fill} />
            )}
          </g>
        );
      })}
    </svg>
  );
}
