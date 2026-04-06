import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  VerticalAlign,
  convertInchesToTwip,
} from "docx";
import { saveAs } from "file-saver";

// ── Colors ────────────────────────────────────────────────────────
const IBM_BLUE   = "1e3a5f";
const IBM_LIGHT  = "0043ce";
const GREEN_BG   = "d1fae5";
const GREEN_TEXT = "065f46";
const AMBER_BG   = "fef9c3";
const AMBER_TEXT = "78350f";
const GRAY_BG    = "f3f4f6";
const BLUE_BG    = "dbeafe";
const BLUE_TEXT  = "1e40af";
const WHITE      = "FFFFFF";

// ── Module data ───────────────────────────────────────────────────
const MODULES = [
  { num: 1,  ch: 1, title: "Comprendre un départ de feu",    duration: "8 min",  video: true,  podcast: true  },
  { num: 2,  ch: 1, title: "Le triangle du feu",              duration: "6 min",  video: true,  podcast: false },
  { num: 3,  ch: 1, title: "Propagation d'un incendie",       duration: "10 min", video: true,  podcast: false },
  { num: 4,  ch: 1, title: "Classes de feu",                  duration: "7 min",  video: true,  podcast: false },
  { num: 5,  ch: 1, title: "Utiliser un extincteur",          duration: "9 min",  video: true,  podcast: true  },
  { num: 6,  ch: 1, title: "Intervenir ou évacuer ?",         duration: "10 min", video: true,  podcast: false },
  { num: 7,  ch: 1, title: "Simulation incendie",             duration: "12 min", video: true,  podcast: false },
  { num: 8,  ch: 2, title: "Déclencher l'alarme",             duration: "6 min",  video: true,  podcast: false },
  { num: 9,  ch: 2, title: "Garder son calme et guider",      duration: "7 min",  video: true,  podcast: false },
  { num: 10, ch: 2, title: "Fermer les portes",               duration: "5 min",  video: true,  podcast: false },
  { num: 11, ch: 2, title: "Vérifier que personne ne reste",  duration: "8 min",  video: true,  podcast: false },
  { num: 12, ch: 2, title: "Faire face à la fumée",           duration: "8 min",  video: true,  podcast: false },
  { num: 13, ch: 2, title: "Escaliers ou espace sécurisé",    duration: "7 min",  video: false, podcast: false },
  { num: 14, ch: 2, title: "Procédure complète d'évacuation", duration: "12 min", video: true,  podcast: false },
];

// ── Helpers ───────────────────────────────────────────────────────

function h1(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: IBM_BLUE, space: 4 } },
  });
}

function h2(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, color: IBM_BLUE, bold: true, size: 24 })],
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "d1d5db", space: 4 } },
  });
}

function body(text: string, options: { bold?: boolean; color?: string; size?: number; italic?: boolean; spacing?: number } = {}): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: options.bold, color: options.color, size: options.size ?? 20, italics: options.italic })],
    spacing: { after: options.spacing ?? 80 },
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 20 })],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

