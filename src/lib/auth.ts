import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@buyfromafrica.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Auth attempt for:", credentials?.email);
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { vendor: { select: { id: true } } }
          });

          if (!user) {
            console.log("User not found in DB:", credentials.email);
            return null;
          }

          if (!user.password) {
            console.log("User has no password in DB:", credentials.email);
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password comparison result:", isValid);

          if (!isValid) {
            return null;
          }

          console.log("Login successful for:", user.email, "Role:", user.role);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as UserRole,
            permissions: user.permissions as string[],
            vendorId: user.vendor?.id
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permissions = user.permissions;
        token.vendorId = user.vendorId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role;
        session.user.permissions = token.permissions;
        session.user.vendorId = token.vendorId;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};
