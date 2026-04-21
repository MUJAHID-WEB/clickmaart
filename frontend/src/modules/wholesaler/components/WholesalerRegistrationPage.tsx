import StructuredRegistrationPage from "@/modules/auth/components/StructuredRegistrationPage";

export default function WholesalerRegistrationPage() {
  return (
    <StructuredRegistrationPage
      role="wholesaler"
      title="Wholesaler Registration"
      description="Submit business information, contact details, password, and documents. OTP verification happens first, then the account waits for admin approval."
      signInHref="/wholesaler/login"
      nextHref="/wholesaler/verify-otp"
      submitLabel="Register wholesaler and send OTP"
      fields={[
        {
          name: "businessName",
          label: "Business name",
          type: "text",
          placeholder: "ABC Traders",
          required: true,
        },
        {
          name: "taxId",
          label: "GST / VAT / Tax ID",
          type: "text",
          placeholder: "Business tax number",
          required: true,
        },
        {
          name: "contactPerson",
          label: "Contact person",
          type: "text",
          placeholder: "Primary business contact",
          required: true,
        },
        {
          name: "email",
          label: "Email address",
          type: "email",
          placeholder: "imports@business.com",
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
          name: "address",
          label: "Business address",
          type: "textarea",
          placeholder: "Business location and warehouse details",
          required: true,
        },
        {
          name: "license",
          label: "Business license",
          type: "file",
          accept: ".pdf,.jpg,.jpeg,.png",
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
