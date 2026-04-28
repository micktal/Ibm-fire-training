/**
 * useScorm — React hook for SCORM 1.2 integration
 *
 * Usage in ModulePage:
 *   const scorm = useScorm(moduleId);
 *   scorm.saveProgress({ currentSection: 2, sectionsVisited: [0,1,2] });
 *   scorm.markCompleted(85); // score 0-100
 */

import { useEffect, useRef, useCallback } from "react";
import { Scorm } from "@/lib/scorm";

export type ScormModuleState = {
  completed: boolean;
  score: number | null;
  currentSection: number;
  sectionsVisited: number[];
  pretestDone: boolean;
};

export type UseScormReturn = {
  /** Whether a SCORM LMS API was detected */
  isScorm: boolean;
  /** Previously saved state for this module (for resuming) */
  savedState: ScormModuleState | null;
  /** Save current progress without marking as complete */
  saveProgress: (update: Partial<ScormModuleState>) => void;
  /** Mark module as passed and save final score (0–100) */
  markCompleted: (score: number) => void;
  /** Mark module as failed */
  markFailed: (score: number) => void;
};

const DEFAULT_STATE: ScormModuleState = {
  completed: false,
  score: null,
  currentSection: 0,
  sectionsVisited: [],
  pretestDone: false,
};

export function useScorm(moduleId: string): UseScormReturn {
  const isScorm = useRef(false);
  const savedState = useRef<ScormModuleState | null>(null);

  useEffect(() => {
    // Initialize SCORM session
    const available = Scorm.isAvailable();
    isScorm.current = available;

    if (available) {
      Scorm.init();

      // Restore previously saved state for this module
      const prior = Scorm.getModuleProgress(moduleId);
      if (prior) {
        savedState.current = { ...DEFAULT_STATE, ...prior };
      }

      // If the LMS says it's already been completed, still load the saved state
      // so the learner can review content
    }

    return () => {
      // Commit and finish when leaving the module
      if (isScorm.current) {
        Scorm.finish();
      }
    };
  }, [moduleId]);

  const saveProgress = useCallback(
    (update: Partial<ScormModuleState>) => {
      if (!isScorm.current) return;
      Scorm.updateModuleProgress(moduleId, update);
    },
    [moduleId]
  );

  const markCompleted = useCallback(
    (score: number) => {
      if (!isScorm.current) return;
      Scorm.updateModuleProgress(moduleId, {
        completed: true,
        score,
      });
      Scorm.setPassed(score);
    },
    [moduleId]
  );

  const markFailed = useCallback(
    (score: number) => {
      if (!isScorm.current) return;
      Scorm.updateModuleProgress(moduleId, {
        completed: false,
        score,
      });
      Scorm.setFailed(score);
    },
    [moduleId]
  );

  return {
    isScorm: isScorm.current,
    savedState: savedState.current,
    saveProgress,
    markCompleted,
    markFailed,
  };
}
