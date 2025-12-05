
const mongoose = require('mongoose');
const User = require('./models/user');
const Course = require('./models/course');

// User's Live DB URI
const MONGODB_URL = "mongodb+srv://miclejackson72_db_user:GU1mfiohJ9LQSMoZ@cluster0.ch067cv.mongodb.net/?appName=Cluster0";

const checkStats = async () => {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(MONGODB_URL);
        console.log("Connected! Fetching stats...\n");

        const userCount = await User.countDocuments();
        const courseCount = await Course.countDocuments();
        const students = await User.find({ accountType: "Student" }).select("firstName lastName email");
        const instructors = await User.find({ accountType: "Instructor" }).select("firstName lastName email");

        console.log("========================================");
        console.log(`📊 TOTAL USERS:      ${userCount}`);
        console.log(`📚 TOTAL COURSES:    ${courseCount}`);
        console.log("========================================");

        console.log("\n👨‍🎓 STUDENTS:");
        if (students.length === 0) console.log("   (No students yet)");
        students.forEach(u => console.log(`   - ${u.firstName} ${u.lastName} (${u.email})`));

        console.log("\n👨‍🏫 INSTRUCTORS:");
        if (instructors.length === 0) console.log("   (No instructors yet)");
        instructors.forEach(u => console.log(`   - ${u.firstName} ${u.lastName} (${u.email})`));

        console.log("\n========================================");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

checkStats();
