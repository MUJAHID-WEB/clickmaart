const badgeStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  shipped: "bg-sky-50 text-sky-700 ring-sky-200",
  "payment-done": "bg-violet-50 text-violet-700 ring-violet-200",
  withdrawable: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  paid: "bg-sky-50 text-sky-700 ring-sky-200",
  listed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "not-listed": "bg-slate-100 text-slate-700 ring-slate-200",
};

export default function WholesalerStatusBadge({
  status,
}: {
  status: string;
}) {
  const normalizedStatus = status.toLowerCase();
  const badgeClass =
    badgeStyles[normalizedStatus] ?? "bg-slate-100 text-slate-700 ring-slate-200";
  const label = status.replace(/-/g, " ");

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset ${badgeClass}`}
    >
      {label}
    </span>
  );
}
