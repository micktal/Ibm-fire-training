import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle2, Clock, Play, Flame, Shield, ChevronRight, Award } from "lucide-react";
import IBMTopbar from "@/components/IBMTopbar";
import IBMLogo from "@/components/IBMLogo";
import { useUser } from "@/lib/userContext";
import { getChapterModules, CourseModule } from "@/lib/courseData";

const CDN = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F";
const CH1_HERO = `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`;
const CH2_HERO = `${CDN}2ee3c4ada85544aa87e2f4f440dc1a94?format=webp&width=800`;

// ── Module row in journey timeline ───────────────────────────────
function ModuleRow({
  mod,
  unlocked,
  completed,
  score,
  isLast,
  index,
}: {
  mod: CourseModule;
  unlocked: boolean;
  completed: boolean;
  score: number;
  isLast: boolean;
  index: number;
}) {
  const navigate = useNavigate();

  const dotColor = completed ? "#198038" : unlocked ? "#0043ce" : "#c8cdd8";
  const cardBorder = completed
    ? "rgba(25,128,56,0.25)"
    : unlocked
    ? "rgba(0,67,206,0.2)"
    : "#e8eaf2";
  const cardBg = completed
    ? "rgba(25,128,56,0.03)"
    : unlocked
    ? "#fff"
    : "rgba(248,249,252,0.9)";

  return (
    <div className="flex gap-0">
      {/* Timeline column */}
      <div className="flex flex-col items-center" style={{ width: "44px", flexShrink: 0 }}>
        {/* Dot */}
        <div
          className="flex items-center justify-center rounded-full z-10 flex-shrink-0"
          style={{
            width: "32px",
            height: "32px",
            background: completed
              ? "#198038"
              : unlocked
              ? "#0043ce"
              : "#e8eaf2",
            border: `3px solid ${completed ? "#198038" : unlocked ? "#0043ce" : "#d0d4e2"}`,
            boxShadow: unlocked && !completed ? "0 0 0 4px rgba(0,67,206,0.12)" : "none",
            transition: "all 0.3s ease",
            marginTop: "12px",
          }}
        >
          {completed
            ? <CheckCircle2 size={15} color="#fff" />
            : unlocked
            ? <Play size={11} color="#fff" fill="#fff" style={{ marginLeft: "1px" }} />
            : <Lock size={11} color="#adb3c8" />
          }
        </div>
        {/* Line below */}
        {!isLast && (
          <div
            style={{
              width: "2px",
              flex: 1,
              minHeight: "24px",
              background: completed
                ? "linear-gradient(to bottom, #198038, rgba(25,128,56,0.15))"
                : "linear-gradient(to bottom, #e4e7f0, #e4e7f0)",
              marginTop: "4px",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-4" style={{ paddingLeft: "12px" }}>
        <div
          onClick={() => unlocked && navigate(`/module/${mod.id}`)}
          className="rounded-2xl overflow-hidden transition-all duration-200"
          style={{
            border: `1.5px solid ${cardBorder}`,
            background: cardBg,
            cursor: unlocked ? "pointer" : "default",
            opacity: !unlocked ? 0.6 : 1,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: unlocked && !completed
              ? "0 2px 16px rgba(0,67,206,0.07)"
              : completed
              ? "0 2px 12px rgba(25,128,56,0.08)"
              : "none",
          }}
          onMouseEnter={(e) => {
            if (unlocked) {
              (e.currentTarget as HTMLDivElement).style.transform = "translateX(3px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = unlocked && !completed
              ? "0 2px 16px rgba(0,67,206,0.07)"
              : completed
              ? "0 2px 12px rgba(25,128,56,0.08)"
              : "none";
          }}
        >
          <div className="flex gap-0">
            {/* Image strip */}
            <div className="relative overflow-hidden flex-shrink-0" style={{ width: "90px" }}>
              <img
                src={mod.image}
                alt={mod.title}
                className="w-full h-full object-cover"
                style={{
                  minHeight: "90px",
                  filter: !unlocked ? "grayscale(0.9) brightness(0.65)" : "brightness(0.8)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, transparent 50%, " + cardBg + ")" }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 px-4 py-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <div
                    className="font-mono text-xs mb-0.5"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: completed ? "#198038" : unlocked ? "#0043ce" : "#adb3c8",
                      letterSpacing: "0.08em",
                      fontSize: "10px",
                    }}
                  >
                    M{mod.number.toString().padStart(2, "0")}
                  </div>
                  <h3
                    className="font-bold leading-tight"
                    style={{ fontSize: "0.875rem", color: unlocked ? "#161616" : "#9aa0b8", lineHeight: "1.3" }}
                  >
                    {mod.title}
                  </h3>
                </div>

                {completed && (
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#198038",
                      background: "rgba(25,128,56,0.1)",
                      border: "1px solid rgba(25,128,56,0.25)",
                    }}
                  >
                    {score}%
                  </span>
                )}
              </div>

              <p
                className="text-xs leading-relaxed mb-2"
                style={{ color: unlocked ? "#6f7897" : "#adb3c8", lineHeight: "1.45" }}
              >
                {mod.subtitle}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1" style={{ color: "#adb3c8" }}>
                  <Clock size={11} />
                  <span className="font-mono text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {mod.duration}
                  </span>
                </div>

                {unlocked && !completed && (
                  <div className="flex items-center gap-1" style={{ color: "#0043ce" }}>
                    <span className="text-xs font-semibold">Commencer</span>
                    <ChevronRight size={12} />
                  </div>
                )}
                {!unlocked && (
                  <div className="flex items-center gap-1" style={{ color: "#c8cdd8" }}>
                    <Lock size={11} />
                    <span className="text-xs">Verrouillé</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Chapter header ───────────────────────────────────────────────
function ChapterHeader({
  chapter,
  heroImg,
  label,
  title,
  description,
  completedCount,
}: {
  chapter: 1 | 2;
  heroImg: string;
  label: string;
  title: string;
  description: string;
  completedCount: number;
}) {
  const isComplete = completedCount === 7;
  return (
    <div className="relative rounded-2xl overflow-hidden mb-5" style={{ height: "150px" }}>
      <img src={heroImg} alt={title} className="w-full h-full object-cover" style={{ filter: "brightness(0.42)" }} />
      {/* Glassmorphism overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: chapter === 1
            ? "linear-gradient(135deg, rgba(218,30,40,0.25) 0%, rgba(0,10,30,0.5) 100%)"
            : "linear-gradient(135deg, rgba(0,67,206,0.3) 0%, rgba(0,10,30,0.55) 100%)",
        }}
      />
      {/* Blue IBM accent line */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "2px", background: chapter === 1 ? "#ff6b1a" : "#0f62fe" }} />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-end justify-between">
          <div>
            <div
              className="font-mono text-xs mb-1 flex items-center gap-1.5"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontSize: "9px",
              }}
            >
              {chapter === 1 ? <Flame size={10} /> : <Shield size={10} />}
              {label}
            </div>
            <h2 className="text-xl font-bold text-white" style={{ letterSpacing: "-0.02em", lineHeight: "1.15" }}>
              {title}
            </h2>
          </div>
          <div
            className="font-mono text-sm font-bold px-3 py-1.5 rounded-xl flex-shrink-0"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              background: isComplete ? "rgba(25,128,56,0.4)" : "rgba(255,255,255,0.12)",
              color: isComplete ? "#6fdc8c" : "rgba(255,255,255,0.85)",
              border: `1px solid ${isComplete ? "rgba(25,128,56,0.5)" : "rgba(255,255,255,0.18)"}`,
              backdropFilter: "blur(8px)",
            }}
          >
            {completedCount}/7
          </div>
        </div>
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
  const { isModuleUnlocked } = useUser();

  const completedCh1 = ch1Mods.filter((m) => progress[m.id]?.completed).length;
  const completedCh2 = ch2Mods.filter((m) => progress[m.id]?.completed).length;
  const passed = globalScore >= 80;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f2f3f7", fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      <IBMTopbar
        title="Parcours de formation"
        subtitle="HSE · Lutte Incendie & Évacuation"
        backTo="/"
        backLabel="Accueil"
      />

      <main className="flex-1 overflow-y-auto pb-4">
        {/* Hero stats band */}
        <div
          className="px-5 py-5"
          style={{
            background: "linear-gradient(135deg, #0a0e1a 0%, #0d1b35 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            {/* IBM logo dans le hero */}
            <div className="mb-4">
              <IBMLogo variant="dark" height={52} />
            </div>
            {/* Greeting */}
            {user && (
              <div className="mb-4">
                <div
                  className="font-mono text-xs mb-0.5"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}
                >
                  BONJOUR,
                </div>
                <div className="text-xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {user.prenom} {user.nom}
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {user.campus} · {user.email}
                </div>
              </div>
            )}

            {/* Stat pills */}
            <div className="flex gap-3 flex-wrap">
              {/* Global score */}
              <div
                className="flex-1 min-w-[120px] rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="font-mono font-bold mb-0.5"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: globalScore >= 80 ? "#6fdc8c" : globalScore > 0 ? "#0f62fe" : "rgba(255,255,255,0.3)",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {globalScore}%
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Score global</div>
              </div>

              {/* Progress */}
              <div
                className="flex-1 min-w-[120px] rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="font-mono font-bold mb-0.5"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: totalCompleted > 0 ? "#fff" : "rgba(255,255,255,0.3)",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {totalCompleted}<span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.35)" }}>/14</span>
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Modules complétés</div>
              </div>

              {/* Chapter 1 */}
              <div
                className="flex-1 min-w-[100px] rounded-2xl p-4"
                style={{
                  background: "rgba(255,107,26,0.10)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,107,26,0.2)",
                }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Flame size={12} color="#ff6b1a" />
                  <span className="font-mono text-xs" style={{ color: "#ff6b1a", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", letterSpacing: "0.08em" }}>CH.1</span>
                </div>
                <div className="font-mono font-bold" style={{ fontSize: "1.5rem", lineHeight: 1, color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {completedCh1}<span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>/7</span>
                </div>
              </div>

              {/* Chapter 2 */}
              <div
                className="flex-1 min-w-[100px] rounded-2xl p-4"
                style={{
                  background: "rgba(15,98,254,0.12)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(15,98,254,0.25)",
                }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Shield size={12} color="#0f62fe" />
                  <span className="font-mono text-xs" style={{ color: "#0f62fe", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", letterSpacing: "0.08em" }}>CH.2</span>
                </div>
                <div className="font-mono font-bold" style={{ fontSize: "1.5rem", lineHeight: 1, color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {completedCh2}<span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>/7</span>
                </div>
              </div>
            </div>

            {/* Overall progress bar */}
            {totalCompleted > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Progression globale</span>
                  <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace" }}>
                    {Math.round((totalCompleted / 14) * 100)}%
                  </span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: "5px", background: "rgba(255,255,255,0.1)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(totalCompleted / 14) * 100}%`,
                      background: "linear-gradient(90deg, #0f62fe, #6fdc8c)",
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Certification banner (if passed) */}
        {passed && (
          <div
            className="mx-4 mt-4 rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{
              background: "rgba(25,128,56,0.08)",
              border: "1.5px solid rgba(25,128,56,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#198038" }}>
              <Award size={20} color="#fff" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm" style={{ color: "#0e6027" }}>Formation certifiée IBM — {globalScore}%</div>
              <div className="text-xs" style={{ color: "#6f7897" }}>Vous avez validé l'ensemble des modules avec un score supérieur à 80%</div>
            </div>
          </div>
        )}

        {/* Journey */}
        <div className="max-w-2xl mx-auto px-4 pt-5">
          {/* Chapter 1 */}
          <ChapterHeader
            chapter={1}
            heroImg={CH1_HERO}
            label="Chapitre 1 — Lutte Incendie"
            title="Agir dès les premiers signes"
            description="Détecter, intervenir et décider en moins de 30 secondes"
            completedCount={completedCh1}
          />
          <div className="mb-8">
            {ch1Mods.map((mod, idx) => (
              <ModuleRow
                key={mod.id}
                mod={mod}
                unlocked={isModuleUnlocked(mod.id)}
                completed={!!progress[mod.id]?.completed}
                score={progress[mod.id]?.score ?? 0}
                isLast={idx === ch1Mods.length - 1}
                index={idx}
              />
            ))}
          </div>

          {/* Chapter 2 */}
          <ChapterHeader
            chapter={2}
            heroImg={CH2_HERO}
            label="Chapitre 2 — Évacuation"
            title="Garder son calme et sauver des vies"
            description="Maîtriser les procédures d'évacuation dans chaque situation"
            completedCount={completedCh2}
          />
          <div>
            {ch2Mods.map((mod, idx) => (
              <ModuleRow
                key={mod.id}
                mod={mod}
                unlocked={isModuleUnlocked(mod.id)}
                completed={!!progress[mod.id]?.completed}
                score={progress[mod.id]?.score ?? 0}
                isLast={idx === ch2Mods.length - 1}
                index={idx}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
