import Link from "next/link";
import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminStatusNavigation from "./AdminStatusNavigation";
import AdminSummaryCards from "./AdminSummaryCards";
import {
  countByStatus,
  type AdminOrderRecord,
  type AdminOrderStatus,
} from "../data/adminCoreData";
import { getAdminOrderQueueSnapshot } from "../server/getAdminCoreSnapshot";

type PageStatus = AdminOrderStatus | "all";

const getPageDescription = (status: PageStatus) => {
  if (status === "pending") {
    return "Track newly received orders that are still waiting for wholesaler action or operational confirmation.";
  }

  if (status === "shipped") {
    return "Monitor packages moving from wholesaler or warehouse into delivery handoff with carrier tracking visibility.";
  }

  if (status === "delivered") {
    return "Review delivered orders, confirm COD completion, and keep wholesaler and retailer settlement readiness visible.";
  }

  return "Manage the admin order queues while linking each order into its full lifecycle, delivery tracking, and settlement detail.";
};

export default async function AdminOrdersPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getAdminOrderQueueSnapshot(status);

  const navigationItems = [
    { label: "Overview", href: "/admin/orders", count: allRecords.length },
    {
      label: "Pending",
      href: "/admin/orders/pending",
      count: countByStatus(allRecords, "pending"),
    },
    {
      label: "Shipped",
      href: "/admin/orders/shipped",
      count: countByStatus(allRecords, "shipped"),
    },
    {
      label: "Delivered",
      href: "/admin/orders/delivered",
      count: countByStatus(allRecords, "delivered"),
    },
  ];

  const summaryCards = [
    {
      label: "Pending Orders",
      value: String(countByStatus(allRecords, "pending")),
      helper: "Awaiting wholesaler or admin processing",
      tone: "warning" as const,
    },
    {
      label: "Shipped Orders",
      value: String(countByStatus(allRecords, "shipped")),
      helper: "Packages currently in transit",
      tone: "info" as const,
    },
    {
      label: "Delivered Orders",
      value: String(countByStatus(allRecords, "delivered")),
      helper: "Delivery completed and ready for COD confirmation",
      tone: "success" as const,
    },
    {
      label: "COD Value",
      value:
        visibleRecords.length === 0
          ? "$0.00"
          : `$${visibleRecords
              .reduce(
                (sum, row) =>
                  sum + Number.parseFloat(row.codAmount.replace(/[$,]/g, "")),
                0,
              )
              .toFixed(2)}`,
      helper: "Current COD total across the selected queue",
      tone: "neutral" as const,
    },
  ];

  return (
    <AdminCoreShell
      eyebrow="Admin Orders"
      title="Order Operations"
      description={getPageDescription(status)}
      aside={
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Queue operations now connect directly to the detailed orchestration
          view for warehouse receipt, customer dispatch, and payout visibility.
        </div>
      }
    >
      <AdminSummaryCards cards={summaryCards} />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Queue Navigation
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Admin operations focus on the three core queues used most often
              during fulfillment.
            </p>
          </div>
          <AdminStatusNavigation
            items={navigationItems}
            activeHref={
              status === "all" ? "/admin/orders" : `/admin/orders/${status}`
            }
          />
        </div>
      </section>

      <AdminDataTable<AdminOrderRecord>
        caption="Order operations queue"
        rows={visibleRecords}
        emptyMessage="No order records found for this queue."
        columns={[
          {
            key: "order",
            header: "Order",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-900">{row.id}</p>
                <p className="mt-1 text-xs text-slate-500">{row.customer}</p>
              </div>
            ),
          },
          {
            key: "retailer",
            header: "Retailer",
            render: (row) => row.retailer,
          },
          {
            key: "wholesaler",
            header: "Wholesaler",
            render: (row) => row.wholesaler,
          },
          {
            key: "items",
            header: "Items",
            render: (row) => row.items,
          },
          {
            key: "cod",
            header: "COD",
            render: (row) => row.codAmount,
          },
          {
            key: "tracking",
            header: "Tracking",
            render: (row) => row.tracking,
          },
          {
            key: "eta",
            header: "ETA",
            render: (row) => row.eta,
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
                href={`/admin/orders/${row.id.replace("#", "")}`}
                className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4"
              >
                Open detail
              </Link>
            ),
          },
        ]}
      />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Operational Notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Pending orders should highlight inactivity and wholesaler response risk.</li>
            <li>Shipped orders keep carrier tracking visible for admin and retailer operations.</li>
            <li>Delivered orders feed COD confirmation and payout release workflows.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Lifecycle Readiness
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Use order detail pages to review warehouse receipt, customer dispatch, and payment completion.</li>
            <li>Delivery assignment, exception tracking, and payout visibility now connect through the admin operations workspace.</li>
            <li>The queue view remains the fastest way to triage while detail pages handle deeper orchestration decisions.</li>
          </ul>
        </div>
      </section>
    </AdminCoreShell>
  );
}
