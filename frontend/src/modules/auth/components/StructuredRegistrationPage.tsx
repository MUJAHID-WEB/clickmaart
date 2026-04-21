"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  clickMaartRequest,
  getClickMaartErrorMessage,
  hasClickMaartApiBaseUrl,
  setPendingIdentifier,
} from "@/lib/api/clickmaartBackend";
import AuthPageShell from "@/modules/auth/components/AuthPageShell";
import SecurityNotificationPreview from "@/modules/notification/components/SecurityNotificationPreview";
import type { IdentityRole } from "@/lib/auth/role-config";

type RegistrationFieldOption = {
  label: string;
  value: string;
};

type RegistrationField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "tel" | "textarea" | "select" | "file";
  placeholder?: string;
  required?: boolean;
  options?: RegistrationFieldOption[];
  accept?: string;
};

type StructuredRegistrationPageProps = {
  role: IdentityRole;
  title: string;
  description: string;
  fields: RegistrationField[];
  submitLabel: string;
  nextHref: string;
  signInHref: string;
};

const normalizeInput = (value?: string) => value?.trim() ?? "";

const buildRegistrationPayload = (
  role: IdentityRole,
  formData: Record<string, string>,
) => {
  if (role === "wholesaler") {
    return {
      role,
      name:
        normalizeInput(formData.contactPerson) ||
        normalizeInput(formData.businessName),
      email: normalizeInput(formData.email),
      phone: normalizeInput(formData.phone),
      password: formData.password,
      business_name:
        normalizeInput(formData.businessName) ||
        normalizeInput(formData.contactPerson),
      business_type: "wholesale",
      address: normalizeInput(formData.address),
    };
  }

  if (role === "retailer") {
    return {
      role,
      name: normalizeInput(formData.ownerName) || normalizeInput(formData.shopName),
      email: normalizeInput(formData.email),
      phone: normalizeInput(formData.phone),
      password: formData.password,
      business_name:
        normalizeInput(formData.shopName) || normalizeInput(formData.ownerName),
      business_type: normalizeInput(formData.shopType) || "other",
      address: normalizeInput(formData.address),
    };
  }

  return {
    role,
    name: normalizeInput(formData.fullName),
    email: normalizeInput(formData.email),
    phone: normalizeInput(formData.phone),
    password: formData.password,
  };
};

export default function StructuredRegistrationPage({
  role,
  title,
  description,
  fields,
  submitLabel,
  nextHref,
  signInHref,
}: StructuredRegistrationPageProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, ""])),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileFields = useMemo(
    () => fields.filter((field) => field.type === "file"),
    [fields],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    if (formData.password !== formData.confirmPassword) {
      setSubmitError("Password and confirm password must match.");
      return;
    }

    if (!hasClickMaartApiBaseUrl()) {
      console.log(`${role} registration submitted`, formData);
      router.push(nextHref);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = buildRegistrationPayload(role, formData);
      const response = await clickMaartRequest<{
        user: {
          email?: string | null;
          phone?: string | null;
        };
      }>({
        path: "/auth/register",
        method: "POST",
        body: payload,
      });

      setPendingIdentifier(
        response.user.email ?? response.user.phone ?? payload.email ?? payload.phone,
      );
      router.push(nextHref);
    } catch (error) {
      setSubmitError(getClickMaartErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <AuthPageShell
        title={title}
        description={description}
        footer={
          <div className="text-sm text-slate-600">
            Already registered?{" "}
            <Link
              href={signInHref}
              className="font-medium text-slate-900 hover:text-slate-700"
            >
              Sign in
            </Link>
          </div>
        }
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          {fields.map((field) => {
            if (field.type === "textarea") {
              return (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {field.label}
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    rows={4}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {field.label}
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option value="">Select one</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === "file") {
              return (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept={field.accept}
                    className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                  />
                </div>
              );
            }

            return (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
                />
              </div>
            );
          })}

          {fileFields.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Uploaded documents remain pending until OTP verification and admin
              approval are complete.
            </div>
          ) : null}

          {submitError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {submitError}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {isSubmitting ? "Submitting..." : submitLabel}
          </button>
        </form>
      </AuthPageShell>

      <div className="lg:pt-12">
        <SecurityNotificationPreview role={role} />
      </div>
    </div>
  );
}
