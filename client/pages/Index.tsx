import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";

const TITLE = "Formation Sécurité Incendie";

export default function Index() {
  const navigate = useNavigate();
  const [typed, setTyped] = useState("");
  const [inkReady, setInkReady] = useState(false);

  // Ink reveal: trigger after short delay
  useEffect(() => {
    const t = setTimeout(() => setInkReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect for title (starts after ink animation settles)
  useEffect(() => {
    if (!inkReady) return;
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setTyped(TITLE.slice(0, i + 1));
        i++;
        if (i >= TITLE.length) clearInterval(interval);
      }, 52);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(delay);
  }, [inkReady]);

  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #040609 0%, #08101e 45%, #050c18 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{ width: "900px", height: "900px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,67,206,0.10) 0%, transparent 68%)", top: "-300px", left: "-250px" }} />
      <div className="absolute pointer-events-none" style={{ width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,26,0.06) 0%, transparent 68%)", bottom: "-200px", right: "-150px" }} />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 w-full" style={{ maxWidth: "700px" }}>

        {/* IBM logo officiel — ink diffusion reveal, fond sombre = logo blanc */}
        <div
          style={{
            opacity: inkReady ? 1 : 0,
            filter: inkReady ? "blur(0px)" : "blur(12px)",
            transform: inkReady ? "scale(1)" : "scale(0.88)",
            transition: "opacity 0.8s ease, filter 1s ease, transform 0.8s cubic-bezier(0.34,1.2,0.64,1)",
            marginBottom: "2.2rem",
          }}
        >
          <IBMLogo variant="dark" height={56} />
        </div>

        {/* Tag line */}
        <div
          className="flex items-center gap-[0.9rem] mb-8"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: inkReady ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <span className="flex-1 h-px" style={{ maxWidth: "80px", background: "rgba(255,255,255,0.1)" }} />
          Health &bull; Safety &bull; Environment
          <span className="flex-1 h-px" style={{ maxWidth: "80px", background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Title — typewriter */}
        <h1
          className="text-white font-bold mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 2.6rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.12",
            minHeight: "3.5rem",
          }}
        >
          {typed}
          {/* Blinking cursor while typing */}
          {typed.length < TITLE.length && inkReady && (
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "0.85em",
                background: "#ff6b1a",
                marginLeft: "2px",
                verticalAlign: "middle",
                animation: "cursorBlink 0.7s step-end infinite",
              }}
            />
          )}
        </h1>

        {/* Description */}
        <p
          className="mb-10"
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: "1.78",
            maxWidth: "520px",
            opacity: typed.length > 10 ? 1 : 0,
            transform: typed.length > 10 ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Programme de formation obligatoire IBM France. Acquérez les réflexes
          et compétences essentiels pour prévenir et gérer un départ d'incendie
          dans vos locaux.
        </p>

        {/* CTA — breathing pulse */}
        <button
          onClick={() => navigate("/form")}
          className="group inline-flex items-center gap-3 font-semibold cursor-pointer"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "1rem 2.6rem",
            background: "#0043ce",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 4px 24px rgba(0,67,206,0.4)",
            animation: typed.length >= TITLE.length ? "breathePulse 2.8s ease-in-out infinite" : "none",
            opacity: typed.length > 5 ? 1 : 0,
            transform: typed.length > 5 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0031a9";
            (e.currentTarget as HTMLButtonElement).style.animation = "none";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0043ce";
            (e.currentTarget as HTMLButtonElement).style.animation = "breathePulse 2.8s ease-in-out infinite";
          }}
        >
          Accéder à la formation
          <ArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.62rem",
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Formation obligatoire &bull; IBM France &bull; 2026
      </div>
    </div>
  );
}
