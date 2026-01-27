import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isLoginPage = req.nextUrl.pathname.startsWith("/admin/login");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isSuperAdminOnly = req.nextUrl.pathname.startsWith("/admin/management");

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    if (isAdminRoute && !isAuth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
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
  matcher: ["/admin/:path*"],
};
