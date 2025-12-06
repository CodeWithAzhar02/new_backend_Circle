const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/user');

async function updateRole() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");

        // Update specific users
        const emails = ["miclejackson72@gmail.com", "aditi377377377@gmail.com"];

        const result = await User.updateMany(
            { email: { $in: emails } },
            { $set: { accountType: "Instructor" } }
        );

        console.log("Updated Users:", result);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
updateRole();
