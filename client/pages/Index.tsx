import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Home, BookOpen, BarChart2, HelpCircle, Users, PlayCircle } from "lucide-react";
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
      <span style={{ fontWeight: 700, fontSize: "0.8rem", color: "#0D47A1", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'IBM Plex Sans', sans-serif" }}>
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
          <span className="text-xs font-semibold uppercase tracking-widest cursor-pointer hover:text-blue-700 transition-colors" style={{ color: "#0D47A1", letterSpacing: "0.12em" }}>
            {t("landing.demo", lang)}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest cursor-pointer hover:text-blue-700 transition-colors" style={{ color: "#0D47A1", letterSpacing: "0.12em" }}>
            {t("landing.contact", lang)}
          </span>
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
          <h1 className="font-bold mb-1" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", color: "#0a2052", lineHeight: "1.1", letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            {t("landing.welcome", lang)}
          </h1>
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)", color: "#1565C0", lineHeight: "1.1", letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            {t("landing.title", lang)}
          </h2>
          <p className="mb-6 text-sm" style={{ color: "#6f7897", lineHeight: "1.65", maxWidth: "480px" }}>
            {t("landing.desc", lang)}
          </p>

          {/* Navigation tiles */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Tile icon={<Home size={28} />} label={t("landing.home", lang)} onClick={() => navigate("/")} />
            <Tile icon={<PlayCircle size={28} />} label={t("landing.ch1", lang)} onClick={() => navigate("/hub")} />
            <Tile icon={<BookOpen size={28} />} label={t("landing.ch2", lang)} onClick={() => navigate("/hub")} />
            <Tile icon={<BarChart2 size={28} />} label={t("landing.results", lang)} onClick={() => navigate("/hub")} />
            <Tile icon={<Users size={28} />} label={t("landing.profile", lang)} onClick={() => navigate("/form")} />
            <Tile icon={<HelpCircle size={28} />} label={t("landing.help", lang)} />
          </div>

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
