export type AdminLifecycleStage =
  | "pending"
  | "shipped"
  | "delivered"
  | "received"
  | "out-for-delivery"
  | "payment-done";

export type DeliveryJourneyStatus =
  | "scheduled"
  | "in-transit"
  | "out-for-delivery"
  | "delivered"
  | "delayed";

export type CommissionStatus =
  | "ready"
  | "pending-approval"
  | "processed"
  | "paid";

export type StoreOperationalStatus =
  | "live"
  | "draft"
  | "dns-pending"
  | "setup-pending";

export type ExportJobStatus = "queued" | "generating" | "ready";

export type AutomationStatus = "active" | "monitoring" | "queued";

export type CarrierIntegrationStatus = "healthy" | "attention" | "delayed";

export type AdminOperationalReportView = "overview" | "sales" | "commissions";

export type AdminOrderStageEvent = {
  stage: AdminLifecycleStage;
  label: string;
  owner: string;
  timestamp: string;
  note: string;
};

export type AdminTrackingEvent = {
  leg: "Wholesaler to Admin" | "Admin to Customer";
  carrier: string;
  trackingReference: string;
  status: DeliveryJourneyStatus;
  location: string;
  updatedAt: string;
  note: string;
};

export type AdminOrderDetailRecord = {
  id: string;
  source: "storefront" | "external-marketing";
  retailer: string;
  wholesaler: string;
  customer: string;
  items: number;
  grossOrderValue: number;
  platformCommission: number;
  wholesalerPayable: number;
  retailerProfit: number;
  retailerPayable: number;
  currentStage: AdminLifecycleStage;
  codState: string;
  inboundCarrier: string;
  inboundTracking: string;
  outboundCarrier: string;
  outboundTracking: string;
  eta: string;
  updatedAt: string;
  flags: string[];
  stageHistory: AdminOrderStageEvent[];
  trackingEvents: AdminTrackingEvent[];
};

export type DeliveryJourneyRecord = {
  id: string;
  orderId: string;
  leg: "Wholesaler to Admin" | "Admin to Customer";
  carrier: string;
  trackingReference: string;
  destination: string;
  status: DeliveryJourneyStatus;
  lastSync: string;
  nextCheckpoint: string;
  note: string;
};

export type CarrierIntegrationRecord = {
  carrier: string;
  scope: string;
  syncedShipments: number;
  refreshCadence: string;
  successRate: string;
  status: CarrierIntegrationStatus;
  note: string;
};

export type CommissionSettlementRecord = {
  id: string;
  orderId: string;
  retailer: string;
  wholesaler: string;
  grossOrderValue: number;
  platformCommission: number;
  wholesalerPayable: number;
  retailerProfit: number;
  retailerPayable: number;
  codState: string;
  payoutStatus: CommissionStatus;
  releasedAt: string;
  note: string;
};

export type AdminStoreRecord = {
  id: string;
  name: string;
  owner: string;
  domain: string;
  products: number;
  monthlyOrders: number;
  revenue: number;
  lowStockAlerts: number;
  status: StoreOperationalStatus;
  dnsHealth: string;
  note: string;
};

export type ReportWindowRecord = {
  label: string;
  revenue: number;
  orders: number;
  commission: number;
  growth: string;
  note: string;
};

export type ExportJobRecord = {
  id: string;
  report: string;
  format: "CSV" | "PDF";
  requestedBy: string;
  scope: string;
  status: ExportJobStatus;
  generatedAt: string;
};

export type AutomationRuleRecord = {
  id: string;
  title: string;
  trigger: string;
  channels: string[];
  audience: string;
  status: AutomationStatus;
  note: string;
};

const normalizeId = (value: string) => value.replace("#", "").toLowerCase();

