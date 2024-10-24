import mongoose from "mongoose";
import Recipe from "../models/recipe.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE RECIPE
export const createRecipe = async () => {
    const { userId, title, description, imageUrl, servings, cookingTime, categoryId } = req.body;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    try {

    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: "Server error" } });
    }
}