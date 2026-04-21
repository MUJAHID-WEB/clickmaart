import Link from "next/link";

type AdminRoutePill = {
  label: string;
  href: string;
};

export default function AdminRoutePills({
  items,
  activeHref,
}: {
  items: AdminRoutePill[];
  activeHref: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const isActive = item.href === activeHref;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
