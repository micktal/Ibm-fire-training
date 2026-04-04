import { useState, useEffect } from "react";

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
  autoAdvance?: boolean; // auto-scroll through lines
}

// ── SVG Character Definitions ────────────────────────────────────
const CHAR_CONFIG: Record<CharacterRole, { bodyColor: string; shirtColor: string; skinColor: string; hairColor: string; glasses?: boolean; name: string; side: "left" | "right" }> = {
  instructor: { bodyColor: "#0D47A1", shirtColor: "#1565C0", skinColor: "#FDBCB4", hairColor: "#3d2b1f", glasses: false, name: "Formateur", side: "left" },
  colleague:  { bodyColor: "#4a5568", shirtColor: "#718096", skinColor: "#F5CBA7", hairColor: "#1a1a2e", glasses: false, name: "Collègue",  side: "right" },
  manager:    { bodyColor: "#1a1a2e", shirtColor: "#2d3748", skinColor: "#FDBCB4", hairColor: "#8B4513", glasses: true,  name: "Manager",   side: "right" },
  security:   { bodyColor: "#da1e28", shirtColor: "#b91c1c", skinColor: "#D4A574", hairColor: "#2d2d2d", glasses: false, name: "Sécurité",  side: "left" },
};

const SCENE_BACKGROUNDS: Record<SceneType, { wall: string; floor: string; accent: string }> = {
  office:   { wall: "#e8eef8", floor: "#c5d0e6", accent: "#0D47A1" },
  corridor: { wall: "#f0e8d8", floor: "#d4c5a0", accent: "#b45309" },
  meeting:  { wall: "#e8f0e8", floor: "#c5d4c5", accent: "#198038" },
};

