export type RetailerCatalogStatus = "live" | "draft" | "low-stock";
export type RetailerOrderStatus = "pending" | "in-delivery" | "completed";
export type RetailerPayoutStatus = "pending" | "withdrawable" | "paid";
export type RetailerStoreStatus = "active" | "setup-pending";

export type RetailerCatalogRecord = {
  id: string;
  name: string;
  category: string;
  storeName: string;
  wholesalePrice: number;
  sellingPrice: number;
  margin: number;
  stock: number;
  status: RetailerCatalogStatus;
  updatedAt: string;
  note?: string;
};

export type RetailerStoreRecord = {
  id: string;
  name: string;
  domain: string;
  products: number;
  monthlyOrders: number;
  revenue: number;
  lowStockCount: number;
  status: RetailerStoreStatus;
  note: string;
};

export type RetailerOrderRecord = {
  id: string;
  customer: string;
  items: number;
  total: number;
  courier: string;
  tracking: string;
  destination: string;
  updatedAt: string;
  status: RetailerOrderStatus;
};

export type RetailerPayoutRecord = {
  id: string;
  orderId: string;
  grossSales: number;
  profit: number;
  commission: number;
  payable: number;
  status: RetailerPayoutStatus;
  releasedAt: string;
  note: string;
};

export const retailerCatalog: RetailerCatalogRecord[] = [
  {
    id: "rc-1001",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    storeName: "Tech Haven",
    wholesalePrice: 7000,
    sellingPrice: 8600,
    margin: 1600,
    stock: 36,
    status: "live",
    updatedAt: "2026-04-17",
    note: "Featured on homepage hero block",
  },
  {
    id: "rc-1002",
    name: "Smart Watch Active",
    category: "Electronics",
    storeName: "Tech Haven",
    wholesalePrice: 9800,
    sellingPrice: 12200,
    margin: 2400,
    stock: 12,
    status: "low-stock",
    updatedAt: "2026-04-16",
    note: "Restock threshold reached",
  },
  {
    id: "rc-1003",
    name: "Organic Coffee Beans",
    category: "Grocery",
    storeName: "Fresh Basket",
    wholesalePrice: 1200,
    sellingPrice: 1550,
    margin: 350,
    stock: 84,
    status: "live",
    updatedAt: "2026-04-15",
  },
  {
    id: "rc-1004",
    name: "Premium Yoga Mat",
    category: "Fitness",
    storeName: "Urban Fitness",
    wholesalePrice: 2400,
    sellingPrice: 3200,
    margin: 800,
    stock: 18,
    status: "low-stock",
    updatedAt: "2026-04-14",
    note: "Ad campaign increased order velocity",
  },
  {
    id: "rc-1005",
    name: "Mini Blender Portable",
    category: "Kitchen",
    storeName: "Fresh Basket",
    wholesalePrice: 2800,
    sellingPrice: 3650,
    margin: 850,
    stock: 0,
    status: "draft",
    updatedAt: "2026-04-13",
    note: "Pending final media selection before listing",
  },
  {
    id: "rc-1006",
    name: "Desk Lamp Aura",
    category: "Home",
    storeName: "Urban Living",
    wholesalePrice: 1900,
    sellingPrice: 2550,
    margin: 650,
    stock: 26,
    status: "draft",
    updatedAt: "2026-04-12",
    note: "Scheduled for regional launch next week",
  },
];

export const retailerStores: RetailerStoreRecord[] = [
  {
    id: "rs-2001",
    name: "Tech Haven",
    domain: "tech.clickmaart.shop",
    products: 28,
    monthlyOrders: 164,
    revenue: 486000,
    lowStockCount: 4,
    status: "active",
    note: "Best-performing electronics storefront",
  },
  {
    id: "rs-2002",
    name: "Fresh Basket",
    domain: "fresh.clickmaart.shop",
    products: 18,
    monthlyOrders: 121,
    revenue: 192500,
    lowStockCount: 2,
    status: "active",
    note: "COD-heavy grocery store with strong repeat rate",
  },
  {
    id: "rs-2003",
    name: "Urban Fitness",
    domain: "fitness.clickmaart.shop",
    products: 14,
    monthlyOrders: 73,
    revenue: 146300,
    lowStockCount: 3,
    status: "active",
    note: "Campaign-ready sports and wellness assortment",
  },
  {
    id: "rs-2004",
    name: "Urban Living",
    domain: "living.clickmaart.shop",
    products: 9,
    monthlyOrders: 0,
    revenue: 0,
    lowStockCount: 0,
    status: "setup-pending",
    note: "Domain and product merchandising setup still in progress",
  },
];

