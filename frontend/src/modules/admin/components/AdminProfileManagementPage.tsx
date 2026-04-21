import AdminCoreShell from "./AdminCoreShell";
import AdminSummaryCards from "./AdminSummaryCards";
import { getAdminProfileSnapshot } from "../server/getAdminCoreSnapshot";

export default async function AdminProfileManagementPage() {
  const profile = await getAdminProfileSnapshot();
  const contactFields = [
    { label: "Admin Name", value: profile.name },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "Designation", value: profile.designation },
  ];

  const businessFields = [
    { label: "Company", value: profile.company },
    { label: "Address", value: profile.address },
    { label: "Trade License", value: profile.tradeLicense },
    {
      label: "Business Document",
      value: profile.businessDocument,
    },
  ];

  return (
    <AdminCoreShell
      eyebrow="Admin Settings"
      title="Admin Profile Management"
      description="Manage the admin profile, contact details, business identity, and security rules without breaking the existing admin shell layout."
      aside={
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Profile updates should confirm changes immediately and preserve audit
          history for sensitive fields.
        </div>
      }
    >
      <AdminSummaryCards
        cards={[
          {
            label: "Profile Status",
            value: "Active",
            helper: "Core admin account is available for operations",
            tone: "success",
          },
          {
            label: "Document State",
            value: "Verified",
            helper: "Trade license and business identity are on file",
            tone: "info",
          },
          {
            label: "Password Policy",
            value: "Strong",
            helper: profile.passwordPolicy,
            tone: "warning",
          },
          {
            label: "Security Lock Rule",
            value: "3 attempts",
            helper: profile.securityNote,
            tone: "danger",
          },
        ]}
      />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Personal Details
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Editable fields for name, email, phone, and operational role.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Save Changes
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {contactFields.map((field) => (
              <div
                key={field.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {field.label}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Business Details
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Address and business document references used for compliance.
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Profile picture and documents supported
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {businessFields.map((field) => (
              <div
                key={field.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {field.label}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Validation Rules
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Name remains mandatory with at least 3 characters.</li>
            <li>Email must stay in a valid format for admin account recovery flows.</li>
            <li>Phone numbers should retain country code and be formatted for alert delivery.</li>
            <li>Profile images accept JPG or PNG and should stay under 2MB.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Confirmation and Audit
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Successful updates should show an immediate confirmation message.</li>
            <li>Security-sensitive changes must remain part of the audit trail.</li>
            <li>Future backend wiring should support versioned business-document replacement.</li>
          </ul>
        </div>
      </section>
    </AdminCoreShell>
  );
}
