import React from "react";

// ── Data ─────────────────────────────────────────────────────────
const MODULES_DATA = [
  // Chapitre 1
  { num: 1,  chapter: 1, title: "Comprendre un départ de feu",        subtitle: "Identifier les signaux en moins de 10 secondes",       duration: "8 min",  video: true,  podcast: true  },
  { num: 2,  chapter: 1, title: "Le triangle du feu",                  subtitle: "Combustible · Comburant · Chaleur",                    duration: "6 min",  video: true,  podcast: false },
  { num: 3,  chapter: 1, title: "Propagation d'un incendie",           subtitle: "Chaque décision compte",                               duration: "10 min", video: true,  podcast: false },
  { num: 4,  chapter: 1, title: "Classes de feu",                      subtitle: "Choisir le bon extincteur",                            duration: "7 min",  video: true,  podcast: false },
  { num: 5,  chapter: 1, title: "Utiliser un extincteur",              subtitle: "La séquence PASS en pratique",                         duration: "9 min",  video: true,  podcast: true  },
  { num: 6,  chapter: 1, title: "Intervenir ou évacuer ?",             subtitle: "Décision en quelques secondes",                        duration: "10 min", video: true,  podcast: false },
  { num: 7,  chapter: 1, title: "Simulation incendie",                 subtitle: "Mise en situation chronométrée",                       duration: "12 min", video: true,  podcast: false },
  // Chapitre 2
  { num: 8,  chapter: 2, title: "Déclencher l'alarme",                 subtitle: "Quand et comment activer l'alerte",                    duration: "6 min",  video: true,  podcast: false },
  { num: 9,  chapter: 2, title: "Garder son calme et guider",          subtitle: "Posture et communication en situation de crise",        duration: "7 min",  video: true,  podcast: false },
  { num: 10, chapter: 2, title: "Fermer les portes",                   subtitle: "Sors · Ferme · Signale",                               duration: "5 min",  video: true,  podcast: false },
  { num: 11, chapter: 2, title: "Vérifier que personne ne reste",      subtitle: "Exploration rapide et sécurisée",                      duration: "8 min",  video: true,  podcast: false },
  { num: 12, chapter: 2, title: "Faire face à la fumée",               subtitle: "Bons réflexes dans un environnement enfumé",           duration: "8 min",  video: true,  podcast: false },
  { num: 13, chapter: 2, title: "Escaliers ou espace sécurisé",        subtitle: "Jamais l'ascenseur — toujours l'escalier",             duration: "7 min",  video: false, podcast: false },
  { num: 14, chapter: 2, title: "Procédure complète d'évacuation",     subtitle: "Simulation finale chronométrée",                       duration: "12 min", video: true,  podcast: false },
];

const TOTAL_DURATION_MIN = MODULES_DATA.reduce(
  (acc, m) => acc + parseInt(m.duration),
  0
);

