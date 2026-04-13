import { useState, useEffect } from "react";
import { Download, RefreshCw, Shield, CheckCircle2, XCircle, Clock, Users, Award, Search, Lock } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";
import { fetchAllRegistrations, TrainingRegistration } from "@/lib/supabase";

const ADMIN_PASSWORD = "ibm-securite-2026";

function exportToCSV(data: TrainingRegistration[]) {
  const headers = [
    "DATE INSCRIPTION",
    "PRENOM",
    "NOM",
    "EMAIL",
    "BATIMENT / SITE",
    "ETAGE",
    "ZONE",
    "LANGUE",
    "MODULES COMPLETES",
    "MODULES / TOTAL",
    "SCORE MOYEN (%)",
    "CERTIFICAT OBTENU",
    "DATE COMPLETION",
    "SESSION ID",
  ];

  const rows = data.map((r) => [
    r.created_at ? new Date(r.created_at).toLocaleDateString("fr-FR") : "",
    r.first_name ?? "",
    r.last_name ?? "",
    r.email ?? "",
    r.building ?? "",
    r.floor ?? "",
    r.zone ?? "",
    (r.language ?? "").toUpperCase(),
    r.completed_modules ?? 0,
    `${r.completed_modules ?? 0}/${r.total_modules ?? 14}`,
    r.average_score ? `${r.average_score.toFixed(1)}%` : "0%",
    r.certificate_obtained ? "OUI" : "NON",
    r.completed_at ? new Date(r.completed_at).toLocaleDateString("fr-FR") : "",
    r.session_id ?? "",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"))
    .join("\r\n");

  // Explicit UTF-8 BOM bytes (0xEF 0xBB 0xBF) for proper Excel encoding
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const content = "sep=;\r\n" + csv;
  const encoder = new TextEncoder();
  const encoded = encoder.encode(content);
  const blob = new Blob([bom, encoded], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `IBM_Formation_Incendie_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [registrations, setRegistrations] = useState<TrainingRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCert, setFilterCert] = useState<"all" | "yes" | "no">("all");

  const load = async () => {
    setLoading(true);
    const data = await fetchAllRegistrations();
    setRegistrations(data);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) load();
  }, [authenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.building ?? "").toLowerCase().includes(q);
    const matchCert =
      filterCert === "all" ||
      (filterCert === "yes" && r.certificate_obtained) ||
      (filterCert === "no" && !r.certificate_obtained);
    return matchSearch && matchCert;
  });

  const totalCert = registrations.filter((r) => r.certificate_obtained).length;
  const avgScore =
    registrations.length > 0
      ? Math.round(registrations.reduce((s, r) => s + (r.average_score ?? 0), 0) / registrations.length)
      : 0;

  // ── Login screen ───────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: "linear-gradient(145deg, #0a1628, #0D47A1)", fontFamily: "'IBM Plex Sans', sans-serif" }}
      >
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{ maxWidth: "400px", background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", margin: "1rem" }}
        >
          {/* Header */}
          <div className="px-8 py-6" style={{ background: "#0043ce" }}>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                alt="IBM"
                style={{ height: "28px", filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div className="mb-2">
              <div className="font-bold text-white" style={{ fontSize: "1rem" }}>Espace Administrateur</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>IBM · Sécurité Incendie</div>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.5" }}>
              Accès réservé au responsable sécurité IBM. Entrez le mot de passe pour consulter les inscriptions.
            </p>
          </div>

          {/* Login form */}
          <div className="px-8 py-6">
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#4a5068" }}>
              Mot de passe
            </label>
            <div className="relative mb-4">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••••••••••"
                style={{
                  width: "100%",
                  height: "40px",
                  paddingLeft: "2.2rem",
                  paddingRight: "0.75rem",
                  border: `1.5px solid ${pwError ? "#da1e28" : "#d0d4e2"}`,
                  borderRadius: "4px",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>
            {pwError && (
              <p className="text-xs mb-4 flex items-center gap-1.5" style={{ color: "#da1e28" }}>
                <XCircle size={13} /> Mot de passe incorrect
              </p>
            )}
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 font-semibold text-sm text-white rounded"
              style={{ padding: "0.7rem", background: "#0043ce", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0031a9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0043ce")}
            >
              Accéder au tableau de bord
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#f0f4fa", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Topbar */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between px-6 h-14 bg-white"
        style={{ borderBottom: "1px solid #e4e7f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <IBMLogo variant="dark" height={26} />
          <div className="w-px h-5" style={{ background: "#e4e7f0" }} />
          <div className="flex items-center gap-2">
            <Shield size={15} style={{ color: "#0D47A1" }} />
            <span className="font-bold text-sm uppercase" style={{ color: "#0D47A1", letterSpacing: "0.08em" }}>
              Tableau de bord — Responsable Sécurité
            </span>
          </div>
        </div>
        <button
          onClick={() => exportToCSV(filtered)}
          className="flex items-center gap-2 font-semibold text-sm text-white px-4 py-2 rounded-lg"
          style={{ background: "#198038", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0e6027")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#198038")}
        >
          <Download size={15} />
          Exporter CSV ({filtered.length})
        </button>
      </header>

      <div className="px-6 py-6 max-w-7xl mx-auto">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total inscrits", value: registrations.length, icon: <Users size={18} />, color: "#0D47A1", bg: "rgba(13,71,161,0.07)" },
            { label: "Certificats obtenus", value: totalCert, icon: <Award size={18} />, color: "#198038", bg: "rgba(25,128,56,0.07)" },
            { label: "Taux de complétion", value: `${registrations.length > 0 ? Math.round((totalCert / registrations.length) * 100) : 0}%`, icon: <CheckCircle2 size={18} />, color: "#0043ce", bg: "rgba(0,67,206,0.07)" },
            { label: "Score moyen", value: `${avgScore}%`, icon: <Clock size={18} />, color: "#b45309", bg: "rgba(180,83,9,0.07)" },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-4 bg-white" style={{ border: "1.5px solid #e4e7f0" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: stat.bg, color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <div className="font-bold text-2xl" style={{ color: stat.color, fontFamily: "'IBM Plex Mono', monospace" }}>{stat.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#8d95aa" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1" style={{ minWidth: "200px", maxWidth: "360px" }}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
            <input
              type="text"
              placeholder="Rechercher (nom, email, bâtiment…)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", height: "36px",
                paddingLeft: "2.2rem", paddingRight: "0.75rem",
                border: "1.5px solid #d0d4e2", borderRadius: "6px",
                fontSize: "0.82rem", fontFamily: "'IBM Plex Sans', sans-serif", outline: "none",
              }}
            />
          </div>
          <div className="flex gap-2">
            {(["all", "yes", "no"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setFilterCert(val)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{
                  border: "1.5px solid",
                  borderColor: filterCert === val ? "#0043ce" : "#d0d4e2",
                  background: filterCert === val ? "#0043ce" : "#fff",
                  color: filterCert === val ? "#fff" : "#4a5068",
                  cursor: "pointer",
                }}
              >
                {val === "all" ? "Tous" : val === "yes" ? "Certifiés ✓" : "Non certifiés"}
              </button>
            ))}
          </div>
          <button
            onClick={load}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ml-auto"
            style={{ border: "1.5px solid #d0d4e2", background: "#fff", color: "#4a5068", cursor: "pointer" }}
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Actualiser
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e4e7f0", background: "#fff" }}>
          {loading ? (
            <div className="flex items-center justify-center py-16 text-sm" style={{ color: "#8d95aa" }}>
              <RefreshCw size={16} className="animate-spin mr-2" /> Chargement…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <Users size={32} style={{ color: "#d0d4e2" }} />
              <p className="text-sm" style={{ color: "#8d95aa" }}>Aucune inscription pour le moment</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ background: "#f8f9fc", borderBottom: "1.5px solid #e4e7f0" }}>
                    {["Date", "Nom complet", "Email", "Site / Bâtiment", "Étage / Zone", "Langue", "Modules", "Score", "Certificat"].map((h) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#8d95aa", letterSpacing: "0.06em", fontSize: "0.75rem", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={r.id ?? i}
                      style={{ borderBottom: "1px solid #f0f2f8", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}
                    >
                      <td style={{ padding: "10px 14px", color: "#8d95aa", whiteSpace: "nowrap" }}>
                        {r.created_at ? new Date(r.created_at).toLocaleDateString("fr-FR") : "—"}
                      </td>
                      <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0a2052", whiteSpace: "nowrap" }}>
                        {r.first_name} {r.last_name}
                      </td>
                      <td style={{ padding: "10px 14px", color: "#4a5068" }}>
                        {r.email}
                      </td>
                      <td style={{ padding: "10px 14px", color: "#4a5068", whiteSpace: "nowrap" }}>
                        {r.building ?? "—"}
                      </td>
                      <td style={{ padding: "10px 14px", color: "#6f7897", whiteSpace: "nowrap" }}>
                        {[r.floor, r.zone].filter(Boolean).join(" · ") || "—"}
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{
                            background: r.language === "en" ? "rgba(0,67,206,0.08)" : "rgba(218,30,40,0.07)",
                            color: r.language === "en" ? "#0043ce" : "#da1e28",
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          {r.language.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#0D47A1", fontWeight: 700 }}>
                          {r.completed_modules ?? 0}
                        </span>
                        <span style={{ color: "#adb3c8" }}>/{r.total_modules ?? 14}</span>
                      </td>
                      <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: (r.average_score ?? 0) >= 80 ? "#198038" : "#b45309", fontWeight: 700 }}>
                          {r.average_score ?? 0}%
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        {r.certificate_obtained ? (
                          <span className="flex items-center gap-1 font-semibold text-xs" style={{ color: "#198038" }}>
                            <CheckCircle2 size={14} /> Obtenu
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs" style={{ color: "#adb3c8" }}>
                            <XCircle size={14} /> En cours
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-center mt-4" style={{ color: "#adb3c8" }}>
          IBM Fire Safety Training · Données confidentielles · Accès restreint
        </p>
      </div>
    </div>
  );
}
