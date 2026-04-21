"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  clickMaartRequest,
  getClickMaartErrorMessage,
  hasClickMaartApiBaseUrl,
} from "@/lib/api/clickmaartBackend";
import AuthPageShell from "@/modules/auth/components/AuthPageShell";
import SecurityNotificationPreview from "@/modules/notification/components/SecurityNotificationPreview";

const ROLE_OPTIONS = [
  { label: "Customer", value: "customer" },
  { label: "Admin", value: "admin" },
  { label: "Wholesaler", value: "wholesaler" },
  { label: "Retailer", value: "retailer" },
] as const;

export default function AuthForgotPasswordPage() {
  const router = useRouter();
  const [role, setRole] =
    useState<(typeof ROLE_OPTIONS)[number]["value"]>("customer");
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <AuthPageShell
        title="Forgot Password"
        description="Select the account type, enter email or mobile, and continue to the password reset flow."
        footer={
          <div className="text-sm text-slate-600">
            Back to{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-slate-900 hover:text-slate-700"
            >
              customer sign in
            </Link>
          </div>
        }
      >
        <form
          className="space-y-6"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitError(null);
            setStatusMessage(null);

            if (!hasClickMaartApiBaseUrl()) {
              console.log("Forgot password request", { role, identifier });
              router.push("/auth/signin");
              return;
            }

            setIsSubmitting(true);

            try {
              const response = await clickMaartRequest<{
                identifier: string;
                resetWindow: string;
              }>({
                path: "/auth/forgot-password",
                method: "POST",
                body: { identifier },
              });

              setStatusMessage(
                `Reset instructions were generated for ${response.identifier}. This demo keeps the recovery window open for ${response.resetWindow}.`,
              );
              setIdentifier("");
            } catch (error) {
              setSubmitError(getClickMaartErrorMessage(error));
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Account type
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as (typeof ROLE_OPTIONS)[number]["value"])
              }
              className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="identifier"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email or mobile
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              required
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="Enter your registered email or mobile"
              className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
            />
          </div>

          {statusMessage ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {statusMessage}
            </div>
          ) : null}

          {submitError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {submitError}
            </div>
          ) : null}

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            If the account is locked, this reset flow is also the primary unlock
            path. New-device alerts and reset delivery notifications are covered
            by the auth notification foundation.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {isSubmitting ? "Sending..." : "Send reset instructions"}
          </button>
        </form>
      </AuthPageShell>

      <div className="lg:pt-12">
        <SecurityNotificationPreview role={role} />
      </div>
    </div>
  );
}
