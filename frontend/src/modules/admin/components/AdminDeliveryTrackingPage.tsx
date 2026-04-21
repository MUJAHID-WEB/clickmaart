import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminRoutePills from "./AdminRoutePills";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminSummaryCards from "./AdminSummaryCards";
import OperationalAutomationPanel from "@/modules/notification/components/OperationalAutomationPanel";
import {
  type AutomationRuleRecord,
  type CarrierIntegrationRecord,
  type DeliveryJourneyRecord,
} from "../data/adminAdvancedData";

export default function AdminDeliveryTrackingPage({
  journeys,
  integrations,
  automationRules,
}: {
  journeys: DeliveryJourneyRecord[];
  integrations: CarrierIntegrationRecord[];
  automationRules: AutomationRuleRecord[];
}) {
  const delayedCount = journeys.filter((journey) => journey.status === "delayed").length;
  const activeCount = journeys.filter(
    (journey) =>
      journey.status === "in-transit" || journey.status === "out-for-delivery",
  ).length;

  return (
    <AdminCoreShell
      eyebrow="Admin Delivery"
      title="Delivery Tracking System"
      description="FedEx and Steadfast shipment visibility now sits inside the App Router admin workspace so inbound warehouse movements and customer delivery handoff share one operational screen."
      aside={
        <AdminRoutePills
          activeHref="/admin/delivery"
          items={[
            { href: "/admin/orders", label: "Order Queues" },
            { href: "/admin/delivery", label: "Delivery Tracking" },
            { href: "/admin/reports", label: "Operations Reports" },
          ]}
        />
      }
    >
      <AdminSummaryCards
        cards={[
          {
            label: "Active Shipments",
            value: String(activeCount),
            helper: "Inbound or customer-facing deliveries currently moving",
            tone: "info",
          },
          {
            label: "Delayed Shipments",
            value: String(delayedCount),
            helper: "Exceptions that need courier follow-up or manual override",
            tone: delayedCount > 0 ? "danger" : "success",
          },
          {
            label: "Carrier Integrations",
            value: String(integrations.length),
            helper: "FedEx and Steadfast health monitored centrally",
            tone: "neutral",
          },
          {
            label: "Auto Sync Window",
            value: "15 min",
            helper: "Tracking refresh cadence across carrier lanes",
            tone: "warning",
          },
        ]}
      />

      <AdminDataTable<DeliveryJourneyRecord>
        caption="Multi-leg delivery tracking"
        rows={journeys}
        emptyMessage="No delivery journeys available."
        columns={[
          {
            key: "order",
            header: "Order",
            render: (row) => `#${row.orderId}`,
          },
          {
            key: "leg",
            header: "Leg",
            render: (row) => row.leg,
          },
          {
            key: "carrier",
            header: "Carrier",
            render: (row) => row.carrier,
          },
          {
            key: "tracking",
            header: "Tracking",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-900">
                  {row.trackingReference}
                </p>
                <p className="mt-1 text-xs text-slate-500">{row.note}</p>
              </div>
            ),
          },
          {
            key: "destination",
            header: "Destination",
            render: (row) => row.destination,
          },
          {
            key: "sync",
            header: "Last Sync",
            render: (row) => row.lastSync,
          },
          {
            key: "checkpoint",
            header: "Next Checkpoint",
            render: (row) => row.nextCheckpoint,
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <AdminStatusBadge status={row.status} />,
          },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Carrier Integration Health
          </h2>
          <div className="mt-5 space-y-4">
            {integrations.map((integration) => (
              <article
                key={integration.carrier}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {integration.carrier}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {integration.scope}
                    </p>
                  </div>
                  <AdminStatusBadge status={integration.status} />
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Synced Shipments
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {integration.syncedShipments}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Refresh Cadence
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {integration.refreshCadence}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Success Rate
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {integration.successRate}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">{integration.note}</p>
              </article>
            ))}
          </div>
        </div>

        <OperationalAutomationPanel
          title="Delivery exception automation"
          description="Carrier retries, warehouse alerting, and order-spike escalation are now spelled out alongside the live tracking lanes."
          rules={automationRules}
        />
      </section>
    </AdminCoreShell>
  );
}
