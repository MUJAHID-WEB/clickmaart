export type AccountReviewStatus = "pending" | "approved" | "rejected";
export type ProductReviewStatus = "pending" | "approved" | "rejected";
export type AdminOrderStatus = "pending" | "shipped" | "delivered";

export type WholesalerRecord = {
  id: string;
  businessName: string;
  email: string;
  category: string;
  products: number;
  orders: number;
  since: string;
  documentsVerified: boolean;
  complianceScore: string;
  status: AccountReviewStatus;
  rejectionReason?: string;
};

export type RetailerRecord = {
  id: string;
  businessName: string;
  email: string;
  businessType: string;
  monthlyOrders: number;
  docsVerified: boolean;
  lastActive: string;
  status: AccountReviewStatus;
  rejectionReason?: string;
};

export type ProductModerationRecord = {
  id: string;
  name: string;
  category: string;
  wholesaler: string;
  price: string;
  stock: number;
  markup: string;
  status: ProductReviewStatus;
  listed: boolean;
  rejectionReason?: string;
};

export type AdminOrderRecord = {
  id: string;
  retailer: string;
  wholesaler: string;
  items: number;
  codAmount: string;
  tracking: string;
  eta: string;
  status: AdminOrderStatus;
  customer: string;
};

export const wholesalerRecords: WholesalerRecord[] = [
  {
    id: "wh-1001",
    businessName: "Global Imports",
    email: "imports@global.com",
    category: "Electronics",
    products: 75,
    orders: 320,
    since: "2 days ago",
    documentsVerified: true,
    complianceScore: "97%",
    status: "pending",
  },
  {
    id: "wh-1002",
    businessName: "Quality Distributors",
    email: "quality@dist.com",
    category: "Home Goods",
    products: 42,
    orders: 185,
    since: "1 day ago",
    documentsVerified: true,
    complianceScore: "95%",
    status: "pending",
  },
  {
    id: "wh-1003",
    businessName: "Mega Suppliers",
    email: "mega@supply.com",
    category: "Consumer Tech",
    products: 118,
    orders: 510,
    since: "Today",
    documentsVerified: true,
    complianceScore: "98%",
    status: "approved",
  },
  {
    id: "wh-1004",
    businessName: "Premium Goods LLC",
    email: "hello@premiumgoods.co",
    category: "Beauty",
    products: 63,
    orders: 276,
    since: "3 days ago",
    documentsVerified: true,
    complianceScore: "96%",
    status: "approved",
  },
  {
    id: "wh-1005",
    businessName: "Budget Goods",
    email: "budget@goods.com",
    category: "Accessories",
    products: 21,
    orders: 44,
    since: "5 days ago",
    documentsVerified: false,
    complianceScore: "61%",
    status: "rejected",
    rejectionReason: "Incomplete business registration documents",
  },
  {
    id: "wh-1006",
    businessName: "Cityline Wholesale",
    email: "ops@citylinewholesale.com",
    category: "Fashion",
    products: 39,
    orders: 78,
    since: "4 days ago",
    documentsVerified: false,
    complianceScore: "58%",
    status: "rejected",
    rejectionReason: "Tax identity mismatch with submitted trade license",
  },
];

export const retailerRecords: RetailerRecord[] = [
  {
    id: "rt-2001",
    businessName: "Urban Retail Co.",
    email: "urban@retail.com",
    businessType: "Fashion",
    monthlyOrders: 1250,
    docsVerified: true,
    lastActive: "Today",
    status: "pending",
  },
  {
    id: "rt-2002",
    businessName: "Fresh Grocers",
    email: "fresh@grocers.com",
    businessType: "Food and Beverage",
    monthlyOrders: 620,
    docsVerified: false,
    lastActive: "2 hours ago",
    status: "pending",
  },
  {
    id: "rt-2003",
    businessName: "Tech Haven",
    email: "tech@haven.com",
    businessType: "Electronics",
    monthlyOrders: 890,
    docsVerified: true,
    lastActive: "Today",
    status: "approved",
  },
  {
    id: "rt-2004",
    businessName: "Urban Mart",
    email: "hello@urbanmart.com",
    businessType: "Lifestyle",
    monthlyOrders: 1320,
    docsVerified: true,
    lastActive: "1 hour ago",
    status: "approved",
  },
  {
    id: "rt-2005",
    businessName: "Budget Mart",
    email: "budget@mart.com",
    businessType: "General Goods",
    monthlyOrders: 170,
    docsVerified: false,
    lastActive: "3 days ago",
    status: "rejected",
    rejectionReason: "Incomplete company identity and store ownership proof",
  },
  {
    id: "rt-2006",
    businessName: "Outlet Basics",
    email: "owner@outletbasics.com",
    businessType: "Household",
    monthlyOrders: 245,
    docsVerified: false,
    lastActive: "4 days ago",
    status: "rejected",
    rejectionReason: "Store compliance checklist not fully satisfied",
  },
];

