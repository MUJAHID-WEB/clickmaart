import { clickMaartRequest, hasClickMaartApiBaseUrl } from "@/lib/api/clickmaartBackend";
import {
  adminProfileSnapshot,
  adminRecentActivities,
  countByStatus,
  getAdminOrderRecords,
  getProductModerationRecords,
  getRetailerRecords,
  getWholesalerRecords,
  type AccountReviewStatus,
  type AdminOrderRecord,
  type AdminOrderStatus,
  type ProductModerationRecord,
  type ProductReviewStatus,
  type RetailerRecord,
  type WholesalerRecord,
} from "../data/adminCoreData";
import { getAdminStores } from "../data/adminAdvancedData";

export type AdminActivityRecord = {
  title: string;
  detail: string;
  time: string;
};

type AdminDashboardSnapshot = {
  summary: {
    pendingWholesalers: number;
    pendingRetailers: number;
    pendingProducts: number;
    activeOrders: number;
    liveStores: number;
  };
  recentActivities: AdminActivityRecord[];
};

type QueueSnapshot<T> = {
  allRecords: T[];
  visibleRecords: T[];
};

const adminApiToken = process.env.CLICKMAART_ADMIN_API_TOKEN;

const shouldUseBackend = () =>
  Boolean(hasClickMaartApiBaseUrl() && adminApiToken);

const adminRequest = <T,>(path: string) =>
  clickMaartRequest<T>({
    path,
    token: adminApiToken,
  });

const filterRecordsByStatus = <T extends { status: string }>(
  records: T[],
  status: string,
) => records.filter((record) => record.status === status);

const createFallbackQueueSnapshot = <
  T extends { status: string },
  PageStatus extends string,
>(
  records: T[],
  status: PageStatus,
): QueueSnapshot<T> => ({
  allRecords: records,
  visibleRecords:
    status === "all" ? records : filterRecordsByStatus(records, status),
});

export async function getAdminDashboardSnapshot(): Promise<AdminDashboardSnapshot> {
  const fallbackSnapshot: AdminDashboardSnapshot = {
    summary: {
      pendingWholesalers: countByStatus(getWholesalerRecords(), "pending"),
      pendingRetailers: countByStatus(getRetailerRecords(), "pending"),
      pendingProducts: countByStatus(getProductModerationRecords(), "pending"),
      activeOrders: getAdminOrderRecords().length,
      liveStores: getAdminStores().filter((store) => store.status === "live")
        .length,
    },
    recentActivities: adminRecentActivities.map((activity) => ({
      title: activity.title,
      detail: activity.detail,
      time: activity.time,
    })),
  };

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    return await adminRequest<AdminDashboardSnapshot>("/admin/dashboard");
  } catch (error) {
    console.error("Falling back to local admin dashboard snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getAdminWholesalerSnapshot(
  status: AccountReviewStatus | "all" = "all",
): Promise<QueueSnapshot<WholesalerRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getWholesalerRecords(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      adminRequest<{ records: WholesalerRecord[] }>("/admin/wholesalers"),
      status === "all"
        ? Promise.resolve<{ records: WholesalerRecord[] } | null>(null)
        : adminRequest<{ records: WholesalerRecord[] }>(
            `/admin/wholesalers?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local admin wholesaler snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getAdminRetailerSnapshot(
  status: AccountReviewStatus | "all" = "all",
): Promise<QueueSnapshot<RetailerRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getRetailerRecords(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      adminRequest<{ records: RetailerRecord[] }>("/admin/retailers"),
      status === "all"
        ? Promise.resolve<{ records: RetailerRecord[] } | null>(null)
        : adminRequest<{ records: RetailerRecord[] }>(
            `/admin/retailers?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local admin retailer snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getAdminProductSnapshot(
  status: ProductReviewStatus | "all" = "all",
): Promise<QueueSnapshot<ProductModerationRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getProductModerationRecords(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      adminRequest<{ records: ProductModerationRecord[] }>("/admin/products"),
      status === "all"
        ? Promise.resolve<{ records: ProductModerationRecord[] } | null>(null)
        : adminRequest<{ records: ProductModerationRecord[] }>(
            `/admin/products?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local admin product snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getAdminOrderQueueSnapshot(
  status: AdminOrderStatus | "all" = "all",
): Promise<QueueSnapshot<AdminOrderRecord>> {
  const fallbackSnapshot = createFallbackQueueSnapshot(
    getAdminOrderRecords(),
    status,
  );

  if (!shouldUseBackend()) {
    return fallbackSnapshot;
  }

  try {
    const [allRecords, visibleRecords] = await Promise.all([
      adminRequest<{ records: AdminOrderRecord[] }>("/admin/orders"),
      status === "all"
        ? Promise.resolve<{ records: AdminOrderRecord[] } | null>(null)
        : adminRequest<{ records: AdminOrderRecord[] }>(
            `/admin/orders?status=${encodeURIComponent(status)}`,
          ),
    ]);

    return {
      allRecords: allRecords.records,
      visibleRecords:
        status === "all" ? allRecords.records : visibleRecords?.records ?? [],
    };
  } catch (error) {
    console.error("Falling back to local admin order queue snapshot.", error);
    return fallbackSnapshot;
  }
}

export async function getAdminProfileSnapshot(): Promise<typeof adminProfileSnapshot> {
  if (!shouldUseBackend()) {
    return adminProfileSnapshot;
  }

  try {
    const response = await adminRequest<{ profile: typeof adminProfileSnapshot }>(
      "/admin/profile",
    );

    return response.profile;
  } catch (error) {
    console.error("Falling back to local admin profile snapshot.", error);
    return adminProfileSnapshot;
  }
}
