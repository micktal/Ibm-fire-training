import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/lib/userContext";
import { useLanguage } from "@/lib/languageContext";
import { Award, CheckCircle2, Shield, Clock, Star, Download, ChevronLeft } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";
import { updateProgression, getSessionId } from "@/lib/supabase";

const TOTAL_MODULES = 14;

const MODULE_TITLES: Record<string, { fr: string; en: string }> = {
  "ch1-m1": { fr: "Comprendre un départ de feu",        en: "Understanding a fire outbreak" },
  "ch1-m2": { fr: "Le triangle du feu",                  en: "The fire triangle" },
  "ch1-m3": { fr: "Propagation et confinement",          en: "Propagation and confinement" },
  "ch1-m4": { fr: "Classes de feu et extincteurs",       en: "Fire classes and extinguishers" },
  "ch1-m5": { fr: "Utiliser un extincteur",              en: "Using an extinguisher" },
  "ch1-m6": { fr: "Intervenir ou évacuer ?",             en: "Intervene or evacuate?" },
  "ch1-m7": { fr: "Simulation incendie",                 en: "Fire simulation" },
  "ch2-m1": { fr: "Déclencher l'alarme",                 en: "Trigger the alarm" },
  "ch2-m2": { fr: "Garder son calme et guider",          en: "Stay calm and lead" },
  "ch2-m3": { fr: "Fermer les portes",                   en: "Close the doors" },
  "ch2-m4": { fr: "Vérifier que personne ne reste",      en: "Check no one remains" },
  "ch2-m5": { fr: "Faire face à la fumée",               en: "Dealing with smoke" },
  "ch2-m6": { fr: "Escaliers ou espace sécurisé",        en: "Stairs or safe waiting area" },
  "ch2-m7": { fr: "Procédure complète d'évacuation",     en: "Full evacuation procedure" },
};

