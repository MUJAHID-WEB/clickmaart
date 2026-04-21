const statusClasses: Record<string, string> = {
  live: "bg-emerald-100 text-emerald-800",
  draft: "bg-amber-100 text-amber-800",
  "low-stock": "bg-rose-100 text-rose-800",
  pending: "bg-amber-100 text-amber-800",
  "in-delivery": "bg-sky-100 text-sky-800",
  completed: "bg-emerald-100 text-emerald-800",
  withdrawable: "bg-emerald-100 text-emerald-800",
  paid: "bg-slate-200 text-slate-800",
  active: "bg-emerald-100 text-emerald-800",
  "setup-pending": "bg-orange-100 text-orange-800",
};

const toLabel = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function RetailerStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[status] ?? "bg-slate-100 text-slate-700"}`}
    >
      {toLabel(status)}
    </span>
  );
}
