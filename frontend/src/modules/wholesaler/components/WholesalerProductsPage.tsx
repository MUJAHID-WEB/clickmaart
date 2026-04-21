import WholesalerDataTable from "./WholesalerDataTable";
import WholesalerPanelShell from "./WholesalerPanelShell";
import WholesalerStatusBadge from "./WholesalerStatusBadge";
import WholesalerStatusNavigation from "./WholesalerStatusNavigation";
import WholesalerSummaryCards from "./WholesalerSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import {
  countByStatus,
  formatUsd,
  type WholesalerProductRecord,
  type WholesalerProductStatus,
} from "../data/wholesalerPanelData";
import { getWholesalerProductsSnapshot } from "../server/getWholesalerPanelSnapshot";

type PageStatus = WholesalerProductStatus | "all";

const getDescription = (status: PageStatus) => {
  if (status === "pending") {
    return "Track newly submitted products that are waiting for admin moderation and update them before approval if needed.";
  }

  if (status === "approved") {
    return "Monitor approved products, current stock, and listing state so the business catalog stays healthy.";
  }

  if (status === "rejected") {
    return "Review rejected submissions, keep admin notes visible, and prepare corrected resubmissions.";
  }

  return "Manage the wholesaler product catalog across pending, approved, and rejected moderation states from one App Router workspace.";
};

export default async function WholesalerProductsPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getWholesalerProductsSnapshot(
    status,
  );

  return (
    <WholesalerPanelShell
      eyebrow="Wholesaler Products"
      title="Product Management"
      description={getDescription(status)}
      actions={[
        { href: "/wholesaler/products", label: "Products Overview" },
        { href: "/wholesaler/reports", label: "Open Product Reports" },
      ]}
    >
      <div className="space-y-6">
        <WholesalerSummaryCards
          cards={[
            {
              label: "Pending Moderation",
              value: String(countByStatus(allRecords, "pending")),
              helper: "Products waiting for admin review",
              tone: "warning",
            },
            {
              label: "Approved Products",
              value: String(countByStatus(allRecords, "approved")),
              helper: "Products currently available for live listing",
              tone: "success",
            },
            {
              label: "Rejected Products",
              value: String(countByStatus(allRecords, "rejected")),
              helper: "Products requiring correction and resubmission",
              tone: "danger",
            },
            {
              label: "Visible Inventory",
              value: `${allRecords
                .filter((record) => record.status === "approved")
                .reduce((sum, record) => sum + record.stock, 0)} units`,
              helper: "Approximate live stock across approved products",
              tone: "info",
            },
          ]}
        />

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Moderation Status
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Use the queues below to separate products by approval state.
              </p>
            </div>
            <WholesalerStatusNavigation
              items={[
                {
                  label: "Overview",
                  href: "/wholesaler/products",
                  count: allRecords.length,
                },
                {
                  label: "Pending",
                  href: "/wholesaler/products/pending",
                  count: countByStatus(allRecords, "pending"),
                },
                {
                  label: "Approved",
                  href: "/wholesaler/products/approved",
                  count: countByStatus(allRecords, "approved"),
                },
                {
                  label: "Rejected",
                  href: "/wholesaler/products/rejected",
                  count: countByStatus(allRecords, "rejected"),
                },
              ]}
              activeHref={
                status === "all"
                  ? "/wholesaler/products"
                  : `/wholesaler/products/${status}`
              }
            />
          </div>
        </section>

        <WholesalerDataTable<WholesalerProductRecord>
          caption="Wholesaler product submissions"
          rows={visibleRecords}
          emptyMessage="No product records found for this status."
          columns={[
            {
              key: "product",
              header: "Product",
              render: (row) => (
                <div>
                  <p className="font-semibold text-slate-900">{row.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Submitted {row.submittedAt}
                  </p>
                </div>
              ),
            },
            {
              key: "category",
              header: "Category",
              render: (row) => row.category,
            },
            {
              key: "price",
              header: "Price",
              render: (row) => formatUsd(row.price),
            },
            {
              key: "stock",
              header: "Stock",
              render: (row) => row.stock,
            },
            {
              key: "review",
              header: "Review",
              render: (row) => <WholesalerStatusBadge status={row.status} />,
            },
            {
              key: "listing",
              header: "Listing",
              render: (row) => (
                <WholesalerStatusBadge status={row.listingState} />
              ),
            },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <MutationActionStrip
                role="wholesaler"
                path={`/wholesaler/products/${encodeURIComponent(row.id)}`}
                helperText={row.adminNote ?? null}
                actions={[
                  {
                    label: "Update Price",
                    prompt: {
                      field: "price",
                      label: "Enter the updated product price",
                      defaultValue: String(row.price),
                      parseAs: "number",
                    },
                    tone: "primary",
                  },
                  {
                    label: "Update Stock",
                    prompt: {
                      field: "stock",
                      label: "Enter the updated stock level",
                      defaultValue: String(row.stock),
                      parseAs: "integer",
                    },
                    tone: "neutral",
                  },
                  {
                    label: "Resubmit",
                    payload: { resubmit: true },
                    tone: "success",
                  },
                ]}
              />
            ),
          },
        ]}
      />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Product Workflow Notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Wholesalers can create, edit, and resubmit product drafts before approval.</li>
              <li>Approved products should keep stock and availability accurate for order intake.</li>
              <li>Rejected items must preserve the admin note so corrections are easy to understand.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Catalog Quality Rules
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Images, descriptions, and price points should stay aligned with moderation rules.</li>
              <li>Inventory changes must remain synchronized before the API integration phase begins.</li>
              <li>Top-performing approved items should feed the reporting dashboard automatically later.</li>
            </ul>
          </div>
        </section>
      </div>
    </WholesalerPanelShell>
  );
}
