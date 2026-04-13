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
  const [fetchError, setFetchError] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCert, setFilterCert] = useState<"all" | "yes" | "no">("all");

  const load = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const data = await fetchAllRegistrations();
      setRegistrations(data);
    } catch (e) {
      console.error("Admin fetch failed:", e);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
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
        style={{ background: "#0a1628", fontFamily: "'IBM Plex Sans', sans-serif" }}
      >
        {/* Subtle background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

        <div className="relative w-full" style={{ maxWidth: "420px", margin: "1rem" }}>
          {/* Logo bar */}
          <div className="flex items-center gap-3 mb-8 px-1">
            <IBMLogo variant="dark" height={30} />
            <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'IBM Plex Mono', monospace" }}>
              Fire Safety Platform
            </span>
          </div>

          {/* Card */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
            {/* Blue top band */}
            <div className="px-8 py-7" style={{ background: "linear-gradient(135deg, #0043ce 0%, #0031a9 100%)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -24, top: -24, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ position: "absolute", right: 20, bottom: -30, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Shield size={16} style={{ color: "#fff" }} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'IBM Plex Mono', monospace" }}>
                    Accès restreint
                  </span>
                </div>
                <h1 className="text-xl font-bold text-white mb-1" style={{ letterSpacing: "-0.01em" }}>
                  Espace Administrateur
                </h1>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                  Tableau de bord — Responsable Sécurité IBM.<br />
                  Accès réservé. Entrez le mot de passe pour consulter les données.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 py-7">
              <label className="text-xs font-semibold mb-2 block" style={{ color: "#4a5068", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Mot de passe
              </label>
              <div className="relative mb-2">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••••••••••"
                  style={{
                    width: "100%",
                    height: "44px",
                    paddingLeft: "2.4rem",
                    paddingRight: "0.75rem",
                    border: `1.5px solid ${pwError ? "#da1e28" : "#d0d4e2"}`,
                    borderRadius: "6px",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9rem",
                    outline: "none",
                    background: pwError ? "rgba(218,30,40,0.04)" : "#fff",
                    transition: "border-color 0.15s",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              {pwError && (
                <p className="text-xs mb-4 flex items-center gap-1.5" style={{ color: "#da1e28" }}>
                  <XCircle size={13} /> Mot de passe incorrect. Veuillez réessayer.
                </p>
              )}
              {!pwError && <div className="mb-5" />}
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 font-semibold text-sm text-white rounded-lg"
                style={{ padding: "0.8rem", background: "#0043ce", border: "none", cursor: "pointer", letterSpacing: "0.02em", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0031a9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0043ce")}
              >
                <Shield size={15} />
                Accéder au tableau de bord
              </button>
              <p className="text-center text-xs mt-5" style={{ color: "#b0b7c8" }}>
                IBM Fire Safety Training · Données confidentielles
              </p>
            </div>
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
        className="sticky top-0 z-20 flex items-center justify-between px-6 h-14"
        style={{ background: "#0a1628", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
      >
        <div className="flex items-center gap-4">
          <IBMLogo variant="dark" height={26} />
          <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.18)" }} />
          <div className="flex items-center gap-2">
            <Shield size={15} style={{ color: "rgba(255,255,255,0.7)" }} />
            <span className="font-bold text-sm uppercase" style={{ color: "#fff", letterSpacing: "0.08em" }}>
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
        {/* Error banner */}
        {fetchError && (
          <div className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 mb-5" style={{ background: "rgba(218,30,40,0.08)", border: "1.5px solid rgba(218,30,40,0.25)" }}>
            <div className="flex items-center gap-3">
              <XCircle size={18} style={{ color: "#da1e28", flexShrink: 0 }} />
              <div>
                <div className="font-semibold text-sm" style={{ color: "#da1e28" }}>Erreur de connexion à la base de données</div>
                <div className="text-xs mt-0.5" style={{ color: "#8d0a12" }}>Impossible de récupérer les données Supabase. Vérifiez la connexion réseau.</div>
              </div>
            </div>
            <button
              onClick={load}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg flex-shrink-0"
              style={{ background: "#da1e28", color: "#fff", border: "none", cursor: "pointer" }}
            >
              <RefreshCw size={14} />
              Réessayer
            </button>
          </div>
        )}

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
