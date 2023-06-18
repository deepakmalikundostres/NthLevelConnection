require('dotenv').config();
const User = require('./Models/users.model');
const Comment = require('./Models/comment.model');
const faker = require('faker');


// Connect to MongoDB
require('./initDB')();

// Function to generate random users and comments
async function generateRandomUsers() {
    const users = [];
    const comments = new Map();

    for (let i = 1; i <= process.env.SAMPLE_USER_SIZE; i++) {
        const numBlogs = Math.floor(Math.random() * 10) + 1; // Random number between 1-10

        for (let j = 1; j <= numBlogs; j++) {
            let blogId;
            blogId = Math.floor(Math.random() * process.env.SAMPLE_BLOG_SIZE) + 1; // Random number between 1-20

            if (!comments.has(blogId)) {
                comments.set(blogId, []);
            }
            comments.get(blogId).push(i);
        }

        const user = new User({
            id: i,
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            blogs: []
        });

        users.push(user);
    }

    try {
        // Save the users to the database
        const savedUsers = await User.insertMany(users);

        // Update blogs field in users
        for (const [blogId, userIds] of comments) {
            await User.updateMany({ id: { $in: userIds } }, { $push: { blogs: blogId } });
        }

        // Save the comments to the database
        const commentDocuments = [];

        for (const [blogId, userIds] of comments) {
            const comment = new Comment({
                blogId: blogId,
                userId: userIds
            });
            commentDocuments.push(comment);
        }

        await Comment.insertMany(commentDocuments);

        console.log('Random users and comments created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating random users and comments:', error);
        process.exit(1);
    }
}

generateRandomUsers();
