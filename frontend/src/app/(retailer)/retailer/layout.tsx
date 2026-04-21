import AppRouteProviders from "@/providers/AppRouteProviders";
import PanelRouteMigrationWrapper from "@/modules/shared/components/migration/PanelRouteMigrationWrapper";

export default function RetailerLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouteProviders section="retailer">
      <PanelRouteMigrationWrapper>{children}</PanelRouteMigrationWrapper>
    </AppRouteProviders>
  );
}
