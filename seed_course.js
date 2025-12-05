
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Load env vars
dotenv.config();

// Import models
const User = require('./models/user');
const Category = require('./models/Category');
const Course = require('./models/course');

async function seedData() {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL missing");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");

        // 1. Create/Find Instructor
        let instructor = await User.findOne({ email: "dummy_inst@test.com" });
        if (!instructor) {
            instructor = await User.create({
                firstName: "Dummy",
                lastName: "Instructor",
                email: "dummy_inst@test.com",
                password: "hashedPassword",
                accountType: "Instructor",
                image: "https://api.dicebear.com/5.x/initials/svg?seed=DI",
                additionalDetails: new mongoose.Types.ObjectId(), // Fake ID for profile
            });
            console.log("Instructor created:", instructor._id);
        } else {
            console.log("Instructor found:", instructor._id);
        }

        // 2. Create/Find Category
        let category = await Category.findOne({ name: "Python" });
        if (!category) {
            category = await Category.create({
                name: "Python",
                description: "Python courses"
            });
            console.log("Category created:", category._id);
        } else {
            console.log("Category found:", category._id);
        }

        // 3. Create Course
        const course = await Course.create({
            courseName: "Python for Beginners",
            courseDescription: "A dummy course for testing",
            instructor: instructor._id,
            whatYouWillLearn: "Python basics",
            price: 1999,
            thumbnail: "https://via.placeholder.com/300",
            category: category._id,
            status: "Published",
            createdAt: new Date()
        });

        // Add course to category and instructor
        await Category.findByIdAndUpdate(category._id, { $push: { courses: course._id } });
        await User.findByIdAndUpdate(instructor._id, { $push: { courses: course._id } });

        console.log("FINAL_ID::" + course._id.toString() + "::END");

        process.exit(0);

    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
}

seedData();
