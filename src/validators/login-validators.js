import * as z from "zod";

export const loginSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({
        message: "Invalid email address"
    }),
    password: z.string({required_error: "Password is required"}).min(4, {
        message: "Password must be at least 4 characters long"
    }),
    fullName: z.string({required_error: "Full Name is required"}).min(4, {
        message: "Full Name must be at least 4 characters long"
    }),
})