function note(label: string, text: string, bgColor: string, textColor: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}  `, bold: true, color: textColor, size: 20 }),
      new TextRun({ text, color: textColor, size: 20 }),
    ],
    shading: { type: ShadingType.SOLID, color: bgColor },
    spacing: { before: 80, after: 120 },
    indent: { left: convertInchesToTwip(0.15), right: convertInchesToTwip(0.15) },
  });
}

function urlLine(url: string, color: string = IBM_LIGHT): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: url, color, size: 18, font: "Courier New", bold: true })],
    shading: { type: ShadingType.SOLID, color: GRAY_BG },
    spacing: { after: 60 },
    indent: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
  });
}

function spacer(lines = 1): Paragraph {
  return new Paragraph({ text: "", spacing: { after: 120 * lines } });
}

// ── Table cell helper ─────────────────────────────────────────────
function cell(
  text: string,
  options: {
    bold?: boolean;
    color?: string;
    bg?: string;
    align?: AlignmentType;
    width?: number;
    size?: number;
    colspan?: number;
  } = {}
): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: options.bold, color: options.color ?? "111827", size: options.size ?? 18 })],
        alignment: options.align ?? AlignmentType.LEFT,
        spacing: { before: 60, after: 60 },
      }),
    ],
    shading: options.bg ? { type: ShadingType.SOLID, color: options.bg } : undefined,
    width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: options.colspan,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
  });
}

// ── Module table ──────────────────────────────────────────────────
function moduleTable(mods: typeof MODULES): Table {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell("N°",     { bold: true, color: WHITE, bg: IBM_BLUE, align: AlignmentType.CENTER, width: 5 }),
      cell("Titre",  { bold: true, color: WHITE, bg: IBM_BLUE, width: 45 }),
      cell("Durée",  { bold: true, color: WHITE, bg: IBM_BLUE, align: AlignmentType.CENTER, width: 12 }),
      cell("Vidéo",  { bold: true, color: WHITE, bg: IBM_BLUE, align: AlignmentType.CENTER, width: 19 }),
      cell("Podcast",{ bold: true, color: WHITE, bg: IBM_BLUE, align: AlignmentType.CENTER, width: 19 }),
    ],
  });

  const dataRows = mods.map((m, i) =>
    new TableRow({
      children: [
        cell(String(m.num), { align: AlignmentType.CENTER, bold: true, bg: i % 2 === 0 ? WHITE : GRAY_BG }),
        cell(m.title, { bg: i % 2 === 0 ? WHITE : GRAY_BG }),
        cell(m.duration, { align: AlignmentType.CENTER, bg: i % 2 === 0 ? WHITE : GRAY_BG }),
        cell(m.video ? "✓ Intégrée" : "⏳ En validation", {
          align: AlignmentType.CENTER,
          color: m.video ? GREEN_TEXT : AMBER_TEXT,
          bg: m.video ? (i % 2 === 0 ? WHITE : GRAY_BG) : AMBER_BG,
          bold: true,
        }),
        cell(m.podcast ? "✓ Intégré" : "⏳ En validation", {
          align: AlignmentType.CENTER,
          color: m.podcast ? GREEN_TEXT : AMBER_TEXT,
          bg: m.podcast ? (i % 2 === 0 ? WHITE : GRAY_BG) : AMBER_BG,
          bold: true,
        }),
      ],
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ── Feature grid as table ─────────────────────────────────────────
function featureTable(items: { icon: string; label: string; desc: string }[]): Table {
  const rows: TableRow[] = [];
  for (let i = 0; i < items.length; i += 2) {
    const a = items[i];
    const b = items[i + 1];
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: `${a.icon}  ${a.label}`, bold: true, color: IBM_BLUE, size: 20 }),
                ],
                spacing: { before: 40, after: 20 },
              }),
              new Paragraph({
                children: [new TextRun({ text: a.desc, size: 18, color: "4b5563" })],
                spacing: { after: 60 },
              }),
            ],
            shading: { type: ShadingType.SOLID, color: GRAY_BG },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            width: { size: 50, type: WidthType.PERCENTAGE },
          }),
          b
            ? new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${b.icon}  ${b.label}`, bold: true, color: IBM_BLUE, size: 20 }),
                    ],
                    spacing: { before: 40, after: 20 },
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: b.desc, size: 18, color: "4b5563" })],
                    spacing: { after: 60 },
                  }),
                ],
                shading: { type: ShadingType.SOLID, color: GRAY_BG },
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                width: { size: 50, type: WidthType.PERCENTAGE },
              })
            : new TableCell({
                children: [new Paragraph({ text: "" })],
                width: { size: 50, type: WidthType.PERCENTAGE },
              }),
        ],
      })
    );
  }
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows });
}

