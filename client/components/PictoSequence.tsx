/**
 * PictoSequence — Premium visual step-by-step procedure.
 * Uses Lucide SVG icons with gradient glow circles, IBM design language.
 */

import {
  BellRing, Phone, LogOut, DoorOpen, DoorClosed, Flame, Shield,
  Droplets, Wind, Zap, AlertTriangle, CheckCircle2, Target,
  Hand, Megaphone, MapPin, Ban, ArrowDownToLine, MoveDown,
  Accessibility, Eye, Minus, Users, Grab, Scan,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// ── Icon registry ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  "bell-ring":        BellRing,
  "phone":            Phone,
  "log-out":          LogOut,
  "door-open":        DoorOpen,
  "door-closed":      DoorClosed,
  "flame":            Flame,
  "shield":           Shield,
  "droplets":         Droplets,
  "wind":             Wind,
  "zap":              Zap,
  "alert-triangle":   AlertTriangle,
  "check":            CheckCircle2,
  "target":           Target,
  "hand":             Hand,
  "megaphone":        Megaphone,
  "map-pin":          MapPin,
  "ban":              Ban,
  "arrow-down":       ArrowDownToLine,
  "move-down":        MoveDown,
  "accessibility":    Accessibility,
  "eye":              Eye,
  "minus":            Minus,
  "users":            Users,
  "grab":             Grab,
  "scan":             Scan,
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type PictoStep = {
  icon: string;        // key from ICON_MAP
  labelFr: string;
  labelEn: string;
  sublabelFr?: string;
  sublabelEn?: string;
  gradient: string;    // CSS gradient for circle bg
  glow: string;        // box-shadow glow color
};

export type PictoSequenceData = {
  titleFr: string;
  titleEn: string;
  steps: PictoStep[];
};

interface Props {
  data: PictoSequenceData;
  lang: "fr" | "en";
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PictoSequence({ data, lang }: Props) {
  const isEN = lang === "en";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #f8f9fc 100%)",
        border: "1.5px solid #dde3f5",
        boxShadow: "0 2px 16px rgba(13,71,161,0.07)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-5 py-3"
        style={{
          background: "linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)",
        }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <Scan size={13} color="#fff" />
        </div>
        <span
          className="font-bold text-white text-xs uppercase"
          style={{ letterSpacing: "0.12em" }}
        >
          {isEN ? data.titleEn : data.titleFr}
        </span>
      </div>

      {/* Steps */}
      <div className="px-5 py-5 flex items-start justify-center flex-wrap gap-0">
        {data.steps.map((step, i) => {
          const IconComponent = ICON_MAP[step.icon];
          const label = isEN ? step.labelEn : step.labelFr;
          const sublabel = isEN ? step.sublabelEn : step.sublabelFr;

          return (
            <div key={i} className="flex items-center">
              {/* Step block */}
              <div
                className="flex flex-col items-center gap-2"
                style={{ width: "88px" }}
              >
                {/* Step number */}
                <div
                  className="font-mono font-bold text-xs rounded-full flex items-center justify-center mb-0.5"
                  style={{
                    width: "18px",
                    height: "18px",
                    background: "rgba(13,71,161,0.1)",
                    color: "#0D47A1",
                    fontSize: "9px",
                    letterSpacing: "0",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {i + 1}
                </div>

                {/* Icon circle */}
                <div
                  className="flex items-center justify-center rounded-[20px]"
                  style={{
                    width: "64px",
                    height: "64px",
                    background: step.gradient,
                    boxShadow: `0 8px 24px ${step.glow}, 0 0 0 4px rgba(255,255,255,0.9), 0 0 0 5px ${step.glow}22`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  {IconComponent && <IconComponent size={28} color="#fff" strokeWidth={1.75} />}
                </div>

                {/* Label */}
                <div className="text-center" style={{ paddingTop: "2px" }}>
                  <div
                    className="font-bold leading-tight"
                    style={{
                      fontSize: "0.72rem",
                      color: "#0a1540",
                      lineHeight: "1.25",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {label}
                  </div>
                  {sublabel && (
                    <div
                      style={{
                        fontSize: "0.6rem",
                        color: "#8d95aa",
                        marginTop: "2px",
                        lineHeight: "1.25",
                        fontStyle: "italic",
                      }}
                    >
                      {sublabel}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector — between steps */}
              {i < data.steps.length - 1 && (
                <div
                  className="flex items-center flex-shrink-0"
                  style={{ marginTop: "-28px", paddingBottom: "32px" }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "2px",
                      background: "linear-gradient(90deg, #c8d4f0, #8fa8e8)",
                      borderRadius: "1px",
                      position: "relative",
                    }}
                  >
                    {/* Arrowhead */}
                    <div
                      style={{
                        position: "absolute",
                        right: "-1px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid #8fa8e8",
                        borderTop: "3.5px solid transparent",
                        borderBottom: "3.5px solid transparent",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
