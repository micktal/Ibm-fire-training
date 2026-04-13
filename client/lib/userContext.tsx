import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { scorm } from "@/lib/scormApi";
import { updateProgression, getSessionId } from "@/lib/supabase";

export interface UserData {
  prenom: string;
  nom: string;
  email: string;
  campus: string;
  batiment: string;
  etage: string;
  zone: string;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number; // 0-100
  correctAnswers: number;
  totalQuestions: number;
  completedAt?: string;
}

export interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData) => void;
  progress: Record<string, ModuleProgress>;
  setModuleProgress: (moduleId: string, progress: ModuleProgress) => void;
  isModuleUnlocked: (moduleId: string) => boolean;
  globalScore: number;
  totalCompleted: number;
}

const UserContext = createContext<UserContextType | null>(null);

const MODULE_ORDER = [
  "ch1-m1", "ch1-m2", "ch1-m3", "ch1-m4", "ch1-m5", "ch1-m6", "ch1-m7",
  "ch2-m1", "ch2-m2", "ch2-m3", "ch2-m4", "ch2-m5", "ch2-m6", "ch2-m7",
];

const TOTAL_MODULES = MODULE_ORDER.length;

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserData | null>(() => {
    try {
      const stored = localStorage.getItem("ibm_user");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [progress, setProgressState] = useState<Record<string, ModuleProgress>>(() => {
    try {
      const stored = localStorage.getItem("ibm_progress");
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  // Initialiser SCORM une seule fois au montage
  useEffect(() => {
    scorm.init();
  }, []);

  const setUser = (userData: UserData) => {
    setUserState(userData);
    localStorage.setItem("ibm_user", JSON.stringify(userData));
    // Mémoriser le nom de l'apprenant si le LMS le supporte
    if (scorm.isConnected) {
      scorm.setLocation("form-completed");
    }
  };

  const setModuleProgress = (moduleId: string, prog: ModuleProgress) => {
    const updated = { ...progress, [moduleId]: prog };
    setProgressState(updated);
    localStorage.setItem("ibm_progress", JSON.stringify(updated));

    // Synchroniser avec Supabase
    const completedCountForSupabase = Object.values(updated).filter((p) => p.completed).length;
    const avgScoreForSupabase = completedCountForSupabase > 0
      ? Math.round(Object.values(updated).reduce((s, p) => s + p.score, 0) / completedCountForSupabase)
      : 0;
    updateProgression(getSessionId(), {
      completed_modules: completedCountForSupabase,
      average_score: avgScoreForSupabase,
    }).catch(console.error);

    // Mettre à jour SCORM à chaque complétion de module
    if (scorm.isConnected) {
      const completedCount = Object.values(updated).filter((p) => p.completed).length;
      const avgScore = completedCount > 0
        ? Math.round(Object.values(updated).reduce((s, p) => s + p.score, 0) / completedCount)
        : 0;

      // Bookmark = dernier module visité
      scorm.setLocation(moduleId);

      if (completedCount === TOTAL_MODULES) {
        // Formation entièrement terminée
        scorm.setScore(avgScore, avgScore >= 80);
      } else if (completedCount > 0) {
        // En cours — score intermédiaire, statut incomplet
        scorm.setScore(avgScore, false);
        scorm.setStatus("incomplete");
      }
    }
  };

  const isModuleUnlocked = (moduleId: string): boolean => {
    if (moduleId === "ch1-m1") return true;
    const idx = MODULE_ORDER.indexOf(moduleId);
    if (idx <= 0) return false;
    const prevId = MODULE_ORDER[idx - 1];
    return !!progress[prevId]?.completed;
  };

  const globalScore = Object.values(progress).length > 0
    ? Math.round(
        Object.values(progress).reduce((sum, p) => sum + p.score, 0) /
        Math.max(Object.values(progress).length, 1)
      )
    : 0;

  const totalCompleted = Object.values(progress).filter((p) => p.completed).length;

  return (
    <UserContext.Provider
      value={{ user, setUser, progress, setModuleProgress, isModuleUnlocked, globalScore, totalCompleted }}
    >
      {children}
    </UserContext.Provider>
  );
}

const USER_CONTEXT_FALLBACK: UserContextType = {
  user: null,
  setUser: () => {},
  progress: {},
  setModuleProgress: () => {},
  isModuleUnlocked: () => false,
  globalScore: 0,
  totalCompleted: 0,
};

export function useUser() {
  const ctx = useContext(UserContext);
  return ctx ?? USER_CONTEXT_FALLBACK;
}
