import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #040609 0%, #08101e 45%, #050c18 100%)",
      }}
    >
      {/* Background orb — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,67,206,0.10) 0%, transparent 68%)",
          top: "-300px",
          left: "-250px",
        }}
      />

      {/* Background orb — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,107,26,0.05) 0%, transparent 68%)",
          bottom: "-200px",
          right: "-150px",
        }}
      />

      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-8 w-full pb-20"
        style={{ maxWidth: "700px" }}
      >
        {/* IBM Bars logo */}
        <div
          className="animate-d1 flex items-end justify-center gap-[6px] mb-3"
          style={{ height: "56px" }}
        >
          {[28, 56, 22, 46, 32].map((h, i) => (
            <span
              key={i}
              className="block rounded-[2.5px] bg-ibm-bars"
              style={{ width: "8px", height: `${h}px` }}
            />
          ))}
        </div>

        {/* IBM Wordmark */}
        <div
          className="animate-d1 text-white font-mono font-bold leading-none mb-8"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "4.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          IBM
        </div>

        {/* Tag line */}
        <div
          className="animate-d2 flex items-center gap-[0.9rem] mb-7"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span
            className="flex-1 h-px"
            style={{ maxWidth: "80px", background: "rgba(255,255,255,0.1)" }}
          />
          Health &bull; Safety &bull; Environment
          <span
            className="flex-1 h-px"
            style={{ maxWidth: "80px", background: "rgba(255,255,255,0.1)" }}
          />
        </div>

        {/* Title */}
        <h1
          className="animate-d3 text-white font-bold mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 2.6rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.12",
          }}
        >
          Formation Securite
          <br />
          <span style={{ color: "#ff6b1a" }}>Lutte Incendie</span>
        </h1>

        {/* Description */}
        <p
          className="animate-d4 mb-9"
          style={{
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.48)",
            lineHeight: "1.78",
            maxWidth: "520px",
          }}
        >
          Programme de formation obligatoire IBM France. Acquerez les reflexes
          et competences essentiels pour prevenir et gerer un depart d&apos;incendie
          dans vos locaux.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/form")}
          className="animate-d5 group inline-flex items-center gap-3 font-semibold cursor-pointer transition-all hover:-translate-y-0.5"
          style={{
            transitionDuration: "220ms",
          }}
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
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0031a9";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 32px rgba(0,67,206,0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0043ce";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 24px rgba(0,67,206,0.4)";
          }}
        >
          Acceder a la formation
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="transition-transform duration-200 group-hover:translate-x-1"
            style={{ width: "16px", height: "16px" }}
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
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
        Formation obligatoire &bull; IBM France &bull; Chapitre 1 &bull; 2026
      </div>
    </div>
  );
}
