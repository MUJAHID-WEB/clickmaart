import {
  getAdminOrderDetail,
  getAdminStore,
  getAdminStores,
  getCarrierIntegrations,
  getCommissionSettlements,
  getDeliveryJourneys,
  getExportJobs,
  getOperationalAutomationRules,
  getReportWindows,
  type AdminOperationalReportView,
  type AdminOrderDetailRecord,
  type AdminStoreRecord,
  type AutomationRuleRecord,
  type CarrierIntegrationRecord,
  type CommissionSettlementRecord,
  type DeliveryJourneyRecord,
  type ExportJobRecord,
  type ReportWindowRecord,
} from "../data/adminAdvancedData";
import { clickMaartRequest, hasClickMaartApiBaseUrl } from "@/lib/api/clickmaartBackend";

const adminApiToken = process.env.CLICKMAART_ADMIN_API_TOKEN;

const shouldUseBackend = () =>
  Boolean(hasClickMaartApiBaseUrl() && adminApiToken);

const adminRequest = <T,>(path: string) =>
  clickMaartRequest<T>({
    path,
    token: adminApiToken,
  });

const fallbackOrderDetailSnapshot = (orderId: string) => ({
  order: getAdminOrderDetail(orderId),
  journeys: getDeliveryJourneys(orderId),
  settlements: getCommissionSettlements(orderId),
});

const fallbackDeliverySnapshot = () => ({
  journeys: getDeliveryJourneys(),
  integrations: getCarrierIntegrations(),
  automation: getOperationalAutomationRules({
    includeTitles: ["Carrier exception retry", "Order spike alert"],
  }),
});

const fallbackCommissionSnapshot = () => ({
  settlements: getCommissionSettlements(),
  automation: getOperationalAutomationRules({
    includeTitles: ["Payment delay notice", "Order spike alert"],
  }),
});

const fallbackStoreManagementSnapshot = () => ({
  stores: getAdminStores(),
  automation: getOperationalAutomationRules({
    includeTitles: ["Low stock escalation", "Order spike alert"],
  }),
});

const fallbackStoreDetailSnapshot = (storeId: string) => ({
  store: getAdminStore(storeId),
  automation: getOperationalAutomationRules({
    includeTitles: ["Low stock escalation"],
  }),
});

const fallbackReportSnapshot = (view: AdminOperationalReportView) => ({
  view,
  windows: getReportWindows(),
  exports: getExportJobs(),
  automation: getOperationalAutomationRules({
    includeTitles: ["Payment delay notice", "Low stock escalation"],
  }),
});

export async function getAdminOrderDetailSnapshot(
  orderId: string,
): Promise<{
  order: AdminOrderDetailRecord | undefined;
  journeys: DeliveryJourneyRecord[];
  settlements: CommissionSettlementRecord[];
}> {
  if (!shouldUseBackend()) {
    return fallbackOrderDetailSnapshot(orderId);
  }

  try {
    return await adminRequest<{
      order: AdminOrderDetailRecord | undefined;
      journeys: DeliveryJourneyRecord[];
      settlements: CommissionSettlementRecord[];
    }>(`/admin/orders/${encodeURIComponent(orderId)}`);
  } catch (error) {
    console.error("Falling back to local admin order detail snapshot.", error);
    return fallbackOrderDetailSnapshot(orderId);
  }
}

export async function getAdminDeliverySnapshot(): Promise<{
  journeys: DeliveryJourneyRecord[];
  integrations: CarrierIntegrationRecord[];
  automation: AutomationRuleRecord[];
}> {
  if (!shouldUseBackend()) {
    return fallbackDeliverySnapshot();
  }

  try {
    return await adminRequest<{
      journeys: DeliveryJourneyRecord[];
      integrations: CarrierIntegrationRecord[];
      automation: AutomationRuleRecord[];
    }>("/admin/delivery");
  } catch (error) {
    console.error("Falling back to local admin delivery snapshot.", error);
    return fallbackDeliverySnapshot();
  }
}

export async function getAdminCommissionSnapshot(): Promise<{
  settlements: CommissionSettlementRecord[];
  automation: AutomationRuleRecord[];
}> {
  if (!shouldUseBackend()) {
    return fallbackCommissionSnapshot();
  }

  try {
    return await adminRequest<{
      settlements: CommissionSettlementRecord[];
      automation: AutomationRuleRecord[];
    }>("/admin/commission");
  } catch (error) {
    console.error("Falling back to local admin commission snapshot.", error);
    return fallbackCommissionSnapshot();
  }
}

export async function getAdminStoreManagementSnapshot(): Promise<{
  stores: AdminStoreRecord[];
  automation: AutomationRuleRecord[];
}> {
  if (!shouldUseBackend()) {
    return fallbackStoreManagementSnapshot();
  }

  try {
    return await adminRequest<{
      stores: AdminStoreRecord[];
      automation: AutomationRuleRecord[];
    }>("/admin/stores");
  } catch (error) {
    console.error("Falling back to local admin store snapshot.", error);
    return fallbackStoreManagementSnapshot();
  }
}

export async function getAdminStoreDetailSnapshot(
  storeId: string,
): Promise<{
  store: AdminStoreRecord | undefined;
  automation: AutomationRuleRecord[];
}> {
  if (!shouldUseBackend()) {
    return fallbackStoreDetailSnapshot(storeId);
  }

  try {
    return await adminRequest<{
      store: AdminStoreRecord | undefined;
      automation: AutomationRuleRecord[];
    }>(`/admin/stores/${encodeURIComponent(storeId)}`);
  } catch (error) {
    console.error("Falling back to local admin store detail snapshot.", error);
    return fallbackStoreDetailSnapshot(storeId);
  }
}

export async function getAdminReportSnapshot(
  view: AdminOperationalReportView = "overview",
): Promise<{
  view: AdminOperationalReportView;
  windows: ReportWindowRecord[];
  exports: ExportJobRecord[];
  automation: AutomationRuleRecord[];
}> {
  if (!shouldUseBackend()) {
    return fallbackReportSnapshot(view);
  }

  try {
    const searchParams = new URLSearchParams({ view });

    return await adminRequest<{
      view: AdminOperationalReportView;
      windows: ReportWindowRecord[];
      exports: ExportJobRecord[];
      automation: AutomationRuleRecord[];
    }>(`/admin/reports?${searchParams.toString()}`);
  } catch (error) {
    console.error("Falling back to local admin report snapshot.", error);
    return fallbackReportSnapshot(view);
  }
}
