const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/user');
const Category = require('./models/Category');
const Course = require('./models/course');

const coursesToCreate = [
    {
        name: "Web Development Bootcamp",
        desc: "Become a full-stack developer",
        price: 2499,
        category: "Web Dev"
    },
    {
        name: "Data Science with AI",
        desc: "Master Python and Machine Learning",
        price: 2999,
        category: "Data Science"
    },
    {
        name: "Java Masterclass",
        desc: "Learn Java from scratch",
        price: 1599,
        category: "Programming"
    }
];

async function seedMultiple() {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL missing");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");

        // 1. Get Instructor
        const instructor = await User.findOne({ email: "dummy_inst@test.com" });
        if (!instructor) {
            console.log("Instructor not found, please run seed_course.js first");
            process.exit(1);
        }

        // 2. Loop and Create
        for (const c of coursesToCreate) {
            // Find or Create Category
            let category = await Category.findOne({ name: c.category });
            if (!category) {
                category = await Category.create({ name: c.category, description: c.desc });
            }

            // Create Course
            const newCourse = await Course.create({
                courseName: c.name,
                courseDescription: c.desc,
                instructor: instructor._id,
                whatYouWillLearn: c.desc,
                price: c.price,
                thumbnail: `https://via.placeholder.com/300?text=${c.name.replace(/ /g, '+')}`,
                category: category._id,
                status: "Published",
                createdAt: new Date()
            });

            // Update refs
            await Category.findByIdAndUpdate(category._id, { $push: { courses: newCourse._id } });
            await User.findByIdAndUpdate(instructor._id, { $push: { courses: newCourse._id } });

            console.log(`COURSE_CREATED::${c.name}::${newCourse._id}::END`);
        }

        process.exit(0);

    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
}

seedMultiple();
