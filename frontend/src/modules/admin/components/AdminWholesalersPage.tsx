import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminStatusNavigation from "./AdminStatusNavigation";
import AdminSummaryCards from "./AdminSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import {
  countByStatus,
  type AccountReviewStatus,
  type WholesalerRecord,
} from "../data/adminCoreData";
import { getAdminWholesalerSnapshot } from "../server/getAdminCoreSnapshot";

type PageStatus = AccountReviewStatus | "all";

const getPageDescription = (status: PageStatus) => {
  if (status === "pending") {
    return "Review submitted documents, verify compliance, and approve or reject wholesalers from the pending queue.";
  }

  if (status === "approved") {
    return "Monitor active wholesalers, review current performance, and prepare suspend or remove actions when policy requires it.";
  }

  if (status === "rejected") {
    return "Track declined wholesalers, keep rejection history visible, and reopen applications when documentation issues are resolved.";
  }

  return "Manage wholesaler approvals, approved trading accounts, and rejected applications from a single App Router operational surface.";
};

export default async function AdminWholesalersPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getAdminWholesalerSnapshot(status);

  const navigationItems = [
    { label: "Overview", href: "/admin/wholesalers", count: allRecords.length },
    {
      label: "Pending",
      href: "/admin/wholesalers/pending",
      count: countByStatus(allRecords, "pending"),
    },
    {
      label: "Approved",
      href: "/admin/wholesalers/approved",
      count: countByStatus(allRecords, "approved"),
    },
    {
      label: "Rejected",
      href: "/admin/wholesalers/rejected",
      count: countByStatus(allRecords, "rejected"),
    },
  ];

  const summaryCards = [
    {
      label: "Pending Review",
      value: String(countByStatus(allRecords, "pending")),
      helper: "Applications waiting for document review",
      tone: "warning" as const,
    },
    {
      label: "Approved Accounts",
      value: String(countByStatus(allRecords, "approved")),
      helper: "Wholesalers currently allowed to trade",
      tone: "success" as const,
    },
    {
      label: "Rejected Queue",
      value: String(countByStatus(allRecords, "rejected")),
      helper: "Applications retained with rejection notes",
      tone: "danger" as const,
    },
    {
      label: "Compliance Average",
      value: "84%",
      helper: "Snapshot across the active wholesaler pipeline",
      tone: "info" as const,
    },
  ];

  return (
    <AdminCoreShell
      eyebrow="Admin Wholesalers"
      title="Wholesaler Management"
      description={getPageDescription(status)}
      aside={
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          SMS, email, and audit logging rules stay visible for every status
          change.
        </div>
      }
    >
      <AdminSummaryCards cards={summaryCards} />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Status Navigation
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pending, approved, and rejected wholesaler queues stay separated
              so review work remains easy to manage.
            </p>
          </div>
          <AdminStatusNavigation
            items={navigationItems}
            activeHref={
              status === "all"
                ? "/admin/wholesalers"
                : `/admin/wholesalers/${status}`
            }
          />
        </div>
      </section>

      <AdminDataTable<WholesalerRecord>
        caption="Wholesaler account operations"
        rows={visibleRecords}
        emptyMessage="No wholesaler records found for this status."
        columns={[
          {
            key: "business",
            header: "Business",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-900">{row.businessName}</p>
                <p className="mt-1 text-xs text-slate-500">Joined {row.since}</p>
              </div>
            ),
          },
          {
            key: "email",
            header: "Email",
            render: (row) => row.email,
          },
          {
            key: "category",
            header: "Category",
            render: (row) => row.category,
          },
          {
            key: "volume",
            header: "Products / Orders",
            render: (row) => `${row.products} / ${row.orders}`,
          },
          {
            key: "documents",
            header: "Documents",
            render: (row) =>
              row.documentsVerified ? "Verified" : "Needs review",
          },
          {
            key: "compliance",
            header: "Compliance",
            render: (row) => row.complianceScore,
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
              <MutationActionStrip
                role="admin"
                path={`/admin/wholesalers/${encodeURIComponent(row.id)}`}
                helperText={row.rejectionReason}
                actions={[
                  ...(row.status !== "approved"
                    ? [{ label: "Approve", payload: { status: "approved" }, tone: "success" as const }]
                    : []),
                  ...(row.status !== "pending"
                    ? [{ label: "Move Pending", payload: { status: "pending" }, tone: "neutral" as const }]
                    : []),
                  {
                    label: row.status === "rejected" ? "Update Rejection" : "Reject",
                    payload: { status: "rejected" },
                    prompt: {
                      field: "reason",
                      label: "Enter a rejection or compliance note",
                      required: true,
                      defaultValue: row.rejectionReason ?? "",
                    },
                    tone: "danger",
                  },
                ]}
              />
            ),
          },
        ]}
      />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Review Workflow
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Review business license, tax identity, and submitted address proof.</li>
            <li>Use one-click approval or rejection and keep a reason inside the audit log.</li>
            <li>Approved accounts can later be suspended or removed with a recovery window.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Notification Rules
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Send SMS immediately after approval, rejection, suspension, or re-approval.</li>
            <li>Email platform guidelines to newly approved wholesalers.</li>
            <li>Keep all status transitions in a real-time admin audit stream.</li>
          </ul>
        </div>
      </section>
    </AdminCoreShell>
  );
}
