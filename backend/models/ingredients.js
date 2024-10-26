import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