// ── Sub-components ────────────────────────────────────────────────
function Badge({ ok, pending, label }: { ok: boolean; pending: boolean; label: string }) {
  if (ok) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "#d1fae5", color: "#065f46", borderRadius: "9999px", padding: "2px 10px", fontSize: "0.72rem", fontWeight: 700 }}>
        <span style={{ fontSize: "0.75rem" }}>✓</span> {label}
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "#fef9c3", color: "#854d0e", borderRadius: "9999px", padding: "2px 10px", fontSize: "0.72rem", fontWeight: 700 }}>
      <span style={{ fontSize: "0.75rem" }}>⏳</span> En validation
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
        {children}
      </h2>
      <div style={{ height: "2px", background: "#1e3a5f", width: "3rem", marginTop: "0.35rem" }} />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function PresentationPage() {
  const ch1 = MODULES_DATA.filter((m) => m.chapter === 1);
  const ch2 = MODULES_DATA.filter((m) => m.chapter === 2);
  const totalVideo = MODULES_DATA.filter((m) => m.video).length;
  const totalPodcast = MODULES_DATA.filter((m) => m.podcast).length;

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#f7f8fb", minHeight: "100vh" }}>
      <style>{`
        @media print {
          @page { size: A4; margin: 12mm 14mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          .no-print { display: none !important; }
          .print-break { break-before: page; }
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* Toolbar */}
      <div className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#1e3a5f", padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>
          IBM · Document de présentation e-learning
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => window.print()}
            style={{ background: "#4f86c6", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1.25rem", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
          >
            🖨️ Imprimer / Enregistrer PDF
          </button>
          <button
            onClick={() => window.history.back()}
            style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1.25rem", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}
          >
            ← Retour
          </button>
        </div>
      </div>

      {/* Document */}
      <div style={{ maxWidth: "820px", margin: "0 auto", paddingTop: "72px", paddingBottom: "3rem" }}>
        <div style={{ background: "white", borderRadius: "1rem", boxShadow: "0 2px 24px rgba(0,0,0,0.07)", padding: "2.5rem 3rem" }}>

          {/* ── HEADER ─────────────────────────────────────────── */}
          <div style={{ borderBottom: "3px solid #1e3a5f", paddingBottom: "1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                IBM France · HSE · Formation Sécurité
              </div>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1e3a5f", margin: "0 0 0.4rem" }}>
                Formation Sécurité Incendie
              </h1>
              <div style={{ fontSize: "1rem", color: "#4f86c6", fontWeight: 600 }}>
                Document de présentation — Plateforme e-learning
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              {/* IBM Logo placeholder */}
              <div style={{ background: "#1e3a5f", color: "white", borderRadius: "0.5rem", padding: "0.5rem 1rem", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "0.15em" }}>
                IBM
              </div>
              <div style={{ fontSize: "0.7rem", color: "#9ca3af", marginTop: "0.4rem" }}>
                © IBM France 2026
              </div>
            </div>
          </div>

          {/* ── SECTION 1 — PRÉSENTATION ───────────────────────── */}
          <div style={{ marginBottom: "2rem" }}>
            <SectionTitle>1. Présentation de la plateforme</SectionTitle>
            <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.88rem", margin: "0 0 0.75rem" }}>
              La plateforme e-learning IBM Sécurité Incendie est une formation digitale interactive destinée à l'ensemble des collaborateurs IBM France. Elle a été conçue pour transmettre les réflexes essentiels en matière de prévention et de gestion des incendies en environnement professionnel.
            </p>
            <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.88rem", margin: 0 }}>
              La formation est disponible en <strong>français</strong> et en <strong>anglais</strong>, adaptée aux sites IBM France, et conforme aux exigences réglementaires HSE en vigueur.
            </p>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1.25rem" }}>
              {[
                { value: "14", label: "Modules de formation" },
                { value: "2", label: "Chapitres thématiques" },
                { value: `${TOTAL_DURATION_MIN} min`, label: "Durée totale estimée" },
                { value: "2", label: "Langues (FR / EN)" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#eff6ff", borderRadius: "0.75rem", padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#1e3a5f" }}>{s.value}</div>
                  <div style={{ fontSize: "0.7rem", color: "#4b5563", marginTop: "0.2rem", lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 2 — STRUCTURE ──────────────────────────── */}
          <div style={{ marginBottom: "2rem" }}>
            <SectionTitle>2. Structure pédagogique</SectionTitle>
            <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.88rem", margin: "0 0 1rem" }}>
              La formation est organisée en <strong>2 chapitres</strong> progressifs, couvrant la lutte contre l'incendie (Chapitre 1) puis les procédures d'évacuation (Chapitre 2).
            </p>

            {/* Chapitre 1 */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ background: "#1e3a5f", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem 0.5rem 0 0", fontWeight: 700, fontSize: "0.82rem" }}>
                Chapitre 1 — Lutte contre l'incendie &nbsp;·&nbsp; 7 modules
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <thead>
                  <tr style={{ background: "#e8f0fd" }}>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "#1e3a5f", fontWeight: 700, width: "40px" }}>N°</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "#1e3a5f", fontWeight: 700 }}>Titre du module</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "center", color: "#1e3a5f", fontWeight: 700, width: "60px" }}>Durée</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "center", color: "#1e3a5f", fontWeight: 700, width: "110px" }}>Vidéo</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "center", color: "#1e3a5f", fontWeight: 700, width: "120px" }}>Podcast</th>
                  </tr>
                </thead>
                <tbody>
                  {ch1.map((m, i) => (
                    <tr key={m.num} style={{ background: i % 2 === 0 ? "white" : "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "0.55rem 0.75rem", color: "#6b7280", fontWeight: 700, textAlign: "center" }}>
                        {m.num}
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>
                        <div style={{ fontWeight: 700, color: "#111827" }}>{m.title}</div>
                        <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>{m.subtitle}</div>
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem", textAlign: "center", color: "#4b5563", fontWeight: 600 }}>{m.duration}</td>
                      <td style={{ padding: "0.55rem 0.75rem", textAlign: "center" }}>
                        <Badge ok={m.video} pending={!m.video} label="Intégrée" />
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem", textAlign: "center" }}>
                        <Badge ok={m.podcast} pending={!m.podcast} label="Intégré" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chapitre 2 */}
            <div>
              <div style={{ background: "#1e3a5f", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem 0.5rem 0 0", fontWeight: 700, fontSize: "0.82rem" }}>
                Chapitre 2 — Procédures d'évacuation &nbsp;·&nbsp; 7 modules
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <thead>
                  <tr style={{ background: "#e8f0fd" }}>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "#1e3a5f", fontWeight: 700, width: "40px" }}>N°</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "#1e3a5f", fontWeight: 700 }}>Titre du module</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "center", color: "#1e3a5f", fontWeight: 700, width: "60px" }}>Durée</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "center", color: "#1e3a5f", fontWeight: 700, width: "110px" }}>Vidéo</th>
                    <th style={{ padding: "0.5rem 0.75rem", textAlign: "center", color: "#1e3a5f", fontWeight: 700, width: "120px" }}>Podcast</th>
                  </tr>
                </thead>
                <tbody>
                  {ch2.map((m, i) => (
                    <tr key={m.num} style={{ background: i % 2 === 0 ? "white" : "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "0.55rem 0.75rem", color: "#6b7280", fontWeight: 700, textAlign: "center" }}>
                        {m.num}
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>
                        <div style={{ fontWeight: 700, color: "#111827" }}>{m.title}</div>
                        <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>{m.subtitle}</div>
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem", textAlign: "center", color: "#4b5563", fontWeight: 600 }}>{m.duration}</td>
                      <td style={{ padding: "0.55rem 0.75rem", textAlign: "center" }}>
                        <Badge ok={m.video} pending={!m.video} label="Intégrée" />
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem", textAlign: "center" }}>
                        <Badge ok={m.podcast} pending={!m.podcast} label="Intégré" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SECTION 3 — CONTENUS MULTIMÉDIA ──────────────────── */}
          <div style={{ marginBottom: "2rem" }}>
            <SectionTitle>3. Contenus vidéo et podcast</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {/* Vidéo */}
              <div style={{ background: "#f0f9ff", border: "1.5px solid #bae6fd", borderRadius: "0.75rem", padding: "1rem" }}>
                <div style={{ fontWeight: 800, color: "#0369a1", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                  🎬 Vidéos pédagogiques
                </div>
                <p style={{ fontSize: "0.8rem", color: "#374151", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
                  Chaque module est accompagné d'une <strong>vidéo pédagogique</strong> avec sous-titres, animée par une formatrice IBM. La vidéo est diffusée en début de module avant les exercices interactifs.
                </p>
                <div style={{ fontSize: "0.78rem", color: "#0369a1", fontWeight: 600 }}>
                  {totalVideo}/14 vidéos intégrées · 1 en attente de fourniture
                </div>
              </div>

              {/* Podcast */}
              <div style={{ background: "#faf5ff", border: "1.5px solid #d8b4fe", borderRadius: "0.75rem", padding: "1rem" }}>
                <div style={{ fontWeight: 800, color: "#7c3aed", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                  🎙️ Podcasts « Pour aller plus loin »
                </div>
                <p style={{ fontSize: "0.8rem", color: "#374151", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
                  Certains modules proposent un <strong>podcast audio</strong> complémentaire, disponible avant le quiz final. Ce contenu approfondit le sujet pour les apprenants souhaitant aller plus loin.
                </p>
                <div style={{ fontSize: "0.78rem", color: "#7c3aed", fontWeight: 600 }}>
                  {totalPodcast}/14 podcasts intégrés · {14 - totalPodcast} en attente de fourniture
                </div>
              </div>
            </div>

            {/* Validation note */}
            <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ fontSize: "1.2rem", flexShrink: 0 }}>⚠️</div>
              <div>
                <div style={{ fontWeight: 700, color: "#92400e", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  Contenus en attente de validation
                </div>
                <p style={{ fontSize: "0.8rem", color: "#78350f", lineHeight: 1.6, margin: 0 }}>
                  Les vidéos et podcasts des modules restants sont en cours de <strong>production et de validation</strong>. Dès réception et validation des fichiers audio/vidéo, ils seront intégrés à la plateforme sans modification de la structure pédagogique. La plateforme est entièrement opérationnelle — les contenus multimédia viennent enrichir une structure déjà fonctionnelle.
                </p>
              </div>
            </div>
          </div>

          {/* ── SECTION 4 — CONTENUS PÉDAGOGIQUES ────────────────── */}
          <div style={{ marginBottom: "2rem" }}>
            <SectionTitle>4. Contenu pédagogique par module</SectionTitle>
            <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.88rem", margin: "0 0 0.75rem" }}>
              Chaque module intègre systématiquement les éléments suivants :
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              {[
                { icon: "▶️", label: "Vidéo pédagogique avec sous-titres" },
                { icon: "🎙️", label: "Podcast audio complémentaire (modules sélectionnés)" },
                { icon: "📖", label: "Contenus texte structurés (intro, scénario, comparaison, cas pratiques)" },
                { icon: "🎯", label: "Test de positionnement initial (pré-test)" },
                { icon: "🖱️", label: "Exercices interactifs (hotspot, glisser-déposer, cartes à retourner, etc.)" },
                { icon: "📊", label: "Quiz final (score minimum 80% requis)" },
                { icon: "📌", label: "Points clés à retenir avant le quiz" },
                { icon: "📋", label: "Fiche réflexe imprimable par module" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", background: "#f9fafb", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", fontSize: "0.78rem", color: "#374151" }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 5 — ACCÈS ─────────────────────────────────── */}
          <div style={{ marginBottom: "2rem" }}>
            <SectionTitle>5. Liens d'accès à la plateforme</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* Lien apprenant */}
              <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ fontWeight: 800, color: "#166534", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                  🎓 Lien apprenant — Accès à la formation
                </div>
                <p style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                  Ce lien est à communiquer aux collaborateurs IBM pour accéder à la formation e-learning. La formation démarre par une page d'accueil avec sélection de la langue (FR/EN).
                </p>
                <div style={{ background: "white", border: "1px solid #86efac", borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontFamily: "monospace", fontSize: "0.75rem", color: "#166534", wordBreak: "break-all" }}>
                  https://ibm-securite-incendie.netlify.app
                </div>
                <div style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "0.4rem" }}>
                  ⓘ URL définitive après déploiement en production
                </div>
              </div>

              {/* Lien admin */}
              <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <div style={{ fontWeight: 800, color: "#1e40af", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                  🔐 Lien administrateur — Suivi des apprenants
                </div>
                <p style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                  Ce lien donne accès au tableau de bord RH/HSE permettant de visualiser les inscriptions, scores, modules complétés et certificats obtenus. Export CSV disponible.
                </p>
                <div style={{ background: "white", border: "1px solid #93c5fd", borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontFamily: "monospace", fontSize: "0.75rem", color: "#1e40af", wordBreak: "break-all" }}>
                  https://ibm-securite-incendie.netlify.app/admin
                </div>
                <div style={{ background: "#dbeafe", borderRadius: "0.4rem", padding: "0.4rem 0.6rem", marginTop: "0.5rem", fontSize: "0.72rem", color: "#1e40af" }}>
                  Mot de passe : <strong>ibm-securite-2026</strong>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 6 — DONNÉES APPRENANTS ───────────────────── */}
          <div style={{ marginBottom: "2rem" }}>
            <SectionTitle>6. Données enregistrées par apprenant</SectionTitle>
            <p style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.88rem", margin: "0 0 0.75rem" }}>
              Pour chaque apprenant inscrit, la plateforme enregistre automatiquement les informations suivantes, accessibles depuis l'interface administrateur :
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
              {[
                "Date d'inscription",
                "Prénom / Nom",
                "Adresse e-mail",
                "Site IBM (bâtiment)",
                "Étage et zone",
                "Langue sélectionnée (FR/EN)",
                "Modules complétés",
                "Score par module (%)",
                "Score moyen global (%)",
                "Certificat obtenu (Oui/Non)",
                "Date de complétion",
                "Export CSV disponible",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.78rem", color: "#374151", background: "#f9fafb", borderRadius: "0.4rem", padding: "0.4rem 0.6rem" }}>
                  <span style={{ color: "#1e3a5f", fontWeight: 700 }}>·</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 7 — FONCTIONNALITÉS ──────────────────────── */}
          <div style={{ marginBottom: "2rem" }}>
            <SectionTitle>7. Fonctionnalités clés de la plateforme</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              {[
                { icon: "🌐", label: "Bilingue FR / EN", desc: "Bascule dynamique à tout moment" },
                { icon: "📱", label: "Responsive", desc: "Ordinateur, tablette, smartphone" },
                { icon: "🔒", label: "Modules progressifs", desc: "Déverrouillés à la validation du précédent" },
                { icon: "🏆", label: "Certificat numérique", desc: "Généré automatiquement à 80% de score" },
                { icon: "📋", label: "Fiches réflexes PDF", desc: "14 fiches imprimables par module" },
                { icon: "📊", label: "Tableau de bord admin", desc: "Suivi temps réel + export CSV" },
                { icon: "🎮", label: "13 types d'exercices", desc: "Hotspot, glisser-déposer, scénarios ramifiés…" },
                { icon: "💾", label: "Progression sauvegardée", desc: "Reprise possible à tout moment" },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", background: "#f9fafb", borderRadius: "0.5rem", padding: "0.6rem 0.75rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#111827" }}>{f.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FOOTER ─────────────────────────────────────────────── */}
          <div style={{ borderTop: "1.5px solid #e5e7eb", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
              IBM France · Formation Sécurité Incendie · HSE 2026
            </div>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
              Document généré le {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
