import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    return NextResponse.json(vendor);
  } catch (error) {
    console.error("Error fetching vendor settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Whitelist fields to update
    const {
      storeName,
      description,
      longDescription,
      logo,
      banner,
      location,
      businessType,
      badgeType,
      regNumber,
      categories,
      shippingCountries,
      paymentOptions,
      contactEmail,
      contactPhone,
      website,
      address,
      businessHours,
      certifications,
      productionCapacity,
      minOrderWholesale,
      minOrderRetail
    } = body;

    const vendor = await prisma.vendor.update({
      where: { userId: session.user.id },
      data: {
        ...(storeName && { storeName }),
        ...(description !== undefined && { description }),
        ...(longDescription !== undefined && { longDescription }),
        ...(logo !== undefined && { logo }),
        ...(banner !== undefined && { banner }),
        ...(location !== undefined && { location }),
        ...(businessType !== undefined && { businessType }),
        ...(badgeType !== undefined && { badgeType }),
        ...(regNumber !== undefined && { regNumber }),
        ...(categories !== undefined && { categories }),
        ...(shippingCountries !== undefined && { shippingCountries }),
        ...(paymentOptions !== undefined && { paymentOptions }),
        ...(contactEmail !== undefined && { contactEmail }),
        ...(contactPhone !== undefined && { contactPhone }),
        ...(website !== undefined && { website }),
        ...(address !== undefined && { address }),
        ...(businessHours !== undefined && { businessHours }),
        ...(certifications !== undefined && { certifications }),
        ...(productionCapacity !== undefined && { productionCapacity }),
        ...(minOrderWholesale !== undefined && { minOrderWholesale }),
        ...(minOrderRetail !== undefined && { minOrderRetail }),
      },
    });

    return NextResponse.json(vendor);
  } catch (error) {
    console.error("Error updating vendor settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