export const adminOrderDetails: AdminOrderDetailRecord[] = [
  {
    id: "3058",
    source: "storefront",
    retailer: "Urban Retail Co.",
    wholesaler: "Premium Goods LLC",
    customer: "Rafi Ahmed",
    items: 4,
    grossOrderValue: 32500,
    platformCommission: 3250,
    wholesalerPayable: 24850,
    retailerProfit: 4400,
    retailerPayable: 3960,
    currentStage: "out-for-delivery",
    codState: "COD verified at dispatch handoff",
    inboundCarrier: "Steadfast",
    inboundTracking: "ST552010",
    outboundCarrier: "FedEx",
    outboundTracking: "FX998331",
    eta: "Expected by 2026-04-18 evening",
    updatedAt: "14 mins ago",
    flags: [
      "Customer dispatch confirmed by warehouse team",
      "Retailer payout will unlock after successful delivery",
    ],
    stageHistory: [
      {
        stage: "pending",
        label: "Order placed",
        owner: "Retailer storefront",
        timestamp: "2026-04-17 09:10",
        note: "Customer checkout completed with COD selected.",
      },
      {
        stage: "shipped",
        label: "Shipped from wholesaler",
        owner: "Wholesaler",
        timestamp: "2026-04-17 13:25",
        note: "Shipment left the wholesaler warehouse with sealed package manifest.",
      },
      {
        stage: "received",
        label: "Received at admin warehouse",
        owner: "Admin operations",
        timestamp: "2026-04-18 08:15",
        note: "Inbound package quality check passed without damage report.",
      },
      {
        stage: "out-for-delivery",
        label: "Sent to customer",
        owner: "Delivery team",
        timestamp: "2026-04-18 11:20",
        note: "FedEx assigned with live tracking refresh enabled every 15 minutes.",
      },
    ],
    trackingEvents: [
      {
        leg: "Wholesaler to Admin",
        carrier: "Steadfast",
        trackingReference: "ST552010",
        status: "delivered",
        location: "Dhaka warehouse dock",
        updatedAt: "2026-04-18 08:10",
        note: "Inbound carton scanned at warehouse intake.",
      },
      {
        leg: "Admin to Customer",
        carrier: "FedEx",
        trackingReference: "FX998331",
        status: "out-for-delivery",
        location: "Dhaka city route",
        updatedAt: "2026-04-18 12:02",
        note: "Courier marked the package out for delivery with verified recipient phone.",
      },
    ],
  },
  {
    id: "3059",
    source: "external-marketing",
    retailer: "Fresh Grocers",
    wholesaler: "Global Foods",
    customer: "Sumaiya Akter",
    items: 6,
    grossOrderValue: 18200,
    platformCommission: 1820,
    wholesalerPayable: 13980,
    retailerProfit: 2400,
    retailerPayable: 2160,
    currentStage: "received",
    codState: "Awaiting final customer dispatch",
    inboundCarrier: "FedEx",
    inboundTracking: "FX998002",
    outboundCarrier: "Steadfast",
    outboundTracking: "ST442118",
    eta: "Dispatch planned within 3 hours",
    updatedAt: "29 mins ago",
    flags: [
      "Customer delivery label already reserved in Steadfast",
      "Warehouse packing check requested due to temperature-sensitive goods",
    ],
    stageHistory: [
      {
        stage: "pending",
        label: "Order placed",
        owner: "Retailer manual order",
        timestamp: "2026-04-17 10:00",
        note: "Retailer captured the order from external marketing campaign.",
      },
      {
        stage: "shipped",
        label: "Shipped from wholesaler",
        owner: "Wholesaler",
        timestamp: "2026-04-17 17:25",
        note: "Cold-chain package transferred through inbound FedEx lane.",
      },
      {
        stage: "received",
        label: "Received at admin warehouse",
        owner: "Admin operations",
        timestamp: "2026-04-18 09:40",
        note: "Warehouse staff approved the condition check and queued customer dispatch.",
      },
    ],
    trackingEvents: [
      {
        leg: "Wholesaler to Admin",
        carrier: "FedEx",
        trackingReference: "FX998002",
        status: "delivered",
        location: "Dhaka cold-storage receiving",
        updatedAt: "2026-04-18 09:35",
        note: "Inbound shipment delivered with intact seal confirmation.",
      },
      {
        leg: "Admin to Customer",
        carrier: "Steadfast",
        trackingReference: "ST442118",
        status: "scheduled",
        location: "Dispatch queue",
        updatedAt: "2026-04-18 10:00",
        note: "Courier pickup is scheduled after packing completion.",
      },
    ],
  },
  {
    id: "3060",
    source: "storefront",
    retailer: "Tech Haven",
    wholesaler: "Mega Suppliers",
    customer: "Nusrat Jahan",
    items: 1,
    grossOrderValue: 14000,
    platformCommission: 1400,
    wholesalerPayable: 10800,
    retailerProfit: 1800,
    retailerPayable: 1620,
    currentStage: "payment-done",
    codState: "COD fully settled and reconciled",
    inboundCarrier: "Pathao",
    inboundTracking: "PT229901",
    outboundCarrier: "Steadfast",
    outboundTracking: "ST114771",
    eta: "Delivered on 2026-04-17",
    updatedAt: "Yesterday",
    flags: [
      "Wholesaler withdrawal can be processed immediately",
      "Retailer payout settlement moved into ready queue",
    ],
    stageHistory: [
      {
        stage: "pending",
        label: "Order placed",
        owner: "Tech Haven storefront",
        timestamp: "2026-04-15 12:05",
        note: "Customer completed checkout through the retailer public store.",
      },
      {
        stage: "shipped",
        label: "Shipped from wholesaler",
        owner: "Wholesaler",
        timestamp: "2026-04-15 16:20",
        note: "Shipment moved toward the admin warehouse with serial number verification.",
      },
      {
        stage: "received",
        label: "Received at admin warehouse",
        owner: "Admin operations",
        timestamp: "2026-04-16 08:45",
        note: "Warehouse intake completed and customer dispatch label issued.",
      },
      {
        stage: "out-for-delivery",
        label: "Sent to customer",
        owner: "Delivery team",
        timestamp: "2026-04-16 12:10",
        note: "Steadfast courier received the final-mile package.",
      },
      {
        stage: "payment-done",
        label: "Payment done",
        owner: "Finance operations",
        timestamp: "2026-04-17 18:30",
        note: "COD collection reconciled and settlement release approved.",
      },
    ],
    trackingEvents: [
      {
        leg: "Wholesaler to Admin",
        carrier: "Pathao",
        trackingReference: "PT229901",
        status: "delivered",
        location: "Dhaka warehouse",
        updatedAt: "2026-04-16 08:40",
        note: "Inbound shipment received without discrepancy.",
      },
      {
        leg: "Admin to Customer",
        carrier: "Steadfast",
        trackingReference: "ST114771",
        status: "delivered",
        location: "Customer address, Khulna",
        updatedAt: "2026-04-17 15:22",
        note: "Customer delivery completed and proof captured.",
      },
    ],
  },
];

