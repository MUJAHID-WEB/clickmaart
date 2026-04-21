import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  annotateTenantResponse,
  applyTenantHeaders,
  DEFAULT_LOCALE,
  resolveTenantContext,
} from "./src/lib/tenant/resolveTenantContext";

const PUBLIC_FILE_PATTERN = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_FILE_PATTERN.test(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const tenantContext = resolveTenantContext(request);
  const requestHeaders = new Headers(request.headers);

  applyTenantHeaders(requestHeaders, tenantContext);

  if (!tenantContext.hasLocalePrefix) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname =
      pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;

    const response = NextResponse.redirect(newUrl);
    annotateTenantResponse(response, tenantContext);
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  annotateTenantResponse(response, tenantContext);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
