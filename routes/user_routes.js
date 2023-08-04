// Import necessary modules and models
const router = require('express').Router();
const { User } = require('../models');

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(401).send({
            message: err.message
        });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(401).send({
            message: err.message
        });
    }
});

// Find a single user by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({  // Populate the 'thoughts' field of the found user with its corresponding thoughts
                path: 'thoughts',
                populate: {  // The `populate()` method is used again to replace the 'Reaction' references with the actual reaction documents
                    path: 'reactions',
                    model: 'Reaction'
                }
            })
            .populate('friends'); // Populate friends

        if (!user) throw new Error('No user found with that ID');

        res.json(user); // Send the new user object

    } catch (err) {
        res.status(401).send({
            message: err.message
        });
    }
});

// Update a user's username and email by ID
router.put('/user/:id', async (req, res) => {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: username,
            email: email
        }
    }, { new: true });

    if (!user) throw new Error('No user found with that ID');

    res.json(user);
});

// Delete a user by ID
router.delete('/user/delete/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) throw new Error('No user found with that ID');

    res.json(user);
});

// Add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    const { userId, friendId } = req.params;

    try {
        // Find the user by its ID using the User model
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('No user found with that ID');
        }

        // Check if the friendId already exists in the user's friends array
        if (user.friends.includes(friendId)) {
            throw new Error('Friend already exists in the user\'s friend list');
        }

        // Add the friendId to the user's friends array using $push
        user.friends.push(friendId);

        // Save the updated user with the new friend
        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});

// Delete a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    const { userId, friendId } = req.params;

    try {
        // Find the user by its ID using the User model
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('No user found with that ID');
        }

        // Check if the friendId exists in the user's friends array
        if (!user.friends.includes(friendId)) {
            throw new Error('Friend not found in the user\'s friend list');
        }

        // Remove the friendId from the user's friends array using $pull
        user.friends.pull(friendId);

        // Save the updated user without the deleted friend
        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});

// Export the router
module.exports = router;
