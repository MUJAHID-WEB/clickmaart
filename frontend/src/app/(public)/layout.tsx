import AppRouteProviders from "@/providers/AppRouteProviders";
import PublicRouteMigrationWrapper from "@/modules/shared/components/migration/PublicRouteMigrationWrapper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouteProviders section="public">
      <PublicRouteMigrationWrapper>{children}</PublicRouteMigrationWrapper>
    </AppRouteProviders>
  );
}
