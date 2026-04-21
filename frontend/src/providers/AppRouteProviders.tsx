"use client";

import SharedAppProviders from "@/providers/SharedAppProviders";
import AdminSessionProvider from "@/providers/session/AdminSessionProvider";
import RetailerSessionProvider from "@/providers/session/RetailerSessionProvider";
import WholesalerSessionProvider from "@/providers/session/WholesalerSessionProvider";

export type AppRouteSection =
  | "public"
  | "auth"
  | "admin"
  | "wholesaler"
  | "retailer";

type AppRouteProvidersProps = {
  children: React.ReactNode;
  section: AppRouteSection;
};

const SECTION_CONFIG: Record<AppRouteSection, { includeCart: boolean }> = {
  public: { includeCart: true },
  auth: { includeCart: false },
  admin: { includeCart: false },
  wholesaler: { includeCart: false },
  retailer: { includeCart: false },
};

export default function AppRouteProviders({
  children,
  section,
}: AppRouteProvidersProps) {
  const sharedProviders = (
    <SharedAppProviders includeCart={SECTION_CONFIG[section].includeCart}>
      {children}
    </SharedAppProviders>
  );

  if (section === "admin") {
    return <AdminSessionProvider>{sharedProviders}</AdminSessionProvider>;
  }

  if (section === "wholesaler") {
    return (
      <WholesalerSessionProvider>{sharedProviders}</WholesalerSessionProvider>
    );
  }

  if (section === "retailer") {
    return <RetailerSessionProvider>{sharedProviders}</RetailerSessionProvider>;
  }

  return sharedProviders;
}