export default function CertificatePage() {
  const navigate = useNavigate();
  const { user, progress, globalScore, totalCompleted } = useUser();
  const { lang } = useLanguage();
  const isEN = lang === "en";

  const completedModules = Object.entries(progress).filter(([, p]) => p.completed);
  const avgScore = completedModules.length > 0
    ? Math.round(completedModules.reduce((s, [, p]) => s + p.score, 0) / completedModules.length)
    : 0;

  const isFullyCompleted = totalCompleted >= TOTAL_MODULES;
  const today = new Date().toLocaleDateString(isEN ? "en-GB" : "fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  // Marquer le certificat obtenu dans Supabase — uniquement si vraiment terminé
  useEffect(() => {
    if (!isFullyCompleted) return;
    updateProgression(getSessionId(), {
      certificate_obtained: true,
      completed_at: new Date().toISOString(),
      average_score: avgScore,
      completed_modules: completedModules.length,
    }).catch(console.error);
  }, [isFullyCompleted]); // eslint-disable-line react-hooks/exhaustive-deps

  const fullName = user ? `${user.prenom} ${user.nom}` : "Apprenant";
  const campus = user?.campus ?? "IBM France";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F0F4FA", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* Topbar */}
      <header
        className="flex-shrink-0 flex items-center gap-3 px-5"
        style={{ height: "52px", background: "#fff", borderBottom: "1px solid #e4e7f0", zIndex: 20 }}
      >
        <button
          onClick={() => navigate("/hub")}
          className="flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "#0D47A1", background: "none", border: "none", cursor: "pointer" }}
        >
          <ChevronLeft size={16} />
          {isEN ? "Dashboard" : "Tableau de bord"}
        </button>
        <div className="flex-1" />
        <IBMLogo variant="light" height={28} />
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">

          {/* ── Formation terminée banner (shown when all 14 done) ── */}
          {isFullyCompleted && (
            <div
              className="rounded-2xl px-5 py-4 flex items-center gap-4"
              style={{
                background: "linear-gradient(135deg, #0a3882 0%, #198038 100%)",
                boxShadow: "0 8px 32px rgba(25,128,56,0.3)",
              }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}>
                <Award size={24} color="#FFD700" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white" style={{ fontSize: "1rem" }}>
                  {isEN ? "Training complete!" : "Formation terminée !"}
                </div>
                <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {isEN
                    ? `Congratulations ${fullName} — all 14 modules validated with an average of ${avgScore}%.`
                    : `Félicitations ${fullName} — les 14 modules sont validés avec une moyenne de ${avgScore}%.`}
                </div>
              </div>
            </div>
          )}

          {/* ── Certificate card ─────────────────────────────── */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "#fff",
              border: "2px solid rgba(13,71,161,0.18)",
              boxShadow: "0 8px 40px rgba(13,71,161,0.12)",
            }}
          >
            {/* Header gradient */}
            <div
              className="relative flex flex-col items-center px-6 py-8 text-center"
              style={{ background: "linear-gradient(145deg, #0A3882 0%, #0D47A1 50%, #1565C0 100%)" }}
            >
              {/* Geometric shapes */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "#0E4DB8", clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0 100%)", opacity: 0.5 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "30%", height: "60%", background: "rgba(255,255,255,0.04)", clipPath: "polygon(0 0, 100% 20%, 80% 100%, 0 100%)" }} />

              <div className="relative z-10 flex flex-col items-center">
                {/* IBM Logo */}
                <IBMLogo variant="dark" height={36} />

                <div className="mt-4 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}>
                  <Award size={30} color="#FFD700" />
                </div>

                <div className="font-mono text-xs mt-3 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
                  {isEN ? "Training certificate" : "Certificat de formation"}
                </div>
                <h1 className="font-bold text-white mt-1" style={{ fontSize: "1.3rem", letterSpacing: "-0.02em" }}>
                  {isEN ? "IBM Fire Safety" : "Sécurité Incendie IBM"}
                </h1>
                <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {isEN ? "Full training — 2 chapters · 14 modules" : "Formation complète — 2 chapitres · 14 modules"}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6 flex flex-col gap-5">

              {/* Certified person */}
              <div className="text-center">
                <div className="text-xs uppercase font-mono" style={{ color: "#adb3c8", letterSpacing: "0.12em", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
                  {isEN ? "Awarded to" : "Décerné à"}
                </div>
                <div className="font-bold mt-1" style={{ fontSize: "1.5rem", color: "#0a2052", letterSpacing: "-0.02em" }}>
                  {fullName}
                </div>
                <div className="text-sm mt-0.5" style={{ color: "#6f7897" }}>{campus}</div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e4e7f0, transparent)" }} />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: isEN ? "Avg. score" : "Score moyen", value: `${avgScore}%`, icon: <Star size={15} />, color: avgScore >= 80 ? "#198038" : "#b45309", bg: avgScore >= 80 ? "rgba(25,128,56,0.07)" : "rgba(180,83,9,0.07)" },
                  { label: isEN ? "Modules passed" : "Modules validés", value: `${totalCompleted}/${TOTAL_MODULES}`, icon: <CheckCircle2 size={15} />, color: "#0D47A1", bg: "rgba(13,71,161,0.07)" },
                  { label: isEN ? "Issued on" : "Obtenu le", value: today, icon: <Clock size={15} />, color: "#6f7897", bg: "#f0f4fa" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl p-3 flex flex-col items-center text-center" style={{ background: stat.bg }}>
                    <div style={{ color: stat.color }}>{stat.icon}</div>
                    <div className="font-bold mt-1" style={{ fontSize: "1rem", color: stat.color }}>{stat.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#8d95aa", lineHeight: "1.3" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e4e7f0, transparent)" }} />

              {/* Competencies validated */}
              <div>
                <div className="font-bold text-sm mb-3" style={{ color: "#0a2052" }}>{isEN ? "Validated competencies" : "Compétences validées"}</div>
                <div className="grid grid-cols-1 gap-1.5">
                  {(isEN ? [
                    "Identify and report a fire outbreak",
                    "Use an extinguisher according to the fire class",
                    "Trigger the fire alarm (22 22)",
                    "Apply the EXIT-CLOSE-SIGNAL sequence",
                    "Lead a safe evacuation",
                    "Follow the full IBM procedure",
                  ] : [
                    "Identifier et signaler un départ de feu",
                    "Utiliser un extincteur selon la classe de feu",
                    "Déclencher l'alarme incendie (22 22)",
                    "Appliquer la séquence SORS-FERME-SIGNALE",
                    "Guider une évacuation en sécurité",
                    "Respecter la procédure IBM complète",
                  ]).map((comp, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-lg px-3 py-2" style={{ background: "#f8f9fc" }}>
                      <CheckCircle2 size={13} style={{ color: "#198038", flexShrink: 0 }} />
                      <span style={{ color: "#3d4259", fontSize: "0.82rem" }}>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e4e7f0, transparent)" }} />

              {/* Module scores */}
              <div>
                <div className="font-bold text-sm mb-3" style={{ color: "#0a2052" }}>{isEN ? "Module details" : "Détail par module"}</div>
                <div className="flex flex-col gap-1">
                  {Object.entries(MODULE_TITLES).map(([id, title]) => {
                    const p = progress[id];
                    return (
                      <div key={id} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#f8f9fc" }}>
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: p?.completed ? "#198038" : "#e4e7f0" }}>
                          {p?.completed
                            ? <CheckCircle2 size={11} color="#fff" />
                            : <span style={{ fontSize: "8px", color: "#adb3c8", fontWeight: 700 }}>—</span>}
                        </div>
                        <span className="flex-1 text-xs" style={{ color: p?.completed ? "#0a2052" : "#adb3c8" }}>{isEN ? title.en : title.fr}</span>
                        {p?.completed && (
                          <span className="font-mono font-bold text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", color: p.score >= 80 ? "#198038" : "#b45309" }}>
                            {p.score}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Validity note */}
              <div className="rounded-xl px-4 py-3" style={{ background: "rgba(13,71,161,0.05)", border: "1px solid rgba(13,71,161,0.14)" }}>
                <div className="flex items-start gap-2.5">
                  <Shield size={14} style={{ color: "#0D47A1", flexShrink: 0, marginTop: "1px" }} />
                  <div>
                    <div className="font-semibold text-xs" style={{ color: "#0D47A1" }}>{isEN ? "IBM France Certificate · Fire Safety Training" : "Certificat IBM France · Formation Sécurité Incendie"}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#6f7897", lineHeight: "1.45" }}>
                      {isEN ? "Valid 1 year — renewal recommended before " : "Valable 1 an — renouvellement recommandé avant le "}{new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(isEN ? "en-GB" : "fr-FR")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-bold"
              style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.9375rem", boxShadow: "0 6px 24px rgba(13,71,161,0.25)" }}
            >
              <Download size={17} />
              {isEN ? "Download / Print certificate" : "Télécharger / Imprimer le certificat"}
            </button>
            <button
              onClick={() => navigate("/hub")}
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold"
              style={{ background: "rgba(13,71,161,0.07)", color: "#0D47A1", border: "1.5px solid rgba(13,71,161,0.18)", cursor: "pointer", fontSize: "0.875rem" }}
            >
              <ChevronLeft size={15} />
              {isEN ? "Back to dashboard" : "Retour au tableau de bord"}
            </button>
          </div>

          <div style={{ height: "8px" }} />
        </div>
      </main>
    </div>
  );
}
