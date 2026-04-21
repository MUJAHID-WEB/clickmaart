import Link from "next/link";
import AdminCoreShell from "./AdminCoreShell";
import AdminRoutePills from "./AdminRoutePills";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminSummaryCards from "./AdminSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import {
  formatBdt,
  type AdminOrderDetailRecord,
  type CommissionSettlementRecord,
  type DeliveryJourneyRecord,
} from "../data/adminAdvancedData";

export default function AdminOrderDetailPage({
  order,
  journeys,
  settlements,
}: {
  order: AdminOrderDetailRecord;
  journeys: DeliveryJourneyRecord[];
  settlements: CommissionSettlementRecord[];
}) {
  const primarySettlement = settlements[0];

  return (
    <AdminCoreShell
      eyebrow="Admin Order Detail"
      title={`Order #${order.id}`}
      description="This detailed view completes the admin order workflow with warehouse receipt, customer dispatch, payout readiness, and carrier visibility in one place."
      aside={
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Multi-party orchestration is now visible beyond the queue overview.
        </div>
      }
    >
      <AdminSummaryCards
        cards={[
          {
            label: "Gross Order Value",
            value: formatBdt(order.grossOrderValue),
            helper: `${order.items} items from the ${order.source} channel`,
            tone: "neutral",
          },
          {
            label: "Platform Commission",
            value: formatBdt(order.platformCommission),
            helper: "Fixed 10% platform fee applied to the order value",
            tone: "info",
          },
          {
            label: "Wholesaler Payable",
            value: formatBdt(order.wholesalerPayable),
            helper: "Release follows admin approval and payout batching",
            tone: "success",
          },
          {
            label: "Retailer Net Payable",
            value: formatBdt(order.retailerPayable),
            helper: "Profit after platform commission deduction",
            tone: "warning",
          },
        ]}
      />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <AdminStatusBadge status={order.currentStage} />
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                {order.codState}
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Retailer
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {order.retailer}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Wholesaler
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {order.wholesaler}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Customer
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {order.customer}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Last Updated
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {order.updatedAt}
                </p>
              </div>
            </div>
          </div>

          <AdminRoutePills
            activeHref={`/admin/orders/${order.id}`}
            items={[
              { href: "/admin/orders", label: "All Orders" },
              { href: "/admin/delivery", label: "Delivery Tracking" },
              { href: "/admin/commission", label: "Commission" },
            ]}
          />
        </div>
        <MutationActionStrip
          role="admin"
          path={`/admin/orders/${encodeURIComponent(order.id)}`}
          helperText="Order stage mutations now persist through the Laravel admin lifecycle endpoint."
          actions={[
            {
              label: "Mark Shipped",
              payload: { stage: "shipped" },
              prompt: {
                field: "note",
                label: "Optional shipment note",
                defaultValue: "Shipment moved from the current node into the next fulfillment leg.",
              },
              tone: "primary",
            },
            {
              label: "Mark Received",
              payload: { stage: "received" },
              prompt: {
                field: "note",
                label: "Optional warehouse receipt note",
                defaultValue: "Warehouse intake completed.",
              },
              tone: "neutral",
            },
            {
              label: "Out for Delivery",
              payload: { stage: "out-for-delivery" },
              prompt: {
                field: "note",
                label: "Optional courier dispatch note",
                defaultValue: "Final-mile courier handoff confirmed.",
              },
              tone: "primary",
            },
            {
              label: "Delivered",
              payload: { stage: "delivered" },
              prompt: {
                field: "note",
                label: "Optional delivery completion note",
                defaultValue: "Customer delivery confirmed.",
              },
              tone: "success",
            },
            {
              label: "Payment Done",
              payload: { stage: "payment-done" },
              prompt: {
                field: "note",
                label: "Optional finance reconciliation note",
                defaultValue: "COD settlement verified and completed.",
              },
              tone: "success",
            },
          ]}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Lifecycle Timeline
          </h2>
          <div className="mt-5 space-y-4">
            {order.stageHistory.map((event) => (
              <div
                key={`${event.stage}-${event.timestamp}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {event.label}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{event.note}</p>
                  </div>
                  <AdminStatusBadge status={event.stage} />
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  <span>{event.owner}</span>
                  <span>{event.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Settlement Snapshot
            </h2>
            {primarySettlement ? (
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Settlement ID</span>
                  <span className="font-semibold text-slate-900">
                    {primarySettlement.id}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Payout Status</span>
                  <AdminStatusBadge status={primarySettlement.payoutStatus} />
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Release Window</span>
                  <span className="font-semibold text-slate-900">
                    {primarySettlement.releasedAt}
                  </span>
                </div>
                <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
                  {primarySettlement.note}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-600">
                No settlement packet is linked to this order yet.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Operational Flags
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {order.flags.map((flag) => (
                <li
                  key={flag}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Tracking References
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Inbound and outbound carrier events stay attached to the order so
              finance, warehouse, and retailer teams share the same operational
              context.
            </p>
          </div>
          <Link
            href="/admin/delivery"
            className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4"
          >
            Open full delivery tracking
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {["Leg", "Carrier", "Tracking", "Location", "Updated", "Status"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {journeys.map((journey) => (
                <tr key={journey.id}>
                  <td className="px-4 py-4 text-sm text-slate-700">{journey.leg}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {journey.carrier}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {journey.trackingReference}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    <div>
                      <p>{journey.destination}</p>
                      <p className="mt-1 text-xs text-slate-500">{journey.note}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {journey.lastSync}
                  </td>
                  <td className="px-4 py-4">
                    <AdminStatusBadge status={journey.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminCoreShell>
  );
}
