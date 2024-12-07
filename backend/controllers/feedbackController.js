import { isValidObjectId } from "../utils/utils.js";
import Feedback from "../models/feedback.js";

// CREATE FEEDBACK
export const createFeedback = async (req, res) => {
    const { recipeId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user ID" } });
    }

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    if (!rating || !comment) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    try {
        const userComment = await Feedback.findOne({ user: userId, recipe: recipeId });
        if (userComment) {
            return res.status(400).json({ status: "error", error: { code: 400, message: "Feedback already exists" } });
        } else {
            const newFeedback = new Feedback({
                user: userId,
                recipe: recipeId,
                rating,
                comment,
            });
    
            await newFeedback.save();

            const data = {
                id: newFeedback._id,
                userId: newFeedback.user,
                recipeId: newFeedback.recipe,
                rating: newFeedback.rating,
                comment: newFeedback.comment,
            }

            res.status(201).json({ status: "success", data, message: "Feedback created" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// GET FEEDBACK BY RECIPE ID
export const getFeedbackByRecipeId = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const feedback = await Feedback.find({ recipe: id }).populate("user", "name image");
        if (!feedback) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Feedback not found" } });
        }

        const data = feedback.map((feedback) => {
            return {
                id: feedback._id,
                user: feedback.user,
                recipeId: feedback.recipe,
                rating: feedback.rating,
                comment: feedback.comment,
            }
        })

        res.status(200).json({ status: "success", data, message: "Feedback found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// DELETE FEEDBACK
export const deleteFeedback = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid feedback ID" } });
    }

    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Feedback not found" } });
        }

        if (feedback.user.id !== req.user.id && req.user.role !== "admin") {
            return res.status(401).json({ status: "error", error: { code: 401, message: "Unauthorized" } });
        }

        await Feedback.findByIdAndDelete(id);
        res.status(200).json({ status: "success", message: "Feedback deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}