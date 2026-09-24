const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aerovista";

async function changeAdminCredentials() {
    const newEmail = process.argv[2];
    const newPassword = process.argv[3];

    if (!newEmail || !newPassword) {
        console.log("Usage: node changeAdminPassword.js <newEmail> <newPassword>");
        console.log("Example: node changeAdminPassword.js manager@aerovista.com mysecretpass123");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB...");

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        let user = await User.findOne({ role: "admin" });
        if (user) {
            user.email = newEmail.toLowerCase();
            user.password = hashedPassword;
            await user.save();
            console.log(`Successfully updated admin user!`);
            console.log(`New Email: ${user.email}`);
        } else {
            user = await User.create({
                email: newEmail.toLowerCase(),
                password: hashedPassword,
                role: "admin",
            });
            console.log(`Created new admin user: ${user.email}`);
        }

        process.exit(0);
    } catch (error) {
        console.error("Failed to update admin credentials:", error.message);
        process.exit(1);
    }
}

changeAdminCredentials();
