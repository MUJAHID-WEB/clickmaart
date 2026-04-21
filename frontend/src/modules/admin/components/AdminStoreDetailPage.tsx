import AdminCoreShell from "./AdminCoreShell";
import AdminRoutePills from "./AdminRoutePills";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminSummaryCards from "./AdminSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import OperationalAutomationPanel from "@/modules/notification/components/OperationalAutomationPanel";
import {
  formatBdt,
  type AdminStoreRecord,
  type AutomationRuleRecord,
} from "../data/adminAdvancedData";

export default function AdminStoreDetailPage({
  store,
  automationRules,
}: {
  store: AdminStoreRecord;
  automationRules: AutomationRuleRecord[];
}) {
  return (
    <AdminCoreShell
      eyebrow="Store Detail"
      title={store.name}
      description="Domain health, catalog readiness, and operational alerts for this storefront are grouped here so launch and merchandising decisions stay easy to review."
      aside={
        <AdminRoutePills
          activeHref={`/admin/stores/${store.id}`}
          items={[
            { href: "/admin/stores", label: "All Stores" },
            { href: "/admin/reports", label: "Store Reports" },
            { href: "/storefront-preview/admin", label: "Preview Storefront" },
          ]}
        />
      }
    >
      <AdminSummaryCards
        cards={[
          {
            label: "Store Status",
            value: store.status.toUpperCase(),
            helper: store.dnsHealth,
            tone: store.status === "live" ? "success" : "warning",
          },
          {
            label: "Assigned Products",
            value: String(store.products),
            helper: "Visible or staged products attached to this storefront",
            tone: "info",
          },
          {
            label: "30-Day Orders",
            value: String(store.monthlyOrders),
            helper: "Recent order volume used for staffing and campaign planning",
            tone: "neutral",
          },
          {
            label: "30-Day Revenue",
            value: formatBdt(store.revenue),
            helper: `${store.lowStockAlerts} low-stock alerts currently open`,
            tone: "warning",
          },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Store Metadata
              </h2>
              <AdminStatusBadge status={store.status} />
            </div>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Owner
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {store.owner}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Domain
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {store.domain}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  DNS Health
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {store.dnsHealth}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Operator Note
                </p>
                <p className="mt-2 text-sm text-slate-700">{store.note}</p>
              </div>
            </div>
            <div className="mt-5">
              <MutationActionStrip
                role="admin"
                path={`/admin/stores/${encodeURIComponent(store.id)}`}
                helperText="Store launch state, DNS readiness, and draft visibility now update through the backend."
                actions={[
                  {
                    label: "Set Live",
                    payload: { status: "live" },
                    tone: "success",
                  },
                  {
                    label: "Set Draft",
                    payload: { status: "draft" },
                    tone: "neutral",
                  },
                  {
                    label: "DNS Pending",
                    payload: { status: "dns-pending" },
                    tone: "primary",
                  },
                  {
                    label: "Setup Pending",
                    payload: { status: "setup-pending" },
                    tone: "danger",
                  },
                ]}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Readiness Checklist
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Domain validation must remain green before public launch or campaign pushes.</li>
              <li>Store-specific pricing and assortment assignment remain visible for admin review.</li>
              <li>Low-stock alerts should be resolved before running homepage placements or ads.</li>
            </ul>
          </div>
        </div>

        <OperationalAutomationPanel
          title="Store alerting"
          description="This store inherits low-stock and launch-readiness automation so merchandising and support teams stay aligned."
          rules={automationRules}
        />
      </section>
    </AdminCoreShell>
  );
}
