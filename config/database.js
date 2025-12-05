// config/database.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL not found in environment variables!");
        }

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.log("Error while connecting server with Database");
        console.log(error.message);
        process.exit(1); // Server ko crash kar de agar DB connect na ho
    }
};

module.exports = { connectDB };