"use client";

import {
  clickMaartMutationRequest,
  getClickMaartErrorMessage,
} from "@/lib/api/clickmaartBackend";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProfileField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "file";
  placeholder?: string;
  accept?: string;
};

type ProfileManagementPageProps = {
  roleLabel: string;
  intro: string;
  personalFields: ProfileField[];
  businessFields: ProfileField[];
  initialValues?: Record<string, string>;
  saveSuccessMessage?: string;
  mutationRole?: "wholesaler" | "retailer";
  submitPath?: string;
  fieldMap?: Record<string, string>;
};

const buildInitialFormData = (
  personalFields: ProfileField[],
  businessFields: ProfileField[],
  initialValues?: Record<string, string>,
) => {
  const allFields = [...personalFields, ...businessFields];

  return Object.fromEntries(
    allFields.map((field) => [field.name, initialValues?.[field.name] ?? ""]),
  );
};

export default function ProfileManagementPage({
  roleLabel,
  intro,
  personalFields,
  businessFields,
  initialValues,
  saveSuccessMessage,
  mutationRole,
  submitPath,
  fieldMap,
}: ProfileManagementPageProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    return buildInitialFormData(personalFields, businessFields, initialValues);
  });
  const [fileData, setFileData] = useState<Record<string, File | null>>({});
  const allFields = [...personalFields, ...businessFields];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSaved(false);
    setSubmitError(null);
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    setSaved(false);
    setSubmitError(null);
    setFileData((current) => ({
      ...current,
      [name]: files?.[0] ?? null,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!mutationRole || !submitPath || !fieldMap) {
      console.log(`${roleLabel} profile updated`, formData);
      setSaved(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();

      allFields.forEach((field) => {
        const mappedField = fieldMap[field.name];

        if (!mappedField) {
          return;
        }

        if (field.type === "file") {
          const file = fileData[field.name];

          if (file) {
            payload.append(mappedField, file);
          }

          return;
        }

        const value = formData[field.name]?.trim();

        if (value) {
          payload.append(mappedField, value);
        }
      });

      await clickMaartMutationRequest({
        role: mutationRole,
        path: submitPath,
        method: "PATCH",
        body: payload,
      });

      setSaved(true);
      router.refresh();
    } catch (error) {
      setSubmitError(getClickMaartErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: ProfileField) => {
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
            onChange={handleFileChange}
            className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600"
          />
          {fileData[field.name] ? (
            <p className="mt-2 text-xs text-slate-500">
              Selected: {fileData[field.name]?.name}
            </p>
          ) : initialValues?.[field.name] ? (
            <p className="mt-2 text-xs text-slate-500">
              Current file: {initialValues[field.name]}
            </p>
          ) : null}
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
          type={field.type ?? "text"}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none"
        />
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {roleLabel} Profile
          </span>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Profile Management
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">{intro}</p>
        </section>

        {saved ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            {saveSuccessMessage ??
              "Profile changes were saved successfully."}
          </div>
        ) : null}
        {submitError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        ) : null}

        <form className="grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Personal Details
            </h2>
            <div className="mt-6 space-y-4">{personalFields.map(renderField)}</div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Business Details
            </h2>
            <div className="mt-6 space-y-4">{businessFields.map(renderField)}</div>
          </section>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