export const productModerationRecords: ProductModerationRecord[] = [
  {
    id: "prd-3001",
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    wholesaler: "Tech Distributors",
    price: "$59.99",
    stock: 250,
    markup: "15%",
    status: "pending",
    listed: false,
  },
  {
    id: "prd-3002",
    name: "Organic Coffee Beans",
    category: "Grocery",
    wholesaler: "Global Foods",
    price: "$12.50",
    stock: 640,
    markup: "12%",
    status: "pending",
    listed: false,
  },
  {
    id: "prd-3003",
    name: "Yoga Mat Premium",
    category: "Fitness",
    wholesaler: "Wellness Supply",
    price: "$29.99",
    stock: 180,
    markup: "20%",
    status: "approved",
    listed: true,
  },
  {
    id: "prd-3004",
    name: "Smart Watch Active",
    category: "Electronics",
    wholesaler: "Mega Suppliers",
    price: "$99.00",
    stock: 65,
    markup: "18%",
    status: "approved",
    listed: true,
  },
  {
    id: "prd-3005",
    name: "Cheap Sunglasses",
    category: "Accessories",
    wholesaler: "Budget Goods",
    price: "$6.00",
    stock: 500,
    markup: "5%",
    status: "rejected",
    listed: false,
    rejectionReason: "Low-quality materials and duplicate product imagery",
  },
  {
    id: "prd-3006",
    name: "Plastic Lunch Box Set",
    category: "Kitchen",
    wholesaler: "Value House",
    price: "$8.50",
    stock: 140,
    markup: "8%",
    status: "rejected",
    listed: false,
    rejectionReason: "Incomplete nutrition-safe packaging declaration",
  },
];

export const adminOrderRecords: AdminOrderRecord[] = [
  {
    id: "#3056",
    retailer: "Urban Mart",
    wholesaler: "Global Goods",
    items: 3,
    codAmount: "$125.50",
    tracking: "FX789123",
    eta: "Nov 20",
    status: "pending",
    customer: "John Doe",
  },
  {
    id: "#3057",
    retailer: "Tech Haven",
    wholesaler: "Mega Suppliers",
    items: 2,
    codAmount: "$220.00",
    tracking: "QD882010",
    eta: "Nov 20",
    status: "pending",
    customer: "Amina Rahman",
  },
  {
    id: "#3058",
    retailer: "Urban Retail Co.",
    wholesaler: "Premium Goods LLC",
    items: 4,
    codAmount: "$310.75",
    tracking: "ST552010",
    eta: "Nov 21",
    status: "shipped",
    customer: "Rafi Ahmed",
  },
  {
    id: "#3059",
    retailer: "Fresh Grocers",
    wholesaler: "Global Foods",
    items: 6,
    codAmount: "$88.20",
    tracking: "FX998002",
    eta: "Nov 21",
    status: "shipped",
    customer: "Sumaiya Akter",
  },
  {
    id: "#3060",
    retailer: "Tech Haven",
    wholesaler: "Mega Suppliers",
    items: 1,
    codAmount: "$140.00",
    tracking: "QD229901",
    eta: "Delivered",
    status: "delivered",
    customer: "Nusrat Jahan",
  },
  {
    id: "#3061",
    retailer: "Urban Mart",
    wholesaler: "Wellness Supply",
    items: 5,
    codAmount: "$96.00",
    tracking: "ST445515",
    eta: "Delivered",
    status: "delivered",
    customer: "Mehedi Hasan",
  },
];

export const adminRecentActivities = [
  {
    title: "Wholesaler approved",
    detail: "Premium Goods LLC moved from pending to approved queue",
    time: "8 mins ago",
  },
  {
    title: "Retailer review requested",
    detail: "Fresh Grocers still needs a valid tax document upload",
    time: "16 mins ago",
  },
  {
    title: "Product listed",
    detail: "Yoga Mat Premium is now live inside the admin store catalog",
    time: "24 mins ago",
  },
  {
    title: "Delivery updated",
    detail: "Order #3058 moved into customer delivery handoff",
    time: "31 mins ago",
  },
];

export const adminProfileSnapshot = {
  name: "ClickMaart Platform Admin",
  email: "admin@clickmaart.com",
  phone: "+8801712345678",
  designation: "Operations Director",
  address: "House 12, Road 7, Gulshan 1, Dhaka",
  company: "ClickMaart Commerce Ltd.",
  tradeLicense: "TL-2026-CM-00145",
  businessDocument: "trade-license-clickmaart.pdf",
  passwordPolicy:
    "Minimum 8 characters with uppercase, lowercase, number, and special character.",
  securityNote:
    "Accounts lock after 3 failed attempts and reset links are issued automatically.",
};

export const getWholesalerRecords = (status?: AccountReviewStatus) =>
  status
    ? wholesalerRecords.filter((record) => record.status === status)
    : wholesalerRecords;

export const getRetailerRecords = (status?: AccountReviewStatus) =>
  status
    ? retailerRecords.filter((record) => record.status === status)
    : retailerRecords;

export const getProductModerationRecords = (status?: ProductReviewStatus) =>
  status
    ? productModerationRecords.filter((record) => record.status === status)
    : productModerationRecords;

export const getAdminOrderRecords = (status?: AdminOrderStatus) =>
  status
    ? adminOrderRecords.filter((record) => record.status === status)
    : adminOrderRecords;

export const countByStatus = <
  T extends { status: AccountReviewStatus | ProductReviewStatus | AdminOrderStatus },
>(
  records: T[],
  status: T["status"],
) => records.filter((record) => record.status === status).length;
