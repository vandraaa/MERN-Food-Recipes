import { isValidObjectId } from "../utils/utils.js";
import Feedback from "../models/feedback.js";

// CREATE FEEDBACK
export const createFeedback = async (req, res) => {
    const { recipeId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!isValidObjectId(userId) || !isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid user or recipe ID" } });
    }

    if (!rating || !comment) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Rating must be between 1 and 5" } });
    }

    try {
        const existingFeedback = await Feedback.findOne({ user: userId, recipe: recipeId });
        if (existingFeedback) {
            return res.status(400).json({ status: "error", error: { code: 400, message: "Feedback already exists" } });
        }

        const newFeedback = await Feedback.create({
            user: userId,
            recipe: recipeId,
            rating,
            comment,
        });

        const data = {
            id: newFeedback._id,
            userId: newFeedback.user,
            recipeId: newFeedback.recipe,
            rating: newFeedback.rating,
            comment: newFeedback.comment,
        };

        res.status(201).json({ status: "success", data, message: "Feedback created" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};


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

        const isAuthorized = feedback.user.toString() === req.user.id || req.user.role === "admin";
        if (!isAuthorized) {
            return res.status(403).json({ status: "error", error: { code: 403, message: "Unauthorized" } });
        }

        await feedback.deleteOne();
        res.status(200).json({ status: "success", message: "Feedback deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
};
