type AdminStatusBadgeProps = {
  status: string;
};

const badgeStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  shipped: "bg-sky-50 text-sky-700 ring-sky-200",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  received: "bg-violet-50 text-violet-700 ring-violet-200",
  "out-for-delivery": "bg-cyan-50 text-cyan-700 ring-cyan-200",
  "payment-done": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  scheduled: "bg-slate-100 text-slate-700 ring-slate-200",
  "in-transit": "bg-sky-50 text-sky-700 ring-sky-200",
  delayed: "bg-rose-50 text-rose-700 ring-rose-200",
  ready: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "pending-approval": "bg-amber-50 text-amber-700 ring-amber-200",
  processed: "bg-sky-50 text-sky-700 ring-sky-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  live: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  draft: "bg-slate-100 text-slate-700 ring-slate-200",
  "dns-pending": "bg-amber-50 text-amber-700 ring-amber-200",
  "setup-pending": "bg-amber-50 text-amber-700 ring-amber-200",
  queued: "bg-slate-100 text-slate-700 ring-slate-200",
  generating: "bg-sky-50 text-sky-700 ring-sky-200",
  healthy: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  attention: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function AdminStatusBadge({
  status,
}: AdminStatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  const badgeClass =
    badgeStyles[normalizedStatus] ?? "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset ${badgeClass}`}
    >
      {status}
    </span>
  );
}
