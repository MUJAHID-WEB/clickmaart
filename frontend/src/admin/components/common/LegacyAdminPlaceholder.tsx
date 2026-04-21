import Link from "next/link";

type LegacyAdminPlaceholderProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryText: string;
};

export default function LegacyAdminPlaceholder({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryText,
}: LegacyAdminPlaceholderProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          Legacy Route Placeholder
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            {primaryLabel}
          </Link>
          <span className="text-sm text-slate-500">{secondaryText}</span>
        </div>
      </div>
    </div>
  );
}
