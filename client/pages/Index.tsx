import { useNavigate } from "react-router-dom";
import { ArrowRight, Home, BookOpen, BarChart2, HelpCircle, Users, PlayCircle, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";

// ── Geometric background ─────────────────────────────────────────
function GeometricBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0D47A1" }}>
      {/* Base layer shapes */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0A3882 0%, #0D47A1 40%, #1565C0 100%)" }} />
      {/* Large right polygon */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "62%", height: "100%", background: "#0E4DB8", clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }} />
      {/* Center diamond */}
      <div style={{ position: "absolute", top: "8%", left: "8%", width: "55%", height: "60%", background: "#1565C0", clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 90%)" }} />
      {/* Mid right lighter */}
      <div style={{ position: "absolute", top: "15%", right: "5%", width: "42%", height: "52%", background: "#1976D2", clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 88%)" }} />
      {/* Bottom left dark */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "45%", height: "40%", background: "#083070", clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)" }} />
      {/* Center accent - brightest */}
      <div style={{ position: "absolute", top: "28%", left: "22%", width: "38%", height: "38%", background: "#1E88E5", clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }} />
      {/* Top left triangle */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "35%", background: "#0A3882", clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }} />
      {/* White glass sheen */}
      <div style={{ position: "absolute", top: "35%", right: "18%", width: "28%", height: "25%", background: "rgba(255,255,255,0.04)", clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", bottom: "12%", right: "8%", width: "22%", height: "20%", background: "rgba(255,255,255,0.05)", clipPath: "polygon(0 0, 100% 10%, 88% 100%, 0 90%)" }} />
    </div>
  );
}

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

      {/* ── Bottom nav bar ──────────────────────────────────── */}
      <footer
        className="flex-shrink-0 flex items-center justify-center gap-6"
        style={{ height: "48px", background: "#fff", borderTop: "1px solid #e4e7f0", zIndex: 20 }}
      >
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" style={{ color: "#0D47A1" }}>
          <ChevronLeft size={18} />
        </button>
        <div style={{ width: "1px", height: "20px", background: "#e4e7f0" }} />
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" style={{ color: "#0D47A1" }} onClick={() => navigate("/")}>
          <Home size={16} />
        </button>
        <div style={{ width: "1px", height: "20px", background: "#e4e7f0" }} />
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" style={{ color: "#0D47A1" }} onClick={() => navigate("/hub")}>
          <Menu size={16} />
        </button>
        <div style={{ width: "1px", height: "20px", background: "#e4e7f0" }} />
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" style={{ color: "#0D47A1" }} onClick={() => navigate("/form")}>
          <ChevronRight size={18} />
        </button>
      </footer>

      <style>{`
        @keyframes breathePulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(13,71,161,0.4); }
          50% { box-shadow: 0 6px 32px rgba(13,71,161,0.65); }
        }
      `}</style>
    </div>
  );
}
