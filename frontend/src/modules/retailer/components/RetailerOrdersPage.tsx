import RetailerDataTable from "./RetailerDataTable";
import RetailerPanelShell from "./RetailerPanelShell";
import RetailerStatusBadge from "./RetailerStatusBadge";
import RetailerStatusNavigation from "./RetailerStatusNavigation";
import RetailerSummaryCards from "./RetailerSummaryCards";
import {
  countByStatus,
  formatBdt,
  type RetailerOrderRecord,
  type RetailerOrderStatus,
} from "../data/retailerPanelData";
import { getRetailerOrdersSnapshot } from "../server/getRetailerPanelSnapshot";

type PageStatus = RetailerOrderStatus | "all";

const getDescription = (status: PageStatus) => {
  if (status === "pending") {
    return "Track new customer orders that are ready for fulfillment and courier assignment.";
  }

  if (status === "in-delivery") {
    return "Monitor active delivery tracking with courier and tracking references in view.";
  }

  if (status === "completed") {
    return "Review completed orders that can now contribute to retailer payout readiness and reporting.";
  }

  return "Manage retailer orders across pending, in-delivery, and completed queues from one App Router workspace.";
};

export default async function RetailerOrdersPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getRetailerOrdersSnapshot(
    status,
  );

  return (
    <RetailerPanelShell
      eyebrow="Retailer Orders"
      title="Order and Delivery Tracking"
      description={getDescription(status)}
      actions={[
        { href: "/retailer/orders", label: "Orders Overview" },
        { href: "/retailer/payouts", label: "Open Payouts" },
      ]}
    >
      <div className="space-y-6">
        <RetailerSummaryCards
          cards={[
            {
              label: "Pending Orders",
              value: String(countByStatus(allRecords, "pending")),
              helper: "Orders waiting for dispatch preparation",
              tone: "warning",
            },
            {
              label: "In Delivery",
              value: String(countByStatus(allRecords, "in-delivery")),
              helper: "Orders already moving toward the customer",
              tone: "info",
            },
            {
              label: "Completed Orders",
              value: String(countByStatus(allRecords, "completed")),
              helper: "Orders that now contribute to earnings",
              tone: "success",
            },
            {
              label: "Visible GMV",
              value: formatBdt(
                visibleRecords.reduce((sum, row) => sum + row.total, 0),
              ),
              helper: "Gross order value across the selected queue",
              tone: "neutral",
            },
          ]}
        />

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Order Queues
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Retailers can monitor dispatch and delivery flow from one place.
              </p>
            </div>
            <RetailerStatusNavigation
              items={[
                {
                  label: "Overview",
                  href: "/retailer/orders",
                  count: allRecords.length,
                },
                {
                  label: "Pending",
                  href: "/retailer/orders/pending",
                  count: countByStatus(allRecords, "pending"),
                },
                {
                  label: "In Delivery",
                  href: "/retailer/orders/in-delivery",
                  count: countByStatus(allRecords, "in-delivery"),
                },
                {
                  label: "Completed",
                  href: "/retailer/orders/completed",
                  count: countByStatus(allRecords, "completed"),
                },
              ]}
              activeHref={
                status === "all"
                  ? "/retailer/orders"
                  : `/retailer/orders/${status}`
              }
            />
          </div>
        </section>

        <RetailerDataTable<RetailerOrderRecord>
          caption="Retailer order workflow"
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
              key: "items",
              header: "Items",
              render: (row) => row.items,
            },
            {
              key: "total",
              header: "Total",
              render: (row) => formatBdt(row.total),
            },
            {
              key: "courier",
              header: "Courier",
              render: (row) => row.courier,
            },
            {
              key: "tracking",
              header: "Tracking",
              render: (row) => row.tracking,
            },
            {
              key: "destination",
              header: "Destination",
              render: (row) => row.destination,
            },
            {
              key: "updated",
              header: "Updated",
              render: (row) => row.updatedAt,
            },
            {
              key: "status",
              header: "Status",
              render: (row) => <RetailerStatusBadge status={row.status} />,
            },
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Tracking Notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Pending orders should stay visible until courier assignment is complete.</li>
              <li>In-delivery rows should expose tracking and courier references clearly.</li>
              <li>Completed orders should feed reporting and payout calculations without manual duplication.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Delivery Visibility
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Retailers need customer-facing shipment progress while preserving clean queue separation.</li>
              <li>Courier provider data should become API-driven in the integration phase.</li>
              <li>Order completion should move settlement records into the payout surface automatically.</li>
            </ul>
          </div>
        </section>
      </div>
    </RetailerPanelShell>
  );
}
