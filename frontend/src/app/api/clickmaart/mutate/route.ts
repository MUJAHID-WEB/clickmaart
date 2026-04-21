import { NextRequest, NextResponse } from "next/server";

const resolveBackendBaseUrl = () =>
  (
    process.env.CLICKMAART_API_URL ??
    process.env.NEXT_PUBLIC_CLICKMAART_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL
  )?.replace(/\/+$/, "") ?? "";

const resolveToken = (role: string) => {
  if (role === "admin") {
    return process.env.CLICKMAART_ADMIN_API_TOKEN;
  }

  if (role === "wholesaler") {
    return (
      process.env.CLICKMAART_WHOLESALER_API_TOKEN ??
      process.env.CLICKMAART_ADMIN_API_TOKEN
    );
  }

  if (role === "retailer") {
    return (
      process.env.CLICKMAART_RETAILER_API_TOKEN ??
      process.env.CLICKMAART_ADMIN_API_TOKEN
    );
  }

  return null;
};

const isAllowedPath = (role: string, path: string) => {
  const normalizedPath = path.trim();

  if (!normalizedPath.startsWith("/")) {
    return false;
  }

  if (role === "admin") {
    return normalizedPath.startsWith("/admin/");
  }

  if (role === "wholesaler") {
    return normalizedPath.startsWith("/wholesaler/");
  }

  if (role === "retailer") {
    return normalizedPath.startsWith("/retailer/");
  }

  if (role === "public") {
    return normalizedPath === "/storefront/orders";
  }

  return false;
};

export async function POST(request: NextRequest) {
  const backendBaseUrl = resolveBackendBaseUrl();

  if (!backendBaseUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "ClickMaart API URL is not configured for frontend mutations.",
      },
      { status: 500 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get("role") ?? "";
  const method = searchParams.get("method") ?? "PATCH";
  const path = searchParams.get("path") ?? "";

  if (!["PATCH", "POST"].includes(method)) {
    return NextResponse.json(
      {
        success: false,
        message: "Only POST and PATCH mutations are supported.",
      },
      { status: 405 },
    );
  }

  if (!isAllowedPath(role, path)) {
    return NextResponse.json(
      {
        success: false,
        message: "This frontend mutation path is not allowed.",
      },
      { status: 400 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  const token = resolveToken(role);
  const requestHeaders = new Headers({
    Accept: "application/json",
  });

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  let body: BodyInit | undefined;

  if (contentType.includes("multipart/form-data")) {
    body = await request.formData();
  } else {
    const rawBody = await request.text();

    if (rawBody) {
      body = rawBody;
      requestHeaders.set("Content-Type", "application/json");
    }
  }

  const backendResponse = await fetch(`${backendBaseUrl}${path}`, {
    method,
    headers: requestHeaders,
    body,
    cache: "no-store",
  });

  const backendContentType = backendResponse.headers.get("content-type") ?? "application/json";
  const backendPayload = await backendResponse.text();

  return new NextResponse(backendPayload, {
    status: backendResponse.status,
    headers: {
      "content-type": backendContentType,
    },
  });
}
