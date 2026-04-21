import Link from "next/link";
import RetailerPanelShell from "./RetailerPanelShell";
import RetailerSummaryCards from "./RetailerSummaryCards";
import {
  formatBdt,
} from "../data/retailerPanelData";
import { getRetailerDashboardSnapshot } from "../server/getRetailerPanelSnapshot";

const navigationBlocks = [
  {
    title: "Catalog Operations",
    href: "/retailer/catalog",
    helper:
      "Manage live, draft, and low-stock catalog items across retailer stores.",
  },
  {
    title: "Store Management",
    href: "/retailer/store",
    helper:
      "Configure domains, merchandising readiness, assigned products, and store performance.",
  },
  {
    title: "Order Tracking",
    href: "/retailer/orders",
    helper:
      "Track pending, in-delivery, and completed customer orders from one route group.",
  },
  {
    title: "Payouts and Reports",
    href: "/retailer/payouts",
    helper:
      "Review retailer profit payouts, reporting windows, and export readiness.",
  },
];

export default async function RetailerDashboardPage() {
  const snapshot = await getRetailerDashboardSnapshot();

  return (
    <RetailerPanelShell
      eyebrow="Retailer Dashboard"
      title="Business Panel Overview"
      description="This dashboard turns the retailer workspace into a real App Router business panel for catalog control, store operations, order tracking, payout visibility, and reporting readiness."
      actions={[
        { href: "/retailer/catalog", label: "Manage Catalog" },
        { href: "/retailer/store", label: "Open Stores" },
        { href: "/retailer/orders", label: "Track Orders" },
      ]}
    >
      <div className="space-y-6">
        <RetailerSummaryCards
          cards={[
            {
              label: "Live Catalog SKUs",
              value: String(snapshot.summary.liveProducts),
              helper: "Products already active inside retailer stores",
              tone: "success",
            },
            {
              label: "Low Stock SKUs",
              value: String(snapshot.summary.lowStockProducts),
              helper: "Products that need replenishment or visibility review",
              tone: "warning",
            },
            {
              label: "Pending Orders",
              value: String(snapshot.summary.pendingOrders),
              helper: "Orders still waiting on dispatch preparation",
              tone: "info",
            },
            {
              label: "Withdrawable Earnings",
              value: formatBdt(snapshot.summary.withdrawablePayouts),
              helper: "Retailer payouts currently enabled by admin",
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
                  Jump into the retailer routes completed in this phase.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                Phase 5 live
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {navigationBlocks.map((block) => (
                <Link
                  key={block.href}
                  href={block.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-300 hover:bg-orange-50"
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
              Store Operations Notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Retailers can manage multiple storefronts with store-specific pricing and merchandising rules.</li>
              <li>Low-stock items should remain visible so replenishment decisions are fast.</li>
              <li>Setup-pending stores keep domain and catalog configuration visible before launch.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Delivery Visibility
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Retailers should monitor pending, in-delivery, and completed orders from one panel.</li>
              <li>Courier and tracking references stay visible once customer dispatch begins.</li>
              <li>Payout readiness should reflect completed and commission-eligible orders automatically later.</li>
            </ul>
          </div>
        </section>
      </div>
    </RetailerPanelShell>
  );
}
