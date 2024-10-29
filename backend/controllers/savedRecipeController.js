import { isValidObjectId } from "../utils/utils.js";
import SavedRecipe from "../models/savedRecipe.js";
import Recipe from "../models/recipe.js";

// SAVE RECIPE
export const saveRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    try {
        const existingSavedRecipe = await SavedRecipe.findOne({ user: userId, recipe: recipeId });
        if (existingSavedRecipe) {
            return res.status(400).json({ status: "error", error: { code: 400, message: "Recipe already saved" } })
        }

        const saveRecipe = new SavedRecipe({ user: userId, recipe: recipeId });
        await saveRecipe.save();

        res.status(201).json({ status: "success", message: "recipe saved" })
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// UNSAVE RECIPE
export const unsaveRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    } 

    try {
        const deleteSaveRecipe = await SavedRecipe.findOneAndDelete({ user: userId, recipe: recipeId });
        if (!deleteSaveRecipe) {
            return res.status(400).json({ status: "error", error: { code: 400, message: "Saved recipe not found" } });
        }

        res.status(200).json({ status: "success", message: "recipe unsaved" })
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// GET ALL SAVE RECIPE BY USER ID
export const getSavedRecipeByUserId = async (req, res) => {
    const userId = req.user.id;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    try {
        const savedRecipe = await SavedRecipe.find({ user: userId });
        if (!savedRecipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Saved recipe not found" } });
        }

        const listRecipe = savedRecipe.map((recipe) => recipe.recipe)

        const recipe = await Recipe.find({ _id: { $in: listRecipe } })
            .populate("user", "name image")
            .populate("category", "name")

        const data = recipe.map((r) => {
            return {
                id: r._id,
                user: r.user,
                title: r.title,
                description: r.description,
                image: r.image,
                servings: r.servings,
                cooking_time: r.cooking_time,
                category: r.category
            }
        })

        res.status(200).json({ status: "success", data, message: "Saved recipe found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}