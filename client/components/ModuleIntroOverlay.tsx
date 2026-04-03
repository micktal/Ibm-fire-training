import { Play, Clock, Target, Zap, Shield, Video } from "lucide-react";
import { CourseModule } from "@/lib/courseData";
import { MODULE_INTERACTIONS } from "@/lib/interactionData";

interface Props {
  mod: CourseModule;
  onStart: () => void;
}

export default function ModuleIntroOverlay({ mod, onStart }: Props) {
  const interactionCount = MODULE_INTERACTIONS[mod.id]?.length ?? 0;
  const hasVideo = !!mod.videoUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}
    >
      {/* Background image blurred */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${mod.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(18px) brightness(0.18)",
          transform: "scale(1.08)",
        }}
      />

      {/* IBM blue accent line top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "3px", background: "linear-gradient(90deg, #0f62fe 0%, #ff6b1a 100%)" }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "rgba(10,14,26,0.92)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          animation: "celebrationPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Module image strip */}
        <div className="relative overflow-hidden" style={{ height: "160px" }}>
          <img
            src={mod.image}
            alt={mod.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.45)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(10,14,26,0.95))" }}
          />
          {/* Chapter + module badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                background: "rgba(15,98,254,0.35)",
                color: "#7eb3ff",
                border: "1px solid rgba(15,98,254,0.4)",
                letterSpacing: "0.08em",
                fontSize: "10px",
              }}
            >
              CHAPITRE {mod.chapter}
            </span>
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                letterSpacing: "0.08em",
                fontSize: "10px",
              }}
            >
              MODULE {mod.number.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Duration */}
          <div
            className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              background: "rgba(0,0,0,0.5)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Clock size={11} />
            {mod.duration}
          </div>

          {/* Title over image bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
            <h2
              className="font-bold text-white"
              style={{ fontSize: "1.2rem", letterSpacing: "-0.02em", lineHeight: "1.2" }}
            >
              {mod.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-5">
          {/* Objective */}
          <div
            className="flex items-start gap-3 rounded-xl p-3.5 mb-4"
            style={{ background: "rgba(0,67,206,0.12)", border: "1px solid rgba(0,67,206,0.2)" }}
          >
            <Target size={15} style={{ color: "#7eb3ff", flexShrink: 0, marginTop: "1px" }} />
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", lineHeight: "1.55" }}>
              {mod.objective}
            </p>
          </div>

          {/* What's in this module */}
          <div className="mb-4">
            <div
              className="font-mono text-xs mb-2.5"
              style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase" }}
            >
              Ce module contient
            </div>
            <div className="flex flex-col gap-2">
              {hasVideo && (
                <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Video size={14} style={{ color: "#0f62fe", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>Vidéo pédagogique avec sous-titres</span>
                </div>
              )}
              {interactionCount > 0 && (
                <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Zap size={14} style={{ color: "#ff6b1a", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
                    {interactionCount} exercice{interactionCount > 1 ? "s" : ""} interactif{interactionCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Shield size={14} style={{ color: "#6fdc8c", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
                  Quiz final — <span style={{ color: "#6fdc8c", fontWeight: 600 }}>80% requis</span> pour valider
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "13px", lineHeight: 1 }}>💡</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
                  {mod.quiz.length} question{mod.quiz.length > 1 ? "s" : ""} · Lisez bien le contenu avant de répondre
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2.5 font-bold rounded-2xl transition-all"
            style={{
              padding: "1rem",
              background: "linear-gradient(135deg, #0043ce 0%, #0f62fe 100%)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              boxShadow: "0 8px 32px rgba(15,98,254,0.45)",
              animation: "breathePulse 2.5s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.animation = "none";
              (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #0031a9 0%, #0043ce 100%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.animation = "breathePulse 2.5s ease-in-out infinite";
              (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #0043ce 0%, #0f62fe 100%)";
            }}
          >
            <Play size={18} fill="#fff" />
            Démarrer le module
          </button>
        </div>
      </div>
    </div>
  );
}
