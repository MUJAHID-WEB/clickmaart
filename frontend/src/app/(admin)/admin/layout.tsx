import AppRouteProviders from "@/providers/AppRouteProviders";
import AdminRouteMigrationWrapper from "@/modules/shared/components/migration/AdminRouteMigrationWrapper";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouteProviders section="admin">
      <AdminRouteMigrationWrapper>{children}</AdminRouteMigrationWrapper>
    </AppRouteProviders>
  );
}
