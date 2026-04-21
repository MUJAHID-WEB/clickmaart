import { clickMaartRequest, hasClickMaartApiBaseUrl } from "@/lib/api/clickmaartBackend";
import {
  getWholesalerOrders,
  getWholesalerPayouts,
  getWholesalerProducts,
  wholesalerRecentActivities,
  wholesalerSalesWindows,
  wholesalerTopProducts,
  type WholesalerOrderRecord,
  type WholesalerOrderStatus,
  type WholesalerPayoutRecord,
  type WholesalerProductRecord,
  type WholesalerProductStatus,
} from "../data/wholesalerPanelData";

type WholesalerProfileSnapshot = {
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

type WholesalerDashboardSnapshot = {
  summary: {
    pendingProducts: number;
    approvedProducts: number;
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

const wholesalerApiToken =
  process.env.CLICKMAART_WHOLESALER_API_TOKEN ??
  process.env.CLICKMAART_ADMIN_API_TOKEN;

const shouldUseBackend = () =>
  Boolean(hasClickMaartApiBaseUrl() && wholesalerApiToken);

const wholesalerRequest = <T,>(path: string) =>
  clickMaartRequest<T>({
    path,
    token: wholesalerApiToken,
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

export async function getWholesalerDashboardSnapshot(): Promise<WholesalerDashboardSnapshot> {
  const fallbackSnapshot: WholesalerDashboardSnapshot = {
    summary: {
      pendingProducts: getWholesalerProducts("pending").length,
      approvedProducts: getWholesalerProducts("approved").length,
      pendingOrders: getWholesalerOrders("pending").length,
      withdrawablePayouts: getWholesalerPayouts("withdrawable").reduce(
        (sum, record) => sum + record.payable,
        0,
      ),
    },
    recentActivities: wholesalerRecentActivities.map((activity) => ({
      title: activity.title,
      detail: activity.detail,
      time: activity.time,
    })),
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    return await wholesalerRequest<WholesalerDashboardSnapshot>(
      "/wholesaler/dashboard",
    );
  } catch (error) {
    console.error("Falling back to local wholesaler dashboard snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getWholesalerProductsSnapshot(
  status: WholesalerProductStatus | "all" = "all",
): Promise<QueueSnapshot<WholesalerProductRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getWholesalerProducts(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      wholesalerRequest<{ records: WholesalerProductRecord[] }>(
        "/wholesaler/products",
      ),
      status === "all"
        ? Promise.resolve<{ records: WholesalerProductRecord[] } | null>(null)
        : wholesalerRequest<{ records: WholesalerProductRecord[] }>(
            `/wholesaler/products?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local wholesaler products snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getWholesalerOrdersSnapshot(
  status: WholesalerOrderStatus | "all" = "all",
): Promise<QueueSnapshot<WholesalerOrderRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getWholesalerOrders(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      wholesalerRequest<{ records: WholesalerOrderRecord[] }>(
        "/wholesaler/orders",
      ),
      status === "all"
        ? Promise.resolve<{ records: WholesalerOrderRecord[] } | null>(null)
        : wholesalerRequest<{ records: WholesalerOrderRecord[] }>(
            `/wholesaler/orders?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local wholesaler orders snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getWholesalerPaymentsSnapshot(): Promise<{
  records: WholesalerPayoutRecord[];
}> {
  const fallbackSnapshot = {
    records: getWholesalerPayouts(),
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    return await wholesalerRequest<{ records: WholesalerPayoutRecord[] }>(
      "/wholesaler/payouts",
    );
  } catch (error) {
    console.error("Falling back to local wholesaler payments snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getWholesalerReportsSnapshot(): Promise<{
  salesWindows: ReportWindow[];
  topProducts: TopProduct[];
  recentActivities: {
    title: string;
    detail: string;
    time: string;
  }[];
}> {
  const fallbackSnapshot = {
    salesWindows: wholesalerSalesWindows,
    topProducts: wholesalerTopProducts,
    recentActivities: wholesalerRecentActivities,
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    return await wholesalerRequest<{
      salesWindows: ReportWindow[];
      topProducts: TopProduct[];
      recentActivities: {
        title: string;
        detail: string;
        time: string;
      }[];
    }>("/wholesaler/reports");
  } catch (error) {
    console.error("Falling back to local wholesaler reports snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getWholesalerProfileSnapshot(): Promise<WholesalerProfileSnapshot> {
  const fallbackSnapshot: WholesalerProfileSnapshot = {
    name: "Mega Suppliers Owner",
    email: "mega@supply.com",
    phone: "+8801800001003",
    businessName: "Mega Suppliers",
    businessType: "Consumer Tech",
    address: "Approved wholesaler workspace",
    document: "approved-wholesaler-document.pdf",
    tradeLicense: "WH-TRADE-1003",
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const response = await wholesalerRequest<{ profile: WholesalerProfileSnapshot }>(
      "/wholesaler/profile",
    );

    return response.profile;
  } catch (error) {
    console.error("Falling back to empty wholesaler profile snapshot.", error);
    return fallbackSnapshot;
  }
}
