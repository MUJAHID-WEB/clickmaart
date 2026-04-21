import type { ReactNode } from "react";
import Link from "next/link";

type ShellAction = {
  href: string;
  label: string;
};

export default function RetailerPanelShell({
  eyebrow,
  title,
  description,
  actions = [],
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ShellAction[];
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-orange-950 via-rose-900 to-amber-700 px-6 py-10 text-white md:px-10">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-orange-50 md:text-base">
                {description}
              </p>
            </div>
            {actions.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-900 transition hover:bg-orange-50"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="px-6 py-8 md:px-10">{children}</div>
      </section>
    </main>
  );
}
