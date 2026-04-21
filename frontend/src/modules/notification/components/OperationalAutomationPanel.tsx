type AutomationRule = {
  id: string;
  title: string;
  trigger: string;
  channels: string[];
  audience: string;
  status: "active" | "monitoring" | "queued";
  note: string;
};

const statusClasses: Record<AutomationRule["status"], string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  monitoring: "bg-amber-50 text-amber-700 ring-amber-200",
  queued: "bg-sky-50 text-sky-700 ring-sky-200",
};

export default function OperationalAutomationPanel({
  title = "Operational automation",
  description,
  rules,
}: {
  title?: string;
  description: string;
  rules: AutomationRule[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Notification Automation
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <div className="mt-5 space-y-4">
        {rules.map((rule) => (
          <article
            key={rule.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {rule.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{rule.trigger}</p>
              </div>
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset ${statusClasses[rule.status]}`}
              >
                {rule.status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Channels
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {rule.channels.join(", ")}
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Audience
                </p>
                <p className="mt-2 text-sm text-slate-700">{rule.audience}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600">{rule.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
