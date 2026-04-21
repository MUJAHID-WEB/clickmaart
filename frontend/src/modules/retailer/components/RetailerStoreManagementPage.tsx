import RetailerDataTable from "./RetailerDataTable";
import RetailerPanelShell from "./RetailerPanelShell";
import RetailerStatusBadge from "./RetailerStatusBadge";
import RetailerSummaryCards from "./RetailerSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import {
  countByStatus,
  formatBdt,
  type RetailerStoreRecord,
} from "../data/retailerPanelData";
import { getRetailerStoreManagementSnapshot } from "../server/getRetailerPanelSnapshot";

export default async function RetailerStoreManagementPage() {
  const { stores, catalogRecords } = await getRetailerStoreManagementSnapshot();
  const totalRevenue = stores.reduce((sum, store) => sum + store.revenue, 0);
  const totalOrders = stores.reduce((sum, store) => sum + store.monthlyOrders, 0);
  const totalProducts = stores.reduce((sum, store) => sum + store.products, 0);
  const liveCatalogCount = countByStatus(catalogRecords, "live");

  return (
    <RetailerPanelShell
      eyebrow="Retailer Stores"
      title="Store Management"
      description="Configure storefronts, review domain and merchandising readiness, and keep product assignment and revenue visibility in one retailer control surface."
      actions={[
        { href: "/retailer/catalog", label: "Back to Catalog" },
        { href: "/retailer/reports", label: "Open Store Reports" },
      ]}
    >
      <div className="space-y-6">
        <RetailerSummaryCards
          cards={[
            {
              label: "Active Stores",
              value: String(countByStatus(stores, "active")),
              helper: "Storefronts currently ready for customers",
              tone: "success",
            },
            {
              label: "Setup Pending",
              value: String(countByStatus(stores, "setup-pending")),
              helper: "Stores still waiting on setup completion",
              tone: "warning",
            },
            {
              label: "Assigned Products",
              value: String(totalProducts),
              helper: "Products distributed across retailer storefronts",
              tone: "info",
            },
            {
              label: "30-Day Revenue",
              value: formatBdt(totalRevenue),
              helper: `${totalOrders} orders across all retailer stores`,
              tone: "neutral",
            },
          ]}
        />

        <RetailerDataTable<RetailerStoreRecord>
          caption="Retailer stores"
          rows={stores}
          emptyMessage="No store records available."
          columns={[
            {
              key: "store",
              header: "Store",
              render: (row) => (
                <div>
                  <p className="font-semibold text-slate-900">{row.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.domain}</p>
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
              key: "inventory",
              header: "Low Stock",
              render: (row) => row.lowStockCount,
            },
            {
              key: "status",
              header: "Status",
              render: (row) => <RetailerStatusBadge status={row.status} />,
            },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <MutationActionStrip
                role="retailer"
                path={`/retailer/stores/${encodeURIComponent(row.id)}`}
                helperText={row.note}
                actions={[
                  {
                    label: "Update Domain",
                    prompt: {
                      field: "domain",
                      label: "Enter the storefront domain",
                      defaultValue: row.domain,
                    },
                    tone: "primary",
                  },
                  ...(row.status !== "active"
                    ? [{ label: "Activate", payload: { status: "active" }, tone: "success" as const }]
                    : []),
                  {
                    label: "Set Pending",
                    payload: { status: "setup-pending" },
                    tone: "danger",
                  },
                ]}
              />
            ),
          },
        ]}
      />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Store Setup Rules
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Each retailer store needs a unique domain or subdomain mapping.</li>
              <li>Checkout visibility should remain disabled while a store is setup-pending.</li>
              <li>Product assignment and store pricing need to stay store-specific.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Merchandising Readiness
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>{liveCatalogCount} catalog items are already available for immediate store merchandising.</li>
              <li>Low-stock items should be reviewed before major campaigns go live.</li>
              <li>Later phases will connect these controls to tenant-aware public storefront rendering.</li>
            </ul>
          </div>
        </section>
      </div>
    </RetailerPanelShell>
  );
}
