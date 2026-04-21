import RoleLoginPage from "@/modules/auth/components/RoleLoginPage";

export default function CustomerLoginPage() {
  return (
    <RoleLoginPage
      role="customer"
      registerHref="/auth/signup"
      registerLabel="Create customer account"
    />
  );
}
