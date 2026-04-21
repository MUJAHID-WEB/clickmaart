"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  clearPendingIdentifier,
  clickMaartRequest,
  getClickMaartErrorMessage,
  getPendingIdentifier,
  hasClickMaartApiBaseUrl,
} from "@/lib/api/clickmaartBackend";
import AuthPageShell from "@/modules/auth/components/AuthPageShell";

type OtpVerificationPageProps = {
  title: string;
  description: string;
  nextHref: string;
  nextLabel: string;
  backHref?: string;
};

export default function OtpVerificationPage({
  title,
  description,
  nextHref,
  nextLabel,
  backHref = "/auth/signin",
}: OtpVerificationPageProps) {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const handleResendOtp = async () => {
    setSubmitError(null);
    setStatusMessage(null);

    if (!hasClickMaartApiBaseUrl()) {
      setStatusMessage("OTP resend is simulated while the backend is not configured.");
      return;
    }

    const identifier = getPendingIdentifier();

    if (!identifier) {
      setSubmitError("Registration context is missing. Start again from the registration form.");
      return;
    }

    setIsResending(true);

    try {
      const response = await clickMaartRequest<{
        identifier: string;
        otpHint?: string;
      }>({
        path: "/auth/resend-otp",
        method: "POST",
        body: { identifier },
      });

      setStatusMessage(
        response.otpHint ?? `A fresh OTP was sent for ${response.identifier}.`,
      );
    } catch (error) {
      setSubmitError(getClickMaartErrorMessage(error));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthPageShell
      title={title}
      description={description}
      footer={
        <div className="space-y-3 text-sm text-slate-600">
          <p>Did not receive the code? You can resend a fresh OTP.</p>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="rounded-full border border-slate-300 px-4 py-2 font-medium text-slate-900 transition hover:bg-slate-100"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      }
    >
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setSubmitError(null);
          setStatusMessage(null);

          if (!hasClickMaartApiBaseUrl()) {
            console.log("Verifying OTP:", values);
            router.push(nextHref);
            return;
          }

          const identifier = getPendingIdentifier();

          if (!identifier) {
            setSubmitError(
              "Registration context is missing. Start again from the registration form.",
            );
            return;
          }

          try {
            await clickMaartRequest({
              path: "/auth/verify-otp",
              method: "POST",
              body: {
                identifier,
                otp: values.otp,
              },
            });

            clearPendingIdentifier();
            router.push(nextHref);
          } catch (error) {
            setSubmitError(getClickMaartErrorMessage(error));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
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

            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Enter 6-digit OTP
              </label>
              <Field
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-lg tracking-[0.4em] text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
                placeholder="123456"
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {nextLabel}
            </button>

            <div className="text-center text-sm text-slate-600">
              <Link
                href={backHref}
                className="font-medium text-slate-900 hover:text-slate-700"
              >
                Go back
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthPageShell>
  );
}
