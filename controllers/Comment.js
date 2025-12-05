const Comment = require("../models/Comment");

// Add a Comment
exports.addComment = async (req, res) => {
    try {
        const { subSectionId, comment } = req.body;
        const userId = req.user.id;

        const newComment = await Comment.create({
            user: userId,
            subSectionId,
            comment,
        });

        // Populate user details for immediate display
        const populatedComment = await Comment.findById(newComment._id).populate("user", "firstName lastName image");

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            data: populatedComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add comment",
        });
    }
};

// Get Comments for a SubSection
exports.getComments = async (req, res) => {
    try {
        const { subSectionId } = req.params;

        const comments = await Comment.find({ subSectionId })
            .populate("user", "firstName lastName image")
            .populate("replies.user", "firstName lastName image") // Populate users in replies too if needed
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch comments",
        });
    }
};
