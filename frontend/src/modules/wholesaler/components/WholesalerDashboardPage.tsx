import Link from "next/link";
import WholesalerPanelShell from "./WholesalerPanelShell";
import WholesalerSummaryCards from "./WholesalerSummaryCards";
import {
  formatUsd,
} from "../data/wholesalerPanelData";
import { getWholesalerDashboardSnapshot } from "../server/getWholesalerPanelSnapshot";

const navigationBlocks = [
  {
    title: "Product Management",
    href: "/wholesaler/products",
    helper: "Create submissions, monitor moderation states, and manage stock visibility.",
  },
  {
    title: "Order Workflow",
    href: "/wholesaler/orders",
    helper: "Move orders from pending fulfillment into shipped and payment-done queues.",
  },
  {
    title: "Payment System",
    href: "/wholesaler/payments",
    helper: "Track commission deductions, withdrawal readiness, and settlement history.",
  },
  {
    title: "Reports and Analytics",
    href: "/wholesaler/reports",
    helper: "Review daily, weekly, and monthly performance snapshots.",
  },
];

export default async function WholesalerDashboardPage() {
  const snapshot = await getWholesalerDashboardSnapshot();

  return (
    <WholesalerPanelShell
      eyebrow="Wholesaler Dashboard"
      title="Business Panel Overview"
      description="This dashboard turns the wholesaler workspace into a real App Router business panel covering product submissions, shipment operations, payout visibility, and reporting readiness."
      actions={[
        { href: "/wholesaler/products", label: "Manage Products" },
        { href: "/wholesaler/orders", label: "Open Orders" },
        { href: "/wholesaler/payments", label: "View Payouts" },
      ]}
    >
      <div className="space-y-6">
        <WholesalerSummaryCards
          cards={[
            {
              label: "Approved Products",
              value: String(snapshot.summary.approvedProducts),
              helper: "Catalog items already cleared by admin moderation",
              tone: "success",
            },
            {
              label: "Pending Review",
              value: String(snapshot.summary.pendingProducts),
              helper: "Submissions waiting for admin approval",
              tone: "warning",
            },
            {
              label: "Pending Orders",
              value: String(snapshot.summary.pendingOrders),
              helper: "Orders awaiting packing or tracking upload",
              tone: "info",
            },
            {
              label: "Withdrawable Earnings",
              value: formatUsd(snapshot.summary.withdrawablePayouts),
              helper: "Current settlements enabled by admin",
              tone: "neutral",
            },
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Quick Navigation
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Jump directly into the wholesaler workflows completed in this
                  phase.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                Phase 4 live
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {navigationBlocks.map((block) => (
                <Link
                  key={block.href}
                  href={block.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <h3 className="text-base font-semibold text-slate-900">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {block.helper}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Activity
            </h2>
            <div className="mt-5 space-y-4">
              {snapshot.recentActivities.map((activity) => (
                <div
                  key={activity.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-900">{activity.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{activity.detail}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Shipment Readiness
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Pending orders are visible until tracking information is uploaded.</li>
              <li>Shipped orders keep the admin warehouse destination and carrier references visible.</li>
              <li>Customer contact remains masked while the wholesaler handles shipment tasks.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Earnings Readiness
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Platform commission stays fixed at 10% for payout calculations.</li>
              <li>Withdrawal readiness depends on admin settlement enablement.</li>
              <li>Payment-done orders flow into reports and payout summaries automatically in the next API phase.</li>
            </ul>
          </div>
        </section>
      </div>
    </WholesalerPanelShell>
  );
}
