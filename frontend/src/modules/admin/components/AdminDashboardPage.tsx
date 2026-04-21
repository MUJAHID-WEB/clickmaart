import Link from "next/link";
import { countByStatus } from "../data/adminCoreData";
import { getAdminDashboardSnapshot, getAdminOrderQueueSnapshot } from "../server/getAdminCoreSnapshot";
import AdminSummaryCards from "./AdminSummaryCards";
export default async function AdminDashboardPage() {
  const [dashboardSnapshot, orderSnapshot] = await Promise.all([
    getAdminDashboardSnapshot(),
    getAdminOrderQueueSnapshot(),
  ]);

  const stats = [
    {
      label: "Pending Wholesalers",
      value: String(dashboardSnapshot.summary.pendingWholesalers),
      helper: "Applications waiting for approval review",
    },
    {
      label: "Pending Retailers",
      value: String(dashboardSnapshot.summary.pendingRetailers),
      helper: "Retailer accounts still in verification",
    },
    {
      label: "Pending Products",
      value: String(dashboardSnapshot.summary.pendingProducts),
      helper: "Products currently queued for moderation",
    },
    {
      label: "Live Stores",
      value: String(dashboardSnapshot.summary.liveStores),
      helper: "Customer-facing storefronts currently active",
    },
  ];

  const orderStatuses = [
    {
      label: "Pending",
      value: String(countByStatus(orderSnapshot.allRecords, "pending")),
    },
    {
      label: "Shipped",
      value: String(countByStatus(orderSnapshot.allRecords, "shipped")),
    },
    {
      label: "Delivered",
      value: String(countByStatus(orderSnapshot.allRecords, "delivered")),
    },
  ];

  const operationalHighlights = [
    {
      label: "Active Orders",
      value: String(dashboardSnapshot.summary.activeOrders),
      helper: "Orders currently moving through the admin workflow",
    },
    {
      label: "Review Load",
      value: String(
        dashboardSnapshot.summary.pendingWholesalers +
          dashboardSnapshot.summary.pendingRetailers +
          dashboardSnapshot.summary.pendingProducts,
      ),
      helper: "Combined pending approval and moderation queue size",
    },
    {
      label: "Store Coverage",
      value: `${dashboardSnapshot.summary.liveStores} live`,
      helper: "Admin and retailer stores available for customers",
    },
  ];

  const adminModules = [
    {
      title: "Wholesaler Management",
      href: "/admin/wholesalers",
      helper: "Pending, approved, and rejected wholesaler queues",
      metric: `${dashboardSnapshot.summary.pendingWholesalers} pending`,
    },
    {
      title: "Retailer Management",
      href: "/admin/retailers",
      helper: "Account review, approval, and operating status control",
      metric: `${dashboardSnapshot.summary.pendingRetailers} pending`,
    },
    {
      title: "Product Moderation",
      href: "/admin/products",
      helper: "Approve, reject, and prepare listing rules",
      metric: `${dashboardSnapshot.summary.pendingProducts} pending`,
    },
    {
      title: "Order Operations",
      href: "/admin/orders",
      helper: "Track queue health and drill into full orchestration detail",
      metric: `${dashboardSnapshot.summary.activeOrders} active orders`,
    },
    {
      title: "Delivery Tracking",
      href: "/admin/delivery",
      helper: "FedEx and Steadfast shipment visibility across both delivery legs",
      metric: "Live tracking view",
    },
    {
      title: "Commission Management",
      href: "/admin/commission",
      helper: "Review commission, payout release, and COD settlement readiness",
      metric: "Settlement workspace",
    },
    {
      title: "Reports and Analytics",
      href: "/admin/reports",
      helper: "Operational sales, commission, and export visibility",
      metric: "Overview, sales, commissions",
    },
    {
      title: "Store Administration",
      href: "/admin/stores",
      helper: "Domain health, merchandising readiness, and storefront controls",
      metric: `${dashboardSnapshot.summary.liveStores} live stores`,
    },
    {
      title: "Admin Profile",
      href: "/admin/settings/profile",
      helper: "Personal info, business docs, and security rules",
      metric: "Profile ready",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Admin Dashboard
              </span>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Dashboard Overview
                </h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-600">
                  The legacy admin look-and-feel stays intact while the full
                  operational workspace now runs through App Router routes for
                  review queues, product moderation, order detail, delivery,
                  commission, reporting, store administration, and profile
                  management.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Phase 7 operations and integrations are now active inside the App
              Router shell.
            </div>
          </div>
        </section>

        <AdminSummaryCards cards={stats} />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Operational Highlights
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  The dashboard now reflects the live Laravel operational
                  summary instead of a fixed placeholder snapshot.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                Backend connected
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {operationalHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-slate-900 p-4 text-white"
                >
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="mt-4 text-2xl font-bold">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.helper}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Order Status Distribution
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Matches the scoped dashboard breakdown for processing, shipped,
              and delivered orders.
            </p>
            <div className="mt-6 space-y-4">
              {orderStatuses.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3"
                >
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-lg font-bold text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Activities
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  New registrations, orders, and commission events from the
                  scoped admin dashboard.
                </p>
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Live feed placeholder
              </span>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Activity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Details
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {dashboardSnapshot.recentActivities.map((activity) => (
                    <tr key={activity.title}>
                      <td className="px-4 py-4 text-sm font-medium text-slate-900">
                        {activity.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {activity.detail}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">
                        {activity.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Admin Operations Workspace
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              These modules now cover the full operational surface targeted for
              the current delivery phase.
            </p>
            <div className="mt-6 space-y-3">
              {adminModules.map((module) => (
                <Link
                  key={module.href}
                  href={module.href}
                  className="block rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-200"
                >
                  <p className="font-semibold text-slate-900">{module.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{module.helper}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {module.metric}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
