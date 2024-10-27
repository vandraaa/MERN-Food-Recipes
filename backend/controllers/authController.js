import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// LOGIN
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide email and password" } });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "User not found" } });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "error", error: { code: 401, message: "Invalid password" } });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const data = { id: user._id, name: user.name, email: user.email, token };

        res.status(200).json({ status: "success", data });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// REGISTER
export const registerUser = async (req, res) => {
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