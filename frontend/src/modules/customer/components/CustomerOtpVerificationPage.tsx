import OtpVerificationPage from "@/modules/auth/components/OtpVerificationPage";

export default function CustomerOtpVerificationPage() {
  return (
    <OtpVerificationPage
      title="Customer OTP Verification"
      description="Enter the OTP sent to your email or mobile number to activate the customer account."
      nextHref="/auth/signin"
      nextLabel="Verify OTP and continue to sign in"
      backHref="/auth/signup"
    />
  );
}
