import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    "user_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    "recipe_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    "rating": {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating