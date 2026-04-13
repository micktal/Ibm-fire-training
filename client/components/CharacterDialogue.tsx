import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/languageContext";
import { GraduationCap, Users, Briefcase, ShieldAlert, ChevronRight, Play } from "lucide-react";

export type CharacterRole = "instructor" | "colleague" | "manager" | "security";
export type SceneType = "office" | "corridor" | "meeting";

interface Line {
  speaker: CharacterRole;
  text: string;
}

interface Props {
  lines: Line[];
  scene?: SceneType;
  onComplete?: () => void;
  autoAdvance?: boolean;
}

// ── Role config ──────────────────────────────────────────────────
const ROLE_CONFIG: Record<CharacterRole, {
  icon: React.ReactNode;
  accent: string;
  bg: string;
  nameFr: string;
  nameEn: string;
  tagFr: string;
  tagEn: string;
}> = {
  instructor: {
    icon: <GraduationCap size={26} />,
    accent: "#0D47A1",
    bg: "linear-gradient(135deg, #0D47A1, #1565C0)",
    nameFr: "Formateur IBM",
    nameEn: "IBM Trainer",
    tagFr: "Formation",
    tagEn: "Training",
  },
  colleague: {
    icon: <Users size={26} />,
    accent: "#374151",
    bg: "linear-gradient(135deg, #374151, #4b5563)",
    nameFr: "Collègue",
    nameEn: "Colleague",
    tagFr: "Témoignage",
    tagEn: "Testimony",
  },
  manager: {
    icon: <Briefcase size={26} />,
    accent: "#1a1a2e",
    bg: "linear-gradient(135deg, #1a1a2e, #2d3748)",
    nameFr: "Manager",
    nameEn: "Manager",
    tagFr: "Directive",
    tagEn: "Directive",
  },
  security: {
    icon: <ShieldAlert size={26} />,
    accent: "#c81e1e",
    bg: "linear-gradient(135deg, #c81e1e, #da1e28)",
    nameFr: "Responsable Sécurité",
    nameEn: "Safety Officer",
    tagFr: "Sécurité",
    tagEn: "Safety",
  },
};

// ── Scene accent label ────────────────────────────────────────────
const SCENE_LABEL: Record<SceneType, { fr: string; en: string; emoji: string }> = {
  office:   { fr: "Bureau",   en: "Office",   emoji: "🏢" },
  corridor: { fr: "Couloir",  en: "Corridor", emoji: "🚪" },
  meeting:  { fr: "Réunion",  en: "Meeting",  emoji: "📋" },
};

// ── Main CharacterDialogue ───────────────────────────────────────
export default function CharacterDialogue({ lines, scene = "office", onComplete, autoAdvance = false }: Props) {
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);

  const line = lines[currentLine];
  const role = ROLE_CONFIG[line.speaker];
  const sceneInfo = SCENE_LABEL[scene];

  const advanceLine = () => {
    if (currentLine < lines.length - 1) {
      setVisible(false);
      setTimeout(() => {
        setCurrentLine((n) => n + 1);
        setVisible(true);
      }, 200);
    } else {
      onComplete?.();
    }
  };

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = setTimeout(advanceLine, 3500);
    return () => clearTimeout(timer);
  }, [currentLine, autoAdvance]);

  const isLast = currentLine === lines.length - 1;

  return (
    <div
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        border: "1.5px solid rgba(13,71,161,0.13)",
        boxShadow: "0 4px 20px rgba(13,71,161,0.09)",
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#fff",
      }}
    >
      {/* ── Top bar ───────────────────────────────────────────── */}
      <div
        style={{
          background: role.bg,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Icon avatar */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.18)",
            border: "1.5px solid rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {role.icon}
        </div>

        {/* Name + tag */}
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.2 }}>
            {isEN ? role.nameEn : role.nameFr}
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", marginTop: "2px", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {sceneInfo.emoji} {isEN ? sceneInfo.en : sceneInfo.fr} · {isEN ? role.tagEn : role.tagFr}
          </div>
        </div>

        {/* Progress */}
        {lines.length > 1 && (
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "3px 8px",
              borderRadius: "99px",
            }}
          >
            {currentLine + 1}/{lines.length}
          </div>
        )}
      </div>

      {/* ── Text content ──────────────────────────────────────── */}
      <div
        style={{
          padding: "18px 20px",
          background: "#fafbfe",
          borderBottom: "1px solid #eef0f8",
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {/* Quote mark */}
          <div style={{ color: role.accent, fontSize: "2rem", lineHeight: 0.6, marginBottom: "8px", opacity: 0.25, fontFamily: "Georgia, serif" }}>
            "
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "0.93rem",
              lineHeight: "1.6",
              color: "#111827",
              fontWeight: 500,
            }}
          >
            {line.text}
          </p>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────── */}
      <div
        style={{
          padding: "10px 16px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Dot progress */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {lines.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentLine ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i < currentLine ? role.accent : i === currentLine ? role.accent : "#e5e7eb",
                opacity: i < currentLine ? 0.4 : 1,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={advanceLine}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: isLast ? role.accent : "rgba(13,71,161,0.07)",
            color: isLast ? "#fff" : role.accent,
            border: isLast ? "none" : `1.5px solid ${role.accent}33`,
            borderRadius: "10px",
            padding: "8px 18px",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          {isLast
            ? <><Play size={13} /> {isEN ? "Start" : "Commencer"}</>
            : <>{isEN ? "Next" : "Suite"} <ChevronRight size={14} /></>
          }
        </button>
      </div>
    </div>
  );
}
