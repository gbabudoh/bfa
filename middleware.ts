import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isLoginPage = req.nextUrl.pathname.startsWith("/admin/login") || req.nextUrl.pathname.startsWith("/login");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/vendor/dashboard");
    const isSuperAdminOnly = req.nextUrl.pathname.startsWith("/admin/management");

    if (isLoginPage) {
      if (isAuth) {
        const userRole = token.role as string;
        if (isAdminRoute) {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
        if (userRole === "VENDOR") {
          return NextResponse.redirect(new URL("/vendor/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if ((isAdminRoute || isDashboardRoute) && !isAuth) {
      const loginUrl = isAdminRoute ? "/admin/login" : "/login";
      return NextResponse.redirect(new URL(loginUrl, req.url));
    }

    // Role-based constraints
    if (isAuth && token) {
      const userRole = token.role as string;

      if (isAdminRoute && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (isSuperAdminOnly && userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      
      // Ensure vendor goes to vendor dashboard and vice versa
      if (req.nextUrl.pathname.startsWith("/dashboard") && userRole === "VENDOR") {
        return NextResponse.redirect(new URL("/vendor/dashboard", req.url));
      }
      if (req.nextUrl.pathname.startsWith("/vendor/dashboard") && userRole !== "VENDOR") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
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
  matcher: ["/admin/:path*", "/dashboard/:path*", "/vendor/dashboard/:path*", "/login"],
};
