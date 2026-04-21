import { clickMaartRequest, hasClickMaartApiBaseUrl } from "@/lib/api/clickmaartBackend";
import type { TenantSurface } from "@/lib/tenant/resolveTenantContext";
import type { Product } from "@/types";

export type StorefrontProductRecord = Product & {
  storeName?: string;
  status?: string;
  featured?: boolean;
  reviewCount?: number;
};

export type StorefrontOrderRecord = {
  id: string;
  date: string;
  status: string;
  currentStage?: string | null;
  items: {
    id?: string | null;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  eta?: string | null;
};

const fallbackProducts: StorefrontProductRecord[] = [
  {
    id: "fallback-earbuds",
    name: "Wireless Earbuds Pro",
    price: 8600,
    discount: 12,
    images: ["/images/homepage/Product1.jpg"],
    rating: 4.7,
    reviewCount: 148,
    category: "Electronics",
    description: "Fallback storefront product while the backend is unavailable.",
    stock: 36,
    specifications: [
      { label: "Battery", value: "32 hours with case" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
    ],
    details: "This fallback record keeps the storefront build stable without a running backend.",
    storeName: "Tech Haven",
    status: "live",
    featured: true,
  },
  {
    id: "fallback-watch",
    name: "Smart Watch Active",
    price: 12200,
    discount: 10,
    images: ["/images/homepage/Product1.jpg"],
    rating: 4.8,
    reviewCount: 211,
    category: "Electronics",
    description: "Fallback smartwatch record used only if the backend is offline.",
    stock: 12,
    specifications: [
      { label: "Display", value: "1.78-inch AMOLED" },
      { label: "Battery", value: "7 days typical use" },
    ],
    details: "The live backend should normally provide this catalog entry.",
    storeName: "ClickMaart Select",
    status: "low-stock",
    featured: true,
  },
  {
    id: "fallback-coffee",
    name: "Organic Coffee Beans",
    price: 1550,
    discount: 8,
    images: ["/images/homepage/Product2.jpg"],
    rating: 4.6,
    reviewCount: 93,
    category: "Grocery",
    description: "Fallback grocery catalog entry.",
    stock: 84,
    specifications: [
      { label: "Roast", value: "Medium" },
      { label: "Pack Size", value: "500g" },
    ],
    details: "Used as a fallback for server rendering during offline builds.",
    storeName: "Fresh Basket",
    status: "live",
    featured: false,
  },
];

const fallbackOrderRecord = (orderId: string): StorefrontOrderRecord => ({
  id: orderId,
  date: new Date().toISOString().slice(0, 10),
  status: "Pending",
  currentStage: "pending",
  items: [
    {
      id: fallbackProducts[0].id,
      name: fallbackProducts[0].name,
      price: fallbackProducts[0].price,
      quantity: 1,
      image: fallbackProducts[0].images[0],
    },
  ],
  total: fallbackProducts[0].price,
  shippingAddress: "Dhaka, Bangladesh",
  paymentMethod: "Cash on Delivery",
});

const normalizeSurface = (surface?: TenantSurface | string | null) => {
  if (surface === "admin-store" || surface === "retailer-store") {
    return surface;
  }

  return undefined;
};

export async function getStorefrontCatalogRecords(options?: {
  surface?: TenantSurface | string | null;
  tenantKey?: string | null;
  featuredOnly?: boolean;
}): Promise<StorefrontProductRecord[]> {
  if (!hasClickMaartApiBaseUrl()) {
    return options?.featuredOnly
      ? fallbackProducts.filter((product) => product.featured)
      : fallbackProducts;
  }

  try {
    const searchParams = new URLSearchParams();
    const surface = normalizeSurface(options?.surface);

    if (surface) {
      searchParams.set("surface", surface);
    }

    if (options?.tenantKey) {
      searchParams.set("tenantKey", options.tenantKey);
    }

    const response = await clickMaartRequest<{ products: StorefrontProductRecord[] }>({
      path: `/storefront/catalog${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
    });

    return options?.featuredOnly
      ? response.products.filter((product) => product.featured)
      : response.products;
  } catch (error) {
    console.error("Falling back to local storefront catalog records.", error);
    return options?.featuredOnly
      ? fallbackProducts.filter((product) => product.featured)
      : fallbackProducts;
  }
}

export async function getStorefrontOrderRecord(
  orderId: string,
): Promise<StorefrontOrderRecord> {
  if (!hasClickMaartApiBaseUrl()) {
    return fallbackOrderRecord(orderId);
  }

  try {
    const response = await clickMaartRequest<{ order: StorefrontOrderRecord }>({
      path: `/storefront/orders/${encodeURIComponent(orderId)}`,
    });

    return response.order;
  } catch (error) {
    console.error("Falling back to local storefront order record.", error);
    return fallbackOrderRecord(orderId);
  }
}
