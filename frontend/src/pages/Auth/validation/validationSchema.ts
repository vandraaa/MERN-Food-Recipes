import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).nonempty({ message: "Email is required" }),
    password: z.string().nonempty({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
})

export const signUpSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email" }).nonempty({ message: "Email is required" }),
    password: z.string().nonempty({ message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
})