import { useNavigate } from "react-router-dom";
import {
  CheckCircle2, ChevronRight, Flame, Shield, AlertTriangle,
  Zap, BookOpen, ArrowRight, Star, Eye, Bell, DoorClosed,
  Users, Wind, ArrowUp, ClipboardCheck,
} from "lucide-react";
import IBMLogo from "@/components/IBMLogo";
import GeometricBg from "@/components/layout/GeometricBg";
import { useLanguage } from "@/lib/languageContext";

// ── Chapter 1 recap data ─────────────────────────────────────────
const CH1_MODULES = [
  {
    num: "M01",
    title: { fr: "Comprendre un départ de feu", en: "Understanding a fire outbreak" },
    takeaway: { fr: "Tout signal de fumée ou chaleur = traiter comme feu réel.", en: "Any smoke or heat signal = treat as a real fire." },
  },
  {
    num: "M02",
    title: { fr: "Le triangle du feu", en: "The fire triangle" },
    takeaway: { fr: "3 éléments : combustible · comburant · chaleur. Supprimer l'un = éteindre le feu.", en: "3 elements: fuel · oxidizer · heat. Remove one = extinguish the fire." },
  },
  {
    num: "M03",
    title: { fr: "Propagation et confinement", en: "Propagation and confinement" },
    takeaway: { fr: "Fermer toutes les portes. Ne jamais courir. Le feu se propage 5× plus vite avec les portes ouvertes.", en: "Close all doors. Never run. Fire spreads 5× faster with open doors." },
  },
  {
    num: "M04",
    title: { fr: "Classes de feu et extincteurs", en: "Fire classes and extinguishers" },
    takeaway: { fr: "Jamais d'eau sur un feu électrique. CO2 pour serveurs et câbles. Poudre ABC pour le reste.", en: "Never water on an electrical fire. CO2 for servers and cables. ABC powder for the rest." },
  },
  {
    num: "M05",
    title: { fr: "Utiliser un extincteur", en: "Using an extinguisher" },
    takeaway: { fr: "Séquence PASS : Pull · Aim · Squeeze · Sweep. Distance optimale : 2-3 mètres du foyer.", en: "PASS sequence: Pull · Aim · Squeeze · Sweep. Optimal distance: 2-3 meters from the fire." },
  },
  {
    num: "M06",
    title: { fr: "Intervenir ou évacuer ?", en: "Intervene or evacuate?" },
    takeaway: { fr: "Règle des 10 secondes : observer, évaluer, décider. Si doute → évacuer sans hésiter.", en: "10-second rule: observe, assess, decide. If in doubt → evacuate without hesitation." },
  },
  {
    num: "M07",
    title: { fr: "Simulation incendie", en: "Fire simulation" },
    takeaway: { fr: "Réflexes validés : détecter → alarme 22 22 → intervenir ou évacuer en séquence.", en: "Validated reflexes: detect → alarm 22 22 → intervene or evacuate in sequence." },
  },
];

// ── IBM best practices ────────────────────────────────────────────
const BEST_PRACTICES = [
  {
    icon: <Zap size={16} />,
    color: "#da1e28",
    bg: "rgba(218,30,40,0.08)",
    border: "rgba(218,30,40,0.2)",
    rule: { fr: "Jamais d'eau sur un feu électrique", en: "Never water on an electrical fire" },
    detail: { fr: "CO2 uniquement pour les serveurs, câbles et data centers IBM", en: "CO2 only for servers, cables and IBM data centers" },
  },
  {
    icon: <DoorClosed size={16} />,
    color: "#b45309",
    bg: "rgba(180,83,9,0.08)",
    border: "rgba(180,83,9,0.2)",
    rule: { fr: "Porte chaude = ne pas ouvrir", en: "Hot door = do not open" },
    detail: { fr: "Rebrousser chemin, déclencher l'alarme, évacuer", en: "Turn back, trigger the alarm, evacuate" },
  },
  {
    icon: <Bell size={16} />,
    color: "#0D47A1",
    bg: "rgba(13,71,161,0.08)",
    border: "rgba(13,71,161,0.2)",
    rule: { fr: "22 22 AVANT le 18", en: "22 22 BEFORE calling emergency services" },
    detail: { fr: "La sécurité IBM connaît les plans. Prévenir l'interne en premier.", en: "IBM security knows the layouts. Alert internally first." },
  },
  {
    icon: <Shield size={16} />,
    color: "#198038",
    bg: "rgba(25,128,56,0.08)",
    border: "rgba(25,128,56,0.2)",
    rule: { fr: "Sortie dans le dos avant d'intervenir", en: "Exit behind you before intervening" },
    detail: { fr: "Toujours avoir une voie d'évacuation dégagée avant d'utiliser un extincteur", en: "Always have a clear evacuation route before using an extinguisher" },
  },
  {
    icon: <Eye size={16} />,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
    rule: { fr: "10 secondes max pour décider", en: "Max 10 seconds to decide" },
    detail: { fr: "Observer → Évaluer → Décider. Au-delà de 10s, le feu a déjà progressé.", en: "Observe → Assess → Decide. Beyond 10s, the fire has already progressed." },
  },
  {
    icon: <AlertTriangle size={16} />,
    color: "#b45309",
    bg: "rgba(180,83,9,0.08)",
    border: "rgba(180,83,9,0.2)",
    rule: { fr: "Ne jamais revenir chercher ses affaires", en: "Never go back for belongings" },
    detail: { fr: "Une fois l'évacuation lancée, quitter définitivement le bâtiment", en: "Once evacuation is launched, leave the building permanently" },
  },
];

