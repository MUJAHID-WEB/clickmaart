import type { ReactNode } from "react";
import Link from "next/link";
import type { StorefrontSnapshot } from "../data/storefrontData";

const resolveHref = (basePath: string, route: string) => {
  if (!basePath) {
    return route || "/";
  }

  if (!route || route === "/") {
    return basePath;
  }

  return `${basePath}${route}`;
};

export default function StorefrontExperienceShell({
  snapshot,
  section,
  title,
  description,
  children,
}: {
  snapshot: StorefrontSnapshot;
  section:
    | "home"
    | "catalog"
    | "product"
    | "cart"
    | "checkout"
    | "confirmation"
    | "about"
    | "contact";
  title: string;
  description: string;
  children: ReactNode;
}) {
  const navItems = [
    { label: "Home", href: resolveHref(snapshot.basePath, "/"), key: "home" },
    {
      label: "Products",
      href: resolveHref(snapshot.basePath, "/products"),
      key: "catalog",
    },
    {
      label: "About",
      href: resolveHref(snapshot.basePath, "/about"),
      key: "about",
    },
    {
      label: "Contact",
      href: resolveHref(snapshot.basePath, "/contact"),
      key: "contact",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 px-4 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  {snapshot.surfaceLabel}
                </span>
                {snapshot.isPreview ? (
                  <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
                    Preview Route
                  </span>
                ) : null}
              </div>
              <h1 className="mt-4 text-3xl font-bold md:text-4xl">
                {snapshot.storeName}
              </h1>
              <p className="mt-3 text-base font-medium text-emerald-100">
                {snapshot.tagline}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-100 md:text-base">
                {snapshot.description}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100 backdrop-blur">
              <p className="font-semibold text-white">{snapshot.ownerLabel}</p>
              <p className="mt-2">{snapshot.domain}</p>
              <p className="mt-1">{snapshot.supportEmail}</p>
              <p className="mt-1">{snapshot.supportPhone}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/customer/login"
                  className="rounded-full bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-50"
                >
                  Customer Login
                </Link>
                <Link
                  href="/customer/register"
                  className="rounded-full border border-white/25 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
                >
                  Customer Register
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-200">
                {description}
              </p>
            </div>
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const isActive =
                  section === item.key || (section === "product" && item.key === "catalog");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white text-slate-900"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {snapshot.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div>{children}</div>
    </div>
  );
}
