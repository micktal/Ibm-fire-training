import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Menu } from "lucide-react";

interface BottomNavProps {
  onBack?: () => void;
  onNext?: () => void;
  onMenu?: () => void;
  nextLabel?: string;
}

export default function BottomNav({ onBack, onNext, onMenu, nextLabel }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <footer
      className="flex-shrink-0 flex items-center justify-center gap-6"
      style={{ height: "48px", background: "#fff", borderTop: "1px solid #e4e7f0", zIndex: 20, position: "relative" }}
    >
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        style={{ color: "#0D47A1", background: "none", border: "none", cursor: "pointer" }}
        onClick={onBack ?? (() => navigate(-1))}
        title="Retour"
      >
        <ChevronLeft size={18} />
      </button>

      <div style={{ width: "1px", height: "20px", background: "#e4e7f0" }} />

      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        style={{ color: "#0D47A1", background: "none", border: "none", cursor: "pointer" }}
        onClick={() => navigate("/")}
        title="Accueil"
      >
        <Home size={16} />
      </button>

      <div style={{ width: "1px", height: "20px", background: "#e4e7f0" }} />

      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        style={{ color: "#0D47A1", background: "none", border: "none", cursor: "pointer" }}
        onClick={onMenu ?? (() => navigate("/hub"))}
        title="Tableau de bord"
      >
        <Menu size={16} />
      </button>

      <div style={{ width: "1px", height: "20px", background: "#e4e7f0" }} />

      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        style={{ color: "#0D47A1", background: "none", border: "none", cursor: "pointer" }}
        onClick={onNext}
        title={nextLabel ?? "Suivant"}
      >
        <ChevronRight size={18} />
      </button>
    </footer>
  );
}
