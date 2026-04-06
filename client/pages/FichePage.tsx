import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Download, ArrowLeft, CheckCircle2, XCircle, Target, Zap,
  BookOpen, Brain, Wrench, Heart, AlertTriangle, Info, MapPin,
} from "lucide-react";
import { getModuleById } from "@/lib/courseData";
import { getModuleByIdEn } from "@/lib/courseDataEn";
import { useLanguage } from "@/lib/languageContext";
import { MODULE_INTERACTIONS } from "@/lib/interactionData";
import type { HotspotExercise } from "@/components/interactions/HotspotImage";

const ICON_COLOR: Record<string, string> = {
  flame: "#ff6b1a", clock: "#0f62fe", alert: "#da1e28",
  shield: "#198038", zap: "#8a3ffc", eye: "#0043ce",
};

const HS_TYPE = {
  danger: { color: "#da1e28", bg: "rgba(218,30,40,0.06)", border: "rgba(218,30,40,0.3)" },
  info:   { color: "#0f62fe", bg: "rgba(15,98,254,0.05)",  border: "rgba(15,98,254,0.25)"  },
  safe:   { color: "#198038", bg: "rgba(25,128,56,0.06)",  border: "rgba(25,128,56,0.3)"   },
};

const HS_ICON = {
  danger: <AlertTriangle size={11} />,
  info:   <Info size={11} />,
  safe:   <CheckCircle2 size={11} />,
};

