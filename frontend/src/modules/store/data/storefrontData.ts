import type { TenantSurface } from "@/lib/tenant/resolveTenantContext";

export type StorefrontSnapshot = {
  surface: TenantSurface;
  tenantKey: string | null;
  basePath: string;
  storeName: string;
  surfaceLabel: string;
  ownerLabel: string;
  tagline: string;
  description: string;
  supportEmail: string;
  supportPhone: string;
  domain: string;
  highlights: string[];
  isPreview: boolean;
};

const coreStorefront = {
  storeName: "ClickMaart Marketplace",
  surfaceLabel: "Core Marketplace",
  ownerLabel: "Platform-owned public commerce surface",
  tagline: "Multi-store discovery with one shared commerce experience",
  description:
    "The core marketplace keeps shared homepage, catalog, cart, checkout, and order confirmation flows aligned while tenant-aware storefronts grow around it.",
  supportEmail: "support@clickmaart.com",
  supportPhone: "+880 1700-000000",
  domain: "www.clickmaart.com",
  highlights: [
    "Shared public commerce foundation",
    "Customer registration and checkout alignment",
    "Tenant-aware storefront readiness",
  ],
};

const adminStorefront = {
  storeName: "ClickMaart Select",
  surfaceLabel: "Admin Public Store",
  ownerLabel: "Admin-curated public storefront",
  tagline: "Platform-curated assortment with central merchandising control",
  description:
    "The admin public store reuses the shared commerce shell while presenting curated products, featured campaigns, and centrally controlled pricing visibility.",
  supportEmail: "select@clickmaart.com",
  supportPhone: "+880 1800-100100",
  domain: "select.clickmaart.shop",
  highlights: [
    "Curated marketplace campaigns",
    "Centralized merchandising and pricing",
    "Shared cart, checkout, and confirmation flow",
  ],
};

const retailerStorefronts: Record<
  string,
  Omit<StorefrontSnapshot, "surface" | "tenantKey" | "basePath" | "isPreview">
> = {
  "tech-haven": {
    storeName: "Tech Haven",
    surfaceLabel: "Retailer Public Store",
    ownerLabel: "Retailer-managed electronics storefront",
    tagline: "Fast-moving gadgets, curated accessories, and strong electronics deals",
    description:
      "Tech Haven is a retailer storefront focused on electronics with its own merchandising tone, pricing strategy, and catalog visibility.",
    supportEmail: "hello@techhaven.shop",
    supportPhone: "+880 1811-220011",
    domain: "tech.clickmaart.shop",
    highlights: [
      "Retailer-specific pricing strategy",
      "Store-level product assortment",
      "Tenant-ready domain-aware rendering",
    ],
  },
  "fresh-basket": {
    storeName: "Fresh Basket",
    surfaceLabel: "Retailer Public Store",
    ownerLabel: "Retailer-managed grocery storefront",
    tagline: "Daily essentials, pantry staples, and fast-moving grocery offers",
    description:
      "Fresh Basket uses the shared commerce experience while keeping grocery-focused merchandising and store-level pricing rules.",
    supportEmail: "hello@freshbasket.shop",
    supportPhone: "+880 1811-220022",
    domain: "fresh.clickmaart.shop",
    highlights: [
      "Store-level grocery merchandising",
      "Repeat-purchase friendly catalog layout",
      "Shared checkout with tenant context",
    ],
  },
  "urban-fitness": {
    storeName: "Urban Fitness",
    surfaceLabel: "Retailer Public Store",
    ownerLabel: "Retailer-managed wellness storefront",
    tagline: "Fitness gear, yoga products, and active lifestyle essentials",
    description:
      "Urban Fitness extends the shared storefront shell into a wellness-focused retailer storefront with campaign-ready merchandising.",
    supportEmail: "hello@urbanfitness.shop",
    supportPhone: "+880 1811-220033",
    domain: "fitness.clickmaart.shop",
    highlights: [
      "Campaign-ready retailer presentation",
      "Store-specific product storytelling",
      "Aligned cart and checkout flow",
    ],
  },
  "urban-living": {
    storeName: "Urban Living",
    surfaceLabel: "Retailer Public Store",
    ownerLabel: "Retailer-managed home lifestyle storefront",
    tagline: "Home essentials, decor, and compact living upgrades",
    description:
      "Urban Living is the setup-pending retailer store used to preview tenant-aware public storefront rendering before full launch.",
    supportEmail: "hello@urbanliving.shop",
    supportPhone: "+880 1811-220044",
    domain: "living.clickmaart.shop",
    highlights: [
      "Setup-pending storefront preview",
      "Tenant-aware launch readiness",
      "Shared public commerce structure",
    ],
  },
};

const retailerAliases: Record<string, string> = {
  tech: "tech-haven",
  "tech-haven": "tech-haven",
  fresh: "fresh-basket",
  "fresh-basket": "fresh-basket",
  fitness: "urban-fitness",
  "urban-fitness": "urban-fitness",
  living: "urban-living",
  "urban-living": "urban-living",
};

export const normalizeRetailerTenantKey = (tenantKey?: string | null) => {
  if (!tenantKey) {
    return "tech-haven";
  }

  const normalized = tenantKey.trim().toLowerCase();
  return retailerAliases[normalized] ?? "tech-haven";
};

export const resolveStorefrontSnapshot = ({
  surface,
  tenantKey,
  basePath = "",
  isPreview = false,
}: {
  surface: TenantSurface;
  tenantKey?: string | null;
  basePath?: string;
  isPreview?: boolean;
}): StorefrontSnapshot => {
  if (surface === "admin-store") {
    return {
      surface,
      tenantKey: "admin-store",
      basePath,
      isPreview,
      ...adminStorefront,
    };
  }

  if (surface === "retailer-store") {
    const normalizedKey = normalizeRetailerTenantKey(tenantKey);
    return {
      surface,
      tenantKey: normalizedKey,
      basePath,
      isPreview,
      ...retailerStorefronts[normalizedKey],
    };
  }

  return {
    surface: "core",
    tenantKey: null,
    basePath,
    isPreview,
    ...coreStorefront,
  };
};
