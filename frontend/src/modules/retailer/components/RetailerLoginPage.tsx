import RoleLoginPage from "@/modules/auth/components/RoleLoginPage";

export default function RetailerLoginPage() {
  return (
    <RoleLoginPage
      role="retailer"
      registerHref="/register/retailer"
      registerLabel="Register as retailer"
    />
  );
}
