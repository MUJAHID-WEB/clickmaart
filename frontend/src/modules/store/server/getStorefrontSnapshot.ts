import { headers } from "next/headers";
import { clickMaartRequest, hasClickMaartApiBaseUrl } from "@/lib/api/clickmaartBackend";
import type { TenantSurface } from "@/lib/tenant/resolveTenantContext";
import {
  resolveStorefrontSnapshot,
  type StorefrontSnapshot,
} from "../data/storefrontData";

export async function getStorefrontSnapshot(options?: {
  previewSurface?: TenantSurface;
  previewTenantKey?: string | null;
  previewBasePath?: string;
}) {
  if (options?.previewSurface) {
    return resolveStorefrontSnapshot({
      surface: options.previewSurface,
      tenantKey: options.previewTenantKey ?? null,
      basePath: options.previewBasePath ?? "",
      isPreview: true,
    });
  }

  const headerStore = await headers();
  const surface =
    (headerStore.get("x-clickmaart-tenant-surface") as TenantSurface | null) ??
    "core";
  const tenantKey = headerStore.get("x-clickmaart-tenant-key");
  const fallbackSnapshot = resolveStorefrontSnapshot({
    surface,
    tenantKey: tenantKey === "core" ? null : tenantKey,
    basePath: "",
    isPreview: false,
  });

  if (!hasClickMaartApiBaseUrl()) {
    return fallbackSnapshot;
  }

  try {
    const searchParams = new URLSearchParams();

    if (surface !== "core") {
      searchParams.set("surface", surface);
    }

    if (tenantKey && tenantKey !== "core") {
      searchParams.set("tenantKey", tenantKey);
    }

    const response = await clickMaartRequest<{ snapshot: StorefrontSnapshot }>({
      path: `/storefront/snapshot${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`,
    });

    return response.snapshot;
  } catch (error) {
    console.error("Falling back to local storefront snapshot.", error);
    return fallbackSnapshot;
  }
}
