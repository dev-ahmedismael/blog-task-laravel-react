import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthenticated(request: NextRequest): boolean {
  return Boolean(request.cookies.get("access_token")?.value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const PUBLIC_FILE = /\.(.*)$/;
  const STATIC_PATHS = [
    "/manifest.json",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];
  const STATIC_PREFIXES = [
    "/images/",
    "/fonts/",
    "/css/",
    "/js/",
    "/_next/",
    "/public/",
  ];

  if (
    STATIC_PATHS.includes(pathname) ||
    (PUBLIC_FILE.test(pathname) &&
      STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)))
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
