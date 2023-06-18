const User = require('../Models/users.model');
const Comment = require('../Models/comment.model');

async function findNthLevelFriends(userId, desiredLevel) {
    const nthLevelFriends = [];
    const visited = new Set();
    const queue = [];

    queue.push({ userId, level: 0 });
    visited.add(userId);

    while (queue.length > 0) {
        const { userId, level } = queue.shift();

        if (level === desiredLevel) {
            nthLevelFriends.push(userId);
            continue;
        }

        const userInfo = await User.findOne({ id: userId }).select('blogs');
        const blogsForAboveUser = userInfo.blogs;

        for (const blog of blogsForAboveUser) {
            const usersCommentedOnCurrentBlog = await Comment.distinct('userId', { blogId: blog });
            for (const friendId of usersCommentedOnCurrentBlog) {
                if (!visited.has(friendId)) {
                    visited.add(friendId);
                    queue.push({ userId: friendId, level: level + 1 });
                }
            }
        }
    }

    return nthLevelFriends;
}

async function fetchAllUsersDetails() {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (error) {
        console.error('Error retrieving all users:', error);
        throw error;
    }
}


module.exports = {
    findNthLevelFriends,
    fetchAllUsersDetails
};
