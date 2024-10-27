import { isValidObjectId } from "../utils/utils.js";
import Recipe from "../models/recipe.js";
import { uploadPhoto, deletePhoto } from "../utils/utils.js";
import Ingredient from "../models/ingredients.js";
import Step from "../models/steps.js";
import Feedback from "../models/feedback.js";

// CREATE RECIPE
export const createRecipe = async (req, res) => {
    const { userId, title, description, servings, cookingTime, categoryId } = req.body;
    const file = req.file;

    if (!isValidObjectId(userId)) { 
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    if (!userId || !title || !description || !servings || !cookingTime || !categoryId) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    if (!file) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide an image" } });
    }

    try {
        const { fileName, imageUrl } = await uploadPhoto(file.buffer, file.originalname, file.mimetype);

        const newRecipe = new Recipe({
            user: userId,
            title,
            description,
            image: {
                fileName,
                imageUrl,
            },
            servings,
            cooking_time: cookingTime,
            category: categoryId
        });

        const savedRecipe = await newRecipe.save();

        res.status(201).json({ status: "success", data: savedRecipe, message: "Recipe created" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// GET RECIPE BY ID
export const getRecipeById = async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const recipe = await Recipe.findById(id).populate("user", "name email profile_picture").populate("category", "name");
        if (!recipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
        }

        res.status(200).json({ status: "success", data: recipe, message: "Recipe found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// GET RECIPE BY CATEGORY ID
export const getRecipeByCategoryId = async (req, res) => {
    const { categoryId } = req.query;

    if(!isValidObjectId(categoryId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid category ID" } });
    }

    try {
        const recipes = await Recipe.find({ category: categoryId });
        if (!recipes) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipes not found" } });
        }

        res.status(200).json({ status: "success", data: recipes, message: "Recipes found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// DELETE RECIPES
export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
        }

        const fileName = recipe.image?.fileName;

        if (fileName) {
            await deletePhoto(fileName);
        }

        await Step.deleteMany({ recipe: id });
        await Ingredient.deleteMany({ recipe: id });
        await Feedback.deleteMany({ recipe: id });
        await Recipe.findByIdAndDelete(id);
        
        res.status(200).json({ status: "success", message: "Recipe deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}