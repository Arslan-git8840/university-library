"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateLastActivity(email) {
  if (!email) {
    return { success: false, message: "Email is required" };
  }

  try {
    // Check if user exists
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      return { success: false, message: "User not found" };
    }

    // Update lastActivityDate
    await db
      .update(users)
      .set({ lastActivityDate: new Date() })
      .where(eq(users.email, email));

    return { success: true, message: "Last activity date updated successfully" };
  } catch (error) {
    console.error("Error updating last activity date:", error);
    return { success: false, message: "Internal server error" };
  }
}
