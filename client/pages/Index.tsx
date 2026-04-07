import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Home, BookOpen, BarChart2, HelpCircle, PlayCircle } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";
import GeometricBg from "@/components/layout/GeometricBg";
import BottomNav from "@/components/layout/BottomNav";
import { useLanguage, Lang } from "@/lib/languageContext";
import { t } from "@/lib/i18n";

// ── Flag SVGs ────────────────────────────────────────────────────
function FlagFR() {
  return (
    <svg width="48" height="32" viewBox="0 0 30 20" style={{ borderRadius: "6px", display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg width="48" height="32" viewBox="0 0 60 36" style={{ borderRadius: "6px", display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
      <rect width="60" height="36" fill="#012169" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

// ── Tile button ──────────────────────────────────────────────────
function Tile({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl transition-all duration-200 cursor-pointer"
      style={{ background: "#fff", border: "none", padding: "1.5rem 1rem", boxShadow: "0 4px 20px rgba(0,0,0,0.10)", minHeight: "110px" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px rgba(0,0,0,0.16)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.10)"; }}
    >
      <div style={{ color: "#0D47A1" }}>{icon}</div>
      <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0D47A1", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {label}
      </span>
    </button>
  );
}

// ── Language selection overlay ───────────────────────────────────
function LanguageSelector({ onSelect }: { onSelect: (lang: Lang) => void }) {
  const [hovered, setHovered] = useState<Lang | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "linear-gradient(145deg, #0A3882 0%, #0D47A1 50%, #1565C0 100%)" }}>
      {/* Geometric shapes */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "#0E4DB8", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)", opacity: 0.5 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "30%", height: "50%", background: "rgba(255,255,255,0.03)", clipPath: "polygon(0 0, 100% 20%, 80% 100%, 0 100%)" }} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6" style={{ maxWidth: "420px", width: "100%" }}>
        {/* Logo */}
        <IBMLogo variant="dark" height={36} />

        {/* Title */}
        <div className="text-center">
          <div className="font-mono text-xs uppercase mb-3" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em", fontFamily: "'IBM Plex Mono', monospace" }}>
            IBM · HSE · 2026
          </div>
          <h1 className="font-bold text-white text-2xl mb-1" style={{ letterSpacing: "-0.02em" }}>
            Fire Safety Training
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
            Formation Sécurité Incendie
          </p>
        </div>

        {/* Language cards */}
        <div className="w-full">
          <p className="text-center font-semibold mb-4" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
            Choose your language · Choisissez votre langue
          </p>
          <div className="grid grid-cols-2 gap-4">
            {(["fr", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => onSelect(l)}
                onMouseEnter={() => setHovered(l)}
                onMouseLeave={() => setHovered(null)}
                className="flex flex-col items-center gap-3 rounded-2xl py-6 px-4 transition-all duration-200"
                style={{
                  background: hovered === l ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
                  border: `2px solid ${hovered === l ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"}`,
                  cursor: "pointer",
                  transform: hovered === l ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hovered === l ? "0 12px 32px rgba(0,0,0,0.25)" : "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {l === "fr" ? <FlagFR /> : <FlagEN />}
                <div className="text-center">
                  <div className="font-bold text-white" style={{ fontSize: "1rem" }}>
                    {l === "fr" ? "Français" : "English"}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
                    {l === "fr" ? "Formation en français" : "Training in English"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* IBM badge */}
        <div className="font-mono text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
          IBM France · Mandatory HSE Training
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
export default function Index() {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const [langChosen, setLangChosen] = useState(() => !!localStorage.getItem("ibm_lang"));
  const [showHelp, setShowHelp] = useState(false);

  const handleLangSelect = (l: Lang) => {
    setLang(l);
    setLangChosen(true);
  };

  if (!langChosen) {
    return <LanguageSelector onSelect={handleLangSelect} />;
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* ── Top nav bar ─────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-6"
        style={{ height: "52px", background: "#fff", borderBottom: "1px solid #e4e7f0", zIndex: 20, position: "relative" }}
      >
        <IBMLogo variant="light" height={32} />
        <nav className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLangChosen(false)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1"
            style={{ background: "rgba(13,71,161,0.06)", border: "1px solid rgba(13,71,161,0.15)", cursor: "pointer" }}
          >
            {lang === "fr" ? <FlagFR /> : <FlagEN />}
            <span className="font-mono text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0D47A1", fontSize: "10px" }}>
              {lang.toUpperCase()}
            </span>
          </button>
        </nav>
      </header>

      {/* ── Main area ──────────────────────────────────────── */}
      <div className="flex-1 relative flex items-center justify-center p-6" style={{ overflow: "hidden" }}>
        <GeometricBg />

        <div
          className="relative z-10 w-full"
          style={{ maxWidth: "640px", background: "rgba(255,255,255,0.97)", borderRadius: "16px", padding: "2.5rem 2.5rem 2rem", boxShadow: "0 24px 64px rgba(0,0,0,0.22)" }}
        >
          <div className="mb-1">
            <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#8d95aa", fontFamily: "'IBM Plex Mono', monospace" }}>
              {t("landing.subtitle", lang)}
            </span>
          </div>
          <h1 className="font-bold mb-1" style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)", color: "#0a2052", lineHeight: "1.1", letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            {t("landing.welcome", lang)}
          </h1>
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.75rem)", color: "#1565C0", lineHeight: "1.1", letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            {t("landing.title", lang)}
          </h2>
          <p className="mb-3" style={{ fontSize: "0.95rem", color: "#6f7897", lineHeight: "1.65", maxWidth: "480px" }}>
            {t("landing.desc", lang)}
          </p>
          <p className="mb-5" style={{ fontSize: "0.88rem", color: "#374151", lineHeight: "1.65", maxWidth: "480px", background: "rgba(13,71,161,0.06)", borderLeft: "3px solid #1565C0", borderRadius: "0 6px 6px 0", padding: "0.6rem 0.9rem" }}>
            {t("landing.skills", lang)}
          </p>

          {/* Navigation tiles — 2 rows */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <Tile icon={<PlayCircle size={28} />} label={t("landing.ch1", lang)} onClick={() => navigate("/form")} />
            <Tile icon={<BookOpen size={28} />} label={t("landing.ch2", lang)} onClick={() => navigate("/form")} />
            <Tile icon={<BarChart2 size={28} />} label={t("landing.results", lang)} onClick={() => navigate("/form")} />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Tile icon={<Home size={28} />} label={t("landing.home", lang)} onClick={() => navigate("/")} />
            <Tile icon={<HelpCircle size={28} />} label={t("landing.help", lang)} onClick={() => setShowHelp(true)} />
          </div>

          {/* Help modal */}
          {showHelp && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: "rgba(10,32,82,0.55)", backdropFilter: "blur(4px)" }}
              onClick={() => setShowHelp(false)}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ maxWidth: "440px", width: "90%", background: "white", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div style={{ background: "#0D47A1", padding: "1.25rem 1.5rem" }}>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    IBM · Sécurité Incendie
                  </div>
                  <div style={{ color: "white", fontWeight: 800, fontSize: "1.1rem" }}>
                    {lang === "fr" ? "Aide & Informations" : "Help & Information"}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  {/* Emergency */}
                  <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: "0.75rem", padding: "0.9rem 1rem", marginBottom: "1rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ fontSize: "1.5rem" }}>🚨</div>
                    <div>
                      <div style={{ fontWeight: 800, color: "#dc2626", fontSize: "0.85rem" }}>
                        {lang === "fr" ? "Numéro d'urgence IBM" : "IBM Emergency Number"}
                      </div>
                      <div style={{ fontWeight: 900, color: "#0a2052", fontSize: "1.4rem", fontFamily: "'IBM Plex Mono', monospace" }}>22 22</div>
                      <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>
                        {lang === "fr" ? "Sécurité IBM — à composer EN PREMIER avant le 18 et le 15" : "IBM Security — call FIRST before 18 or 15"}
                      </div>
                    </div>
                  </div>

                  {/* Training info */}
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontWeight: 700, color: "#0a2052", fontSize: "0.82rem", marginBottom: "0.5rem" }}>
                      {lang === "fr" ? "À propos de la formation" : "About this training"}
                    </div>
                    {[
                      lang === "fr" ? "14 modules répartis en 2 chapitres (Lutte incendie + Évacuation)" : "14 modules across 2 chapters (Fire fighting + Evacuation)",
                      lang === "fr" ? "Score minimum requis : 80% par module pour valider" : "Minimum score required: 80% per module to pass",
                      lang === "fr" ? "Disponible en français et en anglais" : "Available in French and English",
                      lang === "fr" ? "Certificat généré automatiquement à la fin" : "Certificate automatically generated at the end",
                      lang === "fr" ? "Votre progression est sauvegardée automatiquement" : "Your progress is saved automatically",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.78rem", color: "#374151", marginBottom: "0.3rem" }}>
                        <span style={{ color: "#0D47A1", fontWeight: 700, flexShrink: 0 }}>·</span>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Registration reminder */}
                  <div style={{ background: "rgba(13,71,161,0.06)", borderLeft: "3px solid #1565C0", borderRadius: "0 0.4rem 0.4rem 0", padding: "0.6rem 0.75rem", fontSize: "0.75rem", color: "#1e40af", marginBottom: "1rem" }}>
                    {lang === "fr"
                      ? "⓵ Complétez le formulaire d'inscription avant de commencer la formation."
                      : "⓵ Complete the registration form before starting the training."}
                  </div>

                  <button
                    onClick={() => setShowHelp(false)}
                    style={{ width: "100%", background: "#0D47A1", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.7rem", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
                  >
                    {lang === "fr" ? "Fermer" : "Close"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => navigate("/form")}
            className="w-full flex items-center justify-center gap-3 font-bold cursor-pointer transition-all"
            style={{ background: "#0D47A1", color: "#fff", border: "none", borderRadius: "8px", padding: "1rem", fontSize: "0.95rem", letterSpacing: "0.06em", textTransform: "uppercase", boxShadow: "0 4px 20px rgba(13,71,161,0.4)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0A3882"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0D47A1"; }}
          >
            {t("landing.cta", lang)}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <BottomNav onNext={() => navigate("/form")} onMenu={() => navigate("/hub")} />
    </div>
  );
}
