import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminStatusNavigation from "./AdminStatusNavigation";
import AdminSummaryCards from "./AdminSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import {
  countByStatus,
  type AccountReviewStatus,
  type RetailerRecord,
} from "../data/adminCoreData";
import { getAdminRetailerSnapshot } from "../server/getAdminCoreSnapshot";

type PageStatus = AccountReviewStatus | "all";

const getPageDescription = (status: PageStatus) => {
  if (status === "pending") {
    return "Review business documents, verify tax information, and approve or reject retailers awaiting access.";
  }

  if (status === "approved") {
    return "Track approved retailers, watch order volume, and prepare suspend or remove actions from the active queue.";
  }

  if (status === "rejected") {
    return "Keep rejection reasons visible and re-open retailer applications when compliance gaps have been fixed.";
  }

  return "Manage pending, approved, and rejected retailers from a single operations workspace while keeping business performance visible.";
};

export default async function AdminRetailersPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getAdminRetailerSnapshot(status);

  const navigationItems = [
    { label: "Overview", href: "/admin/retailers", count: allRecords.length },
    {
      label: "Pending",
      href: "/admin/retailers/pending",
      count: countByStatus(allRecords, "pending"),
    },
    {
      label: "Approved",
      href: "/admin/retailers/approved",
      count: countByStatus(allRecords, "approved"),
    },
    {
      label: "Rejected",
      href: "/admin/retailers/rejected",
      count: countByStatus(allRecords, "rejected"),
    },
  ];

  const summaryCards = [
    {
      label: "Pending Review",
      value: String(countByStatus(allRecords, "pending")),
      helper: "Retailers waiting for account verification",
      tone: "warning" as const,
    },
    {
      label: "Approved Accounts",
      value: String(countByStatus(allRecords, "approved")),
      helper: "Retailers actively selling through the platform",
      tone: "success" as const,
    },
    {
      label: "Rejected Queue",
      value: String(countByStatus(allRecords, "rejected")),
      helper: "Applications retained for possible re-review",
      tone: "danger" as const,
    },
    {
      label: "Monthly Order Pulse",
      value: "4,495",
      helper: "Combined monthly order volume across listed retailers",
      tone: "info" as const,
    },
  ];

  return (
    <AdminCoreShell
      eyebrow="Admin Retailers"
      title="Retailer Management"
      description={getPageDescription(status)}
      aside={
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          Order history and account quality stay visible beside approval
          operations.
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
              Keep retailer reviews split across pending, approved, and rejected
              queues.
            </p>
          </div>
          <AdminStatusNavigation
            items={navigationItems}
            activeHref={
              status === "all"
                ? "/admin/retailers"
                : `/admin/retailers/${status}`
            }
          />
        </div>
      </section>

      <AdminDataTable<RetailerRecord>
        caption="Retailer account operations"
        rows={visibleRecords}
        emptyMessage="No retailer records found for this status."
        columns={[
          {
            key: "business",
            header: "Business",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-900">{row.businessName}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Last active {row.lastActive}
                </p>
              </div>
            ),
          },
          {
            key: "email",
            header: "Email",
            render: (row) => row.email,
          },
          {
            key: "type",
            header: "Business Type",
            render: (row) => row.businessType,
          },
          {
            key: "orders",
            header: "Monthly Orders",
            render: (row) => row.monthlyOrders.toLocaleString(),
          },
          {
            key: "docs",
            header: "Docs Verified",
            render: (row) => (row.docsVerified ? "Yes" : "No"),
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
                path={`/admin/retailers/${encodeURIComponent(row.id)}`}
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
            Retailer Review Rules
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Review company registration, tax identity, and store ownership evidence.</li>
            <li>Approved retailers should keep order-volume visibility for operational monitoring.</li>
            <li>Rejected applications must store a clear reason and support later re-approval.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Account Communication
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Send SMS and email on approval, rejection, suspension, and restoration.</li>
            <li>Approved retailers receive onboarding guidance and platform rules.</li>
            <li>In-app alerts should mirror every status change for audit visibility.</li>
          </ul>
        </div>
      </section>
    </AdminCoreShell>
  );
}
