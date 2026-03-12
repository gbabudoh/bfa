import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname;

    const isLoginPage    = pathname.startsWith("/admin/login") || pathname.startsWith("/login");
    const isAdminRoute   = pathname.startsWith("/admin");
    const isVendorRoute  = pathname.startsWith("/vendor/dashboard");
    const isBuyerRoute   = pathname.startsWith("/buyer/dashboard");
    const isDashboardRoute = pathname.startsWith("/dashboard") || isVendorRoute || isBuyerRoute;
    const isSuperAdminOnly = pathname.startsWith("/admin/management");

    // ── Redirect already-authenticated users away from login pages ──
    if (isLoginPage) {
      if (isAuth) {
        const userRole = token.role as string;
        if (userRole === "BUYER")  return NextResponse.redirect(new URL("/buyer/dashboard", req.url));
        if (isAdminRoute) return NextResponse.redirect(new URL("/admin", req.url));
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // ── Require auth for all protected routes ──
    if ((isAdminRoute || isDashboardRoute) && !isAuth) {
      const loginUrl = isAdminRoute ? "/admin/login" : "/login";
      return NextResponse.redirect(new URL(loginUrl, req.url));
    }

    // ── Role-based routing ──
    if (isAuth && token) {
      const userRole = token.role as string;

      // Admin checks
      if (isAdminRoute && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (isSuperAdminOnly && userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      // Vendor routing
      if (isVendorRoute && userRole !== "VENDOR") {
        return NextResponse.redirect(new URL(userRole === "BUYER" ? "/buyer/dashboard" : "/dashboard", req.url));
      }
      if (pathname.startsWith("/dashboard") && userRole === "VENDOR") {
        return NextResponse.redirect(new URL("/vendor/dashboard", req.url));
      }

      // Buyer routing
      if (isBuyerRoute && userRole !== "BUYER") {
        return NextResponse.redirect(new URL(userRole === "VENDOR" ? "/vendor/dashboard" : "/dashboard", req.url));
      }
      if (pathname.startsWith("/dashboard") && userRole === "BUYER") {
        return NextResponse.redirect(new URL("/buyer/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/vendor/dashboard/:path*",
    "/buyer/dashboard/:path*",
    "/login",
  ],
};
