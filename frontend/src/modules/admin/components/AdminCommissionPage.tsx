import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminRoutePills from "./AdminRoutePills";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminSummaryCards from "./AdminSummaryCards";
import OperationalAutomationPanel from "@/modules/notification/components/OperationalAutomationPanel";
import {
  formatBdt,
  type AutomationRuleRecord,
  type CommissionSettlementRecord,
} from "../data/adminAdvancedData";

export default function AdminCommissionPage({
  settlements,
  automationRules,
}: {
  settlements: CommissionSettlementRecord[];
  automationRules: AutomationRuleRecord[];
}) {
  const grossTotal = settlements.reduce(
    (sum, settlement) => sum + settlement.grossOrderValue,
    0,
  );
  const commissionTotal = settlements.reduce(
    (sum, settlement) => sum + settlement.platformCommission,
    0,
  );
  const wholesalerPending = settlements
    .filter((settlement) => settlement.payoutStatus !== "paid")
    .reduce((sum, settlement) => sum + settlement.wholesalerPayable, 0);
  const retailerPending = settlements
    .filter((settlement) => settlement.payoutStatus !== "paid")
    .reduce((sum, settlement) => sum + settlement.retailerPayable, 0);

  return (
    <AdminCoreShell
      eyebrow="Admin Commission"
      title="Commission Management System"
      description="Platform commission, wholesaler payout release, retailer profit settlement, and COD reconciliation are all visible from the same admin finance workspace."
      aside={
        <AdminRoutePills
          activeHref="/admin/commission"
          items={[
            { href: "/admin/orders", label: "Orders" },
            { href: "/admin/commission", label: "Commission" },
            { href: "/admin/reports/commissions", label: "Commission Reports" },
          ]}
        />
      }
    >
      <AdminSummaryCards
        cards={[
          {
            label: "Gross Order Value",
            value: formatBdt(grossTotal),
            helper: "Orders currently inside the visible commission queue",
            tone: "neutral",
          },
          {
            label: "Platform Commission",
            value: formatBdt(commissionTotal),
            helper: "10% platform share captured from operational settlements",
            tone: "info",
          },
          {
            label: "Wholesaler Pending",
            value: formatBdt(wholesalerPending),
            helper: "Awaiting finance release or payment completion",
            tone: "warning",
          },
          {
            label: "Retailer Pending",
            value: formatBdt(retailerPending),
            helper: "Net retailer profit still in approval or processing state",
            tone: "success",
          },
        ]}
      />

      <AdminDataTable<CommissionSettlementRecord>
        caption="Settlement and payout visibility"
        rows={settlements}
        emptyMessage="No commission settlements available."
        columns={[
          {
            key: "settlement",
            header: "Settlement",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-900">{row.id}</p>
                <p className="mt-1 text-xs text-slate-500">Order #{row.orderId}</p>
              </div>
            ),
          },
          {
            key: "partners",
            header: "Partners",
            render: (row) => (
              <div>
                <p>{row.wholesaler}</p>
                <p className="mt-1 text-xs text-slate-500">{row.retailer}</p>
              </div>
            ),
          },
          {
            key: "gross",
            header: "Gross",
            render: (row) => formatBdt(row.grossOrderValue),
          },
          {
            key: "commission",
            header: "Commission",
            render: (row) => formatBdt(row.platformCommission),
          },
          {
            key: "wholesaler",
            header: "Wholesaler Payable",
            render: (row) => formatBdt(row.wholesalerPayable),
          },
          {
            key: "retailer",
            header: "Retailer Payable",
            render: (row) => formatBdt(row.retailerPayable),
          },
          {
            key: "cod",
            header: "COD State",
            render: (row) => row.codState,
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <AdminStatusBadge status={row.payoutStatus} />,
          },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Settlement Rules
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Platform commission remains fixed at 10% across wholesaler and retailer settlement math.</li>
            <li>Wholesaler release depends on delivery completion and COD confirmation where required.</li>
            <li>Retailer payout uses profit minus the same platform commission rule before release.</li>
            <li>Payout states remain aligned with Ready, Pending Approval, Processed, and Paid.</li>
          </ul>
        </div>

        <OperationalAutomationPanel
          title="Finance and settlement automation"
          description="Payment delay escalation and order-volume alerting now sit next to the settlement queue so finance teams can react before payouts stall."
          rules={automationRules}
        />
      </section>
    </AdminCoreShell>
  );
}
