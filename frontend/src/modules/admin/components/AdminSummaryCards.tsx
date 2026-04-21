type AdminSummaryCard = {
  label: string;
  value: string;
  helper: string;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
};

const toneClassMap: Record<NonNullable<AdminSummaryCard["tone"]>, string> = {
  neutral: "border-slate-200 bg-white text-slate-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-rose-200 bg-rose-50 text-rose-900",
};

export default function AdminSummaryCards({
  cards,
}: {
  cards: AdminSummaryCard[];
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const tone = card.tone ?? "neutral";

        return (
          <div
            key={card.label}
            className={`rounded-2xl border p-5 shadow-sm ${toneClassMap[tone]}`}
          >
            <p className="text-sm font-medium opacity-80">{card.label}</p>
            <p className="mt-3 text-3xl font-bold">{card.value}</p>
            <p className="mt-2 text-sm opacity-80">{card.helper}</p>
          </div>
        );
      })}
    </section>
  );
}
