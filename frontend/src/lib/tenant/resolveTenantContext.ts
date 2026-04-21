import type { NextRequest, NextResponse } from "next/server";

export const SUPPORTED_LOCALES = ["bn", "en"] as const;
export const DEFAULT_LOCALE = "bn";

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type TenantSurface = "core" | "admin-store" | "retailer-store";

export type TenantContext = {
  host: string;
  normalizedHost: string;
  locale: SupportedLocale | null;
  hasLocalePrefix: boolean;
  surface: TenantSurface;
  tenantKey: string | null;
};

const DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);
const HOST_PATTERN = /^[a-z0-9.-]+$/;
const MAX_HOST_LENGTH = 253;

function getRawHost(value: string) {
  return value.split(",")[0]?.trim().toLowerCase() ?? "";
}

function normalizeHost(host: string) {
  const hostname = getRawHost(host).split(":")[0]?.replace(/\.$/, "") ?? "";

  if (
    hostname.length === 0 ||
    hostname.length > MAX_HOST_LENGTH ||
    hostname.includes("..") ||
    !HOST_PATTERN.test(hostname)
  ) {
    return "";
  }

  return hostname;
}

const parseHostList = (value?: string) =>
  new Set(
    (value ?? "")
      .split(",")
      .map((item) => normalizeHost(item))
      .filter(Boolean),
  );

const ADMIN_STORE_HOSTS = parseHostList(process.env.CLICKMAART_ADMIN_STORE_HOSTS);
const RETAILER_STORE_HOSTS = parseHostList(
  process.env.CLICKMAART_RETAILER_STORE_HOSTS,
);

const getLocaleFromPath = (pathname: string): SupportedLocale | null => {
  const [, firstSegment] = pathname.split("/");

  if (SUPPORTED_LOCALES.includes(firstSegment as SupportedLocale)) {
    return firstSegment as SupportedLocale;
  }

  return null;
};

const inferRetailerTenantKey = (host: string) => {
  const segments = host.split(".");

  if (segments.length >= 3) {
    return segments[0];
  }

  if (RETAILER_STORE_HOSTS.has(host)) {
    return host.replace(/\./g, "-");
  }

  return null;
};

export function resolveTenantContext(request: NextRequest): TenantContext {
  const requestHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "localhost";
  const normalizedHost = normalizeHost(requestHost) || "localhost";
  const locale = getLocaleFromPath(request.nextUrl.pathname);

  if (ADMIN_STORE_HOSTS.has(normalizedHost)) {
    return {
      host: requestHost,
      normalizedHost,
      locale,
      hasLocalePrefix: Boolean(locale),
      surface: "admin-store",
      tenantKey: "admin-store",
    };
  }

  const inferredRetailerKey = inferRetailerTenantKey(normalizedHost);

  if (
    !DEV_HOSTS.has(normalizedHost) &&
    (RETAILER_STORE_HOSTS.has(normalizedHost) || inferredRetailerKey)
  ) {
    return {
      host: requestHost,
      normalizedHost,
      locale,
      hasLocalePrefix: Boolean(locale),
      surface: "retailer-store",
      tenantKey: inferredRetailerKey ?? normalizedHost.replace(/\./g, "-"),
    };
  }

  return {
    host: requestHost,
    normalizedHost,
    locale,
    hasLocalePrefix: Boolean(locale),
    surface: "core",
    tenantKey: null,
  };
}

export function applyTenantHeaders(
  headers: Headers,
  tenantContext: TenantContext,
) {
  headers.set("x-clickmaart-tenant-host", tenantContext.normalizedHost);
  headers.set("x-clickmaart-tenant-surface", tenantContext.surface);
  headers.set("x-clickmaart-tenant-key", tenantContext.tenantKey ?? "core");
  headers.set(
    "x-clickmaart-locale",
    tenantContext.locale ?? DEFAULT_LOCALE,
  );
}

export function annotateTenantResponse(
  response: NextResponse,
  tenantContext: TenantContext,
) {
  response.headers.set(
    "x-clickmaart-tenant-surface",
    tenantContext.surface,
  );
  response.headers.set(
    "x-clickmaart-tenant-key",
    tenantContext.tenantKey ?? "core",
  );
}
