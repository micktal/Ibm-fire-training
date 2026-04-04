import { Lang } from "./languageContext";

const STRINGS = {
  // ── Navigation ────────────────────────────────────────────
  "nav.dashboard":    { fr: "Tableau de bord",  en: "Dashboard" },
  "nav.back":         { fr: "Retour",            en: "Back" },
  "nav.next":         { fr: "Suivant",           en: "Next" },
  "nav.previous":     { fr: "Précédent",         en: "Previous" },

  // ── Landing page ──────────────────────────────────────────
  "landing.subtitle": { fr: "IBM France · HSE · 2026",         en: "IBM · HSE · 2026" },
  "landing.welcome":  { fr: "Bienvenue sur la Formation",       en: "Welcome to the Training" },
  "landing.title":    { fr: "Sécurité Incendie",                en: "Fire Safety" },
  "landing.desc":     { fr: "Programme de formation obligatoire IBM France. Acquérez les réflexes essentiels pour prévenir et gérer un départ d'incendie dans vos locaux.", en: "Mandatory IBM training program. Acquire the essential reflexes to prevent and manage a fire in your premises." },
  "landing.cta":      { fr: "Accéder à la formation",           en: "Access the training" },
  "landing.demo":     { fr: "Démo du cours",                    en: "Course demo" },
  "landing.contact":  { fr: "Contact",                          en: "Contact" },
  "landing.user":     { fr: "Utilisateur",                      en: "User" },
  "landing.home":     { fr: "Accueil",                          en: "Home" },
  "landing.ch1":      { fr: "Chapitre 1",                       en: "Chapter 1" },
  "landing.ch2":      { fr: "Chapitre 2",                       en: "Chapter 2" },
  "landing.results":  { fr: "Résultats",                        en: "Results" },
  "landing.profile":  { fr: "Profil",                           en: "Profile" },
  "landing.help":     { fr: "Aide",                             en: "Help" },
  "landing.choose_lang": { fr: "Choisissez votre langue", en: "Choose your language" },
  "landing.lang_fr":  { fr: "Français",                         en: "French" },
  "landing.lang_en":  { fr: "Anglais",                          en: "English" },
  "landing.continue": { fr: "Continuer",                        en: "Continue" },

  // ── Hub ───────────────────────────────────────────────────
  "hub.chapter1":       { fr: "Chapitre 1 — Lutte incendie",      en: "Chapter 1 — Fire Fighting" },
  "hub.chapter2":       { fr: "Chapitre 2 — Évacuation",          en: "Chapter 2 — Evacuation" },
  "hub.locked":         { fr: "Verrouillé",                       en: "Locked" },
  "hub.completed":      { fr: "Complété",                         en: "Completed" },
  "hub.in_progress":    { fr: "En cours",                         en: "In progress" },
  "hub.start":          { fr: "Démarrer",                         en: "Start" },
  "hub.resume":         { fr: "Reprendre",                        en: "Resume" },
  "hub.review":         { fr: "Revoir",                           en: "Review" },
  "hub.score":          { fr: "Score global",                     en: "Global score" },
  "hub.modules":        { fr: "modules complétés",                en: "modules completed" },
  "hub.summary":        { fr: "Récapitulatif Chapitre 1",         en: "Chapter 1 Summary" },
  "hub.ch1_desc":       { fr: "7 modules · Gestion du feu",       en: "7 modules · Fire management" },
  "hub.ch2_desc":       { fr: "7 modules · Procédures d'urgence", en: "7 modules · Emergency procedures" },
  "hub.bonjour":        { fr: "BONJOUR,",                         en: "HELLO," },
  "hub.mods_completed": { fr: "modules complétés",                en: "modules completed" },
  "hub.home":           { fr: "Accueil",                          en: "Home" },
  "hub.cert_title":     { fr: "Formation certifiée",              en: "Certified training" },
  "hub.cert_desc":      { fr: "Cliquez pour voir et télécharger votre certificat", en: "Click to view and download your certificate" },
  "hub.bridge_desc":    { fr: "Points clés · Bonnes pratiques · Aperçu Chapitre 2", en: "Key points · Best practices · Chapter 2 preview" },
  "hub.play":           { fr: "Démarrer",                         en: "Start" },

  // ── Module page ───────────────────────────────────────────
  "module.objective":       { fr: "Objectif du module",                en: "Module objective" },
  "module.did_you_know":    { fr: "Le saviez-vous ?",                  en: "Did you know?" },
  "module.content":         { fr: "Contenu pédagogique",               en: "Course content" },
  "module.exercises":       { fr: "Exercices interactifs",             en: "Interactive exercises" },
  "module.key_points":      { fr: "À retenir avant le quiz",           en: "Key takeaways before the quiz" },
  "module.key_points_post": { fr: "Points clés du module",             en: "Module key points" },
  "module.quiz":            { fr: "Évaluation du module",              en: "Module assessment" },
  "module.questions":       { fr: "questions",                         en: "questions" },
  "module.completed":       { fr: "Module déjà complété",              en: "Module already completed" },
  "module.validated":       { fr: "Module validé !",                   en: "Module validated!" },
  "module.insufficient":    { fr: "Score insuffisant — réessayez le quiz", en: "Insufficient score — retry the quiz" },
  "module.retry":           { fr: "Réessayer le quiz",                 en: "Retry the quiz" },
  "module.save":            { fr: "Sauvegarder ma progression",        en: "Save my progress" },
  "module.saved":           { fr: "Sauvegardé",                        en: "Saved" },
  "module.lms_saved":       { fr: "progression transmise au LMS",      en: "progress sent to LMS" },
  "module.next":            { fr: "Module suivant",                    en: "Next module" },
  "module.elapsed":         { fr: "min passées sur ce module",         en: "min spent on this module" },
  "module.min_required":    { fr: "80% minimum requis pour valider",   en: "80% minimum required to validate" },
  "module.start":           { fr: "Démarrer le module",                en: "Start module" },
  "module.restart":         { fr: "Recommencer",                       en: "Restart" },
  "module.chapter":         { fr: "CHAPITRE",                          en: "CHAPTER" },
  "module.video_label":     { fr: "Vidéo pédagogique",                 en: "Educational video" },
  "module.dashboard":       { fr: "Tableau de bord",                   en: "Dashboard" },
  "module.score_label":     { fr: "Score",                             en: "Score" },
  "module.progression":     { fr: "Progression mesurée",               en: "Measured progress" },
  "module.initial_test":    { fr: "Test initial",                      en: "Initial test" },
  "module.final_score":     { fr: "Score final",                       en: "Final score" },
  "module.correct_ans":     { fr: "bonnes réponses",                   en: "correct answers" },
  "module.saved_at":        { fr: "Sauvegardé à",                      en: "Saved at" },
  "module.min_validate":    { fr: "80% minimum requis pour valider ce module", en: "80% minimum required to pass this module" },
  "module.read_content":    { fr: "Lisez bien le contenu avant de répondre", en: "Read the content carefully before answering" },

  // ── Quiz ─────────────────────────────────────────────────
  "quiz.good":        { fr: "Bonne réponse !",                  en: "Correct answer!" },
  "quiz.wrong":       { fr: "Réponse incorrecte",               en: "Incorrect answer" },
  "quiz.correct_was": { fr: "La bonne réponse était",           en: "The correct answer was" },
  "quiz.why":         { fr: "Pourquoi ?",                       en: "Why?" },
  "quiz.remember":    { fr: "À retenir",                        en: "Remember" },
  "quiz.result":      { fr: "Voir mon résultat",                en: "See my result" },
  "quiz.next_q":      { fr: "Question suivante",                en: "Next question" },
  "quiz.select":      { fr: "Sélectionnez une réponse pour continuer", en: "Select an answer to continue" },
  "quiz.must_answer": { fr: "Vous devez répondre avant de continuer",  en: "You must answer before continuing" },
  "quiz.attempts":    { fr: "tentative",                        en: "attempt" },
  "quiz.passed_msg":  { fr: "Quiz réussi — module validé",      en: "Quiz passed — module validated" },
  "quiz.retry_msg":   { fr: "Score insuffisant — réessayez",    en: "Insufficient score — retry" },
  "quiz.retry_btn":   { fr: "Réessayer le quiz",                en: "Retry quiz" },
  "quiz.correct_of":  { fr: "bonne(s) réponse(s) sur",          en: "correct answer(s) out of" },

  // ── Pre-test ──────────────────────────────────────────────
  "pretest.title":    { fr: "Test de positionnement",           en: "Positioning test" },
  "pretest.skip":     { fr: "Passer",                           en: "Skip" },
  "pretest.question": { fr: "Question",                         en: "Question" },
  "pretest.good":     { fr: "Bonne réponse !",                  en: "Correct!" },
  "pretest.wrong":    { fr: "Réponse incorrecte",               en: "Incorrect" },
  "pretest.correct":  { fr: "Bonne réponse :",                  en: "Correct answer:" },
  "pretest.start":    { fr: "Commencer le module",              en: "Start module" },
  "pretest.next":     { fr: "Question suivante",                en: "Next question" },
  "pretest.good_msg": { fr: "Excellent — vous maîtrisez déjà ce point. Continuez !", en: "Excellent — you already master this point. Keep going!" },
  "pretest.ko_msg":   { fr: "Pas de souci — ce module va vous permettre de maîtriser ce concept.", en: "No worries — this module will help you master this concept." },

  // ── Self-assessment ───────────────────────────────────────
  "self.title":       { fr: "Comment vous sentez-vous sur ce module ?", en: "How confident are you about this module?" },
  "self.review":      { fr: "À revoir",                         en: "To review" },
  "self.progress":    { fr: "En progression",                   en: "In progress" },
  "self.acquired":    { fr: "Acquis",                           en: "Acquired" },
  "self.mastered":    { fr: "Maîtrisé",                         en: "Mastered" },

  // ── Certificate ───────────────────────────────────────────
  "cert.title":       { fr: "Certificat de formation",          en: "Training certificate" },
  "cert.awarded_to":  { fr: "Décerné à",                        en: "Awarded to" },
  "cert.avg_score":   { fr: "Score moyen",                      en: "Average score" },
  "cert.validated":   { fr: "Modules validés",                  en: "Validated modules" },
  "cert.obtained":    { fr: "Obtenu le",                        en: "Obtained on" },
  "cert.competencies":{ fr: "Compétences validées",             en: "Validated competencies" },
  "cert.download":    { fr: "Télécharger / Imprimer le certificat", en: "Download / Print certificate" },
  "cert.validity":    { fr: "Valable 1 an — renouvellement recommandé avant le", en: "Valid 1 year — renewal recommended before" },
  "cert.renew_before": { fr: "Renouvellement avant le", en: "Renewal before" },

  // ── Intro overlay ─────────────────────────────────────────
  "intro.contains":   { fr: "Ce module contient",               en: "This module contains" },
  "intro.video":      { fr: "Vidéo pédagogique avec sous-titres", en: "Educational video with subtitles" },
  "intro.exercises":  { fr: "exercice interactif",              en: "interactive exercise" },
  "intro.exercises_pl":{ fr: "exercices interactifs",           en: "interactive exercises" },
  "intro.quiz_req":   { fr: "Quiz final — 80% requis pour valider", en: "Final quiz — 80% required to pass" },
  "intro.to_start":   { fr: "Démarrer le module",               en: "Start module" },
  "intro.objectives": { fr: "Objectifs pédagogiques",           en: "Learning objectives" },
  "intro.at_end":     { fr: "À la fin, l'apprenant est capable de…", en: "By the end, the learner will be able to…" },

  // ── Learning objective labels ─────────────────────────────
  "lo.savoir":        { fr: "SAVOIR",                           en: "KNOW" },
  "lo.savoirFaire":   { fr: "SAVOIR-FAIRE",                     en: "KNOW-HOW" },
  "lo.savoirEtre":    { fr: "SAVOIR-ÊTRE",                      en: "KNOW-HOW-TO-BE" },

  // ── FactCard ──────────────────────────────────────────────
  "factcard.did_you_know": { fr: "LE SAVIEZ-VOUS ?",            en: "DID YOU KNOW?" },

  // ── Countdown ─────────────────────────────────────────────
  "countdown.go":      { fr: "PARTEZ !",                        en: "GO!" },
  "countdown.ready":   { fr: "Préparez-vous",                   en: "Get ready" },
  "countdown.goodluck":{ fr: "Bonne formation",                 en: "Good luck!" },

  // ── Completion celebration ────────────────────────────────
  "completion.passed":    { fr: "Module validé !",              en: "Module validated!" },
  "completion.failed":    { fr: "Score insuffisant",            en: "Insufficient score" },
  "completion.threshold_ok":  { fr: "✓ Seuil IBM de 80% atteint", en: "✓ IBM 80% threshold reached" },
  "completion.threshold_ko":  { fr: "Seuil IBM : 80% requis",  en: "IBM threshold: 80% required" },
  "completion.continue":  { fr: "Continuer le parcours",        en: "Continue training" },
  "completion.retry":     { fr: "Réessayer le quiz",            en: "Retry quiz" },

  // ── Interactions generic ─────────────────────────────────
  "int.flip":         { fr: "Cliquer pour retourner",           en: "Click to flip" },
  "int.all_done":     { fr: "Toutes les cartes découvertes !",  en: "All cards discovered!" },
  "int.restart":      { fr: "Recommencer",                      en: "Restart" },
  "int.true":         { fr: "VRAI",                             en: "TRUE" },
  "int.false":        { fr: "FAUX",                             en: "FALSE" },
  "int.validate":     { fr: "Valider mes réponses",             en: "Validate my answers" },
  "int.well_done":    { fr: "Bien joué !",                      en: "Well done!" },
  "int.try_again":    { fr: "Réessayer",                        en: "Try again" },
  "int.correct":      { fr: "Correct",                          en: "Correct" },
  "int.incorrect":    { fr: "Incorrect",                        en: "Incorrect" },

  // ── Section type labels ───────────────────────────────────
  "section.intro":      { fr: "Introduction",                   en: "Introduction" },
  "section.visual":     { fr: "Visuel",                         en: "Visual" },
  "section.info":       { fr: "Information",                    en: "Information" },
  "section.scenario":   { fr: "Scénario",                       en: "Scenario" },
  "section.list":       { fr: "Points clés",                    en: "Key points" },
  "section.casefigure": { fr: "Cas pratique",                   en: "Case study" },
  "section.comparison": { fr: "Comparaison",                    en: "Comparison" },
  "casefig.situation":  { fr: "Situation",                      en: "Situation" },
  "casefig.action":     { fr: "Action",                         en: "Action" },
  "casefig.good":       { fr: "Bonne décision",                 en: "Good decision" },
  "casefig.bad":        { fr: "Mistake à éviter",               en: "Mistake to avoid" },
  "casefig.case":       { fr: "Cas",                            en: "Case" },
  "compare.do":         { fr: "À faire",                        en: "Do" },
  "compare.dont":       { fr: "À éviter",                       en: "Avoid" },
  "self.completed_pct": { fr: "bonnes réponses",                en: "correct answers" },

  // ── Chapter intro page ───────────────────────────────────
  "ch_intro.transition": { fr: "Transition · Chapitre 1 → 2",  en: "Transition · Chapter 1 → 2" },
  "ch_intro.before":     { fr: "Avant de continuer",            en: "Before you continue" },
  "ch_intro.recap":      { fr: "Récapitulatif et aperçu du Chapitre 2", en: "Summary and Chapter 2 preview" },
  "ch_intro.ch1_recap":  { fr: "Ce que vous avez appris — Chapitre 1", en: "What you've learned — Chapter 1" },
  "ch_intro.practices":  { fr: "Les bonnes pratiques IBM à retenir",    en: "IBM best practices to remember" },
  "ch_intro.ch2_preview":{ fr: "Ce qui vous attend — Chapitre 2",       en: "What's next — Chapter 2" },
  "ch_intro.start_ch2":  { fr: "Commencer le Chapitre 2",               en: "Start Chapter 2" },
  "ch_intro.completed":  { fr: "COMPLÉTÉ",                              en: "COMPLETED" },
  "ch_intro.upcoming":   { fr: "SUIVANT",                               en: "NEXT" },
} as const;

export type I18nKey = keyof typeof STRINGS;

export function t(key: I18nKey, lang: Lang): string {
  return STRINGS[key]?.[lang] ?? STRINGS[key]?.fr ?? key;
}
