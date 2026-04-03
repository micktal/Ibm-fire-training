import { useNavigate } from "react-router-dom";
import { ChevronLeft, Shield } from "lucide-react";
import { useUser } from "@/lib/userContext";
import IBMLogo from "@/components/IBMLogo";

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
        <IBMLogo variant="light" height={20} />

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

      {/* Right: progress + score */}
      <div className="flex items-center gap-3">
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
                      ? "#0f62fe"
                      : "#e4e7f0",
                }}
              />
            ))}
          </div>
        )}

        {chapter && (
          <span
            className="hidden sm:inline font-mono text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: chapter === 1 ? "#b45309" : "#0043ce",
              background: chapter === 1 ? "rgba(180,83,9,0.07)" : "rgba(0,67,206,0.07)",
              border: `1px solid ${chapter === 1 ? "rgba(180,83,9,0.2)" : "rgba(0,67,206,0.2)"}`,
            }}
          >
            Chapitre {chapter}
          </span>
        )}

        <div className="flex items-center gap-1.5">
          <Shield size={12} style={{ color: "#0043ce" }} />
          <span
            className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#0043ce",
              background: "rgba(15,98,254,0.07)",
              border: "1px solid rgba(15,98,254,0.15)",
            }}
          >
            {totalCompleted}/14 — {globalScore}%
          </span>
        </div>
      </div>
    </header>
  );
}
