import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        fileName: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    servings: {
        type: Number,
        required: true
    },
    cooking_time: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredient"
        }
    ],
    steps: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Step"
        }
    ]
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
