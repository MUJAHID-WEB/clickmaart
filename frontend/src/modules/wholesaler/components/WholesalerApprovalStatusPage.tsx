import ApprovalStatusPage from "@/modules/auth/components/ApprovalStatusPage";

export default function WholesalerApprovalStatusPage() {
  return (
    <ApprovalStatusPage
      roleLabel="Wholesaler"
      loginHref="/wholesaler/login"
    />
  );
}
