import Link from "next/link";

type ActionLink = {
  href: string;
  label: string;
};

type PanelShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  actions?: ActionLink[];
  children?: React.ReactNode;
};

export default function PanelShell({
  eyebrow,
  title,
  description,
  highlights,
  actions = [],
  children,
}: PanelShellProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-700 px-6 py-10 text-white md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-50 md:text-base">
            {description}
          </p>

          {actions.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid gap-6 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Current migration scope
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Workspace status
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This route is now available under the App Router workspace so the
              legacy Pages Router can be migrated feature by feature without a
              forced redesign.
            </p>
            <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              Next milestone: connect shared providers, migrate route-level UI,
              then plug in Laravel APIs module by module.
            </div>
          </div>
        </div>

        {children ? <div className="px-6 pb-8 md:px-10">{children}</div> : null}
      </section>
    </main>
  );
}
