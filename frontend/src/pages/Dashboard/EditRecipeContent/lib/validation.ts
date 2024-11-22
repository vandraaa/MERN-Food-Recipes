import { z } from "zod";

export const editRecipeSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
  category: z.string().nonempty({ message: "Category is required" }),
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(3, { message: "Description must be at least 3 characters" }),
  servings: z
    .union([
      z.string().min(1, { message: "Servings must be at least 1" }),
      z.number().min(1, { message: "Servings must be at least 1" }),
    ])
    .refine((val) => val !== "", { message: "Servings is required" }),
  cooking_time: z
    .union([
      z.string().min(1, { message: "Cooking time must be at least 1" }),
      z.number().min(1, { message: "Cooking time must be at least 1" }),
    ])
    .refine((val) => val !== "", { message: "Cooking time is required" }),
});
