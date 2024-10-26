import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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

// CREATE USER
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", error: { code: 400, message: "Email already exists" } });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({
            status: "success",
            message: "User created",
            data: newUser
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};

// EDIT USER
export const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    if (!name && !email && !password) {
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
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "User not found" } });
        }

        res.status(200).json({ status: "success", message: "User deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};
