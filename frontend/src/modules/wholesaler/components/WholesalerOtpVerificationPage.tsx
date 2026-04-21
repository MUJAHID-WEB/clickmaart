import OtpVerificationPage from "@/modules/auth/components/OtpVerificationPage";

export default function WholesalerOtpVerificationPage() {
  return (
    <OtpVerificationPage
      title="Wholesaler OTP Verification"
      description="Verify the 6-digit OTP delivered to the registered mobile or email before the account enters admin approval."
      nextHref="/wholesaler/approval-status"
      nextLabel="Verify OTP and continue"
      backHref="/register/wholesaler"
    />
  );
}
