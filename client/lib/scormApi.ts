/**
 * SCORM 1.2 API Wrapper — IBM Formation Sécurité Incendie
 *
 * Cherche window.API dans les frames parents (standard SCORM 1.2).
 * Exposé en singleton: scorm.init(), scorm.setScore(), scorm.finish()...
 */

declare global {
  interface Window {
    API?: ScormAPI;
  }
}

interface ScormAPI {
  LMSInitialize(arg: string): string;
  LMSFinish(arg: string): string;
  LMSGetValue(key: string): string;
  LMSSetValue(key: string, value: string): string;
  LMSCommit(arg: string): string;
  LMSGetLastError(): string;
}

/** Recherche l'objet API SCORM 1.2 dans la hiérarchie de frames */
function findAPI(win: Window): ScormAPI | null {
  let attempts = 0;
  let current: Window = win;
  while (!current.API && current.parent && current.parent !== current && attempts < 7) {
    current = current.parent as Window;
    attempts++;
  }
  return current.API ?? null;
}

/** Convertit des secondes en format SCORM 1.2: HHHH:MM:SS.SS */
function secondsToSCORMTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${String(h).padStart(4, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.00`;
}

class ScormWrapper {
  private api: ScormAPI | null = null;
  private initialized = false;
  private sessionStart = Date.now();

  /** Initialise la session SCORM — à appeler au chargement de l'app */
  init(): boolean {
    if (this.initialized) return true;
    try {
      this.api = findAPI(window);
      if (!this.api) {
        console.info("[SCORM] Aucun LMS détecté — mode standalone");
        return false;
      }
      const result = this.api.LMSInitialize("");
      this.initialized = result === "true";
      if (this.initialized) {
        this.setValue("cmi.core.lesson_status", "incomplete");
        this.commit();
        console.info("[SCORM] Session initialisée");
        // Terminer proprement quand l'apprenant ferme l'onglet
        window.addEventListener("beforeunload", () => this.finish());
      }
      return this.initialized;
    } catch (e) {
      console.warn("[SCORM] Erreur init:", e);
      return false;
    }
  }

  private setValue(key: string, value: string): boolean {
    if (!this.api || !this.initialized) return false;
    try {
      return this.api.LMSSetValue(key, value) === "true";
    } catch {
      return false;
    }
  }

  private commit(): void {
    if (!this.api || !this.initialized) return;
    try { this.api.LMSCommit(""); } catch { /* silent */ }
  }

  /** Met à jour le score (0–100) et le statut */
  setScore(score: number, passed: boolean): void {
    this.setValue("cmi.core.score.raw", String(score));
    this.setValue("cmi.core.score.min", "0");
    this.setValue("cmi.core.score.max", "100");
    this.setValue("cmi.core.lesson_status", passed ? "passed" : "failed");
    this.commit();
  }

  /** Met à jour le statut sans toucher au score */
  setStatus(status: "passed" | "failed" | "incomplete" | "not attempted"): void {
    this.setValue("cmi.core.lesson_status", status);
    this.commit();
  }

  /** Mémorise la position de l'apprenant (module en cours) */
  setLocation(moduleId: string): void {
    this.setValue("cmi.core.lesson_location", moduleId);
    this.commit();
  }

  /** Récupère la dernière position sauvegardée (bookmark) */
  getLocation(): string {
    if (!this.api || !this.initialized) return "";
    try { return this.api.LMSGetValue("cmi.core.lesson_location"); } catch { return ""; }
  }

  /** Enregistre le temps de session et clôt la communication LMS */
  finish(): void {
    if (!this.api || !this.initialized) return;
    try {
      const elapsed = Math.round((Date.now() - this.sessionStart) / 1000);
      this.setValue("cmi.core.session_time", secondsToSCORMTime(elapsed));
      this.commit();
      this.api.LMSFinish("");
      this.initialized = false;
      console.info("[SCORM] Session terminée");
    } catch (e) {
      console.warn("[SCORM] Erreur finish:", e);
    }
  }

  /** Indique si un vrai LMS est connecté */
  get isConnected(): boolean {
    return this.initialized;
  }
}

export const scorm = new ScormWrapper();
