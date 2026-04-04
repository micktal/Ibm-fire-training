import { Play, Clock, Brain, Wrench, Heart, Zap, Shield, Video, Lightbulb } from "lucide-react";
import { CourseModule } from "@/lib/courseData";
import { MODULE_INTERACTIONS } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";
import { t } from "@/lib/i18n";

interface Props {
  mod: CourseModule;
  onStart: () => void;
}

export default function ModuleIntroOverlay({ mod, onStart }: Props) {
  const { lang } = useLanguage();
  const interactionCount = MODULE_INTERACTIONS[mod.id]?.length ?? 0;
  const hasVideo = !!mod.videoUrl;
  const lo = mod.learningObjectives;

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
        className="relative w-full max-w-md rounded-3xl overflow-hidden overflow-y-auto"
        style={{
          background: "rgba(10,14,26,0.92)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          animation: "celebrationPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          maxHeight: "92vh",
        }}
      >
        {/* Module image strip — badges only, NO title inside */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: "100px" }}>
          <img
            src={mod.image}
            alt={mod.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.85) 100%)" }}
          />
          {/* Chapter + module badge — top left */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
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
              {t("module.chapter", lang)} {mod.chapter}
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

          {/* Duration — top right */}
          <div
            className="absolute top-3 right-4 flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full"
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
        </div>

        {/* Bright accent separator — clear visual boundary between image and content */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #0f62fe 0%, #4589ff 60%, transparent 100%)", flexShrink: 0 }} />

        {/* Content */}
        <div className="px-5 pt-5 pb-5 flex flex-col gap-4">

          {/* ── Title clearly in content area — well below image badges ── */}
          <h2
            className="font-bold text-white"
            style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", lineHeight: "1.3" }}
          >
            {mod.title}
          </h2>

          {/* ── Objectif global ────────────────────────────── */}
          <div
            className="rounded-xl p-3.5"
            style={{ background: "rgba(0,67,206,0.12)", border: "1px solid rgba(0,67,206,0.22)" }}
          >
            <div className="font-mono text-xs mb-1.5 uppercase" style={{ color: "rgba(126,179,255,0.6)", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
              {t("intro.at_end", lang)}
            </div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.855rem", lineHeight: "1.5" }}>
              {mod.objective}
            </p>
          </div>

          {/* ── Objectifs pédagogiques Savoir / Savoir-faire / Savoir-être ── */}
          {lo && (
            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
                {t("intro.objectives", lang)}
              </div>

              {/* Savoir */}
              <div className="flex items-start gap-3 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5" style={{ background: "rgba(124,58,237,0.3)" }}>
                  <Brain size={12} color="#c4b5fd" />
                </div>
                <div>
                  <div className="font-bold text-xs mb-0.5" style={{ color: "#c4b5fd", letterSpacing: "0.06em" }}>{t("lo.savoir", lang)}</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", lineHeight: "1.45" }}>{lo.savoir}</div>
                </div>
              </div>

              {/* Savoir-faire */}
              <div className="flex items-start gap-3 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(15,98,254,0.1)", border: "1px solid rgba(15,98,254,0.2)" }}>
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5" style={{ background: "rgba(15,98,254,0.3)" }}>
                  <Wrench size={12} color="#7eb3ff" />
                </div>
                <div>
                  <div className="font-bold text-xs mb-0.5" style={{ color: "#7eb3ff", letterSpacing: "0.06em" }}>{t("lo.savoirFaire", lang)}</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", lineHeight: "1.45" }}>{lo.savoirFaire}</div>
                </div>
              </div>

              {/* Savoir-être */}
              <div className="flex items-start gap-3 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(25,128,56,0.1)", border: "1px solid rgba(25,128,56,0.2)" }}>
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5" style={{ background: "rgba(25,128,56,0.3)" }}>
                  <Heart size={12} color="#6fdc8c" />
                </div>
                <div>
                  <div className="font-bold text-xs mb-0.5" style={{ color: "#6fdc8c", letterSpacing: "0.06em" }}>{t("lo.savoirEtre", lang)}</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", lineHeight: "1.45" }}>{lo.savoirEtre}</div>
                </div>
              </div>
            </div>
          )}

          {/* ── Ce module contient ────────────────────────── */}
          <div>
            <div
              className="font-mono text-xs mb-2 uppercase"
              style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}
            >
              {t("intro.contains", lang)}
            </div>
            <div className="flex flex-col gap-1.5">
              {hasVideo && (
                <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Video size={13} style={{ color: "#0f62fe", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.835rem" }}>{t("intro.video", lang)}</span>
                </div>
              )}
              {interactionCount > 0 && (
                <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Zap size={13} style={{ color: "#ff6b1a", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.835rem" }}>
                    {interactionCount} {interactionCount > 1 ? t("intro.exercises_pl", lang) : t("intro.exercises", lang)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Shield size={13} style={{ color: "#6fdc8c", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.835rem" }}>
                  {t("intro.quiz_req", lang)}
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Lightbulb size={13} style={{ color: "#f59e0b", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.835rem" }}>
                  {mod.quiz.length} {t("module.questions", lang)} · {t("module.read_content", lang)}
                </span>
              </div>
            </div>
          </div>

          {/* ── CTA ────────────────────────────────────────── */}
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
            {t("intro.to_start", lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
