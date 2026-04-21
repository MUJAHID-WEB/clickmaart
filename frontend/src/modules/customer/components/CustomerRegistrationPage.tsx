import StructuredRegistrationPage from "@/modules/auth/components/StructuredRegistrationPage";

export default function CustomerRegistrationPage() {
  return (
    <StructuredRegistrationPage
      role="customer"
      title="Customer Registration"
      description="Create a customer account with email or mobile verification. OTP confirmation is required before the account becomes active."
      signInHref="/auth/signin"
      nextHref="/customer/verify-otp"
      submitLabel="Register and send OTP"
      fields={[
        {
          name: "fullName",
          label: "Full name",
          type: "text",
          placeholder: "Enter your full name",
          required: true,
        },
        {
          name: "email",
          label: "Email address",
          type: "email",
          placeholder: "customer@clickmaart.com",
          required: true,
        },
        {
          name: "phone",
          label: "Mobile number",
          type: "tel",
          placeholder: "+8801XXXXXXXXX",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Minimum 8 characters",
          required: true,
        },
        {
          name: "confirmPassword",
          label: "Confirm password",
          type: "password",
          placeholder: "Retype password",
          required: true,
        },
      ]}
    />
  );
}
