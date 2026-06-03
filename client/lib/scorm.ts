/**
 * SCORM 1.2 API Wrapper
 * Communicates with the LMS via the window.API object.
 * Handles: initialization, get/set values, commit, finish, suspend_data.
 */

type ScormAPI = {
  LMSInitialize: (s: string) => string;
  LMSFinish: (s: string) => string;
  LMSGetValue: (element: string) => string;
  LMSSetValue: (element: string, value: string) => string;
  LMSCommit: (s: string) => string;
  LMSGetLastError: () => string;
  LMSGetErrorString: (code: string) => string;
};

export type ScormSuspendData = {
  modules: Record<
    string,
    {
      completed: boolean;
      score: number | null;
      currentSection: number;
      sectionsVisited: number[];
      pretestDone: boolean;
    }
  >;
};

// ── API discovery ────────────────────────────────────────────────────────────

function findAPI(win: Window): ScormAPI | null {
  let tries = 0;
  let current: Window = win;
  while (tries < 7) {
    try {
      if ((current as any).API) return (current as any).API;
    } catch {
      // Cross-origin frame — no SCORM API accessible here
      return null;
    }
    if (!current.parent || current.parent === current) break;
    current = current.parent;
    tries++;
  }
  return null;
}

function getAPI(): ScormAPI | null {
  // Try current window first, then opener
  const api = findAPI(window);
  if (!api) {
    try {
      if (window.opener) return findAPI(window.opener);
    } catch {
      // opener is cross-origin, ignore
    }
  }
  return api;
}

// ── State ────────────────────────────────────────────────────────────────────

let _api: ScormAPI | null = null;
let _initialized = false;
let _startTime = Date.now();

// ── Public API ───────────────────────────────────────────────────────────────

export const Scorm = {
  /** Returns true if a SCORM API was found in the LMS */
  isAvailable(): boolean {
    _api = _api ?? getAPI();
    return _api !== null;
  },

  /** Initialize the SCORM session. Call once on module load. */
  init(): boolean {
    _api = _api ?? getAPI();
    if (!_api) return false;
    if (_initialized) return true;
    const result = _api.LMSInitialize("");
    _initialized = result === "true";
    _startTime = Date.now();
    return _initialized;
  },

  /** Read a SCORM data element */
  getValue(element: string): string {
    if (!_api || !_initialized) return "";
    return _api.LMSGetValue(element) ?? "";
  },

  /** Write a SCORM data element */
  setValue(element: string, value: string): boolean {
    if (!_api || !_initialized) return false;
    return _api.LMSSetValue(element, value) === "true";
  },

  /** Commit (persist) pending changes to the LMS */
  commit(): boolean {
    if (!_api || !_initialized) return false;
    return _api.LMSCommit("") === "true";
  },

  /**
   * Finish the SCORM session — commit session time and suspend state.
   * We do NOT call LMSFinish() here: 360Learning (and most LMSes) manage
   * the end of the session themselves. Calling LMSFinish() prematurely
   * causes the learner to be logged out / the window to close.
   */
  finish(): void {
    if (!_api || !_initialized) return;
    _saveSessionTime();
    Scorm.commit();
    // LMSFinish intentionally omitted — let the LMS close the session
  },

  // ── Convenience helpers ────────────────────────────────────────────────────

  /** Mark this SCO as completed */
  setCompleted(): void {
    Scorm.setValue("cmi.core.lesson_status", "completed");
    Scorm.commit();
  },

  /** Mark this SCO as passed with a score (0–100) */
  setPassed(raw: number): void {
    Scorm.setValue("cmi.core.lesson_status", "passed");
    Scorm.setValue("cmi.core.score.raw", String(Math.round(raw)));
    Scorm.setValue("cmi.core.score.min", "0");
    Scorm.setValue("cmi.core.score.max", "100");
    Scorm.commit();
  },

  /** Mark as failed */
  setFailed(raw: number): void {
    Scorm.setValue("cmi.core.lesson_status", "failed");
    Scorm.setValue("cmi.core.score.raw", String(Math.round(raw)));
    Scorm.setValue("cmi.core.score.min", "0");
    Scorm.setValue("cmi.core.score.max", "100");
    Scorm.commit();
  },

  /** Set the current location bookmark */
  setBookmark(location: string): void {
    Scorm.setValue("cmi.core.lesson_location", location);
  },

  /** Get the saved location bookmark */
  getBookmark(): string {
    return Scorm.getValue("cmi.core.lesson_location");
  },

  /** Get the learner's name from the LMS */
  getLearnerName(): string {
    return Scorm.getValue("cmi.core.student_name");
  },

  /** Get the learner ID from the LMS */
  getLearnerId(): string {
    return Scorm.getValue("cmi.core.student_id");
  },

  /** Get the current lesson status */
  getLessonStatus(): string {
    return Scorm.getValue("cmi.core.lesson_status");
  },

  // ── suspend_data (progress persistence) ───────────────────────────────────

  /** Load the full suspend_data object from LMS */
  getSuspendData(): ScormSuspendData {
    const raw = Scorm.getValue("cmi.suspend_data");
    if (!raw) return { modules: {} };
    try {
      return JSON.parse(raw) as ScormSuspendData;
    } catch {
      return { modules: {} };
    }
  },

  /** Save the full suspend_data object to LMS */
  setSuspendData(data: ScormSuspendData): void {
    const json = JSON.stringify(data);
    // SCORM 1.2 suspend_data is limited to 4096 chars
    if (json.length > 4096) {
      console.warn("[SCORM] suspend_data exceeds 4096 chars, truncating older entries");
    }
    Scorm.setValue("cmi.suspend_data", json.substring(0, 4096));
  },

  /** Update progress for a specific module ID in suspend_data */
  updateModuleProgress(
    moduleId: string,
    update: Partial<ScormSuspendData["modules"][string]>
  ): void {
    const data = Scorm.getSuspendData();
    data.modules[moduleId] = {
      completed: false,
      score: null,
      currentSection: 0,
      sectionsVisited: [],
      pretestDone: false,
      ...(data.modules[moduleId] ?? {}),
      ...update,
    };
    Scorm.setSuspendData(data);
    Scorm.setBookmark(moduleId);
    Scorm.commit();
  },

  /** Get progress for a specific module */
  getModuleProgress(moduleId: string): ScormSuspendData["modules"][string] | null {
    const data = Scorm.getSuspendData();
    return data.modules[moduleId] ?? null;
  },
};

// ── Internal helpers ─────────────────────────────────────────────────────────

function _saveSessionTime(): void {
  const elapsed = Math.round((Date.now() - _startTime) / 1000);
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const timeStr = `${String(h).padStart(4, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  Scorm.setValue("cmi.core.session_time", timeStr);
}

// Save progress when the learner switches tabs or minimises the window.
// We use visibilitychange instead of beforeunload:
//   - beforeunload fires LMSFinish → closes the LMS session → logs the learner out
//   - visibilitychange just commits pending data safely
if (typeof window !== "undefined") {
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && _initialized) {
      _saveSessionTime();
      Scorm.commit();
    }
  });
}