// ── Main generator ────────────────────────────────────────────────
export async function generateWordDoc(): Promise<void> {
  const ch1 = MODULES.filter((m) => m.ch === 1);
  const ch2 = MODULES.filter((m) => m.ch === 2);
  const totalVideo   = MODULES.filter((m) => m.video).length;
  const totalPodcast = MODULES.filter((m) => m.podcast).length;
  const totalMin     = MODULES.reduce((acc, m) => acc + parseInt(m.duration), 0);

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "my-bullet",
          levels: [
            {
              level: 0,
              format: NumberFormat.BULLET,
              text: "–",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: convertInchesToTwip(0.4), hanging: convertInchesToTwip(0.2) } } },
            },
          ],
        },
      ],
    },

    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 20, color: "1f2937" },
          paragraph: { spacing: { after: 80, line: 276 } },
        },
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: { bold: true, color: IBM_BLUE, size: 28, font: "Calibri" },
          paragraph: { spacing: { before: 360, after: 120 } },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: { bold: true, color: IBM_BLUE, size: 24, font: "Calibri" },
          paragraph: { spacing: { before: 280, after: 100 } },
        },
      ],
    },

    sections: [
      {
        properties: {
          page: {
            margin: {
              top:    convertInchesToTwip(1),
              bottom: convertInchesToTwip(0.9),
              left:   convertInchesToTwip(1.2),
              right:  convertInchesToTwip(1.2),
            },
          },
        },

        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "IBM France · Formation Sécurité Incendie · HSE 2026  |  ", size: 16, color: "9ca3af" }),
                  new TextRun({ text: "DOCUMENT CONFIDENTIEL", size: 16, color: IBM_BLUE, bold: true }),
                ],
                alignment: AlignmentType.RIGHT,
                border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "e5e7eb" } },
              }),
            ],
          }),
        },

        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "IBM France · 2026    –    Page ", size: 16, color: "9ca3af" }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "9ca3af" }),
                  new TextRun({ text: " / ", size: 16, color: "9ca3af" }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: "9ca3af" }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 4, color: "e5e7eb" } },
              }),
            ],
          }),
        },

        children: [

          // ══════════════════════════════════════════════════════════
          // COVER BLOCK
          // ══════════════════════════════════════════════════════════
          new Paragraph({
            children: [new TextRun({ text: "IBM FRANCE · HSE · 2026", color: "9ca3af", size: 18, font: "Courier New" })],
            spacing: { before: 200, after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Formation Sécurité Incendie", bold: true, color: IBM_BLUE, size: 48, font: "Calibri" })],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Document de présentation — Plateforme e-learning & Admin", color: IBM_LIGHT, size: 26 })],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `Généré le ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}`, color: "9ca3af", size: 18 })],
            spacing: { after: 360 },
          }),

          // Stats summary table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  cell("14", { bold: true, color: IBM_BLUE, bg: BLUE_BG, align: AlignmentType.CENTER, size: 36 }),
                  cell("2", { bold: true, color: IBM_BLUE, bg: BLUE_BG, align: AlignmentType.CENTER, size: 36 }),
                  cell(`${totalMin} min`, { bold: true, color: IBM_BLUE, bg: BLUE_BG, align: AlignmentType.CENTER, size: 36 }),
                  cell("FR / EN", { bold: true, color: IBM_BLUE, bg: BLUE_BG, align: AlignmentType.CENTER, size: 36 }),
                ],
              }),
              new TableRow({
                children: [
                  cell("Modules de formation", { align: AlignmentType.CENTER, color: "4b5563", size: 16 }),
                  cell("Chapitres thématiques", { align: AlignmentType.CENTER, color: "4b5563", size: 16 }),
                  cell("Durée totale estimée", { align: AlignmentType.CENTER, color: "4b5563", size: 16 }),
                  cell("Langues disponibles", { align: AlignmentType.CENTER, color: "4b5563", size: 16 }),
                ],
              }),
            ],
          }),

          spacer(2),

          // ══════════════════════════════════════════════════════════
          // SECTION 1 — PRÉSENTATION
          // ══════════════════════════════════════════════════════════
          h1("1. Présentation de la plateforme"),
          body(
            "La plateforme e-learning IBM Sécurité Incendie est une formation digitale interactive destinée à l'ensemble des collaborateurs IBM France. " +
            "Elle transmet les réflexes essentiels en matière de prévention et de gestion des incendies en environnement professionnel."
          ),
          body(
            "La formation est disponible en français et en anglais, adaptée aux sites IBM France, et conforme aux exigences réglementaires HSE en vigueur."
          ),

          spacer(),

          // ══════════════════════════════════════════════════════════
          // SECTION 2 — STRUCTURE
          // ══════════════════════════════════════════════════════════
          h1("2. Structure pédagogique"),
          body(
            "La formation est organisée en 2 chapitres progressifs : Chapitre 1 — Lutte contre l'incendie (7 modules) et Chapitre 2 — Procédures d'évacuation (7 modules)."
          ),

          spacer(),
          h2("Chapitre 1 — Lutte contre l'incendie · 7 modules"),
          moduleTable(ch1),

          spacer(),
          h2("Chapitre 2 — Procédures d'évacuation · 7 modules"),
          moduleTable(ch2),

          spacer(),

          // ══════════════════════════════════════════════════════════
          // SECTION 3 — MULTIMEDIA
          // ══════════════════════════════════════════════════════════
          h1("3. Contenus vidéo et podcast"),

          h2("🎬 Vidéos pédagogiques"),
          body(
            "Chaque module est accompagné d'une vidéo pédagogique avec sous-titres, animée par une formatrice IBM. " +
            "La vidéo est diffusée en début de module avant les exercices interactifs."
          ),
          body(`Statut : ${totalVideo}/14 vidéos intégrées · ${14 - totalVideo} en attente de fourniture.`),

          spacer(),
          h2("🎙️ Podcasts « Pour aller plus loin »"),
          body(
            "Certains modules proposent un podcast audio complémentaire, disponible avant le quiz final. " +
            "Ce contenu approfondit le sujet pour les apprenants souhaitant aller plus loin."
          ),
          body(`Statut : ${totalPodcast}/14 podcasts intégrés · ${14 - totalPodcast} en attente de fourniture.`),

          spacer(),
          note(
            "⚠️ Note — Contenus en attente de validation :",
            " Les vidéos et podcasts des modules restants sont en cours de production et de validation. " +
            "Dès réception et validation des fichiers audio/vidéo, ils seront intégrés à la plateforme sans modification de la structure pédagogique.",
            AMBER_BG,
            AMBER_TEXT
          ),

          spacer(),

          // ══════════════════════════════════════════════════════════
          // SECTION 4 — CONTENT PER MODULE
          // ══════════════════════════════════════════════════════════
          h1("4. Contenu pédagogique par module"),
          body("Chaque module intègre systématiquement les éléments suivants :"),
          bullet("Vidéo pédagogique avec sous-titres"),
          bullet("Podcast audio complémentaire (modules sélectionnés)"),
          bullet("Contenus texte structurés (intro, scénario, comparaison, cas pratiques)"),
          bullet("Test de positionnement initial (pré-test)"),
          bullet("Exercices interactifs (hotspot, glisser-déposer, cartes à retourner, etc.)"),
          bullet("Quiz final — score minimum 80% requis"),
          bullet("Points clés à retenir avant le quiz"),
          bullet("Fiche réflexe imprimable par module"),

          spacer(),

          // ══════════════════════════════════════════════════════════
          // SECTION 5 — LINKS
          // ══════════════════════════════════════════════════════════
          h1("5. Liens d'accès aux plateformes"),

          h2("🎓 Plateforme e-learning — Accès apprenant"),
          body(
            "Ce lien est à communiquer aux collaborateurs IBM France pour accéder à la formation e-learning. " +
            "La formation démarre par une page d'accueil avec sélection de la langue (FR/EN). " +
            "Accessible depuis tout navigateur, sur ordinateur, tablette ou smartphone."
          ),
          new Paragraph({
            children: [new TextRun({ text: "URL (développement) :", bold: true, size: 20 })],
            spacing: { after: 40 },
          }),
          urlLine("https://8aeffa2c8f4f4a51b692463a7734bfac-main.builderio.xyz/", GREEN_TEXT),
          body("ⓘ URL Netlify définitive disponible après déploiement en production.", { color: "6b7280", size: 18, italic: true }),

          spacer(),
          h2("🔐 Plateforme admin — Accès responsable HSE/RH"),
          body(
            "Tableau de bord sécurisé réservé au responsable sécurité IBM. " +
            "Permet de visualiser en temps réel les inscriptions, scores, modules complétés et certificats obtenus. " +
            "Export CSV intégré."
          ),
          new Paragraph({
            children: [new TextRun({ text: "URL admin (développement) :", bold: true, size: 20 })],
            spacing: { after: 40 },
          }),
          urlLine("https://8aeffa2c8f4f4a51b692463a7734bfac-main.builderio.xyz/admin", BLUE_TEXT),
          new Paragraph({
            children: [
              new TextRun({ text: "Mot de passe : ", bold: true, size: 20, color: BLUE_TEXT }),
              new TextRun({ text: "ibm-securite-2026", bold: true, size: 20, color: BLUE_TEXT, font: "Courier New" }),
            ],
            shading: { type: ShadingType.SOLID, color: BLUE_BG },
            spacing: { after: 80 },
            indent: { left: convertInchesToTwip(0.1) },
          }),

          spacer(),

          // ══════════════════════════════════════════════════════════
          // SECTION 6 — ADMIN PLATFORM
          // ══════════════════════════════════════════════════════════
          h1("6. Plateforme administrateur — Fonctionnalités"),
          body(
            "La plateforme admin est accessible uniquement au responsable sécurité IBM via un mot de passe dédié. " +
            "Elle permet un suivi complet en temps réel de la progression de chaque apprenant."
          ),

          spacer(),
          featureTable([
            { icon: "👤", label: "Fiche complète par apprenant",   desc: "Nom, email, site IBM, étage, zone, langue sélectionnée" },
            { icon: "📊", label: "Progression détaillée",           desc: "Modules complétés, score par module, score moyen global" },
            { icon: "🏆", label: "Suivi des certificats",           desc: "Certificat obtenu (Oui/Non), date de complétion" },
            { icon: "⬇️", label: "Export CSV Excel",               desc: "Toutes les données exportables en un clic" },
            { icon: "🔍", label: "Recherche et filtres",            desc: "Filtrer par site IBM, score, statut de certification" },
            { icon: "🔄", label: "Actualisation temps réel",        desc: "Données synchronisées avec la base Supabase" },
          ]),

          spacer(),

          // ══════════════════════════════════════════════════════════
          // SECTION 7 — LEARNER DATA
          // ══════════════════════════════════════════════════════════
          h1("7. Données enregistrées par apprenant"),
          body(
            "Pour chaque apprenant inscrit, la plateforme enregistre automatiquement les informations suivantes, " +
            "accessibles depuis l'interface administrateur :"
          ),
          bullet("Date d'inscription"),
          bullet("Prénom / Nom"),
          bullet("Adresse e-mail"),
          bullet("Site IBM (bâtiment)"),
          bullet("Étage et zone"),
          bullet("Langue sélectionnée (FR / EN)"),
          bullet("Modules complétés"),
          bullet("Score par module (%)"),
          bullet("Score moyen global (%)"),
          bullet("Certificat obtenu (Oui / Non)"),
          bullet("Date de complétion"),
          bullet("Export CSV disponible (format Excel FR avec séparateur ;)"),

          spacer(),

          // ══════════════════════════════════════════════════════════
          // SECTION 8 — KEY FEATURES
          // ══════════════════════════════════════════════════════════
          h1("8. Fonctionnalités clés de la plateforme"),
          featureTable([
            { icon: "🌐", label: "Bilingue FR / EN",         desc: "Bascule dynamique à tout moment, sans perte de progression" },
            { icon: "📱", label: "Responsive",               desc: "Ordinateur, tablette, smartphone" },
            { icon: "🔒", label: "Modules progressifs",      desc: "Déverrouillés à la validation du module précédent (80% requis)" },
            { icon: "🏆", label: "Certificat numérique",     desc: "Généré automatiquement à 80% de score moyen" },
            { icon: "📋", label: "Fiches réflexes PDF",      desc: "14 fiches imprimables par module (A4)" },
            { icon: "📊", label: "Tableau de bord admin",    desc: "Suivi temps réel + export CSV" },
            { icon: "🎮", label: "13 types d'exercices",     desc: "Hotspot, glisser-déposer, scénarios ramifiés, roue, carte mentale…" },
            { icon: "💾", label: "Progression sauvegardée",  desc: "Reprise possible à tout moment depuis n'importe quel appareil" },
          ]),

          spacer(2),

          // Footer note
          new Paragraph({
            children: [
              new TextRun({
                text: "IBM France · Formation Sécurité Incendie · HSE 2026 · Document confidentiel",
                size: 16,
                color: "9ca3af",
                italics: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "e5e7eb" } },
            spacing: { before: 200 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `IBM_Formation_Securite_Incendie_${new Date().toISOString().slice(0, 10)}.docx`);
}