export const retailerOrders: RetailerOrderRecord[] = [
  {
    id: "#R3056",
    customer: "Nafis H.",
    items: 3,
    total: 12850,
    courier: "Steadfast",
    tracking: "ST998201",
    destination: "Dhaka",
    updatedAt: "12 mins ago",
    status: "pending",
  },
  {
    id: "#R3057",
    customer: "Jannat T.",
    items: 1,
    total: 3650,
    courier: "Pending assignment",
    tracking: "Awaiting dispatch",
    destination: "Chattogram",
    updatedAt: "20 mins ago",
    status: "pending",
  },
  {
    id: "#R3058",
    customer: "Arif M.",
    items: 2,
    total: 24400,
    courier: "FedEx",
    tracking: "FX550028",
    destination: "Sylhet",
    updatedAt: "35 mins ago",
    status: "in-delivery",
  },
  {
    id: "#R3059",
    customer: "Mou S.",
    items: 4,
    total: 6200,
    courier: "Pathao",
    tracking: "PT203551",
    destination: "Dhaka",
    updatedAt: "1 hour ago",
    status: "in-delivery",
  },
  {
    id: "#R3060",
    customer: "Rafi K.",
    items: 2,
    total: 8700,
    courier: "Steadfast",
    tracking: "ST889118",
    destination: "Khulna",
    updatedAt: "Yesterday",
    status: "completed",
  },
  {
    id: "#R3061",
    customer: "Sadia N.",
    items: 1,
    total: 2550,
    courier: "RedX",
    tracking: "RX115009",
    destination: "Dhaka",
    updatedAt: "Yesterday",
    status: "completed",
  },
];

export const retailerPayouts: RetailerPayoutRecord[] = [
  {
    id: "rp-4001",
    orderId: "#R3056",
    grossSales: 12850,
    profit: 2650,
    commission: 265,
    payable: 2385,
    status: "pending",
    releasedAt: "Awaiting delivery completion",
    note: "Order still in operational pipeline",
  },
  {
    id: "rp-4002",
    orderId: "#R3058",
    grossSales: 24400,
    profit: 4100,
    commission: 410,
    payable: 3690,
    status: "withdrawable",
    releasedAt: "Ready now",
    note: "Admin enabled retailer withdrawal",
  },
  {
    id: "rp-4003",
    orderId: "#R3060",
    grossSales: 8700,
    profit: 1700,
    commission: 170,
    payable: 1530,
    status: "paid",
    releasedAt: "2026-04-15 11:30",
    note: "Transferred to registered wallet",
  },
  {
    id: "rp-4004",
    orderId: "#R3061",
    grossSales: 2550,
    profit: 650,
    commission: 65,
    payable: 585,
    status: "paid",
    releasedAt: "2026-04-14 16:10",
    note: "Transferred with settlement reference",
  },
];

export const retailerSalesWindows = [
  { label: "Daily Sales", value: 48200, helper: "Last 24 hours" },
  { label: "Weekly Sales", value: 268400, helper: "Last 7 days" },
  { label: "Monthly Sales", value: 1024500, helper: "Last 30 days" },
];

export const retailerTopProducts = [
  { name: "Wireless Earbuds Pro", units: 188, revenue: 1616800 },
  { name: "Smart Watch Active", units: 96, revenue: 1171200 },
  { name: "Organic Coffee Beans", units: 244, revenue: 378200 },
];

export const retailerRecentActivities = [
  {
    title: "Store launch prepared",
    detail: "Urban Living is in setup-pending mode while final domain and merchandising tasks are reviewed.",
    time: "14 mins ago",
  },
  {
    title: "Low stock alert",
    detail: "Smart Watch Active inventory dropped below the configured threshold.",
    time: "26 mins ago",
  },
  {
    title: "Withdrawal enabled",
    detail: "Retailer earnings for order #R3058 are now available for payout.",
    time: "48 mins ago",
  },
];

export const formatBdt = (value: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);

export const countByStatus = <T extends { status: string }>(
  records: T[],
  status: T["status"],
) => records.filter((record) => record.status === status).length;

export const getRetailerCatalog = (status?: RetailerCatalogStatus) =>
  status
    ? retailerCatalog.filter((record) => record.status === status)
    : retailerCatalog;

export const getRetailerStores = (status?: RetailerStoreStatus) =>
  status
    ? retailerStores.filter((record) => record.status === status)
    : retailerStores;

export const getRetailerOrders = (status?: RetailerOrderStatus) =>
  status
    ? retailerOrders.filter((record) => record.status === status)
    : retailerOrders;

export const getRetailerPayouts = (status?: RetailerPayoutStatus) =>
  status
    ? retailerPayouts.filter((record) => record.status === status)
    : retailerPayouts;

export const sumPayoutsByStatus = (status: RetailerPayoutStatus) =>
  getRetailerPayouts(status).reduce(
    (sum, record) => sum + record.payable,
    0,
  );
