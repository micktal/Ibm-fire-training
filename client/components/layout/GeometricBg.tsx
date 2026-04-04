export default function GeometricBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0D47A1" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #0A3882 0%, #0D47A1 40%, #1565C0 100%)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "62%", height: "100%", background: "#0E4DB8", clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", top: "8%", left: "8%", width: "55%", height: "60%", background: "#1565C0", clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 90%)" }} />
      <div style={{ position: "absolute", top: "15%", right: "5%", width: "42%", height: "52%", background: "#1976D2", clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 88%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "45%", height: "40%", background: "#083070", clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", top: "28%", left: "22%", width: "38%", height: "38%", background: "#1E88E5", clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "35%", background: "#0A3882", clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", top: "35%", right: "18%", width: "28%", height: "25%", background: "rgba(255,255,255,0.04)", clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", bottom: "12%", right: "8%", width: "22%", height: "20%", background: "rgba(255,255,255,0.05)", clipPath: "polygon(0 0, 100% 10%, 88% 100%, 0 90%)" }} />
    </div>
  );
}
