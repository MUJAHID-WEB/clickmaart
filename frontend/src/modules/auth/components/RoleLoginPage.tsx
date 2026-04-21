"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import type { IdentityRole } from "@/lib/auth/role-config";
import { IDENTITY_ROLE_CONFIG } from "@/lib/auth/role-config";
import {
  clearPendingIdentifier,
  clickMaartRequest,
  getClickMaartErrorMessage,
  hasClickMaartApiBaseUrl,
  persistClickMaartSession,
  type ClickMaartSessionUser,
} from "@/lib/api/clickmaartBackend";
import AuthPageShell from "@/modules/auth/components/AuthPageShell";
import SecurityNotificationPreview from "@/modules/notification/components/SecurityNotificationPreview";

type RoleLoginPageProps = {
  role: IdentityRole;
  forgotPasswordHref?: string;
  registerHref?: string;
  registerLabel?: string;
};

export default function RoleLoginPage({
  role,
  forgotPasswordHref = "/auth/forgot-password",
  registerHref,
  registerLabel = "Create account",
}: RoleLoginPageProps) {
  const router = useRouter();
  const config = IDENTITY_ROLE_CONFIG[role];
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    identifier: Yup.string().required("Identifier is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const resolveDestination = (approvalStatus?: string | null) => {
    if (
      (role === "wholesaler" || role === "retailer") &&
      approvalStatus &&
      approvalStatus !== "approved"
    ) {
      return `/${role}/approval-status`;
    }

    return config.postLoginRoute;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <AuthPageShell
        title={config.loginTitle}
        description={config.loginDescription}
        footer={
          registerHref ? (
            <div className="text-sm text-slate-600">
              Need a {config.label.toLowerCase()} account?{" "}
              <Link
                href={registerHref}
                className="font-medium text-slate-900 hover:text-slate-700"
              >
                {registerLabel}
              </Link>
            </div>
          ) : null
        }
      >
        <Formik
          initialValues={{ identifier: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setSubmitError(null);

            if (!hasClickMaartApiBaseUrl()) {
              console.log(`Signing in as ${role}:`, values);
              router.push(config.postLoginRoute);
              return;
            }

            try {
              const response = await clickMaartRequest<{
                token: string;
                user: ClickMaartSessionUser;
                approvalStatus?: string | null;
              }>({
                path: "/auth/login",
                method: "POST",
                body: {
                  ...values,
                  role,
                },
              });

              persistClickMaartSession({
                token: response.token,
                user: response.user,
                approvalStatus: response.approvalStatus ?? response.user.status,
                persistedAt: new Date().toISOString(),
              });
              clearPendingIdentifier();
              router.push(
                resolveDestination(
                  response.approvalStatus ?? response.user.status ?? null,
                ),
              );
            } catch (error) {
              setSubmitError(getClickMaartErrorMessage(error));
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="identifier"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {config.identifierLabel}
                  </label>
                  <Field
                    id="identifier"
                    name="identifier"
                    type="text"
                    className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
                    placeholder={config.identifierPlaceholder}
                  />
                  <ErrorMessage
                    name="identifier"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
                    placeholder="Minimum 8 characters"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>

              {submitError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {submitError}
                </div>
              ) : null}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-700">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="ml-2">Remember me</span>
                </label>

                <Link
                  href={forgotPasswordHref}
                  className="font-medium text-slate-900 hover:text-slate-700"
                >
                  {config.forgotPasswordLabel}
                </Link>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  Sign in as {config.label}
                </button>
                <button
                  type="button"
                  onClick={() => router.push(config.postLoginRoute)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  {config.oauthLabel}
                </button>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                3 failed attempts trigger a temporary account lock and reset-link
                workflow. New device sign-ins are tracked for later notification
                automation.
              </div>
            </Form>
          )}
        </Formik>
      </AuthPageShell>

      <div className="lg:pt-12">
        <SecurityNotificationPreview role={role} />
      </div>
    </div>
  );
}
