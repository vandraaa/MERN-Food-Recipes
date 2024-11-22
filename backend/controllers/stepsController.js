import Recipe from "../models/recipe.js";
import Step from "../models/steps.js";
import { isValidObjectId } from "../utils/utils.js";

// CREATE A NEW STEP
export const createStep = async (req, res) => {
    const { instruction } = req.body;
    const { recipeId } = req.params;
    
    if (!recipeId || !instruction) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide all fields" } });
    }

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const stepCount = await Step.countDocuments({ recipe: recipeId });

        const newStep = new Step({
            recipe: recipeId,
            step_number: stepCount + 1,
            instruction,
        });

        const savedStep = await newStep.save();

        await Recipe.findByIdAndUpdate(recipeId, {
            $push: { steps: savedStep._id }
        });

        const data = {
            id: savedStep._id,
            step_number: savedStep.step_number,
            instruction: savedStep.instruction
        }

        res.status(201).json({ status: "success", data, message: "Step created" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// GET ALL STEPS
export const getAllSteps = async (req, res) => {
    const { recipeId } = req.params;

    if(!isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const steps = await Step.find({ recipe: recipeId });

        const data = steps.map((step) => ({
            id: step._id,
            step_number: step.step_number,
            instruction: step.instruction
        }));

        res.status(200).json({ status: "success", data: data, message: "Steps found" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// UPDATE A STEP
export const updateStep = async (req, res) => {
    const { instruction } = req.body;
    const { stepId } = req.params;

    if (!instruction) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide instruction field" } });
    }

    if (!stepId) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide step ID" } });
    }

    if (!isValidObjectId(stepId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid step ID" } });
    }

    try {
        const step = await Step.findById(stepId);

        if (!step) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Step not found" } });
        }

        const updatedStep = await Step.findByIdAndUpdate(stepId, { instruction }, { new: true });

        const data = {
            id: updatedStep._id,
            step_number: updatedStep.step_number,
            instruction: updatedStep.instruction
        }

        res.status(200).json({ status: "success", data, message: "Step updated" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// DELETE A STEP
export const deleteStep = async (req, res) => {
    const { stepId } = req.params;

    if (!stepId) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide step ID" } });
    }

    if (!isValidObjectId(stepId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid step ID" } });
    }

    try {
        const step = await Step.findById(stepId);

        if (!step) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Step not found" } });
        }

        const stepNumber = step.step_number;

        await Step.updateMany(
            { recipe: step.recipe, step_number: { $gt: stepNumber } },
            { $inc: { step_number: -1 } }
        );
        await Step.findByIdAndDelete(stepId);

        res.status(200).json({ status: "success", message: "Step deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}

// DELETE ALL STEPS BY RECIPE ID
export const deleteAllStepsByRecipeId = async (req, res) => {
    const { recipeId } = req.params;

    if (!recipeId) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Please provide recipe ID" } });
    }

    if (!isValidObjectId(recipeId)) {
        return res.status(400).json({ status: "error", error: { code: 400, message: "Invalid recipe ID" } });
    }

    try {
        const steps = await Step.find({ recipe: recipeId });

        if (!steps) {
            return res.status(404).json({ status: "error", error: { code: 404, message: "Steps not found" } });
        }

        for (const step of steps) {
            await Step.updateMany(
                { recipe: recipeId, step_number: { $gt: step.step_number } },
                { $inc: { step_number: -1 } }
            );
        }

        await Step.deleteMany({ recipe: recipeId });

        res.status(200).json({ status: "success", message: "All steps deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: "error", error: { code: 500, message: e.message } });
    }
}