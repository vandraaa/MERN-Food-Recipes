import bcrypt from "bcrypt";
import User from "../../models/user.js";
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ACCOUNT_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ACCOUNT_ADMIN_PASSWORD;

const adminSeed = async () => {
    try {
        const existingAdmin = await User.findOne({ role: "admin" });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
            const admin = new User({
                name: "Admin",
                email: ADMIN_EMAIL,
                password: hashedPassword,
                role: "admin"
            });

            await admin.save();
            console.log('SEED: Admin account created.');
        } else {
            console.log('SEED: Admin account already exists.');
        }
    } catch (e) {
        console.error(`Error seeding admin: ${e.message}`);
    }
}

export default adminSeed