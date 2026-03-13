import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function GET() {
  try {
    const password = await bcrypt.hash("superadmin123", 12);
    
    const permissions = ["USERS", "VENDORS", "PRODUCTS", "FINANCE", "CMS", "MANAGEMENT"];
    
    const superAdmin = await prisma.user.upsert({
      where: { email: "superadmin1@buyfromafrica.com" },
      update: {
        role: UserRole.SUPER_ADMIN,
        permissions: permissions,
      },
      create: {
        email: "superadmin1@buyfromafrica.com",
        name: "Super Admin",
        password: password,
        role: UserRole.SUPER_ADMIN,
        permissions: permissions,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Super Admin initialized", 
      email: superAdmin.email 
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
      success: false, 
      error: message 
    }, { status: 500 });
  }
}
