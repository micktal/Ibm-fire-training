import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/languageContext";
import { GraduationCap, Users, Briefcase, ShieldAlert } from "lucide-react";

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
const CHAR_CONFIG: Record<CharacterRole, {
  icon: React.ReactNode;
  color: string;
  bg: string;
  nameFr: string;
  nameEn: string;
  side: "left" | "right";
}> = {
  instructor: {
    icon: <GraduationCap size={28} />,
    color: "#fff",
    bg: "#0D47A1",
    nameFr: "Formateur",
    nameEn: "Trainer",
    side: "left",
  },
  colleague: {
    icon: <Users size={28} />,
    color: "#fff",
    bg: "#4a5568",
    nameFr: "Collègue",
    nameEn: "Colleague",
    side: "right",
  },
  manager: {
    icon: <Briefcase size={28} />,
    color: "#fff",
    bg: "#1a1a2e",
    nameFr: "Manager",
    nameEn: "Manager",
    side: "right",
  },
  security: {
    icon: <ShieldAlert size={28} />,
    color: "#fff",
    bg: "#da1e28",
    nameFr: "Sécurité",
    nameEn: "Security",
    side: "left",
  },
};

const SCENE_BACKGROUNDS: Record<SceneType, { wall: string; floor: string; accent: string }> = {
  office:   { wall: "#e8eef8", floor: "#c5d0e6", accent: "#0D47A1" },
  corridor: { wall: "#f0e8d8", floor: "#d4c5a0", accent: "#b45309" },
  meeting:  { wall: "#e8f0e8", floor: "#c5d4c5", accent: "#198038" },
};

// ── Icon Avatar ──────────────────────────────────────────────────
function CharacterAvatar({ role, speaking }: { role: CharacterRole; speaking: boolean }) {
  const c = CHAR_CONFIG[role];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: c.bg,
          color: c.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: speaking
            ? `0 0 0 3px ${c.bg}44, 0 4px 16px ${c.bg}55`
            : "0 2px 8px rgba(0,0,0,0.15)",
          transition: "box-shadow 0.35s ease",
          opacity: speaking ? 1 : 0.55,
          animation: speaking ? "avatarPulse 1.8s ease-in-out infinite" : "none",
        }}
      >
        {c.icon}
      </div>
    </div>
  );
}

// ── Scene background ─────────────────────────────────────────────
function SceneBackground({ scene }: { scene: SceneType }) {
  const s = SCENE_BACKGROUNDS[scene];

  if (scene === "office") return (
    <svg viewBox="0 0 400 140" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width="400" height="90" fill={s.wall} />
      <rect y="90" width="400" height="50" fill={s.floor} />
      <rect y="88" width="400" height="5" fill="rgba(0,0,0,0.08)" />
      <rect y="68" width="400" height="3" fill={s.accent} opacity="0.25" />
      {/* Window */}
      <rect x="155" y="8" width="90" height="55" rx="3" fill="rgba(173,216,230,0.45)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <line x1="200" y1="8" x2="200" y2="63" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="155" y1="36" x2="245" y2="36" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Bookshelf */}
      <rect x="5" y="20" width="24" height="52" rx="2" fill="#8B7355" />
      <rect x="7" y="22" width="20" height="7" rx="1" fill="#da1e28" />
      <rect x="7" y="31" width="20" height="7" rx="1" fill="#0D47A1" />
      <rect x="7" y="40" width="20" height="7" rx="1" fill="#198038" />
      <rect x="7" y="49" width="20" height="7" rx="1" fill="#b45309" />
      {/* Desk right */}
      <rect x="300" y="65" width="90" height="30" rx="3" fill="#c4a882" />
      <rect x="305" y="72" width="50" height="20" rx="2" fill="#2d3748" />
    </svg>
  );

  if (scene === "corridor") return (
    <svg viewBox="0 0 400 140" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width="400" height="90" fill={s.wall} />
      <rect y="90" width="400" height="50" fill={s.floor} />
      <rect y="88" width="400" height="5" fill="rgba(0,0,0,0.1)" />
      <line x1="200" y1="28" x2="0" y2="90" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      <line x1="200" y1="28" x2="400" y2="90" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      {/* Emergency exit */}
      <rect x="155" y="6" width="90" height="20" rx="3" fill="#198038" />
      <text x="200" y="21" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">SORTIE</text>
      {/* Fire alarm box */}
      <rect x="345" y="18" width="20" height="28" rx="3" fill="#da1e28" />
      <ellipse cx="355" cy="27" rx="6" ry="6" fill="#ff6b6b" />
      {/* Door */}
      <rect x="25" y="32" width="48" height="58" rx="3" fill="#c4a882" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
      <circle cx="66" cy="60" r="3" fill="#888" />
    </svg>
  );

  // meeting
  return (
    <svg viewBox="0 0 400 140" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width="400" height="90" fill={s.wall} />
      <rect y="90" width="400" height="50" fill={s.floor} />
      <rect y="88" width="400" height="5" fill="rgba(0,0,0,0.08)" />
      {/* Meeting table */}
      <ellipse cx="200" cy="118" rx="140" ry="18" fill="#c4a882" />
      <ellipse cx="200" cy="114" rx="140" ry="16" fill="#d4b896" />
      {/* Whiteboard */}
      <rect x="100" y="8" width="200" height="72" rx="4" fill="white" stroke="#adb3c8" strokeWidth="1.5" />
      <text x="200" y="28" textAnchor="middle" fontSize="9" fill={s.accent} fontWeight="bold">PROCÉDURE INCENDIE</text>
      <line x1="112" y1="35" x2="288" y2="35" stroke={s.accent} strokeWidth="0.8" opacity="0.35" />
      <text x="116" y="48" fontSize="7" fill="#4a5568">1. Déclencher l'alarme (777)</text>
      <text x="116" y="58" fontSize="7" fill="#4a5568">2. Alerter les collègues</text>
      <text x="116" y="68" fontSize="7" fill="#4a5568">3. Évacuer calmement</text>
    </svg>
  );
}

