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
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
    >
      {/* Background image blurred */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${mod.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.15)",
          transform: "scale(1.08)",
        }}
      />

      {/* IBM blue accent line top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "3px", background: "linear-gradient(90deg, #0f62fe 0%, #ff6b1a 100%)" }}
      />

      {/* Card — wider for horizontal layout */}
      <div
        className="relative w-full rounded-3xl overflow-hidden overflow-y-auto"
        style={{
          maxWidth: "680px",
          background: "rgba(8,12,24,0.96)",
          border: "1.5px solid rgba(255,255,255,0.12)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          animation: "celebrationPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          maxHeight: "92vh",
        }}
      >
        {/* Image strip + title */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: "110px" }}>
          <img
            src={mod.image}
            alt={mod.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(8,12,24,0.2) 0%, rgba(8,12,24,0.9) 100%)" }}
          />
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{ fontFamily: "'IBM Plex Mono', monospace", background: "rgba(15,98,254,0.35)", color: "#7eb3ff", border: "1px solid rgba(15,98,254,0.4)", letterSpacing: "0.08em", fontSize: "10px" }}>
              {t("module.chapter", lang)} {mod.chapter}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{ fontFamily: "'IBM Plex Mono', monospace", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.08em", fontSize: "10px" }}>
              MODULE {mod.number.toString().padStart(2, "0")}
            </span>
          </div>
          <div className="absolute top-3 right-4 flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full"
            style={{ fontFamily: "'IBM Plex Mono', monospace", background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}>
            <Clock size={11} />
            {mod.duration}
          </div>
        </div>

        {/* Blue separator */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #0f62fe 0%, #4589ff 60%, transparent 100%)", flexShrink: 0 }} />

        {/* Content */}
        <div className="px-5 pt-5 pb-5 flex flex-col gap-5">

          {/* Title + objective — horizontal layout */}
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <h2 className="font-bold text-white mb-1" style={{ fontSize: "1.3rem", letterSpacing: "-0.02em", lineHeight: "1.2" }}>
                {mod.title}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: "1.4" }}>{mod.subtitle}</p>
            </div>
            {/* Objectif pill */}
            <div className="flex-shrink-0 rounded-xl p-3" style={{ background: "rgba(15,98,254,0.18)", border: "1.5px solid rgba(15,98,254,0.35)", maxWidth: "200px" }}>
              <div className="font-mono text-xs mb-1 uppercase" style={{ color: "#7eb3ff", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}>
                {t("intro.at_end", lang)}
              </div>
              <p style={{ color: "#fff", fontSize: "0.78rem", lineHeight: "1.45", fontWeight: 600 }}>
                {mod.objective}
              </p>
            </div>
          </div>

          {/* ── 3 Learning objectives — HORIZONTAL grid ── */}
          {lo && (
            <div>
              <div className="font-mono text-xs mb-2.5 uppercase" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
                {t("intro.objectives", lang)}
              </div>
              <div className="grid grid-cols-3 gap-2.5">

                {/* SAVOIR */}
                <div className="rounded-xl p-3.5 flex flex-col gap-2"
                  style={{ background: "linear-gradient(145deg, #4c1d95, #6929c4)", border: "1.5px solid rgba(196,181,253,0.25)", boxShadow: "0 4px 16px rgba(105,41,196,0.35)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Brain size={14} color="#fff" />
                  </div>
                  <div className="font-bold text-xs uppercase" style={{ color: "#c4b5fd", letterSpacing: "0.08em" }}>{t("lo.savoir", lang)}</div>
                  <div style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.75rem", lineHeight: "1.45" }}>{lo.savoir}</div>
                </div>

                {/* SAVOIR-FAIRE */}
                <div className="rounded-xl p-3.5 flex flex-col gap-2"
                  style={{ background: "linear-gradient(145deg, #003a8c, #0f62fe)", border: "1.5px solid rgba(126,179,255,0.25)", boxShadow: "0 4px 16px rgba(15,98,254,0.35)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Wrench size={14} color="#fff" />
                  </div>
                  <div className="font-bold text-xs uppercase" style={{ color: "#7eb3ff", letterSpacing: "0.08em" }}>{t("lo.savoirFaire", lang)}</div>
                  <div style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.75rem", lineHeight: "1.45" }}>{lo.savoirFaire}</div>
                </div>

                {/* SAVOIR-ÊTRE */}
                <div className="rounded-xl p-3.5 flex flex-col gap-2"
                  style={{ background: "linear-gradient(145deg, #0e4f1f, #198038)", border: "1.5px solid rgba(111,220,140,0.25)", boxShadow: "0 4px 16px rgba(25,128,56,0.35)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Heart size={14} color="#fff" />
                  </div>
                  <div className="font-bold text-xs uppercase" style={{ color: "#6fdc8c", letterSpacing: "0.08em" }}>{t("lo.savoirEtre", lang)}</div>
                  <div style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.75rem", lineHeight: "1.45" }}>{lo.savoirEtre}</div>
                </div>
              </div>
            </div>
          )}

          {/* ── Ce module contient — horizontal pills ── */}
          <div>
            <div className="font-mono text-xs mb-2.5 uppercase"
              style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
              {t("intro.contains", lang)}
            </div>
            <div className="flex flex-wrap gap-2">
              {hasVideo && (
                <div className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: "rgba(15,98,254,0.2)", border: "1.5px solid rgba(15,98,254,0.4)" }}>
                  <Video size={13} style={{ color: "#7eb3ff", flexShrink: 0 }} />
                  <span style={{ color: "#7eb3ff", fontSize: "0.78rem", fontWeight: 600 }}>{t("intro.video", lang)}</span>
                </div>
              )}
              {interactionCount > 0 && (
                <div className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: "rgba(255,107,26,0.2)", border: "1.5px solid rgba(255,107,26,0.4)" }}>
                  <Zap size={13} style={{ color: "#ff9a5e", flexShrink: 0 }} />
                  <span style={{ color: "#ff9a5e", fontSize: "0.78rem", fontWeight: 600 }}>
                    {interactionCount} {interactionCount > 1 ? t("intro.exercises_pl", lang) : t("intro.exercises", lang)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: "rgba(25,128,56,0.2)", border: "1.5px solid rgba(25,128,56,0.4)" }}>
                <Shield size={13} style={{ color: "#6fdc8c", flexShrink: 0 }} />
                <span style={{ color: "#6fdc8c", fontSize: "0.78rem", fontWeight: 600 }}>{t("intro.quiz_req", lang)}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: "rgba(245,158,11,0.2)", border: "1.5px solid rgba(245,158,11,0.4)" }}>
                <Lightbulb size={13} style={{ color: "#fcd34d", flexShrink: 0 }} />
                <span style={{ color: "#fcd34d", fontSize: "0.78rem", fontWeight: 600 }}>
                  {mod.quiz.length} {t("module.questions", lang)}
                </span>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
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
