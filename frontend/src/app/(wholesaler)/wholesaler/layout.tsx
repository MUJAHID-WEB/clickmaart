import AppRouteProviders from "@/providers/AppRouteProviders";
import PanelRouteMigrationWrapper from "@/modules/shared/components/migration/PanelRouteMigrationWrapper";

export default function WholesalerLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouteProviders section="wholesaler">
      <PanelRouteMigrationWrapper>{children}</PanelRouteMigrationWrapper>
    </AppRouteProviders>
  );
}
