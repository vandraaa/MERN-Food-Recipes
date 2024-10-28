import Ingredient from "../models/ingredients.js";
import Recipe from "../models/recipe.js";
import { isValidObjectId } from "../utils/utils.js";

// CREATE INGREDIENT
export const createIngredient = async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    if (!name || !quantity) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
        }

        const ingredient = await Ingredient.create({ name, quantity, recipe: recipe._id });
        
        recipe.ingredients.push(ingredient._id);
        await recipe.save();

        const data = { id: ingredient._id, name: ingredient.name, quantity: ingredient.quantity };
        
        res.status(201).json({ status: "success", data, message: "Ingredient created" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};

// EDIT INGREDIENT
export const editIngredient = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid ingredient ID" } });
    }

    if (!name || !quantity) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Ingredient not found" } });
        }

        const updateData = { name, quantity };

        await Ingredient.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ status: "success", data: updateData, message: "Ingredient updated" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// DELETE INGREDIENT
export const deleteIngredient = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid ingredient ID" } });
    }

    try {
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Ingredient not found" } });
        }

        const recipe = await Recipe.findById(ingredient.recipe);
        if (!recipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
        }

        const index = recipe.ingredients.indexOf(ingredient._id);
        if (index === -1) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Ingredient not found" } });
        }

        recipe.ingredients.splice(index, 1);
        await recipe.save();

        await Ingredient.findByIdAndDelete(id);

        res.status(200).json({ status: "success", message: "Ingredient deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// DELETE ALL INGREDIENTS BY RECIPE ID
export const deleteAllIngredientsByRecipeId = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
        }

        for (const ingredient of recipe.ingredients) {
            await Ingredient.findByIdAndDelete(ingredient._id);
        }

        await Recipe.findByIdAndUpdate(id, { ingredients: [] });

        res.status(200).json({ status: "success", message: "All ingredients deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}