import OtpVerificationPage from "@/modules/auth/components/OtpVerificationPage";

export default function RetailerOtpVerificationPage() {
  return (
    <OtpVerificationPage
      title="Retailer OTP Verification"
      description="Verify the retailer OTP to move the account into pending admin approval."
      nextHref="/retailer/approval-status"
      nextLabel="Verify OTP and continue"
      backHref="/register/retailer"
    />
  );
}
