import { IDENTITY_ROLE_CONFIG, type IdentityRole } from "@/lib/auth/role-config";

type SecurityNotificationPreviewProps = {
  role: IdentityRole;
};

const SECURITY_EVENTS = [
  {
    title: "Failed login attempt",
    detail: "Users see how many attempts remain before temporary lock.",
  },
  {
    title: "Account locked",
    detail: "After 3 failed attempts a reset path and lock notice are triggered.",
  },
  {
    title: "New device login",
    detail: "Suspicious sign-in events can notify users with device and location context.",
  },
  {
    title: "Password reset link sent",
    detail: "Reset flow confirms the delivery channel and protects against silent failures.",
  },
];

export default function SecurityNotificationPreview({
  role,
}: SecurityNotificationPreviewProps) {
  const roleLabel = IDENTITY_ROLE_CONFIG[role].label;

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Security Automation
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">
          {roleLabel} auth notifications
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          This foundation covers lock alerts, password reset notices, login
          success tracking, and new device detection hooks for later backend
          event integration.
        </p>
      </div>

      <ul className="space-y-3">
        {SECURITY_EVENTS.map((event) => (
          <li
            key={event.title}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
          >
            <p className="text-sm font-semibold text-slate-900">{event.title}</p>
            <p className="mt-1 text-sm text-slate-600">{event.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
