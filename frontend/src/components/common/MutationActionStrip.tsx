"use client";

import {
  clickMaartMutationRequest,
  getClickMaartErrorMessage,
} from "@/lib/api/clickmaartBackend";
import { useRouter } from "next/navigation";
import { useState } from "react";

type MutationPrimitive = string | number | boolean | null;

type MutationPrompt = {
  field: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  parseAs?: "string" | "number" | "integer";
};

export type MutationActionOption = {
  label: string;
  payload?: Record<string, MutationPrimitive>;
  prompt?: MutationPrompt;
  confirmMessage?: string;
  tone?: "primary" | "neutral" | "success" | "danger";
};

type MutationActionStripProps = {
  role: "admin" | "wholesaler" | "retailer" | "public";
  path: string;
  method?: "POST" | "PATCH";
  actions: MutationActionOption[];
  helperText?: string | null;
};

const toneClasses: Record<NonNullable<MutationActionOption["tone"]>, string> = {
  primary: "border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  neutral: "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  danger: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
};

const parsePromptValue = (
  value: string,
  parseAs: MutationPrompt["parseAs"] = "string",
) => {
  if (parseAs === "number") {
    return Number.parseFloat(value);
  }

  if (parseAs === "integer") {
    return Number.parseInt(value, 10);
  }

  return value;
};

export default function MutationActionStrip({
  role,
  path,
  method = "PATCH",
  actions,
  helperText,
}: MutationActionStripProps) {
  const router = useRouter();
  const [pendingLabel, setPendingLabel] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: MutationActionOption) => {
    if (action.confirmMessage && !window.confirm(action.confirmMessage)) {
      return;
    }

    const payload: Record<string, MutationPrimitive> = {
      ...(action.payload ?? {}),
    };

    if (action.prompt) {
      const rawValue = window.prompt(
        action.prompt.label,
        action.prompt.defaultValue ?? "",
      );

      if (rawValue === null) {
        return;
      }

      const trimmedValue = rawValue.trim();

      if (action.prompt.required && trimmedValue.length === 0) {
        setError(`${action.label} needs a value before it can continue.`);
        return;
      }

      if (trimmedValue.length > 0) {
        payload[action.prompt.field] = parsePromptValue(
          trimmedValue,
          action.prompt.parseAs,
        );
      }
    }

    setPendingLabel(action.label);
    setFeedback(null);
    setError(null);

    try {
      await clickMaartMutationRequest({
        role,
        path,
        method,
        body: payload,
      });

      setFeedback(`${action.label} completed.`);
      router.refresh();
    } catch (mutationError) {
      setError(getClickMaartErrorMessage(mutationError));
    } finally {
      setPendingLabel(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => {
          const isPending = pendingLabel === action.label;

          return (
            <button
              key={action.label}
              type="button"
              onClick={() => handleAction(action)}
              disabled={pendingLabel !== null}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                toneClasses[action.tone ?? "neutral"]
              } ${isPending ? "opacity-60" : ""}`}
            >
              {isPending ? "Working..." : action.label}
            </button>
          );
        })}
      </div>
      {helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
      {feedback ? <p className="text-xs text-emerald-700">{feedback}</p> : null}
      {error ? <p className="text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}
