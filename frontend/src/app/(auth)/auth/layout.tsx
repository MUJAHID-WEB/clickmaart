import AppRouteProviders from "@/providers/AppRouteProviders";
import AuthRouteMigrationWrapper from "@/modules/shared/components/migration/AuthRouteMigrationWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouteProviders section="auth">
      <AuthRouteMigrationWrapper>{children}</AuthRouteMigrationWrapper>
    </AppRouteProviders>
  );
}
