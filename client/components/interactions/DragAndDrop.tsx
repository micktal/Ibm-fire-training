import { useState, useRef } from "react";
import {
  CheckCircle2, XCircle, RotateCcw, Layers,
  FileText, Server, Droplet, Armchair, Zap, FlaskConical, Flame, Laptop,
  Shirt, Package, Car, Printer, Lightbulb, Wrench, Coffee, Wind,
  LogOut, ScanEye, DoorClosed, ShieldCheck, Bell, MapPin,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  FileText: <FileText size={15} />,
  Server: <Server size={15} />,
  Droplet: <Droplet size={15} />,
  Armchair: <Armchair size={15} />,
  Zap: <Zap size={15} />,
  FlaskConical: <FlaskConical size={15} />,
  Flame: <Flame size={15} />,
  Laptop: <Laptop size={15} />,
  Shirt: <Shirt size={15} />,
  Package: <Package size={15} />,
  Car: <Car size={15} />,
  Printer: <Printer size={15} />,
  Lightbulb: <Lightbulb size={15} />,
  Wrench: <Wrench size={15} />,
  Coffee: <Coffee size={15} />,
  Wind: <Wind size={15} />,
  LogOut: <LogOut size={15} />,
  ScanEye: <ScanEye size={15} />,
  DoorClosed: <DoorClosed size={15} />,
  ShieldCheck: <ShieldCheck size={15} />,
  Bell: <Bell size={15} />,
  MapPin: <MapPin size={15} />,
};

export interface DragItem {
  id: string;
  label: string;
  sublabel?: string;
  emoji?: string;
  icon?: string;
  correctZone: string;
}

