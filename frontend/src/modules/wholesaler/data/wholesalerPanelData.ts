export type WholesalerProductStatus = "pending" | "approved" | "rejected";
export type WholesalerOrderStatus = "pending" | "shipped" | "payment-done";
export type WholesalerPayoutStatus = "pending" | "withdrawable" | "paid";

export type WholesalerProductRecord = {
  id: string;
  name: string;
  category: string;
  submittedAt: string;
  price: number;
  stock: number;
  status: WholesalerProductStatus;
  listingState: "listed" | "not-listed";
  adminNote?: string;
};

export type WholesalerOrderRecord = {
  id: string;
  retailer: string;
  items: number;
  codAmount: number;
  destination: string;
  tracking: string;
  updatedAt: string;
  status: WholesalerOrderStatus;
  customerMask: string;
};

export type WholesalerPayoutRecord = {
  id: string;
  orderId: string;
  orderAmount: number;
  commission: number;
  payable: number;
  status: WholesalerPayoutStatus;
  releasedAt: string;
  note: string;
};

export const wholesalerProducts: WholesalerProductRecord[] = [
  {
    id: "wp-1001",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    submittedAt: "2026-04-12",
    price: 59.99,
    stock: 250,
    status: "pending",
    listingState: "not-listed",
    adminNote: "Awaiting media and price verification",
  },
  {
    id: "wp-1002",
    name: "Organic Coffee Beans",
    category: "Grocery",
    submittedAt: "2026-04-10",
    price: 12.5,
    stock: 640,
    status: "pending",
    listingState: "not-listed",
    adminNote: "Nutrition-safe packaging proof requested",
  },
  {
    id: "wp-1003",
    name: "Smart Watch Active",
    category: "Electronics",
    submittedAt: "2026-04-05",
    price: 99,
    stock: 65,
    status: "approved",
    listingState: "listed",
  },
  {
    id: "wp-1004",
    name: "Yoga Mat Premium",
    category: "Fitness",
    submittedAt: "2026-04-06",
    price: 29.99,
    stock: 180,
    status: "approved",
    listingState: "listed",
  },
  {
    id: "wp-1005",
    name: "Cheap Sunglasses",
    category: "Accessories",
    submittedAt: "2026-04-03",
    price: 6,
    stock: 500,
    status: "rejected",
    listingState: "not-listed",
    adminNote: "Low-quality materials and duplicate imagery",
  },
  {
    id: "wp-1006",
    name: "Plastic Lunch Box Set",
    category: "Kitchen",
    submittedAt: "2026-04-01",
    price: 8.5,
    stock: 140,
    status: "rejected",
    listingState: "not-listed",
    adminNote: "Compliance declaration incomplete",
  },
];

export const wholesalerOrders: WholesalerOrderRecord[] = [
  {
    id: "#2056",
    retailer: "Urban Mart",
    items: 3,
    codAmount: 125.5,
    destination: "ClickMaart Admin Warehouse, Dhaka",
    tracking: "FX789123",
    updatedAt: "10 mins ago",
    status: "pending",
    customerMask: "Customer contact masked",
  },
  {
    id: "#2057",
    retailer: "Tech Haven",
    items: 2,
    codAmount: 220,
    destination: "ClickMaart Admin Warehouse, Dhaka",
    tracking: "Awaiting shipment",
    updatedAt: "18 mins ago",
    status: "pending",
    customerMask: "Customer contact masked",
  },
  {
    id: "#2058",
    retailer: "Urban Retail Co.",
    items: 4,
    codAmount: 310.75,
    destination: "ClickMaart Admin Warehouse, Chattogram",
    tracking: "ST552010",
    updatedAt: "35 mins ago",
    status: "shipped",
    customerMask: "Customer contact masked",
  },
  {
    id: "#2059",
    retailer: "Fresh Grocers",
    items: 6,
    codAmount: 88.2,
    destination: "ClickMaart Admin Warehouse, Dhaka",
    tracking: "FX998002",
    updatedAt: "1 hour ago",
    status: "shipped",
    customerMask: "Customer contact masked",
  },
  {
    id: "#2060",
    retailer: "Tech Haven",
    items: 1,
    codAmount: 140,
    destination: "Payment completed",
    tracking: "QD229901",
    updatedAt: "Yesterday",
    status: "payment-done",
    customerMask: "Customer contact masked",
  },
  {
    id: "#2061",
    retailer: "Urban Mart",
    items: 5,
    codAmount: 96,
    destination: "Payment completed",
    tracking: "ST445515",
    updatedAt: "Yesterday",
    status: "payment-done",
    customerMask: "Customer contact masked",
  },
];

export const wholesalerPayouts: WholesalerPayoutRecord[] = [
  {
    id: "pay-3001",
    orderId: "#2056",
    orderAmount: 1000,
    commission: 100,
    payable: 900,
    status: "withdrawable",
    releasedAt: "Ready now",
    note: "Admin enabled withdrawal",
  },
  {
    id: "pay-3002",
    orderId: "#2057",
    orderAmount: 500,
    commission: 50,
    payable: 450,
    status: "pending",
    releasedAt: "Awaiting delivery confirmation",
    note: "COD not fully confirmed yet",
  },
  {
    id: "pay-3003",
    orderId: "#2058",
    orderAmount: 720,
    commission: 72,
    payable: 648,
    status: "paid",
    releasedAt: "2026-04-14 14:30",
    note: "Transferred to registered bank account",
  },
  {
    id: "pay-3004",
    orderId: "#2059",
    orderAmount: 350,
    commission: 35,
    payable: 315,
    status: "paid",
    releasedAt: "2026-04-12 11:10",
    note: "Transferred with settlement reference",
  },
];

export const wholesalerSalesWindows = [
  { label: "Daily Revenue", value: 1840, helper: "Last 24 hours" },
  { label: "Weekly Revenue", value: 9820, helper: "Last 7 days" },
  { label: "Monthly Revenue", value: 42850, helper: "Last 30 days" },
];

export const wholesalerTopProducts = [
  { name: "Smart Watch Active", units: 500, revenue: 49500 },
  { name: "Wireless Earbuds Pro", units: 420, revenue: 25196 },
  { name: "Yoga Mat Premium", units: 330, revenue: 9897 },
];

export const wholesalerRecentActivities = [
  {
    title: "Product approved",
    detail: "Smart Watch Active is live inside the approved product queue.",
    time: "12 mins ago",
  },
  {
    title: "Shipment updated",
    detail: "Order #2058 now shows carrier tracking for admin warehouse delivery.",
    time: "28 mins ago",
  },
  {
    title: "Withdrawal enabled",
    detail: "Settlement for order #2056 is now ready for withdrawal.",
    time: "48 mins ago",
  },
];

export const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

export const countByStatus = <T extends { status: string }>(
  records: T[],
  status: T["status"],
) => records.filter((record) => record.status === status).length;

export const getWholesalerProducts = (status?: WholesalerProductStatus) =>
  status
    ? wholesalerProducts.filter((record) => record.status === status)
    : wholesalerProducts;

export const getWholesalerOrders = (status?: WholesalerOrderStatus) =>
  status
    ? wholesalerOrders.filter((record) => record.status === status)
    : wholesalerOrders;

export const getWholesalerPayouts = (status?: WholesalerPayoutStatus) =>
  status
    ? wholesalerPayouts.filter((record) => record.status === status)
    : wholesalerPayouts;

export const sumPayoutsByStatus = (status: WholesalerPayoutStatus) =>
  getWholesalerPayouts(status).reduce(
    (sum, record) => sum + record.payable,
    0,
  );
