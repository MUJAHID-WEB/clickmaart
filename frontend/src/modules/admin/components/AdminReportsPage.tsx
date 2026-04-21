import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminRoutePills from "./AdminRoutePills";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminSummaryCards from "./AdminSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import OperationalAutomationPanel from "@/modules/notification/components/OperationalAutomationPanel";
import {
  formatBdt,
  type AdminOperationalReportView,
  type AutomationRuleRecord,
  type ExportJobRecord,
  type ReportWindowRecord,
} from "../data/adminAdvancedData";

const reportViewMeta: Record<
  AdminOperationalReportView,
  { title: string; description: string }
> = {
  overview: {
    title: "Reports and Analytics",
    description:
      "Operational sales, orders, commission, and export readiness now live in one App Router reporting workspace.",
  },
  sales: {
    title: "Sales Analytics",
    description:
      "Revenue, growth, and order-volume windows stay visible for daily through yearly operational review.",
  },
  commissions: {
    title: "Commission Analytics",
    description:
      "Commission performance, payout timing, and reconciliation exports remain visible for finance and operations.",
  },
};

export default function AdminReportsPage({
  view,
  windows,
  exportJobs,
  automationRules,
}: {
  view: AdminOperationalReportView;
  windows: ReportWindowRecord[];
  exportJobs: ExportJobRecord[];
  automationRules: AutomationRuleRecord[];
}) {
  const meta = reportViewMeta[view];
  const reportLabel =
    view === "sales"
      ? "Sales analytics"
      : view === "commissions"
        ? "Commission analytics"
        : "Operations overview";

  return (
    <AdminCoreShell
      eyebrow="Admin Reporting"
      title={meta.title}
      description={meta.description}
      aside={
        <AdminRoutePills
          activeHref={
            view === "overview" ? "/admin/reports" : `/admin/reports/${view}`
          }
          items={[
            { href: "/admin/reports", label: "Overview" },
            { href: "/admin/reports/sales", label: "Sales" },
            { href: "/admin/reports/commissions", label: "Commissions" },
          ]}
        />
      }
    >
      <AdminSummaryCards
        cards={windows.map((window) => ({
          label:
            view === "commissions"
              ? `${window.label} Commission`
              : `${window.label} Revenue`,
          value:
            view === "commissions"
              ? formatBdt(window.commission)
              : formatBdt(window.revenue),
          helper:
            view === "sales"
              ? `${window.orders} orders • ${window.growth} growth`
              : window.note,
          tone: "info" as const,
        }))}
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminDataTable<ReportWindowRecord>
          caption="Operational reporting windows"
          rows={windows}
          emptyMessage="No report windows available."
          columns={[
            {
              key: "window",
              header: "Window",
              render: (row) => row.label,
            },
            {
              key: "revenue",
              header: view === "commissions" ? "Commission" : "Revenue",
              render: (row) =>
                formatBdt(view === "commissions" ? row.commission : row.revenue),
            },
            {
              key: "orders",
              header: "Orders",
              render: (row) => row.orders,
            },
            {
              key: "growth",
              header: "Growth",
              render: (row) => row.growth,
            },
            {
              key: "note",
              header: "Notes",
              render: (row) => row.note,
            },
          ]}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            CSV and PDF Export Queue
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Export jobs are now part of the reporting workspace so operational
            snapshots can be generated without leaving the analytics surface.
          </p>
          <div className="mt-4">
            <MutationActionStrip
              role="admin"
              method="POST"
              path="/admin/reports/export"
              helperText="Each action queues a new export job in Laravel and refreshes the reporting snapshot."
              actions={[
                {
                  label: "Queue CSV Export",
                  payload: {
                    report: reportLabel,
                    format: "CSV",
                    scope: `${meta.title} live dashboard`,
                  },
                  tone: "primary",
                },
                {
                  label: "Queue PDF Export",
                  payload: {
                    report: reportLabel,
                    format: "PDF",
                    scope: `${meta.title} live dashboard`,
                  },
                  tone: "success",
                },
              ]}
            />
          </div>
          <div className="mt-5 space-y-4">
            {exportJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {job.report}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {job.format} export for {job.scope}
                    </p>
                  </div>
                  <AdminStatusBadge status={job.status} />
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Requested By
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {job.requestedBy}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Generated At
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {job.generatedAt}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <OperationalAutomationPanel
        title="Report-driven automation"
        description="Low-stock, payout-delay, and export readiness alerts remain attached to the same operational analytics workflow."
        rules={automationRules}
      />
    </AdminCoreShell>
  );
}
