import { useNavigate } from "react-router-dom";
import {
  Lock, CheckCircle2, ChevronRight, Clock, Target, Flame,
  DoorOpen, BarChart3, Award, Play,
} from "lucide-react";
import IBMTopbar from "@/components/IBMTopbar";
import { useUser } from "@/lib/userContext";
import { MODULES, getChapterModules, CourseModule } from "@/lib/courseData";

const CDN = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F";

const CH1_HERO = `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`;
const CH2_HERO = `${CDN}2ee3c4ada85544aa87e2f4f440dc1a94?format=webp&width=800`;

function ModuleCard({ mod, unlocked, completed, score }: {
  mod: CourseModule;
  unlocked: boolean;
  completed: boolean;
  score: number;
}) {
  const navigate = useNavigate();

  const statusColor = completed
    ? "#198038"
    : unlocked
    ? "#0043ce"
    : "#8d95aa";

  const borderColor = completed
    ? "rgba(25,128,56,0.35)"
    : unlocked
    ? "rgba(0,67,206,0.25)"
    : "#e4e7f0";

  const bgColor = completed
    ? "rgba(25,128,56,0.03)"
    : unlocked
    ? "#fff"
    : "#fafbfc";

  return (
    <div
      onClick={() => unlocked && navigate(`/module/${mod.id}`)}
      className="rounded-lg overflow-hidden flex flex-col transition-all duration-200"
      style={{
        border: `1.5px solid ${borderColor}`,
        background: bgColor,
        cursor: unlocked ? "pointer" : "not-allowed",
        opacity: !unlocked ? 0.58 : 1,
        boxShadow: unlocked && !completed ? "0 2px 10px rgba(0,67,206,0.08)" : "none",
      }}
      onMouseEnter={(e) => {
        if (unlocked) (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        if (unlocked) (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = unlocked && !completed ? "0 2px 10px rgba(0,67,206,0.08)" : "none";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "110px" }}>
        <img
          src={mod.image}
          alt={mod.title}
          className="w-full h-full object-cover"
          style={{ filter: !unlocked ? "grayscale(0.8) brightness(0.7)" : "brightness(0.85)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55))" }} />

        {/* Status badge top-right */}
        <div className="absolute top-2 right-2">
          {completed ? (
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#198038" }}>
              <CheckCircle2 size={15} color="#fff" />
            </div>
          ) : !unlocked ? (
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
              <Lock size={12} color="rgba(255,255,255,0.7)" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#0043ce" }}>
              <Play size={12} color="#fff" fill="#fff" style={{ marginLeft: "1px" }} />
            </div>
          )}
        </div>

        {/* Module number */}
        <div
          className="absolute bottom-2 left-2 font-mono text-xs px-2 py-0.5 rounded"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: "rgba(255,255,255,0.85)",
            background: "rgba(0,0,0,0.45)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
          }}
        >
          MODULE {mod.number.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className="font-bold mb-1 leading-tight"
          style={{ fontSize: "0.85rem", color: "#161616", lineHeight: "1.3" }}
        >
          {mod.title}
        </h3>
        <p className="text-xs mb-3 flex-1 leading-relaxed" style={{ color: "#6f7897" }}>
          {mod.subtitle}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1" style={{ color: "#8d95aa" }}>
            <Clock size={11} />
            <span className="font-mono text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {mod.duration}
            </span>
          </div>

          {completed ? (
            <span
              className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#198038",
                background: "rgba(25,128,56,0.08)",
                border: "1px solid rgba(25,128,56,0.2)",
              }}
            >
              {score}%
            </span>
          ) : unlocked ? (
            <div className="flex items-center gap-1" style={{ color: "#0043ce" }}>
              <span className="text-xs font-semibold">Commencer</span>
              <ChevronRight size={13} />
            </div>
          ) : (
            <div className="flex items-center gap-1" style={{ color: "#8d95aa" }}>
              <Lock size={11} />
              <span className="text-xs">Verrouillé</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChapterSection({ chapter, heroImg, title, subtitle, description }: {
  chapter: 1 | 2;
  heroImg: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  const { isModuleUnlocked, progress } = useUser();
  const mods = getChapterModules(chapter);
  const completedCount = mods.filter((m) => progress[m.id]?.completed).length;

  return (
    <section className="mb-8">
      {/* Chapter hero */}
      <div
        className="relative rounded-xl overflow-hidden mb-5"
        style={{ height: "160px", border: "1px solid #e4e7f0" }}
      >
        <img src={heroImg} alt={title} className="w-full h-full object-cover" style={{ filter: "brightness(0.5)" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div
            className="font-mono text-xs mb-1.5"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {chapter === 1 ? "Chapitre 1 — Lutte Incendie" : "Chapitre 2 — Évacuation"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1" style={{ letterSpacing: "-0.025em" }}>
            {title}
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "540px" }}>
            {description}
          </p>
        </div>
        {/* Progress pill */}
        <div
          className="absolute top-4 right-4 font-mono text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            background: completedCount === 7 ? "#198038" : "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(6px)",
          }}
        >
          {completedCount}/7 modules
        </div>
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mods.map((mod) => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            unlocked={isModuleUnlocked(mod.id)}
            completed={!!progress[mod.id]?.completed}
            score={progress[mod.id]?.score ?? 0}
          />
        ))}
      </div>
    </section>
  );
}

export default function Hub() {
  const navigate = useNavigate();
  const { user, globalScore, totalCompleted, progress } = useUser();

  const completedCh1 = getChapterModules(1).filter((m) => progress[m.id]?.completed).length;
  const completedCh2 = getChapterModules(2).filter((m) => progress[m.id]?.completed).length;
  const passed = globalScore >= 80;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f5f6f8", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <IBMTopbar
        title="Parcours de formation"
        subtitle="HSE · Lutte Incendie & Évacuation"
        backTo="/"
        backLabel="Accueil"
      />

      <main className="flex-1 overflow-y-auto">
        {/* Stats band */}
        <div className="bg-white border-b px-6 py-4" style={{ borderColor: "#e4e7f0" }}>
          <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-6">
            {user && (
              <div>
                <div className="text-xs font-semibold" style={{ color: "#8d95aa" }}>Apprenant</div>
                <div className="text-sm font-bold" style={{ color: "#161616" }}>
                  {user.prenom} {user.nom}
                </div>
                <div className="font-mono text-xs" style={{ color: "#8d95aa", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {user.campus}
                </div>
              </div>
            )}

            <div className="h-8 w-px" style={{ background: "#e4e7f0" }} />

            {[
              { icon: <BarChart3 size={14} style={{ color: "#0043ce" }} />, label: "Score global", value: `${globalScore}%`, sub: globalScore >= 80 ? "Objectif atteint" : "Objectif : 80%" },
              { icon: <CheckCircle2 size={14} style={{ color: "#198038" }} />, label: "Modules complétés", value: `${totalCompleted}/14`, sub: "Progression" },
              { icon: <Flame size={14} style={{ color: "#b45309" }} />, label: "Chapitre 1", value: `${completedCh1}/7`, sub: "Lutte Incendie" },
              { icon: <DoorOpen size={14} style={{ color: "#0043ce" }} />, label: "Chapitre 2", value: `${completedCh2}/7`, sub: "Évacuation" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f5f6f8", border: "1px solid #e4e7f0" }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#8d95aa" }}>{stat.label}</div>
                  <div className="font-mono text-sm font-bold" style={{ color: "#161616", fontFamily: "'IBM Plex Mono', monospace" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: passed && stat.label === "Score global" ? "#198038" : "#8d95aa" }}>
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}

            {totalCompleted === 14 && (
              <>
                <div className="h-8 w-px ml-auto" style={{ background: "#e4e7f0" }} />
                <div
                  className="flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-lg"
                  style={{
                    color: "#fff",
                    background: "#198038",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/results")}
                >
                  <Award size={15} />
                  Voir les résultats
                </div>
              </>
            )}
          </div>
        </div>

        {/* Score bar */}
        {totalCompleted > 0 && (
          <div className="px-6 py-2 bg-white border-b" style={{ borderColor: "#e4e7f0" }}>
            <div className="max-w-5xl mx-auto flex items-center gap-3">
              <span className="text-xs font-semibold" style={{ color: "#8d95aa" }}>Progression globale</span>
              <div className="flex-1 rounded-full h-1.5" style={{ background: "#e4e7f0" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(totalCompleted / 14) * 100}%`,
                    background: globalScore >= 80 ? "#198038" : "#0043ce",
                  }}
                />
              </div>
              <span className="font-mono text-xs font-semibold" style={{ color: "#0043ce", fontFamily: "'IBM Plex Mono', monospace" }}>
                {totalCompleted}/14
              </span>
            </div>
          </div>
        )}

        {/* Chapters */}
        <div className="max-w-5xl mx-auto px-6 py-6">
          <ChapterSection
            chapter={1}
            heroImg={CH1_HERO}
            title="Agir dès les premiers signes de feu"
            subtitle="Lutte Incendie"
            description="7 modules interactifs : comprendre le feu, triangle du feu, propagation, classes de feu, extincteurs, décisions, simulation."
          />
          <ChapterSection
            chapter={2}
            heroImg={CH2_HERO}
            title="Garder son calme et sauver des vies"
            subtitle="Évacuation"
            description="7 modules dédiés à l'alarme, le calme, les portes, la vérification, la fumée, les escaliers et la procédure complète."
          />
        </div>
      </main>
    </div>
  );
}
