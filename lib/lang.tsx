"use client"

import { createContext, useContext, useState, useEffect } from "react"

export type Lang = "pt" | "en"

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue>({
  lang: "pt",
  setLang: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "pt" || stored === "en") setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
