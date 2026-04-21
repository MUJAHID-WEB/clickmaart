import WholesalerDataTable from "./WholesalerDataTable";
import WholesalerPanelShell from "./WholesalerPanelShell";
import WholesalerStatusBadge from "./WholesalerStatusBadge";
import WholesalerSummaryCards from "./WholesalerSummaryCards";
import {
  formatUsd,
  type WholesalerPayoutRecord,
} from "../data/wholesalerPanelData";
import { getWholesalerPaymentsSnapshot } from "../server/getWholesalerPanelSnapshot";

export default async function WholesalerPaymentsPage() {
  const { records: payouts } = await getWholesalerPaymentsSnapshot();
  const pendingTotal = payouts
    .filter((record) => record.status === "pending")
    .reduce((sum, record) => sum + record.payable, 0);
  const withdrawableTotal = payouts
    .filter((record) => record.status === "withdrawable")
    .reduce((sum, record) => sum + record.payable, 0);
  const paidTotal = payouts
    .filter((record) => record.status === "paid")
    .reduce((sum, record) => sum + record.payable, 0);
  const commissionTotal = payouts.reduce(
    (sum, record) => sum + record.commission,
    0,
  );

  return (
    <WholesalerPanelShell
      eyebrow="Wholesaler Payments"
      title="Payment System"
      description="Track gross order value, platform commission, withdrawable earnings, and completed settlements from one payout workspace."
      actions={[
        { href: "/wholesaler/orders/payment-done", label: "Payment-Done Orders" },
        { href: "/wholesaler/reports", label: "Open Reports" },
      ]}
    >
      <div className="space-y-6">
        <WholesalerSummaryCards
          cards={[
            {
              label: "Pending Settlements",
              value: formatUsd(pendingTotal),
              helper: "Awaiting admin settlement enablement",
              tone: "warning",
            },
            {
              label: "Withdrawable",
              value: formatUsd(withdrawableTotal),
              helper: "Currently available to withdraw",
              tone: "success",
            },
            {
              label: "Paid Out",
              value: formatUsd(paidTotal),
              helper: "Already transferred to the wholesaler account",
              tone: "info",
            },
            {
              label: "Commission Charged",
              value: formatUsd(commissionTotal),
              helper: "Platform fee at the standard 10% rule",
              tone: "neutral",
            },
          ]}
        />

        <WholesalerDataTable<WholesalerPayoutRecord>
          caption="Wholesaler payout statements"
          rows={payouts}
          emptyMessage="No payout statements available yet."
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
              header: "Order Amount",
              render: (row) => formatUsd(row.orderAmount),
            },
            {
              key: "commission",
              header: "Commission (10%)",
              render: (row) => formatUsd(row.commission),
            },
            {
              key: "payable",
              header: "Net Payable",
              render: (row) => formatUsd(row.payable),
            },
            {
              key: "status",
              header: "Status",
              render: (row) => <WholesalerStatusBadge status={row.status} />,
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
              Withdrawal Rules
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Minimum withdrawal threshold remains tk. 50.</li>
              <li>Processing time stays within 1 to 3 business days after approval.</li>
              <li>Dispute windows remain open for 7 days after payout processing.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Notification Coverage
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Wholesalers should be alerted when withdrawal becomes enabled.</li>
              <li>Payout-completed events should include settlement references.</li>
              <li>Later backend work will wire these events into SMS, email, and in-app channels.</li>
            </ul>
          </div>
        </section>
      </div>
    </WholesalerPanelShell>
  );
}
