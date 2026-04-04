import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "fr" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("ibm_lang") as Lang) ?? "fr"; }
    catch { return "fr"; }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ibm_lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLanguage() {
  return useContext(LangContext);
}
