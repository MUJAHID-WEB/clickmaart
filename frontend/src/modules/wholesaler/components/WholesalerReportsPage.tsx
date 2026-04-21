import WholesalerDataTable from "./WholesalerDataTable";
import WholesalerPanelShell from "./WholesalerPanelShell";
import WholesalerSummaryCards from "./WholesalerSummaryCards";
import { formatUsd } from "../data/wholesalerPanelData";
import { getWholesalerReportsSnapshot } from "../server/getWholesalerPanelSnapshot";

export default async function WholesalerReportsPage() {
  const snapshot = await getWholesalerReportsSnapshot();

  return (
    <WholesalerPanelShell
      eyebrow="Wholesaler Reports"
      title="Reports and Analytics"
      description="Review revenue, order health, top-performing products, and export readiness from the wholesaler reporting workspace."
      actions={[
        { href: "/wholesaler/dashboard", label: "Back to Dashboard" },
        { href: "/wholesaler/products/approved", label: "Approved Products" },
      ]}
    >
      <div className="space-y-6">
        <WholesalerSummaryCards
          cards={snapshot.salesWindows.map((window) => ({
            label: window.label,
            value: formatUsd(window.value),
            helper: window.helper,
            tone: "info" as const,
          }))}
        />

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <WholesalerDataTable<(typeof snapshot.salesWindows)[number]>
            caption="Revenue windows"
            rows={snapshot.salesWindows}
            emptyMessage="No revenue windows available."
            columns={[
              {
                key: "period",
                header: "Window",
                render: (row) => row.label,
              },
              {
                key: "revenue",
                header: "Revenue",
                render: (row) => formatUsd(row.value),
              },
              {
                key: "helper",
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
                  Daily and monthly sales summaries are now framed for CSV
                  download through the shared export workflow.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">PDF Export</p>
                <p className="mt-2 text-sm text-slate-600">
                  Settlement and performance snapshots are now aligned to the
                  shared PDF export workflow.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Fulfillment Health</p>
                <p className="mt-2 text-sm text-slate-600">
                  Order throughput and payout timing will feed the next reporting
                  iteration automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        <WholesalerDataTable<(typeof snapshot.topProducts)[number]>
          caption="Top-performing products"
          rows={snapshot.topProducts}
          emptyMessage="No top products available."
          columns={[
            {
              key: "name",
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
              render: (row) => formatUsd(row.revenue),
            },
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Report Coverage
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Daily, weekly, and monthly revenue remain visible from one place.</li>
              <li>Top products show which approved items are driving wholesaler growth.</li>
              <li>Comparison and downloadable report workflows now align with the shared Phase 7 reporting plan.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Analytics Direction
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Sales, order, and payout insights should share one reporting contract.</li>
              <li>Approved product performance should feed future merchandising recommendations.</li>
              <li>Export jobs now follow the shared reporting pipeline documented for Phase 7.</li>
            </ul>
          </div>
        </section>
      </div>
    </WholesalerPanelShell>
  );
}
