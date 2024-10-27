import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        fileName: {
            type: String,
        },
        imageUrl: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'author'],
        default: 'user'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;