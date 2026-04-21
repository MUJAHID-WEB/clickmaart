import StructuredRegistrationPage from "@/modules/auth/components/StructuredRegistrationPage";

export default function RetailerRegistrationPage() {
  return (
    <StructuredRegistrationPage
      role="retailer"
      title="Retailer Registration"
      description="Retailer registration collects business identity, owner details, and supporting documents before OTP verification and admin approval."
      signInHref="/retailer/login"
      nextHref="/retailer/verify-otp"
      submitLabel="Register retailer and send OTP"
      fields={[
        {
          name: "shopName",
          label: "Shop name",
          type: "text",
          placeholder: "Urban Mart",
          required: true,
        },
        {
          name: "shopType",
          label: "Shop type",
          type: "select",
          required: true,
          options: [
            { label: "Grocery", value: "grocery" },
            { label: "Electronics", value: "electronics" },
            { label: "Clothing", value: "clothing" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "ownerName",
          label: "Owner name",
          type: "text",
          placeholder: "Store owner",
          required: true,
        },
        {
          name: "email",
          label: "Email address",
          type: "email",
          placeholder: "retailer@shop.com",
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
          label: "Shop address",
          type: "textarea",
          placeholder: "Store location",
          required: true,
        },
        {
          name: "tradeLicense",
          label: "Trade license / ID document",
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
