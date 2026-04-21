import RetailerDataTable from "./RetailerDataTable";
import RetailerPanelShell from "./RetailerPanelShell";
import RetailerSummaryCards from "./RetailerSummaryCards";
import { formatBdt } from "../data/retailerPanelData";
import { getRetailerReportsSnapshot } from "../server/getRetailerPanelSnapshot";

export default async function RetailerReportsPage() {
  const snapshot = await getRetailerReportsSnapshot();

  return (
    <RetailerPanelShell
      eyebrow="Retailer Reports"
      title="Reports and Analytics"
      description="Review retailer sales windows, top-performing products, and export readiness from one reporting workspace."
      actions={[
        { href: "/retailer/dashboard", label: "Back to Dashboard" },
        { href: "/retailer/store", label: "Open Stores" },
      ]}
    >
      <div className="space-y-6">
        <RetailerSummaryCards
          cards={snapshot.salesWindows.map((window) => ({
            label: window.label,
            value: formatBdt(window.value),
            helper: window.helper,
            tone: "info" as const,
          }))}
        />

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <RetailerDataTable<(typeof snapshot.salesWindows)[number]>
            caption="Retailer reporting windows"
            rows={snapshot.salesWindows}
            emptyMessage="No retailer reporting windows available."
            columns={[
              {
                key: "period",
                header: "Window",
                render: (row) => row.label,
              },
              {
                key: "sales",
                header: "Sales",
                render: (row) => formatBdt(row.value),
              },
              {
                key: "notes",
                header: "Notes",
                render: (row) => row.helper,
              },
            ]}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Export Readiness
            </h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">CSV Export</p>
                <p className="mt-2 text-sm text-slate-600">
                  Store, catalog, and payout summaries should be exportable as
                  CSV through the shared export workflow.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">PDF Export</p>
                <p className="mt-2 text-sm text-slate-600">
                  Management snapshots are now aligned to the shared printable
                  PDF export workflow.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Store Health</p>
                <p className="mt-2 text-sm text-slate-600">
                  Low stock, delivery performance, and payout timing should feed
                  the same analytics contract now tracked in the operations
                  reporting layer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RetailerDataTable<(typeof snapshot.topProducts)[number]>
          caption="Top-performing retailer products"
          rows={snapshot.topProducts}
          emptyMessage="No retailer top products available."
          columns={[
            {
              key: "product",
              header: "Product",
              render: (row) => row.name,
            },
            {
              key: "units",
              header: "Units Sold",
              render: (row) => row.units,
            },
            {
              key: "revenue",
              header: "Revenue",
              render: (row) => formatBdt(row.revenue),
            },
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Report Coverage
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Daily, weekly, and monthly sales windows should stay visible from one page.</li>
              <li>Top products should help retailers decide which assortments deserve more visibility.</li>
              <li>Store and payout insights should remain easy to correlate before backend integration begins.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Analytics Direction
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Reporting contracts should unify sales, orders, catalog health, and payout signals.</li>
              <li>Retailer public storefront completion in Phase 6 will feed directly into these dashboards.</li>
              <li>Queue-backed exports now align with the shared Phase 7 reporting pipeline.</li>
            </ul>
          </div>
        </section>
      </div>
    </RetailerPanelShell>
  );
}
