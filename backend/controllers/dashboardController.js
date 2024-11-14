import { isValidObjectId } from "mongoose";
import Recipe from "../models/recipe.js";
import Category from "../models/category.js";
import User from "../models/user.js";

// Statistics admin
export const dashboardAdmin = async (req, res) => {
    const id = req.user.id;

    if (!isValidObjectId) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    try {
        const isAdmin = await User.findOne({ _id: id });

        if (isAdmin.role === "admin") {
            const totalRecipes = await Recipe.countDocuments();
            const totalCategories = await Category.countDocuments();
            const totalPendingRecipe = await Recipe.countDocuments({ isApproved: false });

            const data = {
                total_recipes: totalRecipes,
                total_categories: totalCategories,
                total_pending_recipe: totalPendingRecipe
            }

            return res.status(200).json({ status: "success", message: "Dashboard statistics found", data })
        } else {
            return res.status(401).json({ status: "error", error: { code: 401, message: "Access denied" } });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// Statistic Author
export const dashboardAuthor = async (req, res) => {
    const id = req.user.id

    if (!isValidObjectId) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } }); 
    }

    try {
        const isAuthor = await User.findOne({ _id: id });

        if (isAuthor.role === "author") {
            const totalRecipes = await Recipe.countDocuments({ user: id })
            const totalPendingRecipes = await Recipe.countDocuments({ user: id, isApproved: false })
            const totalApproveRecipes = await Recipe.countDocuments({ user: id, isApproved: true })

            const data = {
                total_recipes: totalRecipes,
                total_pending_recipes: totalPendingRecipes,
                total_approve_recipes: totalApproveRecipes
            }

            return res.status(200).json({ status: "success", message: "Dashboard statistics found", data })
        } else {
            return res.status(401).json({ status: "error", error: { code: 401, message: "Access denied" } });
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}