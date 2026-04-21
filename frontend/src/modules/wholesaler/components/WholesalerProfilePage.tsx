import ProfileManagementPage from "@/modules/auth/components/ProfileManagementPage";
import { getWholesalerProfileSnapshot } from "../server/getWholesalerPanelSnapshot";

export default async function WholesalerProfilePage() {
  const profile = await getWholesalerProfileSnapshot();

  return (
    <ProfileManagementPage
      roleLabel="Wholesaler"
      intro="This profile foundation supports personal details, business information, profile image, and document updates for approved wholesaler accounts."
      mutationRole="wholesaler"
      submitPath="/wholesaler/profile"
      fieldMap={{
        fullName: "name",
        email: "email",
        phone: "phone",
        profilePhoto: "profile_photo",
        businessName: "business_name",
        taxId: "trade_license",
        address: "address",
        businessDocument: "business_document",
      }}
      initialValues={{
        fullName: profile.name ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        businessName: profile.businessName ?? "",
        taxId: profile.tradeLicense ?? "",
        address: profile.address ?? "",
        businessDocument: profile.document ?? "",
      }}
      saveSuccessMessage="Wholesaler profile changes were saved to the Laravel backend."
      personalFields={[
        {
          name: "fullName",
          label: "Full name",
          placeholder: "Primary account holder",
        },
        {
          name: "email",
          label: "Email address",
          type: "email",
          placeholder: "imports@business.com",
        },
        {
          name: "phone",
          label: "Mobile number",
          type: "tel",
          placeholder: "+8801XXXXXXXXX",
        },
        {
          name: "profilePhoto",
          label: "Profile photo",
          type: "file",
          accept: ".jpg,.jpeg,.png",
        },
      ]}
      businessFields={[
        {
          name: "businessName",
          label: "Business name",
          placeholder: "ABC Traders",
        },
        {
          name: "taxId",
          label: "GST / VAT / Tax ID",
          placeholder: "Business tax number",
        },
        {
          name: "address",
          label: "Business address",
          placeholder: "Warehouse and office location",
        },
        {
          name: "businessDocument",
          label: "Business document upload",
          type: "file",
          accept: ".pdf,.jpg,.jpeg,.png",
        },
      ]}
    />
  );
}
