import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      permissions: string[];
      vendorId?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: UserRole;
    permissions: string[];
    vendorId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    permissions: string[];
    vendorId?: string;
  }
}
