import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowRight, ChevronLeft, Info, User, Mail, MapPin, Building2, Layers, LayoutGrid } from "lucide-react";
import IBMLogo from "@/components/IBMLogo";
import GeometricBg from "@/components/layout/GeometricBg";
import BottomNav from "@/components/layout/BottomNav";
import { useUser } from "@/lib/userContext";
import { IBM_SITES } from "@/lib/courseData";
import { useLanguage } from "@/lib/languageContext";
import { saveRegistration, getSessionId } from "@/lib/supabase";

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
  const { lang } = useLanguage();
  const isEN = lang === "en";

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
    const req = isEN ? "Required field" : "Champ requis";
    if (!fields.prenom.trim()) e.prenom = req;
    if (!fields.nom.trim()) e.nom = req;
    if (!fields.email.trim()) {
      e.email = req;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = isEN ? "Invalid email address" : "Adresse email invalide";
    }
    if (!fields.campus) e.campus = isEN ? "Select your site" : "Sélectionnez votre site";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    const userInfo = {
      prenom: fields.prenom.trim(),
      nom: fields.nom.trim(),
      email: fields.email.trim(),
      campus: fields.campus,
      batiment: fields.batiment.trim(),
      etage: fields.etage.trim(),
      zone: fields.zone.trim(),
    };
    setUser(userInfo);
    // Save to Supabase (non-blocking — proceed even if it fails)
    saveRegistration({
      first_name: userInfo.prenom,
      last_name: userInfo.nom,
      email: userInfo.email,
      building: userInfo.batiment || userInfo.campus,
      floor: userInfo.etage,
      zone: userInfo.zone,
      language: lang as "fr" | "en",
      session_id: getSessionId(),
    }).catch(console.error);
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
      className="fixed inset-0 flex flex-col"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* Topbar */}
      <header
        className="flex-shrink-0 bg-white flex items-center justify-between px-5 h-12"
        style={{ borderBottom: "1px solid #e4e7f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", zIndex: 20 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#0D47A1", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">{isEN ? "Home" : "Accueil"}</span>
          </button>
          <div className="w-px h-4" style={{ background: "#e4e7f0" }} />
          <IBMLogo variant="light" height={28} />
          <div className="w-px h-4" style={{ background: "#e4e7f0" }} />
          <span className="text-xs hidden sm:inline font-semibold uppercase" style={{ color: "#0D47A1", letterSpacing: "0.1em", fontFamily: "'IBM Plex Mono', monospace" }}>
            {isEN ? "Mandatory training" : "Formation obligatoire"}
          </span>
        </div>
        <span
          className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color: "#0D47A1", background: "rgba(13,71,161,0.07)", border: "1px solid rgba(13,71,161,0.2)", fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {isEN ? "Step 1 / 2" : "Étape 1 / 2"}
        </span>
      </header>

      {/* Geometric bg + scrollable form */}
      <div className="flex-1 relative overflow-hidden">
        <GeometricBg />
        <div className="relative z-10 h-full overflow-y-auto">
          <div className="flex items-center justify-center px-4 py-3 min-h-full">
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{ maxWidth: "600px", background: "#fff", border: "1px solid #e4e7f0", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
        >
          {/* Card header */}
          <div className="relative overflow-hidden px-8 py-5" style={{ background: "#0043ce" }}>
            <div
              className="absolute pointer-events-none"
              style={{ right: "-20px", top: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}
            />
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  IBM · {isEN ? "Mandatory training" : "Formation obligatoire"} · 2026
                </div>
                <h1 className="font-bold text-white" style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", lineHeight: "1.2" }}>
                  {isEN ? "Fire Safety & Evacuation" : "Sécurité Incendie & Évacuation"}
                </h1>
              </div>
              <div className="flex items-end gap-0.5 flex-shrink-0" style={{ height: "18px" }}>
                {[8, 16, 6, 14, 8, 18, 10, 14].map((h, i) => (
                  <span key={i} className="block rounded-sm" style={{ width: "3px", height: `${h}px`, background: "rgba(255,255,255,0.25)" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="px-7 py-4">
            {/* Notice — compact inline strip */}
            <div
              className="flex items-center gap-2 rounded-md px-3 py-2 mb-4"
              style={{ background: "rgba(15,98,254,0.05)", border: "1px solid rgba(15,98,254,0.14)" }}
            >
              <Info size={13} style={{ color: "#0043ce", flexShrink: 0 }} />
              <p className="text-xs" style={{ color: "#0031a9", lineHeight: "1.4" }}>
                {isEN
                  ? "Fill in your details below. Responses are sent to IBM HR."
                  : "Renseignez vos informations ci-dessous. Données transmises au service RH IBM."}
              </p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-3.5">
              {/* Nom / Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <Field id="f-prenom" label={isEN ? "First name" : "Prénom"} required error={errors.prenom}>
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
                <Field id="f-nom" label={isEN ? "Last name" : "Nom"} required error={errors.nom}>
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
              <Field id="f-email" label={isEN ? "Email" : "Email"} required error={errors.email}>
                <div className="relative">
                  <Mail size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                  <input
                    id="f-email"
                    type="text"
                    inputMode="email"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-form-type="other"
                    placeholder={isEN ? "your@email.com" : "votre@email.com"}
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    style={{ ...(errors.email ? inputErr : inputBase), paddingLeft: "2rem" }}
                  />
                </div>
              </Field>

              {/* Campus + Bâtiment */}
              <div className="grid grid-cols-2 gap-4">
                <Field id="f-campus" label={isEN ? "Campus / Site" : "Campus / Site"} required error={errors.campus}>
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
                      <option value="">{isEN ? "-- Select --" : "-- Sélectionnez --"}</option>
                      {IBM_SITES.map((site) => (
                        <option key={site} value={site}>{site}</option>
                      ))}
                    </select>
                  </div>
                </Field>
                <Field id="f-batiment" label={isEN ? "Building" : "Bâtiment"}>
                  <div className="relative">
                    <Building2 size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-batiment"
                      type="text"
                      placeholder={isEN ? "Bldg. A, Tower 2" : "Bât. A, Tour 2"}
                      value={fields.batiment}
                      onChange={(e) => set("batiment", e.target.value)}
                      style={{ ...inputBase, paddingLeft: "2rem" }}
                    />
                  </div>
                </Field>
              </div>

              {/* Étage + Zone */}
              <div className="grid grid-cols-2 gap-4">
                <Field id="f-etage" label={isEN ? "Floor" : "Étage"}>
                  <div className="relative">
                    <Layers size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-etage"
                      type="text"
                      placeholder={isEN ? "3rd floor" : "3e étage"}
                      value={fields.etage}
                      onChange={(e) => set("etage", e.target.value)}
                      style={{ ...inputBase, paddingLeft: "2rem" }}
                    />
                  </div>
                </Field>
                <Field id="f-zone" label={isEN ? "Zone / Open space" : "Zone / Open space"}>
                  <div className="relative">
                    <LayoutGrid size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#8d95aa" }} />
                    <input
                      id="f-zone"
                      type="text"
                      placeholder={isEN ? "North Zone" : "Zone Nord"}
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
            className="flex items-center justify-between px-7 py-3"
            style={{ borderTop: "1px solid #e4e7f0", background: "#fafbfc" }}
          >
            <span className="text-xs" style={{ color: "#8d95aa" }}>
{isEN ? "* Required fields" : <>Champs <span style={{ color: "#da1e28" }}>*</span> obligatoires</>}
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
              {submitting ? (isEN ? "Loading..." : "Chargement...") : (isEN ? "Start training" : "Démarrer la formation")}
              {!submitting && <ArrowRight size={15} />}
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>

      <BottomNav onBack={() => navigate("/")} onNext={handleSubmit} />
    </div>
  );
}
