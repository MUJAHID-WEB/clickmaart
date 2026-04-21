import RoleLoginPage from "@/modules/auth/components/RoleLoginPage";

export default function WholesalerLoginPage() {
  return (
    <RoleLoginPage
      role="wholesaler"
      registerHref="/register/wholesaler"
      registerLabel="Register as wholesaler"
    />
  );
}
