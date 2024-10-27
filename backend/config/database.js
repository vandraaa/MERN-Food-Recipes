import mongoose from "mongoose"
import dotenv from 'dotenv'
import runSeeds from "./seed.js";

dotenv.config();
const mongoUri = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoUri, {
            dbName: 'foodRecipes'
        });

        await runSeeds();
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}