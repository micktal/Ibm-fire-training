/**
 * PictoSequence — visual step-by-step procedure with icons and arrows.
 * Used to replace long text descriptions with memorable pictogram sequences.
 */

import { ArrowRight } from "lucide-react";

export type PictoStep = {
  icon: string;           // emoji or short text icon
  label: string;          // main label (FR or EN passed at runtime)
  sublabel?: string;      // optional sub-label (condition, timing…)
  bg: string;             // background color of the icon circle
  iconColor?: string;     // icon text color (default white)
};

export type PictoSequenceData = {
  titleFr: string;
  titleEn: string;
  steps: {
    icon: string;
    labelFr: string;
    labelEn: string;
    sublabelFr?: string;
    sublabelEn?: string;
    bg: string;
    iconColor?: string;
  }[];
};

interface Props {
  data: PictoSequenceData;
  lang: "fr" | "en";
}

export default function PictoSequence({ data, lang }: Props) {
  const isEN = lang === "en";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1.5px solid #e4e7f0", background: "#f9fafc" }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ borderBottom: "1px solid #e4e7f0", background: "#fff" }}
      >
        <span style={{ fontSize: "14px" }}>🔢</span>
        <span
          className="font-bold text-xs uppercase"
          style={{ color: "#0D47A1", letterSpacing: "0.1em" }}
        >
          {isEN ? data.titleEn : data.titleFr}
        </span>
      </div>

      {/* Steps */}
      <div className="px-4 py-4 flex items-center justify-center flex-wrap gap-2">
        {data.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Step block */}
            <div className="flex flex-col items-center gap-1.5" style={{ minWidth: "72px", maxWidth: "90px" }}>
              {/* Icon circle */}
              <div
                className="flex items-center justify-center rounded-2xl font-bold"
                style={{
                  width: "52px",
                  height: "52px",
                  background: step.bg,
                  fontSize: "22px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  flexShrink: 0,
                  color: step.iconColor ?? "#fff",
                }}
              >
                {step.icon}
              </div>
              {/* Label */}
              <div className="text-center">
                <div
                  className="font-bold leading-tight"
                  style={{ fontSize: "0.72rem", color: "#0a1540", lineHeight: "1.25" }}
                >
                  {isEN ? step.labelEn : step.labelFr}
                </div>
                {(isEN ? step.sublabelEn : step.sublabelFr) && (
                  <div
                    className="italic"
                    style={{ fontSize: "0.62rem", color: "#8d95aa", marginTop: "1px", lineHeight: "1.2" }}
                  >
                    {isEN ? step.sublabelEn : step.sublabelFr}
                  </div>
                )}
              </div>
            </div>

            {/* Arrow between steps */}
            {i < data.steps.length - 1 && (
              <ArrowRight size={18} style={{ color: "#c8cfe0", flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
