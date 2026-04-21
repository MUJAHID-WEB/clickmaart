import type { IdentityRole } from "@/lib/auth/role-config";

const SESSION_STORAGE_KEY = "clickmaart.session";
const PENDING_IDENTIFIER_STORAGE_KEY = "clickmaart.pendingIdentifier";

export type ClickMaartSessionUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: IdentityRole;
  businessName?: string | null;
  status?: string | null;
  isApproved?: boolean;
};

export type ClickMaartSession = {
  token: string;
  user: ClickMaartSessionUser;
  approvalStatus?: string | null;
  persistedAt: string;
};

type ClickMaartApiEnvelope<T> = {
  success: boolean;
  message?: string | null;
  data?: T;
  errors?: Record<string, string[]>;
};

type ClickMaartRequestOptions = {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
  headers?: HeadersInit;
  cache?: RequestCache;
};

type ClickMaartMutationRole = "admin" | "wholesaler" | "retailer" | "public";

type ClickMaartMutationOptions = {
  role: ClickMaartMutationRole;
  path: string;
  method?: "POST" | "PATCH";
  body?: unknown;
  headers?: HeadersInit;
};

export class ClickMaartApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ClickMaartApiError";
    this.status = status;
    this.errors = errors;
  }
}

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const asValidationErrors = (value: unknown) => {
  if (!isRecord(value)) {
    return undefined;
  }

  const entries = Object.entries(value).filter((entry): entry is [string, string[]] => {
    const [, messages] = entry;
    return Array.isArray(messages) && messages.every((message) => typeof message === "string");
  });

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};

export const getClickMaartApiBaseUrl = () => {
  const configuredUrl =
    typeof window === "undefined"
      ? process.env.CLICKMAART_API_URL ??
        process.env.NEXT_PUBLIC_CLICKMAART_API_URL ??
        process.env.NEXT_PUBLIC_API_BASE_URL
      : process.env.NEXT_PUBLIC_CLICKMAART_API_URL ??
        process.env.NEXT_PUBLIC_API_BASE_URL;

  return (configuredUrl ?? "").replace(/\/+$/, "");
};

export const hasClickMaartApiBaseUrl = () =>
  getClickMaartApiBaseUrl().length > 0;

export async function clickMaartRequest<T>({
  path,
  method = "GET",
  body,
  token,
  headers,
  cache = "no-store",
}: ClickMaartRequestOptions): Promise<T> {
  const baseUrl = getClickMaartApiBaseUrl();

  if (!baseUrl) {
    throw new ClickMaartApiError(
      "ClickMaart API URL is not configured.",
      500,
    );
  }

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    cache,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload =
    contentType.includes("application/json")
      ? ((await response.json()) as
          | ClickMaartApiEnvelope<T>
          | { message?: string; errors?: Record<string, string[]> })
      : null;

  if (!response.ok) {
    const message =
      payload && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}.`;

    throw new ClickMaartApiError(
      message,
      response.status,
      asValidationErrors(payload && "errors" in payload ? payload.errors : undefined),
    );
  }

  if (payload && "success" in payload) {
    if (!payload.success) {
      throw new ClickMaartApiError(
        payload.message ?? "Request failed.",
        response.status,
        payload.errors,
      );
    }

    return payload.data as T;
  }

  return payload as T;
}

export async function clickMaartMutationRequest<T>({
  role,
  path,
  method = "PATCH",
  body,
  headers,
}: ClickMaartMutationOptions): Promise<T> {
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;
  const searchParams = new URLSearchParams({
    role,
    path,
    method,
  });

  const response = await fetch(`/api/clickmaart/mutate?${searchParams.toString()}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload =
    contentType.includes("application/json")
      ? ((await response.json()) as
          | ClickMaartApiEnvelope<T>
          | { message?: string; errors?: Record<string, string[]> })
      : null;

  if (!response.ok) {
    const message =
      payload && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : `Request failed with status ${response.status}.`;

    throw new ClickMaartApiError(
      message,
      response.status,
      asValidationErrors(payload && "errors" in payload ? payload.errors : undefined),
    );
  }

  if (payload && "success" in payload) {
    if (!payload.success) {
      throw new ClickMaartApiError(
        payload.message ?? "Request failed.",
        response.status,
        payload.errors,
      );
    }

    return payload.data as T;
  }

  return payload as T;
}

export const getClickMaartErrorMessage = (error: unknown) => {
  if (error instanceof ClickMaartApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong while contacting the ClickMaart backend.";
};

export const persistClickMaartSession = (session: ClickMaartSession) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const getStoredClickMaartSession = () => {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as ClickMaartSession;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.token !== "string" ||
      !parsed.user
    ) {
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Unable to parse persisted ClickMaart session.", error);
    return null;
  }
};

export const getStoredClickMaartToken = (allowedRoles?: IdentityRole[]) => {
  const session = getStoredClickMaartSession();

  if (!session) {
    return null;
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(session.user.role)
  ) {
    return null;
  }

  return session.token;
};

export const clearClickMaartSession = () => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
};

export const setPendingIdentifier = (identifier: string) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(PENDING_IDENTIFIER_STORAGE_KEY, identifier);
};

export const getPendingIdentifier = () => {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(PENDING_IDENTIFIER_STORAGE_KEY);
};

export const clearPendingIdentifier = () => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(PENDING_IDENTIFIER_STORAGE_KEY);
};
