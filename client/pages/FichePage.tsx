import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Download, ArrowLeft, CheckCircle2, XCircle, Target, Zap, BookOpen, Brain, Wrench, Heart } from "lucide-react";
import { getModuleById } from "@/lib/courseData";
import { getModuleByIdEn } from "@/lib/courseDataEn";
import { useLanguage } from "@/lib/languageContext";

const ICON_COLOR: Record<string, string> = {
  flame: "#ff6b1a", clock: "#0f62fe", alert: "#da1e28",
  shield: "#198038", zap: "#8a3ffc", eye: "#0043ce",
};

export default function FichePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEN = lang === "en";

  const mod = id ? (isEN ? getModuleByIdEn(id) : getModuleById(id)) : null;

  useEffect(() => {
    if (!mod) navigate("/hub");
  }, [mod]);

  if (!mod) return null;

  const lo = mod.learningObjectives;
  const comparison = mod.content.find((s) => s.type === "comparison");
  const hasDoDont = comparison && (comparison.doList?.length || comparison.dontList?.length);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print styles injected */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-page {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          body { background: white !important; }
          @page { size: A4; margin: 12mm; }
        }
        @media screen {
          .print-page {
            max-width: 800px;
            margin: 0 auto;
          }
        }
      `}</style>

      {/* Screen toolbar */}
      <div className="no-print" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#0D47A1", borderBottom: "2px solid #1565C0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.8)", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          <ArrowLeft size={16} /> {isEN ? "Back" : "Retour"}
        </button>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", fontFamily: "'IBM Plex Sans', sans-serif" }}>
          {isEN ? "Quick Reference Sheet" : "Fiche Réflexe"} — {mod.title}
        </span>
        <button
          onClick={handlePrint}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "#fff", color: "#0D47A1", border: "none",
            padding: "0.5rem 1.25rem", borderRadius: "6px",
            fontWeight: 700, fontSize: "0.875rem", cursor: "pointer",
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}
        >
          <Download size={15} /> {isEN ? "Download PDF" : "Télécharger PDF"}
        </button>
      </div>

      {/* Fiche content */}
      <div style={{ background: "#f0f4fa", minHeight: "100vh", paddingTop: "3.5rem", paddingBottom: "2rem", fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <div className="print-page" style={{ padding: "1.5rem" }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #061f5c 0%, #0D47A1 60%, #1a73e8 100%)",
            borderRadius: "12px 12px 0 0",
            padding: "1.5rem 2rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "0.7rem", padding: "2px 10px", borderRadius: "100px", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>
                  {isEN ? "CHAPTER" : "CHAPITRE"} {mod.chapter}
                </span>
                <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", padding: "2px 10px", borderRadius: "100px", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>
                  MODULE {mod.number.toString().padStart(2, "0")}
                </span>
                <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", padding: "2px 10px", borderRadius: "100px", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {mod.duration}
                </span>
              </div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>{mod.title}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", marginTop: "0.25rem" }}>{mod.subtitle}</div>
            </div>
            {/* IBM Logo placeholder */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontWeight: 900, fontSize: "1.8rem", color: "#fff", letterSpacing: "-0.04em", fontFamily: "'IBM Plex Sans', sans-serif" }}>IBM</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Fire Safety Training</div>
            </div>
          </div>

          {/* Blue bar */}
          <div style={{ height: "4px", background: "linear-gradient(90deg, #ff6b1a, #0f62fe, #198038)" }} />

          {/* Main content */}
          <div style={{ background: "#fff", borderRadius: "0 0 12px 12px", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Objective */}
            <div style={{ background: "linear-gradient(135deg, #061f5c, #0D47A1)", borderRadius: "10px", padding: "1rem 1.25rem", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Target size={16} color="#fff" />
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.25rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? "LEARNING OBJECTIVE" : "OBJECTIF DU MODULE"}
                </div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.5 }}>{mod.objective}</div>
              </div>
            </div>

            {/* 3 Learning objectives — horizontal */}
            {lo && (
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8d95aa", marginBottom: "0.625rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? "COMPETENCIES" : "COMPÉTENCES"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.625rem" }}>
                  {[
                    { label: isEN ? "KNOW" : "SAVOIR", text: lo.savoir, icon: <Brain size={13} color="#fff" />, bg: "linear-gradient(145deg,#4c1d95,#6929c4)" },
                    { label: isEN ? "KNOW-HOW" : "SAVOIR-FAIRE", text: lo.savoirFaire, icon: <Wrench size={13} color="#fff" />, bg: "linear-gradient(145deg,#003a8c,#0f62fe)" },
                    { label: isEN ? "ATTITUDE" : "SAVOIR-ÊTRE", text: lo.savoirEtre, icon: <Heart size={13} color="#fff" />, bg: "linear-gradient(145deg,#0e4f1f,#198038)" },
                  ].map((item) => (
                    <div key={item.label} style={{ background: item.bg, borderRadius: "8px", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {item.icon}
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}>{item.label}</span>
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.75rem", lineHeight: 1.45 }}>{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key points */}
            {mod.keyPoints && mod.keyPoints.length > 0 && (
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8d95aa", marginBottom: "0.625rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? "KEY POINTS TO REMEMBER" : "POINTS CLÉS À RETENIR"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {mod.keyPoints.map((point, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", padding: "0.625rem 0.875rem", background: "#f8f9fc", borderRadius: "8px", border: "1.5px solid #e4e7f0" }}>
                      <span style={{ minWidth: "22px", height: "22px", background: "#0D47A1", color: "#fff", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ color: "#061f5c", fontSize: "0.82rem", lineHeight: 1.5, fontWeight: 500 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun facts — horizontal grid */}
            {mod.funFacts && mod.funFacts.length > 0 && (
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8d95aa", marginBottom: "0.625rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? "KEY FIGURES" : "CHIFFRES CLÉS"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(mod.funFacts.length, 3)}, 1fr)`, gap: "0.625rem" }}>
                  {mod.funFacts.slice(0, 3).map((fact, i) => (
                    <div key={i} style={{ background: "#f8f9fc", borderRadius: "8px", padding: "0.75rem", border: `2px solid ${ICON_COLOR[fact.icon]}33` }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 800, fontSize: "1.3rem", color: ICON_COLOR[fact.icon], lineHeight: 1, marginBottom: "0.25rem" }}>{fact.stat}</div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#2d3148", marginBottom: "0.25rem" }}>{fact.label}</div>
                      <div style={{ fontSize: "0.67rem", color: "#6f7897", lineHeight: 1.45, fontStyle: "italic" }}>{fact.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Do / Don't */}
            {hasDoDont && (
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#8d95aa", marginBottom: "0.625rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? "DO / DON'T" : "À FAIRE / À ÉVITER"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                  <div style={{ background: "rgba(25,128,56,0.05)", border: "1.5px solid rgba(25,128,56,0.25)", borderRadius: "8px", padding: "0.875rem" }}>
                    <div style={{ color: "#198038", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <CheckCircle2 size={13} /> {isEN ? "TO DO" : "À FAIRE"}
                    </div>
                    {comparison?.doList?.map((item, i) => (
                      <div key={i} style={{ fontSize: "0.78rem", color: "#0e4f1f", lineHeight: 1.5, paddingLeft: "0.5rem", borderLeft: "3px solid #198038", marginBottom: "0.375rem" }}>{item}</div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(218,30,40,0.05)", border: "1.5px solid rgba(218,30,40,0.25)", borderRadius: "8px", padding: "0.875rem" }}>
                    <div style={{ color: "#da1e28", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <XCircle size={13} /> {isEN ? "TO AVOID" : "À ÉVITER"}
                    </div>
                    {comparison?.dontList?.map((item, i) => (
                      <div key={i} style={{ fontSize: "0.78rem", color: "#a2191f", lineHeight: 1.5, paddingLeft: "0.5rem", borderLeft: "3px solid #da1e28", marginBottom: "0.375rem" }}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quiz preview */}
            <div style={{ background: "#f8f9fc", borderRadius: "8px", padding: "0.875rem 1rem", border: "1.5px solid #e4e7f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <BookOpen size={14} color="#0D47A1" />
                <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0D47A1", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? `QUIZ — ${mod.quiz.length} QUESTIONS — PASS: 80%` : `QUIZ — ${mod.quiz.length} QUESTIONS — SEUIL: 80%`}
                </span>
              </div>
              <div style={{ color: "#6f7897", fontSize: "0.78rem", lineHeight: 1.5 }}>
                {isEN
                  ? "Complete the module quiz in the e-learning platform. A score of 80% or higher is required to validate this module."
                  : "Complétez le quiz du module dans la plateforme e-learning. Un score de 80% ou plus est requis pour valider ce module."}
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1.5px solid #e4e7f0", paddingTop: "0.875rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.65rem", color: "#adb3c8", fontFamily: "'IBM Plex Mono', monospace" }}>
                IBM Fire Safety Training · {isEN ? "Confidential" : "Confidentiel"} · {new Date().toLocaleDateString(isEN ? "en-GB" : "fr-FR")}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <Zap size={11} color="#0D47A1" />
                <span style={{ fontSize: "0.65rem", color: "#0D47A1", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? "QUICK REFERENCE SHEET" : "FICHE RÉFLEXE"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
