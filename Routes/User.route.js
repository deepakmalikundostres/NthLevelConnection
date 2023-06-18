const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.controller');




// sample http://localhost:3000/users/2/friends/1


router.get('/:id/friends/:level', async (req, res) => {
    const userId = req.params.id;
    const level = parseInt(req.params.level);

    try {
        const nthLevelFriends = await userController.findNthLevelFriends(userId, level);
        res.json(nthLevelFriends);
    } catch (error) {
        console.error('Error retrieving nth level friends:', error);
        res.status(500).json({ error: 'An error occurred: Please check the parameter' });
    }
});

// sample http://localhost:3000/users/fetchAllUsers

router.get('/fetchAllUsers',async (req, res) => {
    try {
        const fetchAllUsersDetails = await userController.fetchAllUsersDetails();
        res.json(fetchAllUsersDetails);
    } catch (error) {
        console.error('Error occurs while fetching the users Details:', error);
        res.status(500).json({ error: 'Error occurs while fetching the users Details' });
    }
})
module.exports = router;
