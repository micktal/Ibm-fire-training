import { useState } from "react";
import { useEffect } from "react";
import { AlertTriangle, X, CheckCircle2, XCircle, Mail, MessageSquare, Clock, ChevronRight } from "lucide-react";
import { SituationAlert } from "@/lib/situationAlerts";
import { useLanguage } from "@/lib/languageContext";

interface Props {
  alert: SituationAlert;
  onClose: () => void;
}

const URGENCY_CONFIG = {
  critical: { label: "CRITIQUE", color: "#da1e28", bg: "rgba(218,30,40,0.1)", border: "rgba(218,30,40,0.35)", pulse: true },
  high:     { label: "URGENT",   color: "#b45309", bg: "rgba(180,83,9,0.08)",  border: "rgba(180,83,9,0.3)",   pulse: false },
  medium:   { label: "ALERTE",   color: "#0D47A1", bg: "rgba(13,71,161,0.08)", border: "rgba(13,71,161,0.2)",  pulse: false },
};

export default function SituationAlertPopup({ alert, onClose }: Props) {
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Two-tone alert beep
      [0, 0.2].forEach((delay, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = i === 0 ? 880 : 660; osc.type = "sine";
        gain.gain.setValueAtTime(0.3, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.18);
        osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + 0.18);
      });
    } catch (_) {}
  }, []);

  const urgency = URGENCY_CONFIG[alert.urgency];
  const now = new Date().toLocaleTimeString(isEN ? "en-GB" : "fr-FR", { hour: "2-digit", minute: "2-digit" });
  const correctChoice = alert.choices.find((c) => c.correct);
  const selectedChoice = alert.choices.find((c) => c.key === selected);

  // Localised content helpers
  const alertSubject = isEN ? (alert.subjectEn ?? alert.subject) : alert.subject;
  const alertBody = isEN ? (alert.bodyEn ?? alert.body) : alert.body;
  const alertQuestion = isEN ? (alert.questionEn ?? alert.question) : alert.question;
  const alertSenderRole = isEN ? (alert.senderRoleEn ?? alert.senderRole) : alert.senderRole;
  const choiceLabel = (c: typeof alert.choices[0]) => isEN ? (c.labelEn ?? c.label) : c.label;
  const choiceFeedback = (c: typeof alert.choices[0]) => isEN ? (c.feedbackEn ?? c.feedback) : c.feedback;

  const handleSelect = (key: string) => {
    if (answered) return;
    setSelected(key);
    setAnswered(true);
  };

  const isEmail = alert.style === "email";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)" }}
    >
      {/* Pulsing red border for critical */}
      {alert.urgency === "critical" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: "3px solid rgba(218,30,40,0.6)",
            animation: "criticalPulse 1.2s ease-in-out infinite",
          }}
        />
      )}

      <div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{
          background: "#0a0e1a",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: `0 0 0 1px ${urgency.border}, 0 40px 100px rgba(0,0,0,0.7)`,
          animation: "alertSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both, popupShake 0.55s ease 0.35s both",
          maxHeight: "95vh",
          overflowY: "auto",
        }}
      >
        {/* ── Top urgency bar ──────────────────────────── */}
        <div
          className="flex items-center gap-2.5 px-5 py-2.5"
          style={{ background: urgency.color, position: "relative", overflow: "hidden" }}
        >
          {/* Animated sweep */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            animation: alert.urgency === "critical" ? "sweep 2s linear infinite" : "none",
          }} />
          <AlertTriangle size={16} color="#fff" className="flex-shrink-0" style={{ position: "relative", zIndex: 1 }} />
          <span className="font-mono font-bold text-white uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.15em", position: "relative", zIndex: 1 }}>
            {urgency.label} — {isEN ? "Ongoing situation" : "Situation en cours"}
          </span>
          <div className="ml-auto flex items-center gap-1.5" style={{ position: "relative", zIndex: 1 }}>
            <Clock size={11} color="rgba(255,255,255,0.7)" />
            <span className="font-mono text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.7)", fontSize: "10px" }}>
              {now}
            </span>
          </div>
        </div>

        {/* ── Source badge ─────────────────────────────── */}
        <div className="flex items-center gap-2 px-5 py-2.5" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {isEmail
            ? <Mail size={13} style={{ color: "#7eb3ff" }} />
            : <MessageSquare size={13} style={{ color: "#6fdc8c" }} />}
          <span className="text-xs font-semibold" style={{ color: isEmail ? "#7eb3ff" : "#6fdc8c" }}>
            {isEmail ? (isEN ? "IBM Mail — Message received" : "IBM Mail — Message reçu") : `IBM Teams — ${isEN ? "Channel" : "Canal"} ${alertSubject}`}
          </span>
        </div>

        {/* ── Email / Message body ─────────────────────── */}
        <div className="px-5 pt-4 pb-3">
          {/* Sender row */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
              style={{ background: alert.senderColor, color: "#fff", fontSize: "13px", letterSpacing: "0.03em" }}
            >
              {alert.senderInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white" style={{ fontSize: "0.9rem" }}>{alert.senderName}</div>
              <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{alertSenderRole}</div>
            </div>
            {isEmail && (
              <div className="flex-shrink-0 font-mono text-xs px-2 py-0.5 rounded-full" style={{ fontFamily: "'IBM Plex Mono', monospace", background: urgency.bg, color: urgency.color, border: `1px solid ${urgency.border}`, fontSize: "9px", letterSpacing: "0.08em" }}>
                {isEN ? "UNREAD" : "NON LU"}
              </div>
            )}
          </div>

          {/* Subject (email only) */}
          {isEmail && (
            <div className="font-bold mb-3" style={{ color: "#fff", fontSize: "1rem", lineHeight: "1.3" }}>
              {alertSubject}
            </div>
          )}

          {/* Body */}
          <div
            className="rounded-2xl p-4 mb-1"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {alertBody.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.875rem",
                  lineHeight: "1.65",
                  marginBottom: i < alertBody.split("\n\n").length - 1 ? "0.75rem" : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────── */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", margin: "0 20px" }} />

        {/* ── Question ─────────────────────────────────── */}
        <div className="px-5 py-4">
          <div
            className="rounded-xl px-4 py-3 mb-4"
            style={{ background: urgency.bg, border: `1.5px solid ${urgency.border}` }}
          >
            <div className="font-mono text-xs uppercase mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color: urgency.color, fontSize: "9px", letterSpacing: "0.12em" }}>
              {isEN ? "Question — What do you do?" : "Question — Que faites-vous ?"}
            </div>
            <div className="font-bold text-white" style={{ fontSize: "0.9375rem", lineHeight: "1.4" }}>
              {alertQuestion}
            </div>
          </div>

          {/* Choices */}
          <div className="flex flex-col gap-2 mb-4">
            {alert.choices.map((choice) => {
              const isSelected = selected === choice.key;
              const showResult = answered;
              const isCorrect = choice.correct;

              let bg = "rgba(255,255,255,0.04)";
              let border = "rgba(255,255,255,0.1)";
              let textColor = "rgba(255,255,255,0.75)";

              if (showResult && isCorrect) {
                bg = "rgba(25,128,56,0.18)";
                border = "rgba(25,128,56,0.5)";
                textColor = "#6fdc8c";
              } else if (showResult && isSelected && !isCorrect) {
                bg = "rgba(218,30,40,0.18)";
                border = "rgba(218,30,40,0.5)";
                textColor = "#ff8b8b";
              } else if (!showResult) {
                bg = "rgba(255,255,255,0.04)";
                border = "rgba(255,255,255,0.1)";
              }

              return (
                <button
                  key={choice.key}
                  onClick={() => handleSelect(choice.key)}
                  disabled={answered}
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                  style={{
                    background: bg,
                    border: `1.5px solid ${border}`,
                    cursor: answered ? "default" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!answered) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    if (!answered) (e.currentTarget as HTMLElement).style.background = bg;
                  }}
                >
                  <span
                    className="font-mono font-bold flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      background: showResult && isCorrect ? "#198038" : showResult && isSelected ? "#da1e28" : "rgba(255,255,255,0.1)",
                      color: "#fff",
                    }}
                  >
                    {choice.key}
                  </span>
                  <span style={{ color: textColor, fontSize: "0.875rem", lineHeight: "1.45", flex: 1 }}>
                    {choiceLabel(choice)}
                  </span>
                  {showResult && isCorrect && <CheckCircle2 size={15} color="#6fdc8c" className="flex-shrink-0" />}
                  {showResult && isSelected && !isCorrect && <XCircle size={15} color="#ff8b8b" className="flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered && selectedChoice && (
            <div
              className="rounded-xl px-4 py-3 mb-4"
              style={{
                background: selectedChoice.correct ? "rgba(25,128,56,0.12)" : "rgba(218,30,40,0.1)",
                border: `1.5px solid ${selectedChoice.correct ? "rgba(25,128,56,0.35)" : "rgba(218,30,40,0.35)"}`,
              }}
            >
              <div className="flex items-start gap-2.5">
                {selectedChoice.correct
                  ? <CheckCircle2 size={15} color="#6fdc8c" className="flex-shrink-0 mt-0.5" />
                  : <XCircle size={15} color="#ff8b8b" className="flex-shrink-0 mt-0.5" />}
                <div>
                  <div className="font-bold text-sm mb-0.5" style={{ color: selectedChoice.correct ? "#6fdc8c" : "#ff8b8b" }}>
                    {selectedChoice.correct
                        ? (isEN ? "Good reaction" : "Bonne réaction")
                        : (isEN ? `Wrong answer — Correct one: ${correctChoice ? choiceLabel(correctChoice) : ""}` : `Réponse incorrecte — La bonne : ${correctChoice ? choiceLabel(correctChoice) : ""}`)}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: "1.5" }}>
                    {choiceFeedback(selectedChoice)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue button */}
          {answered && (
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-bold transition-all"
              style={{
                background: "linear-gradient(135deg, #0043ce 0%, #0f62fe 100%)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9375rem",
                boxShadow: "0 8px 32px rgba(15,98,254,0.4)",
              }}
            >
              {isEN ? "Resume module" : "Reprendre le module"}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes alertSlideIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes criticalPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes sweep {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
