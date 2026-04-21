import ApprovalStatusPage from "@/modules/auth/components/ApprovalStatusPage";

export default function RetailerApprovalStatusPage() {
  return (
    <ApprovalStatusPage
      roleLabel="Retailer"
      loginHref="/retailer/login"
    />
  );
}