export const deliveryJourneys: DeliveryJourneyRecord[] = [
  {
    id: "dj-7001",
    orderId: "3058",
    leg: "Wholesaler to Admin",
    carrier: "Steadfast",
    trackingReference: "ST552010",
    destination: "ClickMaart warehouse, Dhaka",
    status: "delivered",
    lastSync: "8 mins ago",
    nextCheckpoint: "Inbound leg completed",
    note: "Warehouse receipt verified with scan confirmation.",
  },
  {
    id: "dj-7002",
    orderId: "3058",
    leg: "Admin to Customer",
    carrier: "FedEx",
    trackingReference: "FX998331",
    destination: "Customer address, Dhaka",
    status: "out-for-delivery",
    lastSync: "12 mins ago",
    nextCheckpoint: "Customer handoff expected before 18:00",
    note: "Live route refresh is active every 15 minutes.",
  },
  {
    id: "dj-7003",
    orderId: "3059",
    leg: "Wholesaler to Admin",
    carrier: "FedEx",
    trackingReference: "FX998002",
    destination: "Cold-storage receiving, Dhaka",
    status: "delivered",
    lastSync: "21 mins ago",
    nextCheckpoint: "Outbound label handoff",
    note: "Temperature-sensitive package passed inbound validation.",
  },
  {
    id: "dj-7004",
    orderId: "3059",
    leg: "Admin to Customer",
    carrier: "Steadfast",
    trackingReference: "ST442118",
    destination: "Customer address, Chattogram",
    status: "scheduled",
    lastSync: "19 mins ago",
    nextCheckpoint: "Courier pickup window 14:00 to 15:00",
    note: "Dispatch waits on final packing completion.",
  },
  {
    id: "dj-7005",
    orderId: "3062",
    leg: "Admin to Customer",
    carrier: "FedEx",
    trackingReference: "FX332114",
    destination: "Customer address, Sylhet",
    status: "delayed",
    lastSync: "27 mins ago",
    nextCheckpoint: "Courier exception review",
    note: "Weather-related sorting delay triggered an attention alert.",
  },
];