// ── Speech bubble ────────────────────────────────────────────────
function SpeechBubble({ text, side, visible }: { text: string; side: "left" | "right"; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "8px",
        left: side === "left" ? "96px" : "auto",
        right: side === "right" ? "96px" : "auto",
        maxWidth: "200px",
        minWidth: "110px",
        background: "white",
        borderRadius: "14px",
        padding: "10px 14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.16)",
        border: "1.5px solid rgba(13,71,161,0.13)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(6px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        zIndex: 10,
      }}
    >
      {/* Tail */}
      <div style={{
        position: "absolute",
        top: "22px",
        left: side === "left" ? "-11px" : "auto",
        right: side === "right" ? "-11px" : "auto",
        width: 0,
        height: 0,
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderRight: side === "left" ? "11px solid white" : "none",
        borderLeft: side === "right" ? "11px solid white" : "none",
      }} />
      <p style={{
        fontSize: "0.78rem",
        lineHeight: "1.5",
        color: "#1a202c",
        margin: 0,
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}>
        {text}
      </p>
    </div>
  );
}

// ── Main CharacterDialogue ───────────────────────────────────────
export default function CharacterDialogue({ lines, scene = "office", onComplete, autoAdvance = false }: Props) {
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);

  const line = lines[currentLine];
  const charConfig = CHAR_CONFIG[line.speaker];
  const isLeft = charConfig.side === "left";

  const otherRole = lines.find((l) => l.speaker !== line.speaker)?.speaker ?? "colleague";

  const advanceLine = () => {
    if (currentLine < lines.length - 1) {
      setVisible(false);
      setTimeout(() => {
        setCurrentLine((n) => n + 1);
        setVisible(true);
      }, 250);
    } else {
      onComplete?.();
    }
  };

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = setTimeout(advanceLine, 3500);
    return () => clearTimeout(timer);
  }, [currentLine, autoAdvance]);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1.5px solid rgba(13,71,161,0.13)",
        boxShadow: "0 6px 24px rgba(13,71,161,0.09)",
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)" }}>
        <div className="w-2 h-2 rounded-full" style={{ background: "#6fdc8c", animation: "criticalPulse 2s ease-in-out infinite" }} />
        <span className="font-mono text-xs font-bold text-white uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", fontSize: "10px" }}>
          {isEN ? "Interactive scenario" : "Scénario interactif"}
        </span>
        <span className="ml-auto font-mono text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
          {currentLine + 1} / {lines.length}
        </span>
      </div>

      {/* Scene + avatars */}
      <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
        <SceneBackground scene={scene} />

        {/* Left avatar */}
        <div style={{ position: "absolute", bottom: "12px", left: "16px", zIndex: 2 }}>
          <CharacterAvatar role={isLeft ? line.speaker : otherRole} speaking={isLeft} />
        </div>

        {/* Right avatar */}
        <div style={{ position: "absolute", bottom: "12px", right: "16px", zIndex: 2 }}>
          <CharacterAvatar role={isLeft ? otherRole : line.speaker} speaking={!isLeft} />
        </div>

        {/* Speech bubble */}
        <SpeechBubble text={line.text} side={isLeft ? "left" : "right"} visible={visible} />

        {/* Speaker label */}
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            left: isLeft ? "8px" : "auto",
            right: isLeft ? "auto" : "8px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            fontSize: "8px",
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: "99px",
            letterSpacing: "0.08em",
            fontFamily: "'IBM Plex Mono', monospace",
            textTransform: "uppercase",
          }}
        >
          {isEN ? charConfig.nameEn : charConfig.nameFr}
        </div>
      </div>

      {/* Progress dots + action */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid #f0f2f8", background: "#f8f9fc" }}>
        <div className="flex gap-1.5">
          {lines.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentLine ? "18px" : "6px",
                height: "6px",
                background: i < currentLine ? "#198038" : i === currentLine ? "#0D47A1" : "#dde1ef",
              }}
            />
          ))}
        </div>
        <button
          onClick={advanceLine}
          className="flex items-center gap-1.5 font-bold rounded-xl px-4 py-2"
          style={{ background: "#0D47A1", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.82rem" }}
        >
          {currentLine < lines.length - 1 ? (isEN ? "Next" : "Suite") : (isEN ? "Start" : "Commencer")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 0 3px currentColor; }
          50% { box-shadow: 0 0 0 6px transparent; }
        }
      `}</style>
    </div>
  );
}
