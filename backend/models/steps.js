import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    step_number: {
        type: Number,
        required: true
    },
    instruction: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Step = mongoose.model('Step', stepSchema);

export default Step;