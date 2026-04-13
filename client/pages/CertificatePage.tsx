import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/lib/userContext";
import { useLanguage } from "@/lib/languageContext";
import { Award, CheckCircle2, Shield, Download, ChevronLeft, BookOpen } from "lucide-react";
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
  const certId = `IBM-FS-${new Date().getFullYear()}-${getSessionId().slice(-6).toUpperCase()}`;

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
    <div className="min-h-screen flex flex-col" style={{ background: "#eef2f9", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* Print styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          .cert-card { box-shadow: none !important; border: 2px solid #0D47A1 !important; }
          @page { size: A4 portrait; margin: 12mm; }
        }
      `}</style>

      {/* Topbar */}
      <header
        className="no-print flex-shrink-0 flex items-center gap-3 px-5"
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
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">

          {/* ── CERTIFICATE CARD ─────────────────────────────── */}
          <div
            className="cert-card rounded-2xl overflow-hidden"
            style={{
              background: "#fff",
              boxShadow: "0 12px 48px rgba(13,71,161,0.15)",
              border: "1px solid rgba(13,71,161,0.12)",
            }}
          >
            {/* Top decorative band */}
            <div style={{ height: "8px", background: "linear-gradient(90deg, #0D47A1 0%, #1565C0 40%, #0f62fe 70%, #0D47A1 100%)" }} />

            {/* Main certificate area */}
            <div className="px-8 py-8 flex flex-col items-center text-center" style={{ borderBottom: "1px solid #eef2f9" }}>

              {/* IBM Logo + title row */}
              <div className="flex items-center justify-between w-full mb-6">
                <IBMLogo variant="light" height={32} />
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "9px", color: "#adb3c8", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {isEN ? "Certificate N°" : "Certificat N°"}
                  </div>
                  <div style={{ fontSize: "10px", color: "#6f7897", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700 }}>
                    {certId}
                  </div>
                </div>
              </div>

              {/* Decorative double border frame */}
              <div style={{
                width: "100%",
                border: "1.5px solid rgba(13,71,161,0.15)",
                borderRadius: "12px",
                padding: "32px 24px",
                position: "relative",
                background: "linear-gradient(180deg, #fafbff 0%, #fff 100%)",
              }}>
                {/* Corner ornaments */}
                {[
                  { top: "8px", left: "8px" },
                  { top: "8px", right: "8px" },
                  { bottom: "8px", left: "8px" },
                  { bottom: "8px", right: "8px" },
                ].map((pos, i) => (
                  <div key={i} style={{
                    position: "absolute", ...pos,
                    width: "18px", height: "18px",
                    border: "2px solid rgba(13,71,161,0.25)",
                    borderRadius: "3px",
                  }} />
                ))}

                {/* Medal icon */}
                <div style={{
                  width: "64px", height: "64px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0D47A1, #1565C0)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                  boxShadow: "0 4px 20px rgba(13,71,161,0.35)",
                }}>
                  <Award size={30} color="#FFD700" />
                </div>

                {/* "Certifies that" label */}
                <div style={{
                  fontSize: "9px",
                  color: "#adb3c8",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "'IBM Plex Mono', monospace",
                  marginBottom: "10px",
                }}>
                  {isEN ? "This certifies that" : "IBM France certifie que"}
                </div>

                {/* Learner name — LARGE */}
                <div style={{
                  fontSize: "2.1rem",
                  fontWeight: 800,
                  color: "#0a2052",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "6px",
                }}>
                  {fullName}
                </div>

                {/* Campus */}
                <div style={{ fontSize: "0.85rem", color: "#6f7897", marginBottom: "20px" }}>
                  {campus}
                </div>

                {/* Thin divider */}
                <div style={{
                  width: "60px", height: "2px",
                  background: "linear-gradient(90deg, #0D47A1, #0f62fe)",
                  borderRadius: "2px",
                  margin: "0 auto 20px",
                }} />

                {/* "has successfully completed" */}
                <div style={{ fontSize: "0.82rem", color: "#6f7897", marginBottom: "8px" }}>
                  {isEN ? "has successfully completed the training" : "a suivi et validé avec succès la formation"}
                </div>

                {/* Training name */}
                <div style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#0D47A1",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                }}>
                  {isEN ? "IBM Fire Safety & Evacuation" : "Sécurité Incendie & Évacuation IBM"}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#adb3c8", marginBottom: "24px" }}>
                  {isEN ? "2 chapters · 14 modules · IBM France mandatory training" : "2 chapitres · 14 modules · Formation obligatoire IBM France"}
                </div>

                {/* Score badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: avgScore >= 80 ? "rgba(25,128,56,0.08)" : "rgba(180,83,9,0.08)",
                  border: `1.5px solid ${avgScore >= 80 ? "rgba(25,128,56,0.25)" : "rgba(180,83,9,0.25)"}`,
                  borderRadius: "99px",
                  padding: "6px 18px",
                  marginBottom: "24px",
                }}>
                  <CheckCircle2 size={14} style={{ color: avgScore >= 80 ? "#198038" : "#b45309" }} />
                  <span style={{
                    fontWeight: 700, fontSize: "0.88rem",
                    color: avgScore >= 80 ? "#0e6027" : "#92400e",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>
                    {isEN ? `Score: ${avgScore}%` : `Score moyen : ${avgScore}%`}
                  </span>
                </div>

                {/* Date row */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "100%",
                  borderTop: "1px dashed rgba(13,71,161,0.12)",
                  paddingTop: "20px",
                  marginTop: "4px",
                }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "9px", color: "#adb3c8", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>
                      {isEN ? "Date issued" : "Date d'obtention"}
                    </div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0a2052", marginTop: "3px" }}>
                      {today}
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: "44px", height: "44px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0D47A1, #0f62fe)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Shield size={20} color="#fff" />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "9px", color: "#adb3c8", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>
                      {isEN ? "Valid" : "Validité"}
                    </div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0a2052", marginTop: "3px" }}>
                      {isEN ? "2 to 3 years" : "2 à 3 ans"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module details section */}
            <div className="px-8 py-5">
              <div className="font-bold text-sm mb-3" style={{ color: "#0a2052" }}>
                {isEN ? "Modules validated" : "Modules validés"}
              </div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(MODULE_TITLES).map(([id, title]) => {
                  const p = progress[id];
                  return (
                    <div key={id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: "#f8f9fc" }}>
                      <div style={{
                        width: "16px", height: "16px",
                        borderRadius: "50%",
                        background: p?.completed ? "#198038" : "#e4e7f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {p?.completed
                          ? <CheckCircle2 size={10} color="#fff" />
                          : <span style={{ fontSize: "7px", color: "#adb3c8" }}>—</span>}
                      </div>
                      <span style={{ fontSize: "0.72rem", color: p?.completed ? "#0a2052" : "#adb3c8", flex: 1 }}>
                        {isEN ? title.en : title.fr}
                      </span>
                      {p?.completed && (
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: p.score >= 80 ? "#198038" : "#b45309", fontFamily: "'IBM Plex Mono', monospace" }}>
                          {p.score}%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom band */}
            <div style={{ height: "8px", background: "linear-gradient(90deg, #0D47A1 0%, #1565C0 40%, #0f62fe 70%, #0D47A1 100%)" }} />
          </div>

          {/* Actions */}
          <div className="no-print flex flex-col gap-2.5">
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-bold"
              style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.9375rem", boxShadow: "0 6px 24px rgba(13,71,161,0.25)" }}
            >
              <Download size={17} />
              {isEN ? "Download / Print certificate" : "Télécharger / Imprimer le certificat"}
            </button>
            <button
              onClick={() => window.open("/fiches", "_blank")}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-bold"
              style={{ background: "linear-gradient(135deg, #198038, #24a148)", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.9375rem", boxShadow: "0 6px 24px rgba(25,128,56,0.2)" }}
            >
              <BookOpen size={17} />
              {isEN ? "Download quick reference cards" : "Télécharger les fiches réflexes"}
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
        </div>
      </main>
    </div>
  );
}
