import { clickMaartRequest, hasClickMaartApiBaseUrl } from "@/lib/api/clickmaartBackend";
import {
  getRetailerCatalog,
  getRetailerOrders,
  getRetailerPayouts,
  getRetailerStores,
  retailerRecentActivities,
  retailerSalesWindows,
  retailerTopProducts,
  type RetailerCatalogRecord,
  type RetailerCatalogStatus,
  type RetailerOrderRecord,
  type RetailerOrderStatus,
  type RetailerPayoutRecord,
  type RetailerStoreRecord,
} from "../data/retailerPanelData";

type RetailerProfileSnapshot = {
  name: string;
  email: string;
  phone?: string | null;
  businessName?: string | null;
  businessType?: string | null;
  address?: string | null;
  status?: string | null;
  document?: string | null;
  tradeLicense?: string | null;
};

type RetailerDashboardSnapshot = {
  summary: {
    liveProducts: number;
    lowStockProducts: number;
    pendingOrders: number;
    withdrawablePayouts: number;
  };
  recentActivities: {
    title: string;
    detail: string;
    time: string;
  }[];
};

type QueueSnapshot<T> = {
  allRecords: T[];
  visibleRecords: T[];
};

type ReportWindow = {
  label: string;
  value: number;
  helper: string;
};

type TopProduct = {
  name: string;
  units: number;
  revenue: number;
};

const retailerApiToken =
  process.env.CLICKMAART_RETAILER_API_TOKEN ??
  process.env.CLICKMAART_ADMIN_API_TOKEN;

const shouldUseBackend = () =>
  Boolean(hasClickMaartApiBaseUrl() && retailerApiToken);

const retailerRequest = <T,>(path: string) =>
  clickMaartRequest<T>({
    path,
    token: retailerApiToken,
  });

const createFallbackQueueSnapshot = <
  T extends { status: string },
  PageStatus extends string,
>(
  records: T[],
  status: PageStatus,
): QueueSnapshot<T> => ({
  allRecords: records,
  visibleRecords:
    status === "all"
      ? records
      : records.filter((record) => record.status === status),
});

export async function getRetailerDashboardSnapshot(): Promise<RetailerDashboardSnapshot> {
  const fallbackSnapshot: RetailerDashboardSnapshot = {
    summary: {
      liveProducts: getRetailerCatalog("live").length,
      lowStockProducts: getRetailerCatalog("low-stock").length,
      pendingOrders: getRetailerOrders("pending").length,
      withdrawablePayouts: getRetailerPayouts("withdrawable").reduce(
        (sum, record) => sum + record.payable,
        0,
      ),
    },
    recentActivities: retailerRecentActivities.map((activity) => ({
      title: activity.title,
      detail: activity.detail,
      time: activity.time,
    })),
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    return await retailerRequest<RetailerDashboardSnapshot>(
      "/retailer/dashboard",
    );
  } catch (error) {
    console.error("Falling back to local retailer dashboard snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getRetailerCatalogSnapshot(
  status: RetailerCatalogStatus | "all" = "all",
): Promise<QueueSnapshot<RetailerCatalogRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getRetailerCatalog(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      retailerRequest<{ records: RetailerCatalogRecord[] }>("/retailer/catalog"),
      status === "all"
        ? Promise.resolve<{ records: RetailerCatalogRecord[] } | null>(null)
        : retailerRequest<{ records: RetailerCatalogRecord[] }>(
            `/retailer/catalog?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local retailer catalog snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getRetailerStoreManagementSnapshot(): Promise<{
  stores: RetailerStoreRecord[];
  catalogRecords: RetailerCatalogRecord[];
}> {
  const fallbackSnapshot = {
    stores: getRetailerStores(),
    catalogRecords: getRetailerCatalog(),
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [stores, catalog] = await Promise.all([
      retailerRequest<{ records: RetailerStoreRecord[] }>("/retailer/stores"),
      retailerRequest<{ records: RetailerCatalogRecord[] }>("/retailer/catalog"),
    ]);

    return {
      stores: stores.records,
      catalogRecords: catalog.records,
    };
  } catch (error) {
    console.error("Falling back to local retailer store snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getRetailerOrdersSnapshot(
  status: RetailerOrderStatus | "all" = "all",
): Promise<QueueSnapshot<RetailerOrderRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getRetailerOrders(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      retailerRequest<{ records: RetailerOrderRecord[] }>("/retailer/orders"),
      status === "all"
        ? Promise.resolve<{ records: RetailerOrderRecord[] } | null>(null)
        : retailerRequest<{ records: RetailerOrderRecord[] }>(
            `/retailer/orders?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local retailer orders snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getRetailerPayoutsSnapshot(): Promise<{
  records: RetailerPayoutRecord[];
}> {
  const fallbackSnapshot = {
    records: getRetailerPayouts(),
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    return await retailerRequest<{ records: RetailerPayoutRecord[] }>(
      "/retailer/payouts",
    );
  } catch (error) {
    console.error("Falling back to local retailer payouts snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getRetailerReportsSnapshot(): Promise<{
  salesWindows: ReportWindow[];
  topProducts: TopProduct[];
  recentActivities: {
    title: string;
    detail: string;
    time: string;
  }[];
}> {
  const fallbackSnapshot = {
    salesWindows: retailerSalesWindows,
    topProducts: retailerTopProducts,
    recentActivities: retailerRecentActivities,
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    return await retailerRequest<{
      salesWindows: ReportWindow[];
      topProducts: TopProduct[];
      recentActivities: {
        title: string;
        detail: string;
        time: string;
      }[];
    }>("/retailer/reports");
  } catch (error) {
    console.error("Falling back to local retailer reports snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getRetailerProfileSnapshot(): Promise<RetailerProfileSnapshot> {
  const fallbackSnapshot: RetailerProfileSnapshot = {
    name: "Tech Haven Owner",
    email: "tech@haven.com",
    phone: "+8801810002003",
    businessName: "Tech Haven",
    businessType: "Electronics",
    address: "Banani, Dhaka",
    document: "approved-retailer-document.pdf",
    tradeLicense: "RT-LICENSE-2003",
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const response = await retailerRequest<{ profile: RetailerProfileSnapshot }>(
      "/retailer/profile",
    );

    return response.profile;
  } catch (error) {
    console.error("Falling back to empty retailer profile snapshot.", error);
    return fallbackSnapshot;
  }
}
