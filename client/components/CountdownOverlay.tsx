import { useState, useEffect } from "react";

interface Props {
  onComplete: () => void;
  moduleImage?: string;
}

const SEQUENCE = [5, 4, 3, 2, 1, 0]; // 0 = "C'EST PARTI !"

export default function CountdownOverlay({ onComplete, moduleImage }: Props) {
  const [step, setStep] = useState(0); // index into SEQUENCE
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (step >= SEQUENCE.length) {
      onComplete();
      return;
    }

    // Trigger re-animation on each tick
    setAnimate(false);
    const reflow = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });

    const duration = SEQUENCE[step] === 0 ? 900 : 850;
    const timer = setTimeout(() => setStep((s) => s + 1), duration);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(reflow);
    };
  }, [step]);

  const current = SEQUENCE[step];
  if (current === undefined) return null; // sequence finished, waiting for unmount

  const isGo = current === 0;
  const progress = ((5 - current) / 5) * 100;

  // Color shifts from blue → orange → green as urgency builds
  const numColor = isGo
    ? "#6fdc8c"
    : current <= 2
    ? "#ff6b1a"
    : "#fff";

  const ringColor = isGo ? "#6fdc8c" : current <= 2 ? "#ff6b1a" : "#0f62fe";

  const circumference = 2 * Math.PI * 70; // r=70 fixe

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
    >
      {/* Background image */}
      {moduleImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${moduleImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: `blur(20px) brightness(${isGo ? 0.35 : 0.15})`,
            transform: "scale(1.08)",
            transition: "filter 0.4s ease",
          }}
        />
      )}

      {/* IBM accent line top */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "3px",
          background: `linear-gradient(90deg, #0f62fe ${progress}%, rgba(255,255,255,0.05) ${progress}%)`,
          transition: "background 0.4s ease",
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center">

        {/* SVG ring */}
        <div
          className="relative flex items-center justify-center mb-0"
          style={{ width: "180px", height: "180px" }}
        >
          <svg
            width={180} height={180}
            style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
          >
            <circle cx={90} cy={90} r={70}
              fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"
            />
            <circle cx={90} cy={90} r={70}
              fill="none" stroke={ringColor} strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (isGo ? 0 : 1 - (5 - current) / 5)}
              style={{ transition: "stroke-dashoffset 0.7s ease, stroke 0.3s ease" }}
            />
          </svg>

          {/* Chiffre ou PARTEZ! */}
          {isGo ? (
            /* PARTEZ! sort du cercle — centré en dessous du ring, overlapping */
            <div
              key={step}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "2.2rem",
                fontWeight: 800,
                color: numColor,
                letterSpacing: "0.08em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                position: "absolute",
                animation: "goReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
                textShadow: "0 0 40px rgba(111,220,140,0.7)",
              }}
            >
              PARTEZ !
            </div>
          ) : (
            <div
              key={step}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "4.5rem",
                fontWeight: 800,
                color: numColor,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                animation: animate ? "numPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
                textShadow: current <= 2
                  ? "0 0 30px rgba(255,107,26,0.6)"
                  : "0 0 20px rgba(15,98,254,0.5)",
              }}
            >
              {current}
            </div>
          )}
        </div>

        {/* Label */}
        <div
          key={`label-${step}`}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: "24px",
            animation: animate ? "fadeIn 0.3s ease both" : "none",
          }}
        >
          {isGo ? "Bonne formation" : "Préparez-vous"}
        </div>

        {/* Urgency dots */}
        <div className="flex gap-2 mt-4">
          {[5, 4, 3, 2, 1].map((n) => (
            <div
              key={n}
              className="rounded-full transition-all duration-300"
              style={{
                width: "8px",
                height: "8px",
                background: current <= n || isGo
                  ? (n <= 2 ? "#ff6b1a" : "#0f62fe")
                  : "rgba(255,255,255,0.12)",
                transform: current === n && !isGo ? "scale(1.5)" : "scale(1)",
                boxShadow: current === n && !isGo
                  ? `0 0 8px ${n <= 2 ? "#ff6b1a" : "#0f62fe"}`
                  : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
