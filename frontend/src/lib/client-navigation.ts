"use client";

import { useEffect, useState } from "react";

const NAVIGATION_EVENT = "clickmaart:navigation";
const SUPPORTED_LOCALES = ["bn", "en"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

let historyPatched = false;
let navigationEventTimer: number | null = null;

const canUseBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

const dispatchNavigationEvent = () => {
  if (!canUseBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(NAVIGATION_EVENT));
};

const scheduleNavigationEvent = () => {
  if (!canUseBrowser()) {
    return;
  }

  if (navigationEventTimer !== null) {
    window.clearTimeout(navigationEventTimer);
  }

  // Defer the synthetic navigation event so React is not forced to process
  // a state update during history mutations triggered inside insertion effects.
  navigationEventTimer = window.setTimeout(() => {
    navigationEventTimer = null;
    dispatchNavigationEvent();
  }, 0);
};

const patchHistoryEvents = () => {
  if (!canUseBrowser() || historyPatched) {
    return;
  }

  historyPatched = true;

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(...args) {
    const result = originalPushState.apply(this, args);
    scheduleNavigationEvent();
    return result;
  };

  window.history.replaceState = function replaceState(...args) {
    const result = originalReplaceState.apply(this, args);
    scheduleNavigationEvent();
    return result;
  };
};

export const getLocaleFromPathname = (
  pathname: string,
): SupportedLocale | null => {
  const [, maybeLocale] = pathname.split("/");

  if (SUPPORTED_LOCALES.includes(maybeLocale as SupportedLocale)) {
    return maybeLocale as SupportedLocale;
  }

  return null;
};

export const stripLocaleFromPathname = (pathname: string): string => {
  const strippedPath = pathname.replace(/^\/(bn|en)(?=\/|$)/, "");
  return strippedPath.length > 0 ? strippedPath : "/";
};

export const localizeHref = (
  href: string,
  locale: SupportedLocale | null,
): string => {
  if (!locale || !href.startsWith("/") || /^\/(bn|en)(?=\/|$)/.test(href)) {
    return href;
  }

  return href === "/" ? `/${locale}` : `/${locale}${href}`;
};

export const navigateTo = (
  href: string,
  options?: { replace?: boolean; preserveLocale?: boolean },
) => {
  if (!canUseBrowser()) {
    return;
  }

  const { replace = false, preserveLocale = true } = options ?? {};
  const locale = preserveLocale
    ? getLocaleFromPathname(window.location.pathname)
    : null;
  const target = localizeHref(href, locale);

  if (replace) {
    window.location.replace(target);
    return;
  }

  window.location.assign(target);
};

export const useClientPathname = (fallback = "/") => {
  const [pathname, setPathname] = useState<string>(fallback);

  useEffect(() => {
    if (!canUseBrowser()) {
      return;
    }

    patchHistoryEvents();
    let pathnameSyncTimer: number | null = null;

    const updatePathname = () => {
      const nextPathname = window.location.pathname;

      if (pathnameSyncTimer !== null) {
        window.clearTimeout(pathnameSyncTimer);
      }

      pathnameSyncTimer = window.setTimeout(() => {
        pathnameSyncTimer = null;
        setPathname((currentPathname) =>
          currentPathname === nextPathname ? currentPathname : nextPathname,
        );
      }, 0);
    };

    updatePathname();

    window.addEventListener("popstate", updatePathname);
    window.addEventListener(NAVIGATION_EVENT, updatePathname);

    return () => {
      if (pathnameSyncTimer !== null) {
        window.clearTimeout(pathnameSyncTimer);
      }
      window.removeEventListener("popstate", updatePathname);
      window.removeEventListener(NAVIGATION_EVENT, updatePathname);
    };
  }, [fallback]);

  return pathname;
};
