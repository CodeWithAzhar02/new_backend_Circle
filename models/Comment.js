const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    subSectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubSection",
    },
    comment: {
        type: String,
        required: true,
    },
    replies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
            reply: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Comment", commentSchema);
