import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"; 
import { db } from "@/db/drizzle"; 

export async function GET(req) {
  try {
    // Get URL search params
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ status: "unknown", message: "Email is required" }, { status: 400 });
    }

    // Query database
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      return NextResponse.json({ status: "unknown", message: "User not found" });
    }

    // Get last login activity
    const lastLogin = user[0].lastActivityDate;

    if (!lastLogin) {
      return NextResponse.json({ status: "unknown", message: "Last login not available" });
    }

    // Convert lastLogin to a Date object
    const lastLoginDate = new Date(lastLogin);
    if (isNaN(lastLoginDate)) {
      return NextResponse.json({ status: "unknown", message: "Invalid last login date" });
    }

    // Calculate 3 days ago
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    console.log("Last Login:", lastLoginDate.toISOString());
    console.log("Three Days Ago:", threeDaysAgo.toISOString());

    // Compare last login with the threshold
    const status = lastLoginDate > threeDaysAgo ? "active" : "non-active";

    return NextResponse.json({ status });
  } catch (error) {
    console.error("Error getting user state:", error);
    return NextResponse.json({ status: "unknown", error: "Internal server error" }, { status: 500 });
  }
}
