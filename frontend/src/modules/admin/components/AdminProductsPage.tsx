import AdminCoreShell from "./AdminCoreShell";
import AdminDataTable from "./AdminDataTable";
import AdminStatusBadge from "./AdminStatusBadge";
import AdminStatusNavigation from "./AdminStatusNavigation";
import AdminSummaryCards from "./AdminSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import {
  countByStatus,
  type ProductModerationRecord,
  type ProductReviewStatus,
} from "../data/adminCoreData";
import { getAdminProductSnapshot } from "../server/getAdminCoreSnapshot";

type PageStatus = ProductReviewStatus | "all";

const getPageDescription = (status: PageStatus) => {
  if (status === "pending") {
    return "Review product details, media, pricing, and compliance before approving or rejecting wholesaler submissions.";
  }

  if (status === "approved") {
    return "Manage approved products, listing state, and markup strategy before the items go live in admin-managed stores.";
  }

  if (status === "rejected") {
    return "Keep rejected products visible with rejection reasons and support re-submission when issues are fixed.";
  }

  return "Moderate wholesaler products across pending, approved, and rejected queues while preserving listing and markup controls.";
};

export default async function AdminProductsPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getAdminProductSnapshot(status);

  const navigationItems = [
    { label: "Overview", href: "/admin/products", count: allRecords.length },
    {
      label: "Pending",
      href: "/admin/products/pending",
      count: countByStatus(allRecords, "pending"),
    },
    {
      label: "Approved",
      href: "/admin/products/approved",
      count: countByStatus(allRecords, "approved"),
    },
    {
      label: "Rejected",
      href: "/admin/products/rejected",
      count: countByStatus(allRecords, "rejected"),
    },
  ];

  const summaryCards = [
    {
      label: "Pending Moderation",
      value: String(countByStatus(allRecords, "pending")),
      helper: "Products awaiting admin review",
      tone: "warning" as const,
    },
    {
      label: "Approved Catalog",
      value: String(countByStatus(allRecords, "approved")),
      helper: "Products available for store listing decisions",
      tone: "success" as const,
    },
    {
      label: "Rejected Items",
      value: String(countByStatus(allRecords, "rejected")),
      helper: "Products retained with moderation feedback",
      tone: "danger" as const,
    },
    {
      label: "Markup Guardrail",
      value: "5% - 50%",
      helper: "Allowed admin markup range from the scoped rules",
      tone: "info" as const,
    },
  ];

  return (
    <AdminCoreShell
      eyebrow="Admin Products"
      title="Product Moderation"
      description={getPageDescription(status)}
      aside={
        <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-800">
          Listing control, markup validation, and rejection notes are ready for
          future API wiring.
        </div>
      }
    >
      <AdminSummaryCards cards={summaryCards} />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Moderation Queues
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Separate pending, approved, and rejected product states so pricing
              and listing actions stay controlled.
            </p>
          </div>
          <AdminStatusNavigation
            items={navigationItems}
            activeHref={
              status === "all" ? "/admin/products" : `/admin/products/${status}`
            }
          />
        </div>
      </section>

      <AdminDataTable<ProductModerationRecord>
        caption="Product moderation operations"
        rows={visibleRecords}
        emptyMessage="No product records found for this status."
        columns={[
          {
            key: "product",
            header: "Product",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-900">{row.name}</p>
                <p className="mt-1 text-xs text-slate-500">{row.category}</p>
              </div>
            ),
          },
          {
            key: "wholesaler",
            header: "Wholesaler",
            render: (row) => row.wholesaler,
          },
          {
            key: "price",
            header: "Base Price",
            render: (row) => row.price,
          },
          {
            key: "stock",
            header: "Stock",
            render: (row) => row.stock,
          },
          {
            key: "markup",
            header: "Markup",
            render: (row) => row.markup,
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
                path={`/admin/products/${encodeURIComponent(row.id)}`}
                helperText={row.rejectionReason}
                actions={[
                  {
                    label: row.status === "approved" ? "Refresh Approval" : "Approve",
                    payload: { status: "approved" },
                    prompt: {
                      field: "note",
                      label: "Optional approval note",
                      defaultValue: row.rejectionReason ?? "",
                    },
                    tone: "success",
                  },
                  ...(row.status !== "pending"
                    ? [{ label: "Move Pending", payload: { status: "pending" }, tone: "neutral" as const }]
                    : []),
                  {
                    label: "Reject",
                    payload: { status: "rejected" },
                    prompt: {
                      field: "note",
                      label: "Enter the rejection reason or moderation note",
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
            Moderation Controls
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Approve or reject with one click and keep rejection reasons visible.</li>
            <li>Support quick edits for name, category, and price before approval.</li>
            <li>Prepare bulk export and listing toggles for catalog operations.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Store Integration Rules
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Admin store price must respect the approved markup range of 5% to 50%.</li>
            <li>Listing and unlisting should update storefront visibility instantly.</li>
            <li>Inventory sync stays part of the later API connection phase, but the route surface is now ready.</li>
          </ul>
        </div>
      </section>
    </AdminCoreShell>
  );
}
