import Link from "next/link";

export default function RetailerStatusNavigation({
  items,
  activeHref,
}: {
  items: Array<{
    label: string;
    href: string;
    count?: number;
  }>;
  activeHref: string;
}) {
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = item.href === activeHref;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-rose-900 text-white"
                : "bg-orange-50 text-rose-900 hover:bg-orange-100"
            }`}
          >
            {item.label}
            {typeof item.count === "number" ? ` (${item.count})` : ""}
          </Link>
        );
      })}
    </nav>
  );
}
