'use server'
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function saveUser(data) {
    try {
        const user = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
        // Check if the returned user array has any elements
        if (user.length > 0) {
            return {
                success: false,
                message: "User already exists"
            };
        }

        const newUser = await db.insert(users).values(data).returning();
        return {
            success: true,
            message: "User created successfully",
            data: newUser
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong"
        };
    }
}