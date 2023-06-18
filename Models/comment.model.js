const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogId: { type: Number, required: true, unique: true },
    userId: [{ type: Number, required: true }]
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