// ── Chapter 2 modules preview ─────────────────────────────────────
const CH2_MODULES = [
  {
    num: "M01", icon: <Bell size={15} />,
    title: { fr: "Déclencher l'alarme", en: "Trigger the alarm" },
    desc: { fr: "Quand et comment activer l'alerte — 22 22 et déclencheurs manuels", en: "When and how to activate the alert — 22 22 and manual triggers" },
  },
  {
    num: "M02", icon: <Users size={15} />,
    title: { fr: "Garder son calme et guider", en: "Stay calm and lead" },
    desc: { fr: "Posture et communication en situation de crise", en: "Posture and communication in a crisis situation" },
  },
  {
    num: "M03", icon: <DoorClosed size={15} />,
    title: { fr: "Fermer les portes", en: "Close the doors" },
    desc: { fr: "Sors — Ferme — Signale. Le rôle coupe-feu des portes", en: "Exit — Close — Signal. The fire-stopping role of doors" },
  },
  {
    num: "M04", icon: <Eye size={15} />,
    title: { fr: "Vérifier que personne ne reste", en: "Check no one remains" },
    desc: { fr: "Exploration rapide et sécurisée avant évacuation définitive", en: "Quick and safe sweep before final evacuation" },
  },
  {
    num: "M05", icon: <Wind size={15} />,
    title: { fr: "Faire face à la fumée", en: "Dealing with smoke" },
    desc: { fr: "Bons réflexes dans un environnement enfumé", en: "Good reflexes in a smoke-filled environment" },
  },
  {
    num: "M06", icon: <ArrowUp size={15} />,
    title: { fr: "Escaliers ou espace sécurisé", en: "Stairs or safe waiting area" },
    desc: { fr: "Jamais l'ascenseur — toujours l'escalier de secours", en: "Never the elevator — always the emergency stairwell" },
  },
  {
    num: "M07", icon: <ClipboardCheck size={15} />,
    title: { fr: "Procédure complète d'évacuation", en: "Full evacuation procedure" },
    desc: { fr: "Simulation finale chronométrée — mise en situation réelle", en: "Final timed simulation — real-life scenario" },
  },
];

