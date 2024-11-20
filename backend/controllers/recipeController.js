import { isValidObjectId } from "../utils/utils.js";
import Recipe from "../models/recipe.js";
import { uploadPhoto, deletePhoto } from "../utils/utils.js";
import Ingredient from "../models/ingredients.js";
import Step from "../models/steps.js";
import Feedback from "../models/feedback.js";
import User from "../models/user.js";

// CREATE RECIPE
export const createRecipe = async (req, res) => {
    const { title, description, servings, cookingTime, categoryId } = req.body;
    const userId = req.user.id;
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
            categoryId
        });

        const savedRecipe = await newRecipe.save();

        const data = {
            id: savedRecipe._id,
            userId: savedRecipe.user,
            title: savedRecipe.title,
            description: savedRecipe.description,
            image: savedRecipe.image,
            servings: savedRecipe.servings,
            cooking_time: savedRecipe.cooking_time,
            category: savedRecipe.category
        }

        res.status(201).json({ status: "success", data, message: "Recipe created" });
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
        const recipe = await Recipe.findOne({ _id: id })
                                .populate("user", "name email profile_picture")
                                .populate("category", "name")
                                .populate("ingredients", "name quantity")
                                .populate("steps", "step_number instruction")

        if (!recipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
        }

        const data = {
            id: recipe._id,
            user: recipe.user,
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            servings: recipe.servings,
            cooking_time: recipe.cooking_time,
            category: recipe.category,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
        }

        res.status(200).json({ status: "success", data, message: "Recipe found" });
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
        const recipes = await Recipe.find({ category: categoryId, status: 'approved' }).limit(5).populate("user", "name image").populate("category", "name");
        if (!recipes) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipes not found" } });
        }

        const data = recipes.map((recipe) => ({
            id: recipe._id,
            user: recipe.user,
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            servings: recipe.servings,
            cooking_time: recipe.cooking_time,
            category: recipe.category
        }));

        res.status(200).json({ status: "success", data, message: "Recipes found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// SEARCH RECIPES BY TITLE QUERY
export const searchRecipesByTitle = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Title query parameter is required" }});
    }

    try {
        const recipes = await Recipe.find({ title: { $regex: q, $options: 'i' }, status: 'approved' })
                                        .limit(5)
                                        .populate("user", "name image")
                                        .populate("category", "name");

        if (recipes.length === 0) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "No recipes found" } });
        }

        const data = recipes.map((recipe) => ({
            id: recipe._id,
            user: recipe.user,
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            servings: recipe.servings,
            cooking_time: recipe.cooking_time,
            category: recipe.category
        }));

        res.status(200).json({ status: "success", data, message: "Recipes found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message }});
    }
}

// EDIT RECIPE
export const editRecipe = async (req, res) => {
    const { id } = req.params;
    const { title, description, servings, cookingTime, categoryId } = req.body;
    const file = req.file;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    if (!title || !description || !servings || !cookingTime || !categoryId) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
        }

        let updateData = { title, description, servings, cooking_time: cookingTime, category: categoryId };

        if (file) {
            const oldImage = await Recipe.findById(id).select("image");
            if (oldImage.image) {
                await deletePhoto(oldImage.image.fileName);
            }

            const { fileName, imageUrl } = await uploadPhoto(file.buffer, file.originalname, file.mimetype);

            updateData.image = {
                fileName,
                imageUrl
            }
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ status: "success", data: updatedRecipe, message: "Recipe updated" });
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

// UPDATE RECIPE STATUS
export const updateRecipeStatus = async (req, res) => {
    const id = req.user.id;
    const { recipeId, status } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const isAdmin = await User.findOne({ _id: id });
        if (isAdmin.role === "admin") {
            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
            }

            const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { status }, { new: true });
            res.status(200).json({ status: "success", data: updatedRecipe, message: "Recipe status updated" });
        } else if (isAdmin.role === "author") {
            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ status: "error", error: { code: 404, message: "Recipe not found" } });
            }

            if (recipe.user.toString() === id) {
                const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { status: "pending" }, { new: true });
                res.status(200).json({ status: "success", data: updatedRecipe, message: "Recipe status updated" });
            } else {
                return res.status(403).json({ status: "error", error: { code: 403, message: "You are not authorized to update this recipe" } });
            }
        } else {
            return res.status(403).json({ status: "error", error: { code: 403, message: "You are not authorized to update this recipe" } });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// LIST RECIPE BY STATUS
export const listRecipeByStatus = async (req, res) => {
    const id = req.user.id;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    const { status } = req.query;

    if (!["approved", "pending", "rejected", "draft"].includes(status)) {
        return res.status(400).json({
            status: "error",
            error: { code: 400, message: "Invalid status parameter" },
        });
    }

    try {
        const isAdmin = await User.findOne({ _id: id });
        if (isAdmin.role === "admin") {
            const recipes = await Recipe.find({ status });
            res.status(200).json({ status: "success", data: recipes });
        } else if (isAdmin.role === "author") {
            const recipes = await Recipe.find({ user: id, status });
            res.status(200).json({ status: "success", data: recipes });
        } else {
            return res.status(401).json({ status: "error", error: { code: 401, message: "Access denied" } });
        }
    } catch (e) {
        console.error(e);
    }
}