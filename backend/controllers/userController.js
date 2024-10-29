import { isValidObjectId } from '../utils/utils.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { uploadPhoto, deletePhoto } from '../utils/utils.js';
import Recipe from '../models/recipe.js';
import Step from '../models/steps.js';
import Ingredient from '../models/ingredients.js';
import Feedback from '../models/feedback.js';


// GET ALL USERS
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: users,
            message: "Users found"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({
            status: "error",
            error: { code: 400, message: "Invalid user ID" }
        });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "User not found" } });
        }

        res.status(200).json({
            status: "success",
            data: user,
            message: "User found"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};

// EDIT USER
export const editUser = async (req, res) => {
    const { name, email, password } = req.body;
    const file = req.file;
    const id = req.user.id;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    if (!name || !email || !password) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide at least one field to update" } });
    }

    try {
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ status: "error", error: { code: 400, message: "Email is already in use" } });
            }
        }

        let updateData = { name, email };

        if (file) {
            const oldImage = await User.findById(id).select("image");

            if (oldImage.image) {
                await deletePhoto(oldImage.image.fileName);
            }

            const { fileName, imageUrl } = await uploadPhoto(file.buffer, file.originalname, file.mimetype);
            updateData.image = { fileName, imageUrl };
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "User not found" } });
        }

        res.status(200).json({
            status: "success",
            message: "User updated",
            data: updatedUser
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "User not found" } });
        }

        if(user.image?.fileName) {
            await deletePhoto(user.image.fileName);
        }

        const recipes = await Recipe.find({ user: id });
        for (const recipe of recipes) {
            if(recipe.image?.fileName) {
                await deletePhoto(recipe.image.fileName);
            }

            await Step.deleteMany({ recipe: recipe._id });
            await Ingredient.deleteMany({ recipe: recipe._id });
            await Feedback.deleteMany({ recipe: recipe._id });
            await Recipe.findByIdAndDelete(recipe._id);
        }

        await Feedback.deleteMany({ user: id });
        await User.findByIdAndDelete(id);

        res.status(200).json({ status: "success", message: "User deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};
