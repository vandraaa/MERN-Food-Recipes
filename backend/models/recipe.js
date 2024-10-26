import mongoose from "mongoose";
import Ingredient from "./ingredients.js";
import Rating from "./rating.js";
import Step from "./steps.js";
import Comment from "./comment.js";

const recipeSchema = new mongoose.Schema({
    "user_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    "title": {
        type: String,
        required: true
    },
    "description": {
        type: String,
        required: true
    },
    "image": {
        "fileName": {
            type: String,
            required: true
        },
        "imageUrl": {
            type: String,
            required: true
        }
    },
    "servings": {
        type: Number,
        required: true
    },
    "cooking_time": {
        type: Number,
        required: true
    },
    "category": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    "ingredients": [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredient"
        }
    ],
    "steps": [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Step"
        }
    ]
}, {
    timestamps: true
});

recipeSchema.pre('remove', async function (next) {
    try {
        await Ingredient.deleteMany({ recipe_id: this._id });
        await Step.deleteMany({ recipe_id: this._id });
        await Rating.deleteMany({ recipe_id: this._id });
        await Comment.deleteMany({ recipe_id: this._id });
        next();
    } catch (err) {
        next(err);
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
