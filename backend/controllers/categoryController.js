import mongoose from "mongoose";
import Category from "../models/category.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ status: "success", data: categories, message: "Categories found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// CREATE CATEGORY
export const createCategory = async (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide a name" } });
    }

    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ status: "success", data: newCategory, message: "Category created" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid category ID" } });
    }

    try {
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Category not found" } });
        }

        res.status(200).json({ status: "success", data: category, message: "Category found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// EDIT CATEGORY
export const editCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if(!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid category ID" } });
    }

    if(!name) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide a name" } });
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if(!updatedCategory) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Category not found" } });
        }

        res.status(200).json({ status: "success", data: updatedCategory, message: "Category updated" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid category ID" } });
    }

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if(!deletedCategory) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Category not found" } });
        }

        res.status(200).json({ status: "success", data: deletedCategory, message: "Category deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}