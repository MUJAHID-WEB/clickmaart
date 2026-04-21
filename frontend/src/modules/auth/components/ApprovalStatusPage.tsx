import Link from "next/link";
import AuthPageShell from "@/modules/auth/components/AuthPageShell";

type ApprovalStatusPageProps = {
  roleLabel: string;
  loginHref: string;
  supportHref?: string;
};

export default function ApprovalStatusPage({
  roleLabel,
  loginHref,
  supportHref = "/contact",
}: ApprovalStatusPageProps) {
  return (
    <AuthPageShell
      title={`${roleLabel} Approval Status`}
      description={`Your ${roleLabel.toLowerCase()} account is now verified by OTP and waiting for admin review.`}
      footer={
        <div className="text-sm text-slate-600">
          Need help with documents or approval notes?{" "}
          <Link
            href={supportHref}
            className="font-medium text-slate-900 hover:text-slate-700"
          >
            Contact support
          </Link>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Status: Pending admin approval
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            OTP verification completed successfully.
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            Business documents are queued for compliance review.
          </li>
          <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            Approval or rejection updates will be delivered by email, SMS, and
            in-app notification.
          </li>
        </ul>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link
            href={loginHref}
            className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue to login
          </Link>
          <Link
            href="/migration-status"
            className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View migration status
          </Link>
        </div>
      </div>
    </AuthPageShell>
  );
}