export interface DropZone {
  id: string;
  label: string;
  sublabel?: string;
  description?: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface DragDropExercise {
  type: "dragdrop";
  instruction: string;
  context?: string;
  items: DragItem[];
  zones: DropZone[];
  successMessage?: string;
}

interface PlacedItem {
  itemId: string;
  zoneId: string;
  correct: boolean;
}

interface Props {
  exercise: DragDropExercise;
  onComplete?: (score: number) => void;
}

export default function DragAndDrop({ exercise, onComplete }: Props) {
  const { lang } = useLanguage();
  const isEN = lang === "en";
  const [placed, setPlaced] = useState<PlacedItem[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dragItem = useRef<string | null>(null);

  const placedIds = new Set(placed.map((p) => p.itemId));
  const remaining = exercise.items.filter((i) => !placedIds.has(i.id));

  const getItemsInZone = (zoneId: string) =>
    placed.filter((p) => p.zoneId === zoneId).map((p) => exercise.items.find((i) => i.id === p.itemId)!);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    dragItem.current = itemId;
    setDragging(itemId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", itemId);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setHoveredZone(null);
    dragItem.current = null;
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || dragItem.current;
    if (!id) return;
    const item = exercise.items.find((i) => i.id === id);
    if (!item) return;

    // Remove from previous zone if re-dropping
    setPlaced((prev) => {
      const without = prev.filter((p) => p.itemId !== id);
      return [...without, { itemId: id, zoneId, correct: item.correctZone === zoneId }];
    });
    setHoveredZone(null);
    setDragging(null);
  };

  const handleDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setHoveredZone(zoneId);
  };

  const removeFromZone = (itemId: string) => {
    if (validated) return;
    setPlaced((prev) => prev.filter((p) => p.itemId !== itemId));
  };

  const validate = () => {
    setValidated(true);
    setShowResults(true);
    const correct = placed.filter((p) => p.correct).length;
    const score = Math.round((correct / exercise.items.length) * 100);
    onComplete?.(score);
  };

  const reset = () => {
    setPlaced([]);
    setValidated(false);
    setShowResults(false);
  };

  const correctCount = placed.filter((p) => p.correct).length;
  const allPlaced = placed.length === exercise.items.length;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0" }}>
      {/* Header */}
      <div className="px-5 py-3.5" style={{ background: "#161616" }}>
        <div className="flex items-center gap-2 mb-1">
          <Layers size={13} color="rgba(255,255,255,0.7)" />
          <span
            className="font-mono text-xs uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}
          >
            {isEN ? "Interactive Exercise — Drag & Drop" : "Exercice Interactif — Glisser-Déposer"}
          </span>
        </div>
        <p className="text-sm font-semibold text-white" style={{ lineHeight: "1.4" }}>
          {exercise.instruction}
        </p>
        {exercise.context && (
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            {exercise.context}
          </p>
        )}
      </div>

      <div className="p-5" style={{ background: "#f5f6f8" }}>
        {/* Source items */}
        {remaining.length > 0 && (
          <div className="mb-5">
            <div className="text-xs font-semibold mb-2.5" style={{ color: "#8d95aa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {isEN ? "Items to sort — drag to the right category" : "Éléments à classer — glissez vers la bonne catégorie"}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {remaining.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 cursor-grab active:cursor-grabbing select-none transition-all duration-150"
                  style={{
                    background: dragging === item.id ? "rgba(0,67,206,0.08)" : "#fff",
                    border: `1.5px solid ${dragging === item.id ? "#0043ce" : "#d0d4e2"}`,
                    boxShadow: dragging === item.id ? "0 4px 16px rgba(0,67,206,0.2)" : "0 1px 4px rgba(0,0,0,0.06)",
                    opacity: dragging === item.id ? 0.7 : 1,
                    transform: dragging === item.id ? "scale(1.03)" : "scale(1)",
                    userSelect: "none",
                  }}
                >
                  {(item.icon && ICON_MAP[item.icon]) ? (
                    <span style={{ color: "#4a5068", display: "flex", alignItems: "center" }}>
                      {ICON_MAP[item.icon]}
                    </span>
                  ) : null}
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "#161616" }}>
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <div className="text-xs" style={{ color: "#8d95aa", lineHeight: "1.3", marginTop: "1px" }}>
                        {item.sublabel}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drop zones */}
        <div className={`grid gap-4 ${exercise.zones.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : exercise.zones.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"}`}>
          {exercise.zones.map((zone) => {
            const itemsHere = getItemsInZone(zone.id);
            const isHovered = hoveredZone === zone.id;

            return (
              <div
                key={zone.id}
                onDrop={(e) => handleDrop(e, zone.id)}
                onDragOver={(e) => handleDragOver(e, zone.id)}
                onDragLeave={() => setHoveredZone(null)}
                className="rounded-xl transition-all duration-200"
                style={{
                  border: `2px dashed ${isHovered ? zone.color : zone.borderColor}`,
                  background: isHovered ? `${zone.bgColor}` : "#fff",
                  minHeight: "120px",
                  padding: "12px",
                  boxShadow: isHovered ? `0 0 0 4px ${zone.bgColor}` : "none",
                }}
              >
                {/* Zone label */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: zone.color }} />
                  <span className="text-xs font-bold" style={{ color: zone.color }}>
                    {zone.label}
                  </span>
                </div>
                {zone.sublabel && (
                  <div className="text-xs font-semibold mb-1" style={{ color: "#8d95aa" }}>{zone.sublabel}</div>
                )}
                {zone.description && (
                  <div className="text-xs mb-2" style={{ color: "#a0a8bb", lineHeight: "1.4", fontStyle: "italic" }}>{zone.description}</div>
                )}

                {/* Placed items */}
                <div className="flex flex-wrap gap-2">
                  {itemsHere.map((item) => {
                    const placement = placed.find((p) => p.itemId === item.id)!;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all"
                        style={{
                          background: validated
                            ? placement.correct
                              ? "rgba(25,128,56,0.1)"
                              : "rgba(218,30,40,0.08)"
                            : zone.bgColor,
                          border: `1.5px solid ${
                            validated
                              ? placement.correct
                                ? "rgba(25,128,56,0.35)"
                                : "rgba(218,30,40,0.3)"
                              : zone.borderColor
                          }`,
                          cursor: validated ? "default" : "pointer",
                        }}
                        onClick={() => !validated && removeFromZone(item.id)}
                        title={validated ? "" : (isEN ? "Click to remove" : "Cliquer pour retirer")}
                      >
                        {(item.icon && ICON_MAP[item.icon]) ? (
                          <span style={{ color: "#4a5068", display: "flex", alignItems: "center" }}>{ICON_MAP[item.icon]}</span>
                        ) : null}
                        <span className="text-xs font-semibold" style={{ color: "#161616" }}>
                          {item.label}
                        </span>
                        {validated && (
                          placement.correct
                            ? <CheckCircle2 size={12} style={{ color: "#198038" }} />
                            : <XCircle size={12} style={{ color: "#da1e28" }} />
                        )}
                      </div>
                    );
                  })}

                  {itemsHere.length === 0 && (
                    <div
                      className="text-xs italic"
                      style={{ color: isHovered ? zone.color : "#b0b7c9", padding: "4px 0" }}
                    >
                      {isHovered ? (isEN ? "Drop here" : "Déposez ici") : (isEN ? "Drop an item here" : "Déposez un élément ici")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #e4e7f0" }}>
          <div className="text-xs" style={{ color: "#8d95aa" }}>
            {placed.length}/{exercise.items.length} {isEN ? "items placed" : "éléments placés"}
            {validated && (
              <span className="ml-2 font-semibold" style={{ color: correctCount === exercise.items.length ? "#198038" : "#da1e28" }}>
                · {correctCount} {isEN ? "correct" : `correct${correctCount > 1 ? "s" : ""}`}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {validated && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "#f5f6f8", color: "#4a5068", border: "1.5px solid #e4e7f0" }}
              >
                <RotateCcw size={12} />
                {isEN ? "Retry" : "Réessayer"}
              </button>
            )}
            {!validated && (
              <button
                disabled={!allPlaced}
                onClick={validate}
                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
                style={{
                  background: allPlaced ? "#0043ce" : "#e4e7f0",
                  color: allPlaced ? "#fff" : "#8d95aa",
                  border: "none",
                  cursor: allPlaced ? "pointer" : "not-allowed",
                }}
              >
                <CheckCircle2 size={12} />
                {isEN ? "Validate" : "Valider"}
              </button>
            )}
          </div>
        </div>

        {/* Results panel */}
        {showResults && (
          <div
            className="mt-4 rounded-xl p-4"
            style={{
              background: correctCount === exercise.items.length ? "rgba(25,128,56,0.05)" : "rgba(218,30,40,0.04)",
              border: `1.5px solid ${correctCount === exercise.items.length ? "rgba(25,128,56,0.25)" : "rgba(218,30,40,0.2)"}`,
            }}
          >
            <div className="flex items-center gap-3">
              {correctCount === exercise.items.length
                ? <CheckCircle2 size={20} style={{ color: "#198038" }} />
                : <XCircle size={20} style={{ color: "#da1e28" }} />
              }
              <div>
                <div
                  className="text-sm font-bold"
                  style={{ color: correctCount === exercise.items.length ? "#0e6027" : "#a2191f" }}
                >
                  {correctCount === exercise.items.length
                    ? exercise.successMessage || (isEN ? "Perfect — all matches are correct!" : "Parfait — toutes les associations sont correctes !")
                    : (isEN ? `${correctCount}/${exercise.items.length} correct matches — retry!` : `${correctCount}/${exercise.items.length} associations correctes — réessayez !`)}
                </div>
                {correctCount < exercise.items.length && (
                  <div className="text-xs mt-0.5" style={{ color: "#6f7897" }}>
                    {isEN ? "Check the red items and reposition them." : "Vérifiez les éléments en rouge et repositionnez-les."}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