export const carrierIntegrations: CarrierIntegrationRecord[] = [
  {
    carrier: "FedEx",
    scope: "Admin-to-customer final-mile sync",
    syncedShipments: 128,
    refreshCadence: "15-minute polling",
    successRate: "98.2%",
    status: "healthy",
    note: "Webhook fallback stays armed for missed polling windows.",
  },
  {
    carrier: "Steadfast",
    scope: "Inbound and outbound local courier sync",
    syncedShipments: 204,
    refreshCadence: "15-minute polling",
    successRate: "96.8%",
    status: "attention",
    note: "Two labels are waiting on retry after courier-side timeout.",
  },
];

export const commissionSettlements: CommissionSettlementRecord[] = [
  {
    id: "cs-8101",
    orderId: "3058",
    retailer: "Urban Retail Co.",
    wholesaler: "Premium Goods LLC",
    grossOrderValue: 32500,
    platformCommission: 3250,
    wholesalerPayable: 24850,
    retailerProfit: 4400,
    retailerPayable: 3960,
    codState: "Pending final delivery",
    payoutStatus: "pending-approval",
    releasedAt: "Awaiting successful delivery",
    note: "Settlement will release when customer delivery proof is confirmed.",
  },
  {
    id: "cs-8102",
    orderId: "3059",
    retailer: "Fresh Grocers",
    wholesaler: "Global Foods",
    grossOrderValue: 18200,
    platformCommission: 1820,
    wholesalerPayable: 13980,
    retailerProfit: 2400,
    retailerPayable: 2160,
    codState: "Ready for customer dispatch",
    payoutStatus: "ready",
    releasedAt: "Queued for finance review",
    note: "Wholesaler payout can be pre-staged while outbound dispatch begins.",
  },
  {
    id: "cs-8103",
    orderId: "3060",
    retailer: "Tech Haven",
    wholesaler: "Mega Suppliers",
    grossOrderValue: 14000,
    platformCommission: 1400,
    wholesalerPayable: 10800,
    retailerProfit: 1800,
    retailerPayable: 1620,
    codState: "COD reconciled",
    payoutStatus: "processed",
    releasedAt: "2026-04-17 18:30",
    note: "Settlement packet is waiting for payout execution batch.",
  },
  {
    id: "cs-8104",
    orderId: "3061",
    retailer: "Urban Mart",
    wholesaler: "Wellness Supply",
    grossOrderValue: 9600,
    platformCommission: 960,
    wholesalerPayable: 7560,
    retailerProfit: 1200,
    retailerPayable: 1080,
    codState: "Paid",
    payoutStatus: "paid",
    releasedAt: "2026-04-16 15:10",
    note: "Wholesaler and retailer settlements transferred successfully.",
  },
];

export const adminStores: AdminStoreRecord[] = [
  {
    id: "admin-main",
    name: "ClickMaart Main Store",
    owner: "Admin managed",
    domain: "clickmaart.com",
    products: 186,
    monthlyOrders: 940,
    revenue: 2860000,
    lowStockAlerts: 8,
    status: "live",
    dnsHealth: "Primary domain healthy",
    note: "Platform-owned store with the widest featured assortment.",
  },
  {
    id: "urban-retail-co",
    name: "Urban Retail Co.",
    owner: "Retailer managed",
    domain: "urban.clickmaart.shop",
    products: 64,
    monthlyOrders: 288,
    revenue: 864000,
    lowStockAlerts: 3,
    status: "live",
    dnsHealth: "Subdomain validated",
    note: "Top retailer storefront with strong gadget conversion.",
  },
  {
    id: "fresh-grocers",
    name: "Fresh Grocers",
    owner: "Retailer managed",
    domain: "fresh.clickmaart.shop",
    products: 38,
    monthlyOrders: 214,
    revenue: 512000,
    lowStockAlerts: 5,
    status: "live",
    dnsHealth: "Subdomain validated",
    note: "High COD volume store with daily inventory rotations.",
  },
  {
    id: "urban-living",
    name: "Urban Living",
    owner: "Retailer managed",
    domain: "living.clickmaart.shop",
    products: 12,
    monthlyOrders: 0,
    revenue: 0,
    lowStockAlerts: 0,
    status: "dns-pending",
    dnsHealth: "CNAME check in progress",
    note: "Public launch is blocked until DNS propagation succeeds.",
  },
];

