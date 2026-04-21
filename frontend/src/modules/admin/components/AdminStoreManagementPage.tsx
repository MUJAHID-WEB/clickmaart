import Link from "next/link";
import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminRoutePills from "./AdminRoutePills";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminSummaryCards from "./AdminSummaryCards";
import OperationalAutomationPanel from "@/modules/notification/components/OperationalAutomationPanel";
import {
  formatBdt,
  type AdminStoreRecord,
  type AutomationRuleRecord,
} from "../data/adminAdvancedData";

export default function AdminStoreManagementPage({
  stores,
  automationRules,
}: {
  stores: AdminStoreRecord[];
  automationRules: AutomationRuleRecord[];
}) {
  const launchPendingCount = stores.filter((store) =>
    ["dns-pending", "setup-pending"].includes(store.status),
  ).length;
  const revenueTotal = stores.reduce((sum, store) => sum + store.revenue, 0);
  const orderTotal = stores.reduce((sum, store) => sum + store.monthlyOrders, 0);
  const lowStockTotal = stores.reduce(
    (sum, store) => sum + store.lowStockAlerts,
    0,
  );

  return (
    <AdminCoreShell
      eyebrow="Admin Stores"
      title="Admin Store Management System"
      description="Store ownership, domain health, merchandising readiness, and storefront operations are now tracked from one admin control surface."
      aside={
        <AdminRoutePills
          activeHref="/admin/stores"
          items={[
            { href: "/admin/stores", label: "Store Management" },
            { href: "/storefront-preview/admin", label: "Preview Admin Store" },
            { href: "/admin/reports", label: "Store Reports" },
          ]}
        />
      }
    >
      <AdminSummaryCards
        cards={[
          {
            label: "Live Stores",
            value: String(stores.filter((store) => store.status === "live").length),
            helper: "Admin and retailer storefronts currently customer-facing",
            tone: "success",
          },
          {
            label: "Launch Pending",
            value: String(launchPendingCount),
            helper: "Stores blocked on domain validation or final setup work",
            tone: "warning",
          },
          {
            label: "30-Day GMV",
            value: formatBdt(revenueTotal),
            helper: `${orderTotal} orders across all managed stores`,
            tone: "info",
          },
          {
            label: "Low Stock Alerts",
            value: String(lowStockTotal),
            helper: "Store-level inventory signals requiring merchandising action",
            tone: lowStockTotal > 0 ? "danger" : "neutral",
          },
        ]}
      />

      <AdminDataTable<AdminStoreRecord>
        caption="Storefront administration"
        rows={stores}
        emptyMessage="No store records available."
        columns={[
          {
            key: "store",
            header: "Store",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-900">{row.name}</p>
                <p className="mt-1 text-xs text-slate-500">{row.owner}</p>
              </div>
            ),
          },
          {
            key: "domain",
            header: "Domain",
            render: (row) => (
              <div>
                <p>{row.domain}</p>
                <p className="mt-1 text-xs text-slate-500">{row.dnsHealth}</p>
              </div>
            ),
          },
          {
            key: "products",
            header: "Products",
            render: (row) => row.products,
          },
          {
            key: "orders",
            header: "30-Day Orders",
            render: (row) => row.monthlyOrders,
          },
          {
            key: "revenue",
            header: "Revenue",
            render: (row) => formatBdt(row.revenue),
          },
          {
            key: "stock",
            header: "Low Stock",
            render: (row) => row.lowStockAlerts,
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <AdminStatusBadge status={row.status} />,
          },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <Link
                href={`/admin/stores/${row.id}`}
                className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4"
              >
                Open detail
              </Link>
            ),
          },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Store Operations Notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Admin-owned and retailer-owned storefronts now share one admin oversight surface.</li>
            <li>Domain health, low stock, and store launch readiness stay visible without leaving the admin workspace.</li>
            <li>Preview routes remain aligned with tenant-aware public storefront rendering.</li>
          </ul>
        </div>

        <OperationalAutomationPanel
          title="Storefront automation"
          description="Inventory and order-volume alerts now support admin store administration and retailer storefront oversight."
          rules={automationRules}
        />
      </section>
    </AdminCoreShell>
  );
}
