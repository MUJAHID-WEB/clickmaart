type SummaryTone = "warning" | "success" | "info" | "neutral" | "danger";

const toneClasses: Record<SummaryTone, string> = {
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
  neutral: "border-slate-200 bg-slate-50 text-slate-900",
  danger: "border-rose-200 bg-rose-50 text-rose-900",
};

export default function RetailerSummaryCards({
  cards,
}: {
  cards: Array<{
    label: string;
    value: string;
    helper: string;
    tone: SummaryTone;
  }>;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className={`rounded-2xl border p-5 shadow-sm ${toneClasses[card.tone]}`}
        >
          <p className="text-sm font-medium opacity-80">{card.label}</p>
          <p className="mt-3 text-3xl font-bold">{card.value}</p>
          <p className="mt-3 text-sm leading-6 opacity-80">{card.helper}</p>
        </article>
      ))}
    </section>
  );
}
