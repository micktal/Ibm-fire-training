import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle2, Clock, Play, Flame, Shield, Award, BarChart2, ArrowRight, BookOpen } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";
import GeometricBg from "@/components/layout/GeometricBg";
import BottomNav from "@/components/layout/BottomNav";
import { useUser } from "@/lib/userContext";
import { getChapterModules, CourseModule } from "@/lib/courseData";

// ── (GeometricBg is now a shared component) ────────────────────────

// ── Module tile ──────────────────────────────────────────────────
function ModuleTile({ mod, unlocked, completed, score }: {
  mod: CourseModule;
  unlocked: boolean;
  completed: boolean;
  score: number;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => unlocked && navigate(`/module/${mod.id}`)}
      className="rounded-2xl overflow-hidden transition-all duration-200 flex flex-col"
      style={{
        background: completed ? "#fff" : unlocked ? "#fff" : "rgba(255,255,255,0.45)",
        border: completed
          ? "2px solid rgba(25,128,56,0.35)"
          : unlocked
          ? "2px solid rgba(13,71,161,0.2)"
          : "2px solid rgba(200,205,216,0.5)",
        cursor: unlocked ? "pointer" : "default",
        opacity: unlocked ? 1 : 0.65,
        boxShadow: unlocked ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
        minHeight: "140px",
      }}
      onMouseEnter={(e) => {
        if (!unlocked) return;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = unlocked ? "0 4px 16px rgba(0,0,0,0.08)" : "none";
      }}
    >
      {/* Module image strip */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "70px" }}>
        <img
          src={mod.image}
          alt={mod.title}
          className="w-full h-full object-cover"
          style={{ filter: !unlocked ? "grayscale(0.8) brightness(0.6)" : "brightness(0.75)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.4))" }} />
        {/* Module number badge */}
        <div
          className="absolute top-2 left-2 font-mono text-xs font-bold px-1.5 py-0.5 rounded"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            background: completed ? "#198038" : unlocked ? "#0D47A1" : "rgba(100,110,130,0.7)",
            color: "#fff",
            fontSize: "9px",
            letterSpacing: "0.08em",
          }}
        >
          M{mod.number.toString().padStart(2, "0")}
        </div>
        {/* Status badge */}
        {completed && (
          <div className="absolute top-2 right-2">
            <CheckCircle2 size={16} color="#6fdc8c" />
          </div>
        )}
        {!unlocked && (
          <div className="absolute top-2 right-2">
            <Lock size={13} color="rgba(255,255,255,0.5)" />
          </div>
        )}
        {score > 0 && completed && (
          <div
            className="absolute bottom-1.5 right-2 font-mono font-bold text-xs"
            style={{ color: "#6fdc8c", fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px" }}
          >
            {score}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-3 py-2.5">
        <h3
          className="font-bold leading-tight mb-1"
          style={{ fontSize: "0.78rem", color: unlocked ? "#0a2052" : "#9aa0b8", lineHeight: "1.3" }}
        >
          {mod.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1" style={{ color: "#adb3c8" }}>
            <Clock size={10} />
            <span className="font-mono text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px" }}>
              {mod.duration}
            </span>
          </div>
          {unlocked && !completed && (
            <div className="flex items-center gap-0.5" style={{ color: "#0D47A1" }}>
              <Play size={9} fill="#0D47A1" />
              <span style={{ fontSize: "10px", fontWeight: 700 }}>Start</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Chapter section ──────────────────────────────────────────────
function ChapterSection({ chapter, mods, completedCount }: {
  chapter: 1 | 2;
  mods: CourseModule[];
  completedCount: number;
}) {
  const { isModuleUnlocked, progress } = useUser();
  const label = chapter === 1 ? "Chapitre 1 — Lutte Incendie" : "Chapitre 2 — Évacuation";
  const isComplete = completedCount === 7;

  return (
    <div className="mb-6">
      {/* Chapter header */}
      <div className="flex items-center gap-3 mb-3 px-4 pt-4">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: chapter === 1 ? "rgba(218,30,40,0.1)" : "rgba(13,71,161,0.1)" }}
        >
          {chapter === 1
            ? <Flame size={16} style={{ color: "#da1e28" }} />
            : <Shield size={16} style={{ color: "#0D47A1" }} />
          }
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm" style={{ color: "#0a2052" }}>{label}</div>
          <div className="text-xs" style={{ color: "#8d95aa" }}>
            {completedCount}/7 modules complétés
          </div>
        </div>
        <span
          className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            background: isComplete ? "rgba(25,128,56,0.1)" : "rgba(13,71,161,0.08)",
            color: isComplete ? "#198038" : "#0D47A1",
            border: `1px solid ${isComplete ? "rgba(25,128,56,0.3)" : "rgba(13,71,161,0.2)"}`,
          }}
        >
          {completedCount}/7
        </span>
      </div>

      {/* Progress bar */}
      <div className="mx-4 mb-3 rounded-full overflow-hidden" style={{ height: "4px", background: "#e8eaf2" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(completedCount / 7) * 100}%`,
            background: chapter === 1
              ? "linear-gradient(90deg, #da1e28, #ff6b1a)"
              : "linear-gradient(90deg, #0D47A1, #1976D2)",
          }}
        />
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-2 gap-3 px-4">
        {mods.map((mod) => (
          <ModuleTile
            key={mod.id}
            mod={mod}
            unlocked={isModuleUnlocked(mod.id)}
            completed={!!progress[mod.id]?.completed}
            score={progress[mod.id]?.score ?? 0}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Hub ─────────────────────────────────────────────────────
export default function Hub() {
  const navigate = useNavigate();
  const { user, globalScore, totalCompleted, progress } = useUser();

  const ch1Mods = getChapterModules(1);
  const ch2Mods = getChapterModules(2);

  const completedCh1 = ch1Mods.filter((m) => progress[m.id]?.completed).length;
  const completedCh2 = ch2Mods.filter((m) => progress[m.id]?.completed).length;
  const passed = globalScore >= 80;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* ── Top nav bar ─────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-6"
        style={{ height: "52px", background: "#fff", borderBottom: "1px solid #e4e7f0", zIndex: 20 }}
      >
        <IBMLogo variant="light" height={26} />
        <nav className="flex items-center gap-5">
          <button
            onClick={() => navigate("/")}
            className="text-xs font-semibold uppercase hover:opacity-70 transition-opacity"
            style={{ color: "#0D47A1", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}
          >
            Accueil
          </button>
          <div className="flex items-center gap-1.5" style={{ color: "#0D47A1" }}>
            <BarChart2 size={13} />
            <span className="font-mono text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {totalCompleted}/14 — {globalScore}%
            </span>
          </div>
        </nav>
      </header>

      {/* ── Hero stats band with geometric bg ───────────────── */}
      <div className="relative flex-shrink-0" style={{ minHeight: "130px" }}>
        <GeometricBg />
        <div className="relative z-10 px-5 py-4 flex flex-col justify-end h-full" style={{ minHeight: "130px" }}>
          <div className="max-w-2xl mx-auto w-full">
            {/* IBM logo */}
            <div className="mb-3">
              <IBMLogo variant="dark" height={30} />
            </div>

            {user && (
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs font-mono mb-0.5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em" }}>
                    BONJOUR,
                  </div>
                  <div className="font-bold text-white" style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
                    {user.prenom} {user.nom}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {user.campus}
                  </div>
                </div>

                {/* Stats pills */}
                <div className="flex gap-2">
                  <div
                    className="rounded-xl px-3 py-2 text-center"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", minWidth: "72px" }}
                  >
                    <div
                      className="font-mono font-bold"
                      style={{ fontSize: "1.4rem", lineHeight: 1, color: globalScore >= 80 ? "#6fdc8c" : "#fff", fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {globalScore}%
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Score</div>
                  </div>
                  <div
                    className="rounded-xl px-3 py-2 text-center"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", minWidth: "72px" }}
                  >
                    <div
                      className="font-mono font-bold"
                      style={{ fontSize: "1.4rem", lineHeight: 1, color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {totalCompleted}<span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>/14</span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Modules</div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress bar */}
            {totalCompleted > 0 && (
              <div className="mt-3 rounded-full overflow-hidden" style={{ height: "4px", background: "rgba(255,255,255,0.15)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(totalCompleted / 14) * 100}%`,
                    background: "linear-gradient(90deg, #42A5F5, #6fdc8c)",
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Scrollable module content ────────────────────────── */}
      <main className="flex-1 overflow-y-auto" style={{ background: "#F0F4FA" }}>
        <div className="max-w-2xl mx-auto">
          {/* Certification banner */}
          {passed && (
            <button
              onClick={() => navigate("/certificat")}
              className="mx-4 mt-4 w-[calc(100%-2rem)] rounded-2xl px-4 py-3 flex items-center gap-3 text-left transition-all"
              style={{ background: "rgba(25,128,56,0.08)", border: "1.5px solid rgba(25,128,56,0.25)", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(25,128,56,0.13)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(25,128,56,0.08)")}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#198038" }}>
                <Award size={18} color="#fff" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm" style={{ color: "#0e6027" }}>Formation certifiée — {globalScore}%</div>
                <div className="text-xs" style={{ color: "#6f7897" }}>Cliquez pour voir et télécharger votre certificat</div>
              </div>
              <ArrowRight size={15} style={{ color: "#198038", flexShrink: 0 }} />
            </button>
          )}

          {/* Chapter 1 */}
          <ChapterSection chapter={1} mods={ch1Mods} completedCount={completedCh1} />

          {/* Chapter bridge banner */}
          <div className="mx-4 mb-2">
            <button
              onClick={() => navigate("/chapter-intro/2")}
              className="w-full flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(13,71,161,0.3)",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(13,71,161,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,71,161,0.3)")}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                <BookOpen size={18} color="#fff" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white" style={{ fontSize: "0.88rem", letterSpacing: "-0.01em" }}>
                  Récapitulatif Chapitre 1
                </div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.76rem", marginTop: "1px" }}>
                  Points clés · Bonnes pratiques · Aperçu Chapitre 2
                </div>
              </div>
              <ArrowRight size={18} color="rgba(255,255,255,0.7)" />
            </button>
          </div>

          {/* Chapter 2 */}
          <ChapterSection chapter={2} mods={ch2Mods} completedCount={completedCh2} />

          <div style={{ height: "16px" }} />
        </div>
      </main>

      {/* ── Bottom nav bar ──────────────────────────────────── */}
      <BottomNav onBack={() => navigate(-1)} onMenu={() => navigate("/hub")} />
    </div>
  );
}
