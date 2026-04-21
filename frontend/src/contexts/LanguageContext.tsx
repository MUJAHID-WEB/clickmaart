"use client";

import { createContext, useContext, useEffect, useState } from "react";
import i18n from "../utils/i18n-client";

const SUPPORTED_LANGUAGES = ["bn", "en"] as const;
const DEFAULT_LANGUAGE = "bn";
const LANGUAGE_STORAGE_KEY = "clickmaart-language";

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

type LanguageContextType = {
  language: SupportedLanguage;
  changeLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const normalizeLanguage = (value?: string | null): SupportedLanguage => {
  if (value && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)) {
    return value as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE;
};

const getLanguageFromPath = (pathname: string): SupportedLanguage | null => {
  const [, maybeLanguage] = pathname.split("/");

  if (SUPPORTED_LANGUAGES.includes(maybeLanguage as SupportedLanguage)) {
    return maybeLanguage as SupportedLanguage;
  }

  return null;
};

const buildLocalizedPath = (href: string, language: SupportedLanguage): string => {
  const url = new URL(href, typeof window !== "undefined" ? window.location.origin : "http://localhost");
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0] as SupportedLanguage)) {
    segments.shift();
  }

  url.pathname = segments.length === 0 ? `/${language}` : `/${language}/${segments.join("/")}`;

  return `${url.pathname}${url.search}${url.hash}`;
};

const resolveCurrentLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const pathLanguage = getLanguageFromPath(window.location.pathname);
  if (pathLanguage) {
    return pathLanguage;
  }

  return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
};

const syncLanguageRuntime = (language: SupportedLanguage) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }

  if (i18n.language !== language) {
    void i18n.changeLanguage(language);
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(resolveCurrentLanguage);

  useEffect(() => {
    const currentLanguage = resolveCurrentLanguage();
    setLanguage(currentLanguage);
    syncLanguageRuntime(currentLanguage);

    const handlePopState = () => {
      const nextLanguage = resolveCurrentLanguage();
      setLanguage(nextLanguage);
      syncLanguageRuntime(nextLanguage);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const changeLanguage = (nextLanguage: string) => {
    const resolvedLanguage = normalizeLanguage(nextLanguage);
    setLanguage(resolvedLanguage);
    syncLanguageRuntime(resolvedLanguage);

    if (typeof window === "undefined") {
      return;
    }

    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const localizedPath = buildLocalizedPath(window.location.href, resolvedLanguage);

    if (currentPath !== localizedPath) {
      window.location.assign(localizedPath);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
