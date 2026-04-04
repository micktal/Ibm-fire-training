import { useNavigate } from "react-router-dom";
import { ArrowRight, Home, BookOpen, BarChart2, HelpCircle, Users, PlayCircle } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";
import GeometricBg from "@/components/layout/GeometricBg";
import BottomNav from "@/components/layout/BottomNav";

// ── Tile button ──────────────────────────────────────────────────
function Tile({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl transition-all duration-200 cursor-pointer"
      style={{
        background: "#fff",
        border: "none",
        padding: "1.5rem 1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
        minHeight: "110px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px rgba(0,0,0,0.16)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.10)";
      }}
    >
      <div style={{ color: "#0D47A1" }}>{icon}</div>
      <span style={{ fontWeight: 700, fontSize: "0.8rem", color: "#0D47A1", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {label}
      </span>
    </button>
  );
}

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* ── Top nav bar ─────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-6"
        style={{ height: "52px", background: "#fff", borderBottom: "1px solid #e4e7f0", zIndex: 20, position: "relative" }}
      >
        <IBMLogo variant="light" height={26} />
        <nav className="flex items-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-widest cursor-pointer hover:text-blue-700 transition-colors" style={{ color: "#0D47A1", letterSpacing: "0.12em" }}>
            Démo du cours
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest cursor-pointer hover:text-blue-700 transition-colors" style={{ color: "#0D47A1", letterSpacing: "0.12em" }}>
            Contact
          </span>
          <div className="flex items-center gap-1.5 cursor-pointer" style={{ color: "#0D47A1" }}>
            <Users size={15} />
            <span className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.12em" }}>Utilisateur</span>
          </div>
        </nav>
      </header>

      {/* ── Main area with geometric background ─────────────── */}
      <div className="flex-1 relative flex items-center justify-center p-6" style={{ overflow: "hidden" }}>
        <GeometricBg />

        {/* Content card */}
        <div
          className="relative z-10 w-full"
          style={{
            maxWidth: "640px",
            background: "rgba(255,255,255,0.97)",
            borderRadius: "16px",
            padding: "2.5rem 2.5rem 2rem",
            boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
          }}
        >
          {/* Title */}
          <div className="mb-1">
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#8d95aa",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              IBM France · HSE · 2026
            </span>
          </div>
          <h1
            className="font-bold mb-1"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#0a2052", lineHeight: "1.1", letterSpacing: "-0.01em", textTransform: "uppercase" }}
          >
            Bienvenue sur{" "}
            <span style={{ color: "#0D47A1" }}>la Formation</span>
          </h1>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "#1565C0", lineHeight: "1.1", letterSpacing: "-0.01em", textTransform: "uppercase" }}
          >
            Sécurité Incendie
          </h2>
          <p className="mb-6 text-sm" style={{ color: "#6f7897", lineHeight: "1.65", maxWidth: "480px" }}>
            Programme de formation obligatoire IBM France. Acquérez les réflexes essentiels pour prévenir et gérer un départ d'incendie dans vos locaux.
          </p>

          {/* Navigation tiles */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Tile icon={<Home size={28} />} label="Accueil" onClick={() => navigate("/")} />
            <Tile icon={<PlayCircle size={28} />} label="Chapitre 1" onClick={() => navigate("/hub")} />
            <Tile icon={<BookOpen size={28} />} label="Chapitre 2" onClick={() => navigate("/hub")} />
            <Tile icon={<BarChart2 size={28} />} label="Résultats" onClick={() => navigate("/hub")} />
            <Tile icon={<Users size={28} />} label="Profil" onClick={() => navigate("/form")} />
            <Tile icon={<HelpCircle size={28} />} label="Aide" />
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/form")}
            className="w-full flex items-center justify-center gap-3 font-bold cursor-pointer transition-all"
            style={{
              background: "#0D47A1",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "1rem",
              fontSize: "0.95rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              boxShadow: "0 4px 20px rgba(13,71,161,0.4)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0A3882"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#0D47A1"; }}
          >
            Accéder à la formation
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <BottomNav onNext={() => navigate("/form")} onMenu={() => navigate("/hub")} />
    </div>
  );
}
