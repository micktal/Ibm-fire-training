import { useNavigate } from "react-router-dom";
import { ChevronLeft, Home, BarChart2, Shield } from "lucide-react";
import { useUser } from "@/lib/userContext";
import { useLanguage } from "@/lib/languageContext";
import IBMLogo from "@/components/IBMLogo";

// ── Flag SVG components ──────────────────────────────────────────
function FlagFR({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" style={{ borderRadius: "3px", display: "block", boxShadow: "0 0 0 1px rgba(0,0,0,0.18)" }}>
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </svg>
  );
}

function FlagEN({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 60 36" style={{ borderRadius: "3px", display: "block", boxShadow: "0 0 0 1px rgba(0,0,0,0.18)" }}>
      <rect width="60" height="36" fill="#012169" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

interface IBMTopbarProps {
  title?: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  showProgress?: boolean;
  currentModule?: number;
  totalModules?: number;
  chapter?: 1 | 2;
}

export default function IBMTopbar({
  title,
  subtitle,
  backTo,
  backLabel = "Retour",
  showProgress = false,
  currentModule,
  totalModules = 7,
  chapter,
}: IBMTopbarProps) {
  const navigate = useNavigate();
  const { globalScore, totalCompleted } = useUser();
  const { lang, setLang } = useLanguage();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      className="flex-shrink-0 bg-white border-b flex items-center justify-between px-5 h-12"
      style={{ borderColor: "#e4e7f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    >
      {/* Left: back + branding */}
      <div className="flex items-center gap-3">
        {backTo !== undefined && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: "#0043ce" }}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
        )}

        {backTo !== undefined && (
          <div className="w-px h-4" style={{ background: "#e4e7f0" }} />
        )}

        {/* IBM logo officiel */}
        <IBMLogo variant="light" height={32} />

        {(title || subtitle) && (
          <>
            <div className="w-px h-4" style={{ background: "#e4e7f0" }} />
            <div className="flex flex-col leading-none">
              {title && (
                <span className="text-xs font-semibold" style={{ color: "#161616" }}>
                  {title}
                </span>
              )}
              {subtitle && (
                <span className="text-xs" style={{ color: "#8d95aa", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {subtitle}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right: nav links + score */}
      <div className="flex items-center gap-4">
        {showProgress && currentModule !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5">
            {Array.from({ length: totalModules }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: "20px",
                  height: "3px",
                  background:
                    i < (currentModule - 1)
                      ? "#198038"
                      : i === currentModule - 1
                      ? "#0D47A1"
                      : "#e4e7f0",
                }}
              />
            ))}
          </div>
        )}

        {chapter && (
          <span
            className="hidden sm:inline font-mono text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: chapter === 1 ? "#b45309" : "#0D47A1",
              background: chapter === 1 ? "rgba(180,83,9,0.07)" : "rgba(13,71,161,0.07)",
              border: `1px solid ${chapter === 1 ? "rgba(180,83,9,0.2)" : "rgba(13,71,161,0.2)"}`,
            }}
          >
            <Shield size={10} />
            Ch.{chapter}
          </span>
        )}

        <button
          onClick={() => navigate("/hub")}
          className="hidden sm:flex items-center gap-1 text-xs font-semibold uppercase hover:opacity-70 transition-opacity"
          style={{ color: "#0D47A1", letterSpacing: "0.08em", background: "none", border: "none", cursor: "pointer" }}
        >
          <Home size={12} />
          <span className="hidden md:inline">{lang === "en" ? "Dashboard" : "Tableau de bord"}</span>
        </button>

        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all"
          style={{ background: "rgba(13,71,161,0.06)", border: "1px solid rgba(13,71,161,0.15)", cursor: "pointer" }}
          title={lang === "fr" ? "Switch to English" : "Passer en français"}
        >
          {lang === "fr" ? <FlagEN size={18} /> : <FlagFR size={18} />}
          <span className="font-mono text-xs font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0D47A1", fontSize: "10px" }}>
            {lang === "fr" ? "EN" : "FR"}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          <BarChart2 size={13} style={{ color: "#0D47A1" }} />
          <span
            className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#0D47A1",
              background: "rgba(13,71,161,0.07)",
              border: "1px solid rgba(13,71,161,0.15)",
            }}
          >
            {totalCompleted}/14 — {globalScore}%
          </span>
        </div>
      </div>
    </header>
  );
}