export default function FichePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEN = lang === "en";

  const mod = id ? (isEN ? getModuleByIdEn(id) : getModuleById(id)) : null;

  // Find hotspot exercise for this module if one exists
  const hotspot = id
    ? (MODULE_INTERACTIONS[id]?.find((ex) => ex.type === "hotspot") as HotspotExercise | undefined)
    : undefined;

  useEffect(() => {
    if (!mod) navigate("/hub");
  }, [mod]);

  if (!mod) return null;

  const lo = mod.learningObjectives;
  const comparison = mod.content.find((s) => s.type === "comparison");
  const hasDoDont = comparison && (comparison.doList?.length || comparison.dontList?.length);

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-page { margin: 0 !important; padding: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
          body { background: white !important; }
          @page { size: A4; margin: 10mm; }
        }
        @media screen {
          .print-page { max-width: 820px; margin: 0 auto; }
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
          onClick={() => window.print()}
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

      {/* Page background */}
      <div style={{ background: "#f0f4fa", minHeight: "100vh", paddingTop: "3.5rem", paddingBottom: "2rem", fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <div className="print-page" style={{ padding: "1.25rem" }}>

          {/* ── HEADER ── */}
          <div style={{
            background: "linear-gradient(135deg, #061f5c 0%, #0D47A1 55%, #1565C0 100%)",
            borderRadius: "12px 12px 0 0",
            overflow: "hidden",
            display: "flex",
          }}>
            {/* Module photo — left column */}
            <div style={{ width: "160px", flexShrink: 0, position: "relative", minHeight: "120px" }}>
              <img
                src={mod.image}
                alt={mod.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75) saturate(0.8)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(6,31,92,0.7))" }} />
            </div>

            {/* Info — center */}
            <div style={{ flex: 1, padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                {[
                  isEN ? `CHAPTER ${mod.chapter}` : `CHAPITRE ${mod.chapter}`,
                  `MODULE ${mod.number.toString().padStart(2, "0")}`,
                  mod.duration,
                ].map((chip) => (
                  <span key={chip} style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)", fontSize: "0.62rem", padding: "2px 9px", borderRadius: "100px", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}>
                    {chip}
                  </span>
                ))}
              </div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.35rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>{mod.title}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", marginTop: "0.3rem" }}>{mod.subtitle}</div>
            </div>

            {/* IBM — right */}
            <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", flexShrink: 0 }}>
              <div style={{ fontWeight: 900, fontSize: "1.6rem", color: "#fff", letterSpacing: "-0.04em", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1 }}>IBM</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: "2px" }}>Fire Safety</div>
            </div>
          </div>

          {/* Colour bar */}
          <div style={{ height: "4px", background: "linear-gradient(90deg, #ff6b1a 0%, #0f62fe 50%, #198038 100%)" }} />

          {/* ── MAIN CONTENT ── */}
          <div style={{ background: "#fff", borderRadius: "0 0 12px 12px", padding: "1.25rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Objective */}
            <div style={{ background: "linear-gradient(135deg, #061f5c, #0D47A1)", borderRadius: "10px", padding: "0.875rem 1.1rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Target size={15} color="#fff" />
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.2rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? "LEARNING OBJECTIVE" : "OBJECTIF DU MODULE"}
                </div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.5 }}>{mod.objective}</div>
              </div>
            </div>

            {/* 3 Competencies */}
            {lo && (
              <div>
                <SectionLabel>{isEN ? "COMPETENCIES" : "COMPÉTENCES"}</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                  {[
                    { label: isEN ? "KNOW" : "SAVOIR",     text: lo.savoir,     icon: <Brain size={12} color="#fff" />,  bg: "linear-gradient(145deg,#4c1d95,#6929c4)" },
                    { label: isEN ? "KNOW-HOW" : "SAVOIR-FAIRE", text: lo.savoirFaire, icon: <Wrench size={12} color="#fff" />, bg: "linear-gradient(145deg,#003a8c,#0f62fe)" },
                    { label: isEN ? "ATTITUDE" : "SAVOIR-ÊTRE",  text: lo.savoirEtre,  icon: <Heart size={12} color="#fff" />,  bg: "linear-gradient(145deg,#0e4f1f,#198038)" },
                  ].map((item) => (
                    <div key={item.label} style={{ background: item.bg, borderRadius: "8px", padding: "0.625rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <div style={{ width: "20px", height: "20px", borderRadius: "5px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {item.icon}
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}>{item.label}</span>
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.72rem", lineHeight: 1.45 }}>{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── HOTSPOT DIAGRAM ── */}
            {hotspot && (
              <div>
                <SectionLabel>{isEN ? "INTERACTIVE DIAGRAM — KEY POINTS" : "SCHÉMA INTERACTIF — POINTS CLÉS"}</SectionLabel>

                {/* Instruction */}
                <div style={{ fontSize: "0.72rem", color: "#5b21b6", fontWeight: 600, marginBottom: "0.5rem", fontStyle: "italic" }}>
                  {isEN ? (hotspot.instructionEn ?? hotspot.instruction) : hotspot.instruction}
                </div>

                {/* Diagram image */}
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1.5px solid #e4e7f0", marginBottom: "0.75rem" }}>
                  <img
                    src={hotspot.image}
                    alt={hotspot.instruction}
                    style={{ width: "100%", maxHeight: "200px", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Hotspot points grid */}
                <div style={{ display: "grid", gridTemplateColumns: hotspot.hotspots.length <= 3 ? `repeat(${hotspot.hotspots.length}, 1fr)` : "1fr 1fr", gap: "0.5rem" }}>
                  {hotspot.hotspots.map((hs, i) => {
                    const t = HS_TYPE[hs.type];
                    return (
                      <div key={hs.id} style={{ background: t.bg, border: `1.5px solid ${t.border}`, borderRadius: "8px", padding: "0.625rem 0.75rem" }}>
                        {/* Point header */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.3rem" }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                            {HS_ICON[hs.type]}
                          </div>
                          <span style={{ fontWeight: 700, fontSize: "0.72rem", color: t.color, lineHeight: 1.2 }}>
                            {isEN && hs.labelEn ? hs.labelEn : hs.label}
                          </span>
                        </div>
                        {/* Description */}
                        <p style={{ color: "#2d3148", fontSize: "0.68rem", lineHeight: 1.5, margin: 0, marginBottom: hs.detail ? "0.3rem" : 0 }}>
                          {isEN && hs.descriptionEn ? hs.descriptionEn : hs.description}
                        </p>
                        {/* Detail / tip */}
                        {hs.detail && (
                          <div style={{ borderLeft: `2.5px solid ${t.color}`, paddingLeft: "0.4rem", marginTop: "0.25rem" }}>
                            <span style={{ fontSize: "0.63rem", color: t.color, fontWeight: 600, fontStyle: "italic" }}>
                              {isEN && hs.detailEn ? hs.detailEn : hs.detail}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key points */}
            {mod.keyPoints && mod.keyPoints.length > 0 && (
              <div>
                <SectionLabel>{isEN ? "KEY POINTS TO REMEMBER" : "POINTS CLÉS À RETENIR"}</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {mod.keyPoints.map((point, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", padding: "0.5rem 0.75rem", background: "#f8f9fc", borderRadius: "7px", border: "1.5px solid #e4e7f0" }}>
                      <span style={{ minWidth: "20px", height: "20px", background: "#0D47A1", color: "#fff", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ color: "#061f5c", fontSize: "0.78rem", lineHeight: 1.5, fontWeight: 500 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun facts */}
            {mod.funFacts && mod.funFacts.length > 0 && (
              <div>
                <SectionLabel>{isEN ? "KEY FIGURES" : "CHIFFRES CLÉS"}</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(mod.funFacts.length, 3)}, 1fr)`, gap: "0.5rem" }}>
                  {mod.funFacts.slice(0, 3).map((fact, i) => (
                    <div key={i} style={{ background: "#f8f9fc", borderRadius: "8px", padding: "0.625rem 0.75rem", border: `2px solid ${ICON_COLOR[fact.icon]}33` }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 800, fontSize: "1.2rem", color: ICON_COLOR[fact.icon], lineHeight: 1, marginBottom: "0.2rem" }}>{fact.stat}</div>
                      <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "#2d3148", marginBottom: "0.15rem" }}>{fact.label}</div>
                      <div style={{ fontSize: "0.63rem", color: "#6f7897", lineHeight: 1.45, fontStyle: "italic" }}>{fact.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Do / Don't */}
            {hasDoDont && (
              <div>
                <SectionLabel>{isEN ? "DO / DON'T" : "À FAIRE / À ÉVITER"}</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <div style={{ background: "rgba(25,128,56,0.05)", border: "1.5px solid rgba(25,128,56,0.25)", borderRadius: "8px", padding: "0.75rem" }}>
                    <div style={{ color: "#198038", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <CheckCircle2 size={12} /> {isEN ? "TO DO" : "À FAIRE"}
                    </div>
                    {comparison?.doList?.map((item, i) => (
                      <div key={i} style={{ fontSize: "0.72rem", color: "#0e4f1f", lineHeight: 1.5, paddingLeft: "0.4rem", borderLeft: "2.5px solid #198038", marginBottom: "0.3rem" }}>{item}</div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(218,30,40,0.05)", border: "1.5px solid rgba(218,30,40,0.25)", borderRadius: "8px", padding: "0.75rem" }}>
                    <div style={{ color: "#da1e28", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <XCircle size={12} /> {isEN ? "TO AVOID" : "À ÉVITER"}
                    </div>
                    {comparison?.dontList?.map((item, i) => (
                      <div key={i} style={{ fontSize: "0.72rem", color: "#a2191f", lineHeight: 1.5, paddingLeft: "0.4rem", borderLeft: "2.5px solid #da1e28", marginBottom: "0.3rem" }}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quiz reminder */}
            <div style={{ background: "#f8f9fc", borderRadius: "8px", padding: "0.75rem 0.875rem", border: "1.5px solid #e4e7f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                <BookOpen size={13} color="#0D47A1" />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0D47A1", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {isEN ? `QUIZ — ${mod.quiz.length} QUESTIONS — PASS: 80%` : `QUIZ — ${mod.quiz.length} QUESTIONS — SEUIL: 80%`}
                </span>
              </div>
              <div style={{ color: "#6f7897", fontSize: "0.73rem", lineHeight: 1.5 }}>
                {isEN
                  ? "Complete the module quiz in the e-learning platform. A score of 80% or higher is required to validate this module."
                  : "Complétez le quiz du module dans la plateforme e-learning. Un score de 80% ou plus est requis pour valider ce module."}
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1.5px solid #e4e7f0", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.6rem", color: "#adb3c8", fontFamily: "'IBM Plex Mono', monospace" }}>
                IBM Fire Safety Training · {isEN ? "Confidential" : "Confidentiel"} · {new Date().toLocaleDateString(isEN ? "en-GB" : "fr-FR")}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Zap size={10} color="#0D47A1" />
                <span style={{ fontSize: "0.6rem", color: "#0D47A1", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>
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

// ── Small helper ────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#8d95aa", marginBottom: "0.5rem", fontFamily: "'IBM Plex Mono', monospace" }}>
      {children}
    </div>
  );
}
