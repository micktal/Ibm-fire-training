import { useNavigate } from "react-router-dom";
import {
  Download, ArrowLeft, CheckCircle2, XCircle, Target, Zap,
  BookOpen, Brain, Wrench, Heart, AlertTriangle, Info,
} from "lucide-react";
import { MODULES } from "@/lib/courseData";
import { MODULES_EN } from "@/lib/courseDataEn";
import type { CourseModule } from "@/lib/courseData";
import { useLanguage } from "@/lib/languageContext";
import { MODULE_INTERACTIONS } from "@/lib/interactionData";
import type { HotspotExercise } from "@/components/interactions/HotspotImage";

/* ── Helpers ─────────────────────────────────────────────────── */

const ICON_COLOR: Record<string, string> = {
  flame: "#ff6b1a", clock: "#0f62fe", alert: "#da1e28",
  shield: "#198038", zap: "#8a3ffc", eye: "#0043ce",
};

const HS_TYPE = {
  danger: { color: "#da1e28", bg: "rgba(218,30,40,0.06)", border: "rgba(218,30,40,0.3)" },
  info:   { color: "#0f62fe", bg: "rgba(15,98,254,0.05)",  border: "rgba(15,98,254,0.25)"  },
  safe:   { color: "#198038", bg: "rgba(25,128,56,0.06)",  border: "rgba(25,128,56,0.3)"   },
};

const HS_ICON: Record<string, React.ReactNode> = {
  danger: <AlertTriangle size={10} />,
  info:   <Info size={10} />,
  safe:   <CheckCircle2 size={10} />,
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.14em", color: "#8d95aa", marginBottom: "0.35rem", fontFamily: "'IBM Plex Mono', monospace" }}>
      {children}
    </div>
  );
}

