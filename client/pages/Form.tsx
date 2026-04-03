import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowRight, Info, User, Mail, MapPin, Building2, Layers, LayoutGrid } from "lucide-react";
import { useUser } from "@/lib/userContext";
import { IBM_SITES } from "@/lib/courseData";

function Field({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "#4a5068" }}
      >
        {label}
        {required && <span style={{ color: "#da1e28" }}>*</span>}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1 text-xs" style={{ color: "#da1e28" }}>
          <AlertCircle size={11} />
          {error}
        </span>
      )}
    </div>
  );
}

export default function Form() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [fields, setFields] = useState({
    prenom: "",
    nom: "",
    email: "",
    campus: "",
    batiment: "",
    etage: "",
    zone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: string, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.prenom.trim()) e.prenom = "Champ requis";
    if (!fields.nom.trim()) e.nom = "Champ requis";
    if (!fields.email.trim()) {
      e.email = "Champ requis";
    } else if (!fields.email.toLowerCase().includes("@") || !fields.email.toLowerCase().includes("ibm.com")) {
      e.email = "Adresse @ibm.com requise";
    }
    if (!fields.campus) e.campus = "Sélectionnez votre site";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setUser({
      prenom: fields.prenom.trim(),
      nom: fields.nom.trim(),
      email: fields.email.trim(),
      campus: fields.campus,
      batiment: fields.batiment.trim(),
      etage: fields.etage.trim(),
      zone: fields.zone.trim(),
    });
    setTimeout(() => navigate("/hub"), 400);
  };

  const inputBase = {
    height: "38px",
    padding: "0 0.75rem",
    border: "1.5px solid #d0d4e2",
    borderRadius: "4px",
    background: "#fff",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.82rem",
    color: "#161616",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const inputErr = { ...inputBase, border: "1.5px solid #da1e28" };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f5f6f8", fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* Minimal topbar */}
      <header
        className="flex-shrink-0 bg-white border-b flex items-center justify-between px-5 h-12"
        style={{ borderColor: "#e4e7f0" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-end gap-0.5" style={{ height: "14px" }}>
            {[8, 14, 6, 12, 8].map((h, i) => (
              <span key={i} className="block rounded-sm" style={{ width: "2px", height: `${h}px`, background: "#0f62fe" }} />
            ))}
          </div>
          <span className="font-mono font-bold text-sm tracking-wide" style={{ color: "#0f62fe", fontFamily: "'IBM Plex Mono', monospace" }}>IBM</span>
          <div className="w-px h-4 mx-1" style={{ background: "#e4e7f0" }} />
          <span className="text-xs" style={{ color: "#8d95aa", fontFamily: "'IBM Plex Mono', monospace" }}>
            Formation obligatoire · Chapitre 1
          </span>
        </div>
        <span
          className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ color: "#da1e28", background: "rgba(218,30,40,0.06)", border: "1px solid rgba(218,30,40,0.15)", fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Étape 1 / 2
        </span>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{ maxWidth: "600px", background: "#fff", border: "1px solid #e4e7f0", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
        >
          {/* Card header */}
          <div className="relative overflow-hidden px-8 py-7" style={{ background: "#0043ce" }}>
            <div
              className="absolute pointer-events-none"
              style={{ right: "-20px", top: "-20px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}
            />
            <div className="flex items-end gap-0.5 mb-3" style={{ height: "20px" }}>
              {[10, 18, 7, 16, 9, 20, 12, 16].map((h, i) => (
                <span key={i} className="block rounded-sm" style={{ width: "3px", height: `${h}px`, background: "rgba(255,255,255,0.28)" }} />
              ))}
            </div>
            <div className="font-mono text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              IBM · Formation obligatoire · 2026
            </div>
            <h1 className="text-xl font-bold text-white mb-1.5" style={{ letterSpacing: "-0.02em" }}>
              Sécurité Incendie & Évacuation
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.55" }}>
              Renseignez vos informations avant de démarrer. Ces données permettent le suivi interne IBM de vos certifications.
            </p>
          </div>

          {/* Card body */}
          <div className="px-8 py-6">
            {/* Notice */}
            <div
              className="flex items-start gap-3 rounded-md px-4 py-3 mb-6"
              style={{ background: "rgba(15,98,254,0.05)", border: "1px solid rgba(15,98,254,0.14)" }}
            >
              <Info size={14} style={{ color: "#0043ce", flexShrink: 0, marginTop: "1px" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#0031a9" }}>
                Ce formulaire est requis avant d'accéder au module. Vos réponses sont transmises au service RH IBM et ne sont pas visibles dans l'interface.
              </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-5">
              {/* Nom / Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <Field id="f-prenom" label="Prénom" required error={errors.prenom}>
                  <div className="relative">
                    <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-prenom"
                      type="text"
                      placeholder="Sophie"
                      value={fields.prenom}
                      onChange={(e) => set("prenom", e.target.value)}
                      style={{ ...( errors.prenom ? inputErr : inputBase), paddingLeft: "2rem" }}
                    />
                  </div>
                </Field>
                <Field id="f-nom" label="Nom" required error={errors.nom}>
                  <div className="relative">
                    <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-nom"
                      type="text"
                      placeholder="Martin"
                      value={fields.nom}
                      onChange={(e) => set("nom", e.target.value)}
                      style={{ ...(errors.nom ? inputErr : inputBase), paddingLeft: "2rem" }}
                    />
                  </div>
                </Field>
              </div>

              {/* Email */}
              <Field id="f-email" label="Email IBM" required error={errors.email}>
                <div className="relative">
                  <Mail size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                  <input
                    id="f-email"
                    type="email"
                    placeholder="prenom.nom@fr.ibm.com"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    style={{ ...(errors.email ? inputErr : inputBase), paddingLeft: "2rem" }}
                  />
                </div>
              </Field>

              {/* Campus + Bâtiment */}
              <div className="grid grid-cols-2 gap-4">
                <Field id="f-campus" label="Campus / Site" required error={errors.campus}>
                  <div className="relative">
                    <MapPin size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" style={{ color: "#8d95aa" }} />
                    <select
                      id="f-campus"
                      value={fields.campus}
                      onChange={(e) => set("campus", e.target.value)}
                      style={{
                        ...(errors.campus ? inputErr : inputBase),
                        paddingLeft: "2rem",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238d95aa' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.7rem center",
                      }}
                    >
                      <option value="">-- Sélectionnez --</option>
                      {IBM_SITES.map((site) => (
                        <option key={site} value={site}>{site}</option>
                      ))}
                    </select>
                  </div>
                </Field>
                <Field id="f-batiment" label="Bâtiment">
                  <div className="relative">
                    <Building2 size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-batiment"
                      type="text"
                      placeholder="Bât. A, Tour 2"
                      value={fields.batiment}
                      onChange={(e) => set("batiment", e.target.value)}
                      style={{ ...inputBase, paddingLeft: "2rem" }}
                    />
                  </div>
                </Field>
              </div>

              {/* Étage + Zone */}
              <div className="grid grid-cols-2 gap-4">
                <Field id="f-etage" label="Étage">
                  <div className="relative">
                    <Layers size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-etage"
                      type="text"
                      placeholder="3e étage"
                      value={fields.etage}
                      onChange={(e) => set("etage", e.target.value)}
                      style={{ ...inputBase, paddingLeft: "2rem" }}
                    />
                  </div>
                </Field>
                <Field id="f-zone" label="Zone / Open space">
                  <div className="relative">
                    <LayoutGrid size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-zone"
                      type="text"
                      placeholder="Zone Nord"
                      value={fields.zone}
                      onChange={(e) => set("zone", e.target.value)}
                      style={{ ...inputBase, paddingLeft: "2rem" }}
                    />
                  </div>
                </Field>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-8 py-4"
            style={{ borderTop: "1px solid #e4e7f0", background: "#fafbfc" }}
          >
            <span className="text-xs" style={{ color: "#8d95aa" }}>
              Champs <span style={{ color: "#da1e28" }}>*</span> obligatoires
            </span>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 font-semibold text-sm text-white rounded transition-all"
              style={{
                padding: "0.65rem 1.4rem",
                background: submitting ? "#d0d4e2" : "#0043ce",
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#0031a9"; }}
              onMouseLeave={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = "#0043ce"; }}
            >
              {submitting ? "Chargement..." : "Démarrer la formation"}
              {!submitting && <ArrowRight size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
