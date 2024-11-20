import { z } from "zod";

const fileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size > 0, { message: "File is required" })
  .refine((file) => file.size <= 5 * 1024 * 1024, { message: "File size must be less than 5MB" })
  .refine(
    (file) => ["image/jpeg", "image/png"].includes(file.type),
    { message: "File must be a JPEG or PNG" }
  );

export const createRecipeSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
  categoryId: z.string().nonempty({ message: "Category is required" }),
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(3, { message: "Description must be at least 3 characters" }),
  servings: z
    .string()
    .nonempty({ message: "Servings is required" })
    .min(1, { message: "Servings must be at least 1" }),
  cookingTime: z
    .string()
    .nonempty({ message: "Cooking Time is required" })
    .min(1, { message: "Cooking time must be at least 1" }),
  image: fileSchema,
});