/* ── Single module fiche ─────────────────────────────────────── */
function ModuleFiche({ mod, isEN, isLast }: { mod: CourseModule; isEN: boolean; isLast: boolean }) {
  const lo = mod.learningObjectives;
  const comparison = mod.content.find((s) => s.type === "comparison");
  const hasDoDont = comparison && (comparison.doList?.length || comparison.dontList?.length);
  const hotspot = MODULE_INTERACTIONS[mod.id]?.find((ex) => ex.type === "hotspot") as HotspotExercise | undefined;

  return (
    <div
      className="module-fiche"
      style={{
        pageBreakAfter: isLast ? "auto" : "always",
        breakAfter: isLast ? "auto" : "page",
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#fff",
        padding: "0",
        marginBottom: isLast ? 0 : "2rem",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{
        background: "linear-gradient(135deg, #061f5c 0%, #0D47A1 55%, #1565C0 100%)",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
        display: "flex",
      }}>
        {/* Photo */}
        <div style={{ width: "140px", flexShrink: 0, position: "relative", minHeight: "100px" }}>
          <img src={mod.image} alt={mod.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.72) saturate(0.8)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 55%, rgba(6,31,92,0.65))" }} />
        </div>
        {/* Info */}
        <div style={{ flex: 1, padding: "0.875rem 1.25rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.4rem", flexWrap: "wrap" as const }}>
            {[
              isEN ? `CH.${mod.chapter}` : `CH.${mod.chapter}`,
              `M${mod.number.toString().padStart(2, "0")}`,
              mod.duration,
            ].map((chip) => (
              <span key={chip} style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)", fontSize: "0.58rem", padding: "1px 8px", borderRadius: "100px", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}>
                {chip}
              </span>
            ))}
          </div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.15rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>{mod.title}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: "0.2rem" }}>{mod.subtitle}</div>
        </div>
        {/* IBM */}
        <div style={{ padding: "0.875rem 1.1rem", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", flexShrink: 0 }}>
          <div style={{ fontWeight: 900, fontSize: "1.4rem", color: "#fff", letterSpacing: "-0.04em", fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1 }}>IBM</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginTop: "2px" }}>Fire Safety</div>
        </div>
      </div>

      {/* Colour bar */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #ff6b1a 0%, #0f62fe 50%, #198038 100%)" }} />

      {/* ── BODY ── */}
      <div style={{ background: "#fff", borderRadius: "0 0 10px 10px", border: "1px solid #e4e7f0", borderTop: "none", padding: "0.875rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>

        {/* Objective + Competencies side by side */}
        <div style={{ display: "grid", gridTemplateColumns: lo ? "1fr 1.8fr" : "1fr", gap: "0.5rem" }}>
          {/* Objective */}
          <div style={{ background: "linear-gradient(135deg, #061f5c, #0D47A1)", borderRadius: "8px", padding: "0.625rem 0.875rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <Target size={13} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: "0.15rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                {isEN ? "OBJECTIVE" : "OBJECTIF"}
              </div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.72rem", lineHeight: 1.45 }}>{mod.objective}</div>
            </div>
          </div>

          {/* 3 Competencies */}
          {lo && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.35rem" }}>
              {[
                { label: isEN ? "KNOW" : "SAVOIR",         text: lo.savoir,     icon: <Brain size={10} color="#fff" />,  bg: "linear-gradient(145deg,#4c1d95,#6929c4)" },
                { label: isEN ? "KNOW-HOW" : "SAVOIR-FAIRE", text: lo.savoirFaire, icon: <Wrench size={10} color="#fff" />, bg: "linear-gradient(145deg,#003a8c,#0f62fe)" },
                { label: isEN ? "ATTITUDE" : "SAVOIR-ÊTRE",  text: lo.savoirEtre,  icon: <Heart size={10} color="#fff" />,  bg: "linear-gradient(145deg,#0e4f1f,#198038)" },
              ].map((item) => (
                <div key={item.label} style={{ background: item.bg, borderRadius: "6px", padding: "0.45rem 0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.2rem" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.52rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}>{item.label}</span>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.63rem", lineHeight: 1.4 }}>{item.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hotspot points */}
        {hotspot && (
          <div>
            <Label>{isEN ? "DIAGRAM — KEY POINTS" : "SCHÉMA — POINTS CLÉS"}</Label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {/* Image */}
              <div style={{ width: "160px", flexShrink: 0, borderRadius: "6px", overflow: "hidden", border: "1px solid #e4e7f0" }}>
                <img src={hotspot.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {/* Points */}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: hotspot.hotspots.length > 3 ? "1fr 1fr" : "1fr", gap: "0.3rem" }}>
                {hotspot.hotspots.map((hs) => {
                  const t = HS_TYPE[hs.type];
                  return (
                    <div key={hs.id} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: "5px", padding: "0.35rem 0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.15rem" }}>
                        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}>
                          {HS_ICON[hs.type]}
                        </div>
                        <span style={{ fontWeight: 700, fontSize: "0.63rem", color: t.color, lineHeight: 1.2 }}>
                          {isEN && hs.labelEn ? hs.labelEn : hs.label}
                        </span>
                      </div>
                      <p style={{ color: "#2d3148", fontSize: "0.6rem", lineHeight: 1.4, margin: 0 }}>
                        {isEN && hs.descriptionEn ? hs.descriptionEn : hs.description}
                      </p>
                      {hs.detail && (
                        <div style={{ borderLeft: `2px solid ${t.color}`, paddingLeft: "0.3rem", marginTop: "0.2rem" }}>
                          <span style={{ fontSize: "0.56rem", color: t.color, fontWeight: 600, fontStyle: "italic" }}>
                            {isEN && hs.detailEn ? hs.detailEn : hs.detail}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Key points + Fun facts side by side */}
        <div style={{ display: "grid", gridTemplateColumns: mod.funFacts?.length ? "1.4fr 1fr" : "1fr", gap: "0.5rem" }}>
          {/* Key points */}
          {mod.keyPoints && mod.keyPoints.length > 0 && (
            <div>
              <Label>{isEN ? "KEY POINTS" : "POINTS CLÉS"}</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {mod.keyPoints.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start", padding: "0.35rem 0.5rem", background: "#f8f9fc", borderRadius: "5px", border: "1px solid #e4e7f0" }}>
                    <span style={{ minWidth: "16px", height: "16px", background: "#0D47A1", color: "#fff", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.52rem", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ color: "#061f5c", fontSize: "0.65rem", lineHeight: 1.45, fontWeight: 500 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fun facts */}
          {mod.funFacts && mod.funFacts.length > 0 && (
            <div>
              <Label>{isEN ? "FIGURES" : "CHIFFRES CLÉS"}</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {mod.funFacts.slice(0, 3).map((fact, i) => (
                  <div key={i} style={{ background: "#f8f9fc", borderRadius: "5px", padding: "0.35rem 0.5rem", border: `1.5px solid ${ICON_COLOR[fact.icon]}22`, display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 800, fontSize: "0.85rem", color: ICON_COLOR[fact.icon], lineHeight: 1, flexShrink: 0, minWidth: "42px" }}>{fact.stat}</div>
                    <div>
                      <div style={{ fontSize: "0.6rem", fontWeight: 600, color: "#2d3148" }}>{fact.label}</div>
                      <div style={{ fontSize: "0.56rem", color: "#6f7897", fontStyle: "italic" }}>{fact.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Do / Don't */}
        {hasDoDont && (
          <div>
            <Label>{isEN ? "DO / DON'T" : "À FAIRE / À ÉVITER"}</Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
              <div style={{ background: "rgba(25,128,56,0.04)", border: "1px solid rgba(25,128,56,0.22)", borderRadius: "6px", padding: "0.5rem 0.625rem" }}>
                <div style={{ color: "#198038", fontWeight: 700, fontSize: "0.58rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <CheckCircle2 size={10} /> {isEN ? "TO DO" : "À FAIRE"}
                </div>
                {comparison?.doList?.map((item, i) => (
                  <div key={i} style={{ fontSize: "0.63rem", color: "#0e4f1f", lineHeight: 1.45, paddingLeft: "0.35rem", borderLeft: "2px solid #198038", marginBottom: "0.25rem" }}>{item}</div>
                ))}
              </div>
              <div style={{ background: "rgba(218,30,40,0.04)", border: "1px solid rgba(218,30,40,0.22)", borderRadius: "6px", padding: "0.5rem 0.625rem" }}>
                <div style={{ color: "#da1e28", fontWeight: 700, fontSize: "0.58rem", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <XCircle size={10} /> {isEN ? "TO AVOID" : "À ÉVITER"}
                </div>
                {comparison?.dontList?.map((item, i) => (
                  <div key={i} style={{ fontSize: "0.63rem", color: "#a2191f", lineHeight: 1.45, paddingLeft: "0.35rem", borderLeft: "2px solid #da1e28", marginBottom: "0.25rem" }}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e8eaf2", paddingTop: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <BookOpen size={11} color="#0D47A1" />
            <span style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#0D47A1", fontFamily: "'IBM Plex Mono', monospace" }}>
              {isEN ? `QUIZ · ${mod.quiz.length} Q · PASS 80%` : `QUIZ · ${mod.quiz.length} Q · SEUIL 80%`}
            </span>
          </div>
          <span style={{ fontSize: "0.55rem", color: "#adb3c8", fontFamily: "'IBM Plex Mono', monospace" }}>
            IBM Fire Safety · {isEN ? "Confidential" : "Confidentiel"} · {new Date().toLocaleDateString(isEN ? "en-GB" : "fr-FR")}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Zap size={9} color="#0D47A1" />
            <span style={{ fontSize: "0.55rem", color: "#0D47A1", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>FICHE RÉFLEXE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function FicheAllPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const modules = isEN ? MODULES_EN : MODULES;

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          @page { size: A4; margin: 8mm; }
          .module-fiche { border-radius: 0 !important; }
        }
        @media screen {
          .all-fiches { max-width: 860px; margin: 0 auto; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#0D47A1", borderBottom: "2px solid #1565C0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}>
        <button
          onClick={() => navigate("/hub")}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.8)", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", fontFamily: "inherit" }}
        >
          <ArrowLeft size={16} /> {isEN ? "Dashboard" : "Tableau de bord"}
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>
            {isEN ? "Complete Quick Reference — All 14 Modules" : "Fiches Réflexes Complètes — 14 Modules"}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", fontFamily: "'IBM Plex Mono', monospace" }}>
            {isEN ? "1 sheet per module · A4 print ready" : "1 fiche par module · Format A4 impression"}
          </div>
        </div>
        <button
          onClick={() => window.print()}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "#fff", color: "#0D47A1", border: "none",
            padding: "0.5rem 1.25rem", borderRadius: "6px",
            fontWeight: 700, fontSize: "0.875rem", cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Download size={15} /> {isEN ? "Print / Save PDF" : "Imprimer / Enregistrer PDF"}
        </button>
      </div>

      {/* Content */}
      <div style={{ background: "#e8edf5", minHeight: "100vh", paddingTop: "4rem", paddingBottom: "3rem" }}>
        <div className="all-fiches" style={{ padding: "1.25rem" }}>

          {/* Cover page hint */}
          <div className="no-print" style={{
            background: "linear-gradient(135deg, #0D47A1, #1565C0)",
            borderRadius: "10px", padding: "1rem 1.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "1.5rem", color: "#fff",
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                {isEN ? `${modules.length} modules — 1 sheet each` : `${modules.length} modules — 1 fiche chacun`}
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>
                {isEN
                  ? "Click «Print / Save PDF» → select «Save as PDF» in your browser print dialog"
                  : "Cliquez «Imprimer / Enregistrer PDF» → choisissez «Enregistrer en PDF» dans la fenêtre d'impression"}
              </div>
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "2rem", fontWeight: 900, opacity: 0.3 }}>14</div>
          </div>

          {/* All module fiches */}
          {modules.map((mod, i) => (
            <ModuleFiche
              key={mod.id}
              mod={mod}
              isEN={isEN}
              isLast={i === modules.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
