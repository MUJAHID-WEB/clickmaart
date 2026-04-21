import Link from "next/link";

type AdminStatusNavigationItem = {
  label: string;
  href: string;
  count: number;
};

export default function AdminStatusNavigation({
  items,
  activeHref,
}: {
  items: AdminStatusNavigationItem[];
  activeHref: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const isActive = activeHref === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span>{item.label}</span>
            <span
              className={`inline-flex min-w-8 justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {item.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
