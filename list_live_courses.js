const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    }
};

const checkCourses = async () => {
    await dbConnect();

    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const courseCollection = collections.find(c => c.name === 'courses');

        if (courseCollection) {
            const courses = await mongoose.connection.db.collection('courses').find({}).toArray();
            console.log(`Found ${courses.length} courses:`);
            courses.forEach(c => {
                console.log(`- Course Name: ${c.courseName}`);
                console.log(`  ID: ${c._id.toString()}`);
                console.log(`  Price: ${c.price}`);
                console.log(`  Status: ${c.status}`);
                console.log('-------------------');
            });
        } else {
            console.log("No courses collection found.");
        }

    } catch (error) {
        console.error("Error fetching courses:", error);
    } finally {
        // Close connection
        await mongoose.connection.close();
        console.log("Connection Closed");
    }
};

checkCourses();
