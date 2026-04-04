import { useEffect, useRef } from "react";
import { Award, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/languageContext";
import { t } from "@/lib/i18n";

interface Props {
  score: number;
  moduleName: string;
  onContinue: () => void;
}

// Simple canvas confetti
function runConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const COLORS = ["#0f62fe", "#6fdc8c", "#ff6b1a", "#fff", "#0043ce", "#f1c21b"];
  const particles: {
    x: number; y: number; vx: number; vy: number;
    r: number; color: string; angle: number; spin: number; shape: "rect" | "circle";
  }[] = [];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      r: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2,
      shape: Math.random() > 0.4 ? "rect" : "circle",
    });
  }

  let frame: number;
  let tick = 0;

  const draw = () => {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      p.vy += 0.05; // gravity
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - tick / 180);
      if (p.shape === "rect") {
        ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    if (tick < 180) frame = requestAnimationFrame(draw);
  };
  draw();
  return () => cancelAnimationFrame(frame);
}

export default function CompletionCelebration({ score, moduleName, onContinue }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const passed = score >= 80;
  const { lang } = useLanguage();

  useEffect(() => {
    if (!passed || !canvasRef.current) return;
    const cleanup = runConfetti(canvasRef.current);
    return cleanup;
  }, [passed]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
    >
      {/* Confetti canvas */}
      {passed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}

      {/* Card */}
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden text-center"
        style={{
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          animation: "celebrationPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Top color bar */}
        <div style={{ height: "4px", background: passed ? "linear-gradient(90deg,#198038,#6fdc8c)" : "linear-gradient(90deg,#da1e28,#ff8389)" }} />

        <div className="px-8 py-8">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{
              background: passed ? "linear-gradient(135deg,#198038,#24a148)" : "#da1e28",
              boxShadow: `0 8px 32px ${passed ? "rgba(25,128,56,0.4)" : "rgba(218,30,40,0.4)"}`,
            }}
          >
            <Award size={36} color="#fff" />
          </div>

          {/* Score */}
          <div
            className="font-mono font-bold mb-1"
            style={{
              fontSize: "3.5rem",
              lineHeight: 1,
              color: passed ? "#198038" : "#da1e28",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "-0.02em",
            }}
          >
            {score}%
          </div>

          {/* Title */}
          <div className="font-bold text-lg mb-1" style={{ color: "#161616", letterSpacing: "-0.015em" }}>
            {passed ? t("completion.passed", lang) : t("completion.failed", lang)}
          </div>

          {/* Module name */}
          <div className="text-sm mb-1" style={{ color: "#6f7897" }}>
            {moduleName}
          </div>

          {/* Threshold reminder */}
          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-6"
            style={{
              color: passed ? "#198038" : "#da1e28",
              background: passed ? "rgba(25,128,56,0.08)" : "rgba(218,30,40,0.08)",
              border: `1px solid ${passed ? "rgba(25,128,56,0.2)" : "rgba(218,30,40,0.2)"}`,
            }}
          >
            {passed ? t("completion.threshold_ok", lang) : t("completion.threshold_ko", lang)}
          </div>

          {/* CTA */}
          <button
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all"
            style={{
              padding: "0.9rem",
              background: passed ? "#198038" : "#0043ce",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9375rem",
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
          >
            {passed ? t("completion.continue", lang) : t("completion.retry", lang)}
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