export const reportWindows: ReportWindowRecord[] = [
  {
    label: "Daily",
    revenue: 168000,
    orders: 94,
    commission: 16800,
    growth: "+7.8%",
    note: "Strong order spike from electronics and grocery campaigns.",
  },
  {
    label: "Weekly",
    revenue: 942000,
    orders: 522,
    commission: 94200,
    growth: "+11.5%",
    note: "Steady wholesaler fulfillment and improved warehouse turnaround.",
  },
  {
    label: "Monthly",
    revenue: 3820000,
    orders: 2114,
    commission: 382000,
    growth: "+18.2%",
    note: "Public storefront rollout continues to lift repeat purchase volume.",
  },
  {
    label: "Yearly",
    revenue: 42800000,
    orders: 24680,
    commission: 4280000,
    growth: "+24.4%",
    note: "Operational improvements reduced delivery exceptions across both carrier lanes.",
  },
];

export const exportJobs: ExportJobRecord[] = [
  {
    id: "ex-9101",
    report: "Sales summary",
    format: "CSV",
    requestedBy: "Operations admin",
    scope: "Monthly overview",
    status: "ready",
    generatedAt: "2026-04-18 10:45",
  },
  {
    id: "ex-9102",
    report: "Commission reconciliation",
    format: "PDF",
    requestedBy: "Finance lead",
    scope: "Weekly payout pack",
    status: "generating",
    generatedAt: "Started 6 mins ago",
  },
  {
    id: "ex-9103",
    report: "Delivery exceptions",
    format: "CSV",
    requestedBy: "Warehouse ops",
    scope: "FedEx and Steadfast delays",
    status: "queued",
    generatedAt: "Queued 2 mins ago",
  },
];

export const operationalAutomationRules: AutomationRuleRecord[] = [
  {
    id: "auto-1001",
    title: "Order spike alert",
    trigger: "Order intake exceeds the configured hourly threshold",
    channels: ["In-app", "Email"],
    audience: "Admin operations",
    status: "active",
    note: "Helps warehouse teams rebalance inbound and outbound staffing quickly.",
  },
  {
    id: "auto-1002",
    title: "Low stock escalation",
    trigger: "Store inventory crosses the low-stock floor",
    channels: ["In-app", "SMS"],
    audience: "Admin and retailer",
    status: "active",
    note: "Feeds store administration and merchandising follow-up before listings go stale.",
  },
  {
    id: "auto-1003",
    title: "Payment delay notice",
    trigger: "COD reconciliation remains open beyond the allowed finance window",
    channels: ["Email", "SMS"],
    audience: "Finance operations",
    status: "monitoring",
    note: "Settlement blockers surface before wholesaler or retailer payouts are released.",
  },
  {
    id: "auto-1004",
    title: "Carrier exception retry",
    trigger: "FedEx or Steadfast sync attempt fails twice in sequence",
    channels: ["In-app"],
    audience: "Delivery operations",
    status: "queued",
    note: "Background retry job escalates to a manual override queue if needed.",
  },
];

export const formatBdt = (value: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);

export const getAdminOrderDetail = (orderId: string) =>
  adminOrderDetails.find((record) => normalizeId(record.id) === normalizeId(orderId));

export const getDeliveryJourneys = (orderId?: string) =>
  orderId
    ? deliveryJourneys.filter(
        (record) => normalizeId(record.orderId) === normalizeId(orderId),
      )
    : deliveryJourneys;

export const getCarrierIntegrations = () => carrierIntegrations;

export const getCommissionSettlements = (orderId?: string) =>
  orderId
    ? commissionSettlements.filter(
        (record) => normalizeId(record.orderId) === normalizeId(orderId),
      )
    : commissionSettlements;

export const getAdminStores = (status?: StoreOperationalStatus) =>
  status
    ? adminStores.filter((record) => record.status === status)
    : adminStores;

export const getAdminStore = (storeId: string) =>
  adminStores.find((record) => normalizeId(record.id) === normalizeId(storeId));

export const getReportWindows = () => reportWindows;

export const getExportJobs = () => exportJobs;

export const getOperationalAutomationRules = (filter?: {
  includeTitles?: string[];
}) => {
  if (!filter?.includeTitles?.length) {
    return operationalAutomationRules;
  }

  return operationalAutomationRules.filter((rule) =>
    filter.includeTitles?.includes(rule.title),
  );
};