export default function ChapterIntroPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEN = lang === "en";

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* ── Topbar ─────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-5"
        style={{ height: "52px", background: "#fff", borderBottom: "1px solid #e4e7f0", zIndex: 20 }}
      >
        <IBMLogo variant="light" height={30} />
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ fontFamily: "'IBM Plex Mono', monospace", background: "rgba(13,71,161,0.08)", color: "#0D47A1", border: "1px solid rgba(13,71,161,0.18)", fontSize: "10px", letterSpacing: "0.08em" }}>
            {isEN ? "CHAPTER 2" : "CHAPITRE 2"}
          </span>
        </div>
      </header>

      {/* ── Geometric hero ──────────────────────────────────── */}
      <div className="relative flex-shrink-0" style={{ minHeight: "110px" }}>
        <GeometricBg />
        <div className="relative z-10 px-5 py-5 flex flex-col justify-center" style={{ minHeight: "110px" }}>
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-xs font-mono mb-1 uppercase" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", fontFamily: "'IBM Plex Mono', monospace" }}>
              {isEN ? "Transition · Chapter 1 → 2" : "Transition · Chapitre 1 → 2"}
            </div>
            <h1 className="font-bold text-white mb-1" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", letterSpacing: "-0.025em" }}>
              {isEN ? "Before you continue" : "Avant de continuer"}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
              {isEN ? "Chapter 1 recap and Chapter 2 preview" : "Récapitulatif du Chapitre 1 et aperçu du Chapitre 2"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ──────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto" style={{ background: "#F0F4FA" }}>
        <div className="max-w-2xl mx-auto px-4 py-5 flex flex-col gap-5">

          {/* ── Section 1: Ch1 recap ─────────────────────────── */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(218,30,40,0.1)" }}>
                <Flame size={14} style={{ color: "#da1e28" }} />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#0a2052" }}>
                  {isEN ? "What you learned — Chapter 1" : "Ce que vous avez appris — Chapitre 1"}
                </div>
                <div className="text-xs" style={{ color: "#8d95aa" }}>
                  {isEN ? "Fire fighting · 7 modules" : "Lutte incendie · 7 modules"}
                </div>
              </div>
              <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full" style={{ fontFamily: "'IBM Plex Mono', monospace", background: "rgba(25,128,56,0.1)", color: "#198038", border: "1px solid rgba(25,128,56,0.25)", fontSize: "9px" }}>
                {isEN ? "COMPLETED" : "COMPLÉTÉ"}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(13,71,161,0.14)", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              {CH1_MODULES.map((mod, i) => (
                <div
                  key={mod.num}
                  className="flex items-start gap-3 px-4 py-3"
                  style={{ borderBottom: i < CH1_MODULES.length - 1 ? "1px solid #f0f2f8" : "none" }}
                >
                  <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={14} style={{ color: "#198038" }} />
                    <span className="font-mono font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#8d95aa", letterSpacing: "0.08em" }}>
                      {mod.num}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold" style={{ fontSize: "0.82rem", color: "#0a2052", marginBottom: "2px" }}>
                      {isEN ? mod.title.en : mod.title.fr}
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "#6f7897", lineHeight: "1.4" }}>
                      {isEN ? mod.takeaway.en : mod.takeaway.fr}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 2: Best practices ────────────────────── */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,71,161,0.1)" }}>
                <Star size={14} style={{ color: "#0D47A1" }} />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#0a2052" }}>
                  {isEN ? "IBM best practices to remember" : "Les bonnes pratiques IBM à retenir"}
                </div>
                <div className="text-xs" style={{ color: "#8d95aa" }}>
                  {isEN ? "Golden rules — apply immediately" : "Règles d'or — à appliquer immédiatement"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {BEST_PRACTICES.map((bp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: bp.bg, border: `1.5px solid ${bp.border}` }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: bp.color, color: "#fff" }}>
                    {bp.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold" style={{ fontSize: "0.83rem", color: "#0a2052", marginBottom: "2px" }}>
                      {isEN ? bp.rule.en : bp.rule.fr}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#6f7897", lineHeight: "1.4" }}>
                      {isEN ? bp.detail.en : bp.detail.fr}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 3: Ch2 preview ───────────────────────── */}
          <section>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,71,161,0.1)" }}>
                <Shield size={14} style={{ color: "#0D47A1" }} />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#0a2052" }}>
                  {isEN ? "What's ahead — Chapter 2" : "Ce qui vous attend — Chapitre 2"}
                </div>
                <div className="text-xs" style={{ color: "#8d95aa" }}>
                  {isEN ? "Evacuation & emergency procedures · 7 modules" : "Évacuation & procédures d'urgence · 7 modules"}
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(13,71,161,0.18)", boxShadow: "0 2px 12px rgba(13,71,161,0.06)" }}>
              {/* Ch2 header banner */}
              <div className="px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)" }}>
                <BookOpen size={16} color="#fff" />
                <span className="font-bold text-white uppercase" style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                  {isEN ? "Chapter 2 — Evacuation" : "Chapitre 2 — Évacuation"}
                </span>
              </div>

              {/* Module list */}
              <div style={{ background: "#fff" }}>
                {CH2_MODULES.map((mod, i) => (
                  <div
                    key={mod.num}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ borderBottom: i < CH2_MODULES.length - 1 ? "1px solid #f0f2f8" : "none" }}
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(13,71,161,0.08)", color: "#0D47A1" }}>
                      {mod.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#adb3c8", letterSpacing: "0.08em" }}>{mod.num}</span>
                        <span className="font-semibold" style={{ fontSize: "0.82rem", color: "#0a2052" }}>
                          {isEN ? mod.title.en : mod.title.fr}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#8d95aa", lineHeight: "1.35", marginTop: "1px" }}>
                        {isEN ? mod.desc.en : mod.desc.fr}
                      </div>
                    </div>
                    {i === 0 && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "rgba(13,71,161,0.1)", color: "#0D47A1", fontSize: "9px" }}>
                        {isEN ? "NEXT" : "SUIVANT"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ─────────────────────────────────────────────── */}
          <button
            onClick={() => navigate("/module/ch2-m1")}
            className="w-full flex items-center justify-center gap-3 rounded-2xl py-4 font-bold transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #0D47A1, #1565C0)", color: "#fff", border: "none", cursor: "pointer", fontSize: "1rem", boxShadow: "0 6px 24px rgba(13,71,161,0.3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 10px 32px rgba(13,71,161,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(13,71,161,0.3)")}
          >
            <span>{isEN ? "Start Chapter 2" : "Commencer le Chapitre 2"}</span>
            <ArrowRight size={18} />
          </button>

          <div style={{ height: "8px" }} />
        </div>
      </main>

    </div>
  );
}
