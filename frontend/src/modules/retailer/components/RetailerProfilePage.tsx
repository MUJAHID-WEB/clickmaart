import ProfileManagementPage from "@/modules/auth/components/ProfileManagementPage";
import { getRetailerProfileSnapshot } from "../server/getRetailerPanelSnapshot";

export default async function RetailerProfilePage() {
  const profile = await getRetailerProfileSnapshot();

  return (
    <ProfileManagementPage
      roleLabel="Retailer"
      intro="Retailer profile management covers personal details, store identity, document uploads, and future business profile updates."
      mutationRole="retailer"
      submitPath="/retailer/profile"
      fieldMap={{
        ownerName: "name",
        email: "email",
        phone: "phone",
        profilePhoto: "profile_photo",
        shopName: "business_name",
        shopType: "business_type",
        address: "address",
        businessDocument: "business_document",
      }}
      initialValues={{
        ownerName: profile.name ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        shopName: profile.businessName ?? "",
        shopType: profile.businessType ?? "",
        address: profile.address ?? "",
        businessDocument: profile.document ?? "",
      }}
      saveSuccessMessage="Retailer profile changes were saved to the Laravel backend."
      personalFields={[
        {
          name: "ownerName",
          label: "Owner name",
          placeholder: "Store owner",
        },
        {
          name: "email",
          label: "Email address",
          type: "email",
          placeholder: "retailer@shop.com",
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
          name: "shopName",
          label: "Shop name",
          placeholder: "Urban Mart",
        },
        {
          name: "shopType",
          label: "Shop type",
          placeholder: "Fashion / grocery / electronics",
        },
        {
          name: "address",
          label: "Shop address",
          placeholder: "Store location",
        },
        {
          name: "businessDocument",
          label: "Trade license / document upload",
          type: "file",
          accept: ".pdf,.jpg,.jpeg,.png",
        },
      ]}
    />
  );
}
