import { useState, useRef } from "react";
import { CheckCircle2, XCircle, RotateCcw, Puzzle } from "lucide-react";
import { OrderPuzzleExercise } from "@/lib/interactionData";
import { useLanguage } from "@/lib/languageContext";

interface Props {
  exercise: OrderPuzzleExercise;
  onComplete?: (score: number) => void;
}

export default function OrderPuzzle({ exercise, onComplete }: Props) {
  const [order, setOrder] = useState<string[]>(() => {
    const ids = exercise.pieces.map((p) => p.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  });
  const [validated, setValidated] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOver = useRef<string | null>(null);

  const pieceMap = Object.fromEntries(exercise.pieces.map((p) => [p.id, p]));

  const handleDragStart = (id: string) => setDraggingId(id);
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    dragOver.current = id;
  };
  const handleDrop = () => {
    if (!draggingId || !dragOver.current || draggingId === dragOver.current) return;
    const next = [...order];
    const fromIdx = next.indexOf(draggingId);
    const toIdx = next.indexOf(dragOver.current);
    next.splice(fromIdx, 1);
    next.splice(toIdx, 0, draggingId);
    setOrder(next);
    setDraggingId(null);
    dragOver.current = null;
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...order];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setOrder(next);
  };

  const moveDown = (i: number) => {
    if (i === order.length - 1) return;
    const next = [...order];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setOrder(next);
  };

  const validate = () => {
    setValidated(true);
    const correct = order.filter((id, idx) => pieceMap[id].correctPosition === idx + 1).length;
    const score = Math.round((correct / order.length) * 100);
    onComplete?.(score);
  };

  const reset = () => {
    const ids = exercise.pieces.map((p) => p.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setOrder(ids);
    setValidated(false);
    setDraggingId(null);
  };

  const correctCount = validated ? order.filter((id, idx) => pieceMap[id].correctPosition === idx + 1).length : 0;
  const { lang } = useLanguage();
  const isEN = lang === "en";

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-2"
        style={{ background: "linear-gradient(135deg, #b45309, #92400e)", boxShadow: "0 4px 16px rgba(180,83,9,0.2)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
          <Puzzle size={14} color="#fff" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-white uppercase" style={{ fontSize: "0.82rem", letterSpacing: "0.08em" }}>{isEN ? (exercise.titleEn ?? exercise.title) : exercise.title}</span>
          {exercise.subtitle && <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{isEN ? (exercise.subtitleEn ?? exercise.subtitle) : exercise.subtitle}</div>}
        </div>
      </div>

      <div className="text-xs text-center mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(180,83,9,0.07)", color: "#92400e", border: "1px solid rgba(180,83,9,0.2)" }}>
        {isEN ? (exercise.instructionEn ?? exercise.instruction) : exercise.instruction}
      </div>

      {/* Pieces list */}
      <div className="flex flex-col gap-2 mb-4">
        {order.map((id, i) => {
          const piece = pieceMap[id];
          const isCorrect = validated && piece.correctPosition === i + 1;
          const isWrong = validated && piece.correctPosition !== i + 1;
          return (
            <div
              key={id}
              draggable={!validated}
              onDragStart={() => handleDragStart(id)}
              onDragOver={(e) => handleDragOver(e, id)}
              onDrop={handleDrop}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
              style={{
                background: isCorrect ? "rgba(25,128,56,0.06)" : isWrong ? "rgba(218,30,40,0.05)" : draggingId === id ? "rgba(13,71,161,0.08)" : "#fff",
                border: `2px solid ${isCorrect ? "rgba(25,128,56,0.3)" : isWrong ? "rgba(218,30,40,0.3)" : draggingId === id ? "#0D47A1" : "#e4e7f0"}`,
                cursor: validated ? "default" : "grab",
                opacity: draggingId === id ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              {/* Position badge */}
              <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                style={{ background: isCorrect ? "#198038" : isWrong ? "#da1e28" : "#0D47A1", color: "#fff", fontFamily: "'IBM Plex Mono', monospace" }}>
                {i + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold" style={{ fontSize: "0.85rem", color: "#0a2052" }}>{isEN ? (piece.labelEn ?? piece.label) : piece.label}</div>
                {piece.sublabel && <div className="text-xs" style={{ color: "#8d95aa", marginTop: "1px" }}>{isEN ? (piece.sublabelEn ?? piece.sublabel) : piece.sublabel}</div>}
              </div>

              {/* Status or arrows */}
              {validated ? (
                isCorrect
                  ? <CheckCircle2 size={16} style={{ color: "#198038", flexShrink: 0 }} />
                  : <div className="text-xs font-mono" style={{ color: "#da1e28", flexShrink: 0 }}>→ pos.{piece.correctPosition}</div>
              ) : (
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button onClick={() => moveUp(i)} disabled={i === 0} style={{ background: "none", border: "none", cursor: i === 0 ? "not-allowed" : "pointer", opacity: i === 0 ? 0.3 : 0.7, padding: "2px 4px", fontSize: "10px", color: "#0D47A1" }}>▲</button>
                  <button onClick={() => moveDown(i)} disabled={i === order.length - 1} style={{ background: "none", border: "none", cursor: i === order.length - 1 ? "not-allowed" : "pointer", opacity: i === order.length - 1 ? 0.3 : 0.7, padding: "2px 4px", fontSize: "10px", color: "#0D47A1" }}>▼</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validate / results */}
      {!validated ? (
        <button
          onClick={validate}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold"
          style={{ background: "linear-gradient(135deg, #b45309, #92400e)", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.9375rem", boxShadow: "0 4px 16px rgba(180,83,9,0.3)" }}
        >
          {isEN ? "Validate my sequence" : "Valider ma séquence"}
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: correctCount === order.length ? "rgba(25,128,56,0.08)" : "rgba(180,83,9,0.08)", border: `1.5px solid ${correctCount === order.length ? "rgba(25,128,56,0.25)" : "rgba(180,83,9,0.25)"}` }}>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: correctCount === order.length ? "#0e6027" : "#92400e" }}>
              {correctCount === order.length ? (exercise.successMessage ?? (isEN ? "Perfect sequence!" : "Séquence parfaite !")) : (isEN ? `${correctCount}/${order.length} correct positions — ▲▼ show the right position` : `${correctCount}/${order.length} positions correctes — les ▲▼ indiquent la bonne position`)}
            </div>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(13,71,161,0.08)", color: "#0D47A1", border: "1px solid rgba(13,71,161,0.2)", cursor: "pointer" }}>
            <RotateCcw size={12} /> {isEN ? "Retry" : "Refaire"}
          </button>
        </div>
      )}
    </div>
  );
}
