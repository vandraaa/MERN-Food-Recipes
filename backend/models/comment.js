import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    "recipe_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    "user_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    "comment": {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment