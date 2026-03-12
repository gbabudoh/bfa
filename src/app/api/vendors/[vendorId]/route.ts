import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { vendorId: string } }
) {
  try {
    const { vendorId } = params;

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: {
        products: {
          take: 12,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    return NextResponse.json(vendor);
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return NextResponse.json({ error: "Failed to fetch vendor" }, { status: 500 });
  }
}
