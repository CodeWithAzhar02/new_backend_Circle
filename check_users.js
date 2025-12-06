const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/user');

async function checkUsers() {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("MONGODB_URL missing");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");

        const users = await User.find({})
            .sort({ _id: -1 }) // Newest first
            .limit(5)
            .select('firstName lastName email accountType');

        console.log("Recent Users:");
        users.forEach(u => {
            console.log(`- ${u.firstName} ${u.lastName} (${u.email}) -> Role: [${u.accountType}]`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
checkUsers();
