import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

  const setUser = (userData: UserData) => {
    setUserState(userData);
    localStorage.setItem("ibm_user", JSON.stringify(userData));
  };

  const setModuleProgress = (moduleId: string, prog: ModuleProgress) => {
    const updated = { ...progress, [moduleId]: prog };
    setProgressState(updated);
    localStorage.setItem("ibm_progress", JSON.stringify(updated));
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

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
