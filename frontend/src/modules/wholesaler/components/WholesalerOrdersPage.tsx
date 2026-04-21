import WholesalerDataTable from "./WholesalerDataTable";
import WholesalerPanelShell from "./WholesalerPanelShell";
import WholesalerStatusBadge from "./WholesalerStatusBadge";
import WholesalerStatusNavigation from "./WholesalerStatusNavigation";
import WholesalerSummaryCards from "./WholesalerSummaryCards";
import {
  countByStatus,
  formatUsd,
  type WholesalerOrderRecord,
  type WholesalerOrderStatus,
} from "../data/wholesalerPanelData";
import { getWholesalerOrdersSnapshot } from "../server/getWholesalerPanelSnapshot";

type PageStatus = WholesalerOrderStatus | "all";

const getDescription = (status: PageStatus) => {
  if (status === "pending") {
    return "Handle newly imported retailer orders that are waiting for packing and shipment to the admin warehouse.";
  }

  if (status === "shipped") {
    return "Track wholesaler shipments that are already moving toward the admin address with uploaded tracking references.";
  }

  if (status === "payment-done") {
    return "Review orders that have completed delivery and now contribute to wholesaler payout readiness.";
  }

  return "Manage the wholesaler fulfillment workflow from pending packing to shipped handoff and payment completion.";
};

export default async function WholesalerOrdersPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getWholesalerOrdersSnapshot(
    status,
  );

  return (
    <WholesalerPanelShell
      eyebrow="Wholesaler Orders"
      title="Order Workflow"
      description={getDescription(status)}
      actions={[
        { href: "/wholesaler/orders", label: "Order Overview" },
        { href: "/wholesaler/payments", label: "Settlement Status" },
      ]}
    >
      <div className="space-y-6">
        <WholesalerSummaryCards
          cards={[
            {
              label: "Pending Fulfillment",
              value: String(countByStatus(allRecords, "pending")),
              helper: "Orders waiting for packing and shipment",
              tone: "warning",
            },
            {
              label: "Shipped to Admin",
              value: String(countByStatus(allRecords, "shipped")),
              helper: "Orders already dispatched with tracking",
              tone: "info",
            },
            {
              label: "Payment Done",
              value: String(countByStatus(allRecords, "payment-done")),
              helper: "Orders now ready for payout handling",
              tone: "success",
            },
            {
              label: "Visible COD Value",
              value: formatUsd(
                visibleRecords.reduce((sum, row) => sum + row.codAmount, 0),
              ),
              helper: "COD amount across the currently selected queue",
              tone: "neutral",
            },
          ]}
        />

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Workflow Queues
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Pending, shipped, and payment-done queues mirror the wholesaler
                side of fulfillment.
              </p>
            </div>
            <WholesalerStatusNavigation
              items={[
                {
                  label: "Overview",
                  href: "/wholesaler/orders",
                  count: allRecords.length,
                },
                {
                  label: "Pending",
                  href: "/wholesaler/orders/pending",
                  count: countByStatus(allRecords, "pending"),
                },
                {
                  label: "Shipped",
                  href: "/wholesaler/orders/shipped",
                  count: countByStatus(allRecords, "shipped"),
                },
                {
                  label: "Payment Done",
                  href: "/wholesaler/orders/payment-done",
                  count: countByStatus(allRecords, "payment-done"),
                },
              ]}
              activeHref={
                status === "all"
                  ? "/wholesaler/orders"
                  : `/wholesaler/orders/${status}`
              }
            />
          </div>
        </section>

        <WholesalerDataTable<WholesalerOrderRecord>
          caption="Wholesaler fulfillment queue"
          rows={visibleRecords}
          emptyMessage="No order records found for this queue."
          columns={[
            {
              key: "order",
              header: "Order",
              render: (row) => (
                <div>
                  <p className="font-semibold text-slate-900">{row.id}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.customerMask}</p>
                </div>
              ),
            },
            {
              key: "retailer",
              header: "Retailer",
              render: (row) => row.retailer,
            },
            {
              key: "items",
              header: "Items",
              render: (row) => row.items,
            },
            {
              key: "cod",
              header: "COD",
              render: (row) => formatUsd(row.codAmount),
            },
            {
              key: "destination",
              header: "Destination",
              render: (row) => row.destination,
            },
            {
              key: "tracking",
              header: "Tracking",
              render: (row) => row.tracking,
            },
            {
              key: "updated",
              header: "Updated",
              render: (row) => row.updatedAt,
            },
            {
              key: "status",
              header: "Status",
              render: (row) => <WholesalerStatusBadge status={row.status} />,
            },
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Fulfillment Actions
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Pending orders require packing confirmation and shipment preparation.</li>
              <li>Shipped orders should include carrier and tracking information for admin visibility.</li>
              <li>Payment-done orders signal that settlement can move into the payout system.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Visibility Rules
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Customer contact details remain masked on wholesaler-facing order screens.</li>
              <li>Only the operational shipment state should be shown until admin warehouse receipt is confirmed.</li>
              <li>Later phases will extend this surface to full multi-party orchestration and delivery tracking.</li>
            </ul>
          </div>
        </section>
      </div>
    </WholesalerPanelShell>
  );
}
