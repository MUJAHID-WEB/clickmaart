import type { ReactNode } from "react";

export default function AdminCoreShell({
  eyebrow,
  title,
  description,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                {eyebrow}
              </span>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                <p className="mt-2 max-w-4xl text-sm text-slate-600">
                  {description}
                </p>
              </div>
            </div>
            {aside}
          </div>
        </section>
        {children}
      </div>
    </div>
  );
}
