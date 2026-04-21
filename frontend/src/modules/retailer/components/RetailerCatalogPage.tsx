import RetailerDataTable from "./RetailerDataTable";
import RetailerPanelShell from "./RetailerPanelShell";
import RetailerStatusBadge from "./RetailerStatusBadge";
import RetailerStatusNavigation from "./RetailerStatusNavigation";
import RetailerSummaryCards from "./RetailerSummaryCards";
import MutationActionStrip from "@/components/common/MutationActionStrip";
import {
  countByStatus,
  formatBdt,
  type RetailerCatalogRecord,
  type RetailerCatalogStatus,
} from "../data/retailerPanelData";
import { getRetailerCatalogSnapshot } from "../server/getRetailerPanelSnapshot";

type PageStatus = RetailerCatalogStatus | "all";

const getDescription = (status: PageStatus) => {
  if (status === "live") {
    return "Monitor live catalog items that are already published inside retailer storefronts.";
  }

  if (status === "draft") {
    return "Keep unpublished or launch-ready items visible while pricing and media are refined.";
  }

  if (status === "low-stock") {
    return "Track low-stock items that need replenishment before conversion starts to drop.";
  }

  return "Manage the retailer catalog across live, draft, and low-stock views from one App Router workspace.";
};

export default async function RetailerCatalogPage({
  status = "all",
}: {
  status?: PageStatus;
}) {
  const { allRecords, visibleRecords } = await getRetailerCatalogSnapshot(
    status,
  );
  const averageMargin =
    allRecords.length === 0
      ? 0
      : Math.round(
          allRecords.reduce((sum, record) => sum + record.margin, 0) /
            allRecords.length,
        );

  return (
    <RetailerPanelShell
      eyebrow="Retailer Catalog"
      title="Product Catalog Management"
      description={getDescription(status)}
      actions={[
        { href: "/retailer/store", label: "Open Store Management" },
        { href: "/retailer/reports", label: "Open Catalog Reports" },
      ]}
    >
      <div className="space-y-6">
        <RetailerSummaryCards
          cards={[
            {
              label: "Live SKUs",
              value: String(countByStatus(allRecords, "live")),
              helper: "Products currently visible to customers",
              tone: "success",
            },
            {
              label: "Draft SKUs",
              value: String(countByStatus(allRecords, "draft")),
              helper: "Products still being prepared for launch",
              tone: "warning",
            },
            {
              label: "Low Stock",
              value: String(countByStatus(allRecords, "low-stock")),
              helper: "Products requiring fast replenishment",
              tone: "danger",
            },
            {
              label: "Average Margin",
              value: formatBdt(averageMargin),
              helper: "Average retailer profit per catalog item",
              tone: "neutral",
            },
          ]}
        />

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Catalog Status
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Separate live, draft, and low-stock products by operational
                state.
              </p>
            </div>
            <RetailerStatusNavigation
              items={[
                {
                  label: "Overview",
                  href: "/retailer/catalog",
                  count: allRecords.length,
                },
                {
                  label: "Live",
                  href: "/retailer/catalog/live",
                  count: countByStatus(allRecords, "live"),
                },
                {
                  label: "Draft",
                  href: "/retailer/catalog/draft",
                  count: countByStatus(allRecords, "draft"),
                },
                {
                  label: "Low Stock",
                  href: "/retailer/catalog/low-stock",
                  count: countByStatus(allRecords, "low-stock"),
                },
              ]}
              activeHref={
                status === "all"
                  ? "/retailer/catalog"
                  : `/retailer/catalog/${status}`
              }
            />
          </div>
        </section>

        <RetailerDataTable<RetailerCatalogRecord>
          caption="Retailer catalog projection"
          rows={visibleRecords}
          emptyMessage="No catalog items found for this status."
          columns={[
            {
              key: "product",
              header: "Product",
              render: (row) => (
                <div>
                  <p className="font-semibold text-slate-900">{row.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Updated {row.updatedAt}
                  </p>
                </div>
              ),
            },
            {
              key: "store",
              header: "Store",
              render: (row) => row.storeName,
            },
            {
              key: "pricing",
              header: "Pricing",
              render: (row) => (
                <div>
                  <p>Wholesale: {formatBdt(row.wholesalePrice)}</p>
                  <p>Selling: {formatBdt(row.sellingPrice)}</p>
                </div>
              ),
            },
            {
              key: "margin",
              header: "Margin",
              render: (row) => formatBdt(row.margin),
            },
            {
              key: "stock",
              header: "Stock",
              render: (row) => row.stock,
            },
            {
              key: "status",
              header: "Status",
              render: (row) => <RetailerStatusBadge status={row.status} />,
            },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <MutationActionStrip
                role="retailer"
                path={`/retailer/catalog/${encodeURIComponent(row.id)}`}
                helperText={row.note ?? null}
                actions={[
                  {
                    label: "Update Price",
                    payload: { status: row.status },
                    prompt: {
                      field: "selling_price",
                      label: "Enter the new selling price",
                      defaultValue: String(row.sellingPrice),
                      parseAs: "number",
                    },
                    tone: "primary",
                  },
                  {
                    label: "Update Stock",
                    payload: { status: row.status },
                    prompt: {
                      field: "stock",
                      label: "Enter the updated stock level",
                      defaultValue: String(row.stock),
                      parseAs: "integer",
                    },
                    tone: "neutral",
                  },
                  ...(row.status !== "live"
                    ? [{ label: "Go Live", payload: { status: "live" }, tone: "success" as const }]
                    : []),
                  ...(row.status !== "draft"
                    ? [{ label: "Set Draft", payload: { status: "draft" }, tone: "danger" as const }]
                    : []),
                ]}
              />
            ),
          },
        ]}
      />

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Catalog Controls
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Retailer selling prices must stay above wholesale cost.</li>
              <li>Draft products remain outside the live storefront until launch-ready.</li>
              <li>Low-stock items should feed both store management and reporting summaries.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Merchandising Notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Top products should be easy to feature across multiple retailer stores.</li>
              <li>Media and price adjustments should be visible before public storefront expansion begins.</li>
              <li>Future API work will sync catalog edits directly into store projections and reports.</li>
            </ul>
          </div>
        </section>
      </div>
    </RetailerPanelShell>
  );
}