// ── Character SVG ────────────────────────────────────────────────
function Character({ role, speaking, side }: { role: CharacterRole; speaking: boolean; side: "left" | "right" }) {
  const c = CHAR_CONFIG[role];
  const flip = side === "right" ? "scale(-1,1)" : "";
  const bobAnim = speaking ? "charBob 0.6s ease-in-out infinite" : "charIdle 3s ease-in-out infinite";

  return (
    <svg
      viewBox="0 0 80 140"
      style={{
        width: "80px",
        height: "140px",
        animation: bobAnim,
        transformOrigin: "bottom center",
        transform: side === "right" ? "scaleX(-1)" : "scaleX(1)",
        filter: speaking ? "none" : "brightness(0.88) saturate(0.7)",
        transition: "filter 0.4s ease",
      }}
    >
      {/* Shadow */}
      <ellipse cx="40" cy="138" rx="22" ry="5" fill="rgba(0,0,0,0.1)" />

      {/* Legs */}
      <rect x="24" y="98" width="12" height="35" rx="6" fill={c.bodyColor} />
      <rect x="44" y="98" width="12" height="35" rx="6" fill={c.bodyColor} />
      {/* Shoes */}
      <ellipse cx="30" cy="134" rx="10" ry="5" fill="#1a1a2e" />
      <ellipse cx="50" cy="134" rx="10" ry="5" fill="#1a1a2e" />

      {/* Body / torso */}
      <rect x="18" y="58" width="44" height="44" rx="10" fill={c.shirtColor} />

      {/* Arms */}
      {/* Left arm */}
      <rect x="6" y="60" width="14" height="28" rx="7" fill={c.shirtColor} style={{ transformOrigin: "13px 60px", animation: speaking ? "armSwing 0.6s ease-in-out infinite" : "none" }} />
      <ellipse cx="13" cy="90" rx="7" ry="6" fill={c.skinColor} />
      {/* Right arm */}
      <rect x="60" y="60" width="14" height="28" rx="7" fill={c.shirtColor} />
      <ellipse cx="67" cy="90" rx="7" ry="6" fill={c.skinColor} />

      {/* Neck */}
      <rect x="33" y="50" width="14" height="12" rx="4" fill={c.skinColor} />

      {/* Head */}
      <ellipse cx="40" cy="36" rx="22" ry="24" fill={c.skinColor} />

      {/* Hair */}
      <ellipse cx="40" cy="18" rx="22" ry="12" fill={c.hairColor} />
      <rect x="18" y="14" width="44" height="10" rx="5" fill={c.hairColor} />

      {/* Eyes */}
      <ellipse cx="31" cy="33" rx="4" ry={speaking ? "4.5" : "3.5"} fill="white" />
      <ellipse cx="49" cy="33" rx="4" ry={speaking ? "4.5" : "3.5"} fill="white" />
      <ellipse cx="32" cy="34" rx="2.5" ry="2.5" fill="#1a1a2e" />
      <ellipse cx="50" cy="34" rx="2.5" ry="2.5" fill="#1a1a2e" />
      {/* Eye shine */}
      <ellipse cx="33" cy="33" rx="0.8" ry="0.8" fill="white" />
      <ellipse cx="51" cy="33" rx="0.8" ry="0.8" fill="white" />

      {/* Glasses if needed */}
      {c.glasses && (
        <>
          <rect x="25" y="29" width="12" height="9" rx="3" fill="none" stroke="#4a5568" strokeWidth="1.5" />
          <rect x="43" y="29" width="12" height="9" rx="3" fill="none" stroke="#4a5568" strokeWidth="1.5" />
          <line x1="37" y1="33" x2="43" y2="33" stroke="#4a5568" strokeWidth="1.5" />
        </>
      )}

      {/* Mouth */}
      {speaking ? (
        <ellipse cx="40" cy="46" rx="5" ry="3.5" fill="#c0392b" />
      ) : (
        <path d="M 35 46 Q 40 50 45 46" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}

      {/* IBM badge on shirt */}
      <rect x="28" y="65" width="14" height="9" rx="2" fill="rgba(255,255,255,0.25)" />
      <text x="35" y="72" textAnchor="middle" fontSize="4" fill="rgba(255,255,255,0.8)" fontWeight="bold">IBM</text>
    </svg>
  );
}

// ── Scene background ─────────────────────────────────────────────
function SceneBackground({ scene }: { scene: SceneType }) {
  const s = SCENE_BACKGROUNDS[scene];

  if (scene === "office") return (
    <svg viewBox="0 0 400 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {/* Wall */}
      <rect width="400" height="140" fill={s.wall} />
      {/* Floor */}
      <rect y="140" width="400" height="60" fill={s.floor} />
      {/* Floor shadow */}
      <rect y="138" width="400" height="6" fill="rgba(0,0,0,0.08)" />
      {/* Wall accent stripe */}
      <rect y="100" width="400" height="4" fill={s.accent} opacity="0.3" />
      {/* Window */}
      <rect x="145" y="15" width="110" height="75" rx="4" fill="rgba(173,216,230,0.5)" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
      <line x1="200" y1="15" x2="200" y2="90" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <line x1="145" y1="52" x2="255" y2="52" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      {/* Window light beams */}
      <polygon points="145,15 255,15 255,90 145,90" fill="rgba(255,255,200,0.07)" />
      {/* Bookshelf left */}
      <rect x="5" y="30" width="28" height="70" rx="2" fill="#8B7355" />
      <rect x="7" y="32" width="24" height="8" rx="1" fill="#da1e28" />
      <rect x="7" y="42" width="24" height="8" rx="1" fill="#0D47A1" />
      <rect x="7" y="52" width="24" height="8" rx="1" fill="#198038" />
      <rect x="7" y="62" width="24" height="8" rx="1" fill="#b45309" />
      <rect x="7" y="72" width="24" height="8" rx="1" fill="#0D47A1" />
      {/* Desk right */}
      <rect x="290" y="100" width="100" height="45" rx="4" fill="#c4a882" />
      <rect x="295" y="108" width="55" height="30" rx="3" fill="#2d3748" />
      <rect x="296" y="109" width="53" height="28" rx="2" fill="rgba(100,180,255,0.15)" />
      {/* Plant left */}
      <rect x="58" y="110" width="12" height="30" rx="3" fill="#b8a89a" />
      <ellipse cx="64" cy="100" rx="20" ry="18" fill="#2d6a2d" />
      <ellipse cx="54" cy="106" rx="12" ry="10" fill="#38803a" />
      <ellipse cx="74" cy="106" rx="12" ry="10" fill="#38803a" />
    </svg>
  );

  if (scene === "corridor") return (
    <svg viewBox="0 0 400 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width="400" height="140" fill={s.wall} />
      <rect y="140" width="400" height="60" fill={s.floor} />
      <rect y="138" width="400" height="6" fill="rgba(0,0,0,0.1)" />
      {/* Corridor perspective lines */}
      <line x1="200" y1="40" x2="0" y2="140" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      <line x1="200" y1="40" x2="400" y2="140" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      {/* Emergency exit sign */}
      <rect x="160" y="10" width="80" height="24" rx="3" fill="#198038" />
      <text x="200" y="27" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">SORTIE</text>
      {/* Fire alarm */}
      <rect x="340" y="30" width="22" height="30" rx="3" fill="#da1e28" />
      <ellipse cx="351" cy="40" rx="7" ry="7" fill="#ff6b6b" />
      {/* Door */}
      <rect x="30" y="50" width="55" height="90" rx="3" fill="#c4a882" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <circle cx="75" cy="95" r="4" fill="#888" />
    </svg>
  );

  return (
    <svg viewBox="0 0 400 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width="400" height="140" fill={s.wall} />
      <rect y="140" width="400" height="60" fill={s.floor} />
      <rect y="138" width="400" height="6" fill="rgba(0,0,0,0.08)" />
      {/* Meeting table */}
      <ellipse cx="200" cy="170" rx="160" ry="25" fill="#c4a882" />
      <ellipse cx="200" cy="165" rx="160" ry="22" fill="#d4b896" />
      {/* Whiteboard */}
      <rect x="90" y="15" width="220" height="100" rx="5" fill="white" stroke="#adb3c8" strokeWidth="2" />
      {/* Whiteboard content */}
      <text x="200" y="45" textAnchor="middle" fontSize="11" fill={s.accent} fontWeight="bold">PROCÉDURE INCENDIE</text>
      <line x1="110" y1="55" x2="290" y2="55" stroke={s.accent} strokeWidth="1" opacity="0.4" />
      <text x="120" y="70" fontSize="8" fill="#4a5568">1. Déclencher l'alarme</text>
      <text x="120" y="82" fontSize="8" fill="#4a5568">2. Appeler le 22 22</text>
      <text x="120" y="94" fontSize="8" fill="#4a5568">3. Évacuer calmement</text>
    </svg>
  );
}

// ── Speech bubble ────────────────────────────────────────────────
function SpeechBubble({ text, side, visible }: { text: string; side: "left" | "right"; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: side === "left" ? "90px" : "auto",
        right: side === "right" ? "90px" : "auto",
        maxWidth: "200px",
        minWidth: "120px",
        background: "white",
        borderRadius: "16px",
        padding: "10px 14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
        border: "2px solid rgba(13,71,161,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(8px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        zIndex: 10,
      }}
    >
      {/* Bubble tail */}
      <div style={{
        position: "absolute",
        bottom: "18px",
        left: side === "left" ? "-12px" : "auto",
        right: side === "right" ? "-12px" : "auto",
        width: 0,
        height: 0,
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderRight: side === "left" ? "12px solid white" : "none",
        borderLeft: side === "right" ? "12px solid white" : "none",
        filter: "drop-shadow(-2px 0 2px rgba(0,0,0,0.06))",
      }} />
      <p style={{
        fontSize: "0.8rem",
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

// ── Main CharacterDialogue component ────────────────────────────
export default function CharacterDialogue({ lines, scene = "office", onComplete, autoAdvance = false }: Props) {
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);

  const line = lines[currentLine];
  const charConfig = CHAR_CONFIG[line.speaker];
  const isLeft = charConfig.side === "left";

  // Figure out if there's a second character to show
  const otherRole = lines.find((l) => l.speaker !== line.speaker)?.speaker ?? "colleague";
  const otherConfig = CHAR_CONFIG[otherRole];

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
        border: "2px solid rgba(13,71,161,0.14)",
        boxShadow: "0 8px 32px rgba(13,71,161,0.1)",
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)" }}>
        <div className="w-2 h-2 rounded-full" style={{ background: "#6fdc8c", animation: "criticalPulse 2s ease-in-out infinite" }} />
        <span className="font-mono text-xs font-bold text-white uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", fontSize: "10px" }}>
          Scénario interactif
        </span>
        <span className="ml-auto font-mono text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
          {currentLine + 1} / {lines.length}
        </span>
      </div>

      {/* Scene */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <SceneBackground scene={scene} />

        {/* Characters */}
        <div style={{ position: "absolute", bottom: 0, left: "20px", zIndex: 2 }}>
          <Character role={isLeft ? line.speaker : otherRole} speaking={isLeft} side="left" />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: "20px", zIndex: 2 }}>
          <Character role={isLeft ? otherRole : line.speaker} speaking={!isLeft} side="right" />
        </div>

        {/* Speech bubble */}
        <SpeechBubble text={line.text} side={isLeft ? "left" : "right"} visible={visible} />

        {/* Speaker label */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: isLeft ? "18px" : "auto",
            right: isLeft ? "auto" : "18px",
            background: "rgba(0,0,0,0.65)",
            color: "#fff",
            fontSize: "9px",
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: "99px",
            letterSpacing: "0.08em",
            fontFamily: "'IBM Plex Mono', monospace",
            textTransform: "uppercase",
          }}
        >
          {charConfig.name}
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
          {currentLine < lines.length - 1 ? "Suite" : "Commencer"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes charBob {
          0%, 100% { transform: translateY(0) scaleX(var(--flip, 1)); }
          50%       { transform: translateY(-4px) scaleX(var(--flip, 1)); }
        }
        @keyframes charIdle {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-2px); }
        }
        @keyframes armSwing {
          0%, 100% { transform: rotate(0deg); }
          50%       { transform: rotate(-12deg); }
        }
      `}</style>
    </div>
  );
}
