import RetailerDataTable from "./RetailerDataTable";
import RetailerPanelShell from "./RetailerPanelShell";
import RetailerStatusBadge from "./RetailerStatusBadge";
import RetailerSummaryCards from "./RetailerSummaryCards";
import {
  formatBdt,
  type RetailerPayoutRecord,
} from "../data/retailerPanelData";
import { getRetailerPayoutsSnapshot } from "../server/getRetailerPanelSnapshot";

export default async function RetailerPayoutsPage() {
  const { records: payouts } = await getRetailerPayoutsSnapshot();
  const pendingTotal = payouts
    .filter((record) => record.status === "pending")
    .reduce((sum, record) => sum + record.payable, 0);
  const withdrawableTotal = payouts
    .filter((record) => record.status === "withdrawable")
    .reduce((sum, record) => sum + record.payable, 0);
  const paidTotal = payouts
    .filter((record) => record.status === "paid")
    .reduce((sum, record) => sum + record.payable, 0);
  const profitTotal = payouts.reduce((sum, record) => sum + record.profit, 0);

  return (
    <RetailerPanelShell
      eyebrow="Retailer Payouts"
      title="Payout and Commission Surface"
      description="Track retailer profit, platform commission, withdrawable earnings, and completed settlements from one payout workspace."
      actions={[
        { href: "/retailer/orders/completed", label: "Completed Orders" },
        { href: "/retailer/reports", label: "Open Reports" },
      ]}
    >
      <div className="space-y-6">
        <RetailerSummaryCards
          cards={[
            {
              label: "Pending Earnings",
              value: formatBdt(pendingTotal),
              helper: "Orders not yet ready for payout release",
              tone: "warning",
            },
            {
              label: "Withdrawable",
              value: formatBdt(withdrawableTotal),
              helper: "Retailer profit available for withdrawal",
              tone: "success",
            },
            {
              label: "Paid Out",
              value: formatBdt(paidTotal),
              helper: "Already settled into the retailer account",
              tone: "info",
            },
            {
              label: "Gross Profit",
              value: formatBdt(profitTotal),
              helper: "Profit before platform commission deduction",
              tone: "neutral",
            },
          ]}
        />

        <RetailerDataTable<RetailerPayoutRecord>
          caption="Retailer payout statements"
          rows={payouts}
          emptyMessage="No retailer payout statements available yet."
          columns={[
            {
              key: "order",
              header: "Order",
              render: (row) => (
                <div>
                  <p className="font-semibold text-slate-900">{row.orderId}</p>
                  <p className="mt-1 text-xs text-slate-500">{row.id}</p>
                </div>
              ),
            },
            {
              key: "gross",
              header: "Gross Sales",
              render: (row) => formatBdt(row.grossSales),
            },
            {
              key: "profit",
              header: "Retailer Profit",
              render: (row) => formatBdt(row.profit),
            },
            {
              key: "commission",
              header: "Commission (10%)",
              render: (row) => formatBdt(row.commission),
            },
            {
              key: "payable",
              header: "Net Payable",
              render: (row) => formatBdt(row.payable),
            },
            {
              key: "status",
              header: "Status",
              render: (row) => <RetailerStatusBadge status={row.status} />,
            },
            {
              key: "release",
              header: "Released At",
              render: (row) => row.releasedAt,
            },
            {
              key: "note",
              header: "Notes",
              render: (row) => row.note,
            },
          ]}
        />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Payout Rules
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Retailer net payable remains profit minus the platform 10% commission.</li>
              <li>Minimum withdrawal threshold remains tk. 50.</li>
              <li>Completed orders should age into withdrawable status based on admin release rules.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Notification Readiness
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Retailers should receive alerts when withdrawals become enabled.</li>
              <li>Payout-completed events should include settlement references and timestamps.</li>
              <li>Later backend work will move these into email, SMS, and in-app event delivery.</li>
            </ul>
          </div>
        </section>
      </div>
    </RetailerPanelShell>
  );
}
