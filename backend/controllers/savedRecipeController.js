import { isValidObjectId } from "../utils/utils.js";
import SavedRecipe from "../models/savedRecipe.js";

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

        res.status(201).json({ status: "success", data: saveRecipe, message: "recipe saved" })
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