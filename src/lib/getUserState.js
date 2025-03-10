'use server'
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserState = async (email) => {
    try {
        const user = await db.select().from(users).where(eq(users.email, email));

        if (user.length === 0) {
            return "unknown";
        }

        const lastLogin = user[0].lastActivityDate;
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

        if (lastLogin && lastLogin > twoDaysAgo) {
            return "active";
        } else {
            return "non-active";
        }
    } catch (error) {
        console.error("Error getting user state:", error);
        return "unknown";
    }
};