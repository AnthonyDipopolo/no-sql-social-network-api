const router = require('express').Router();
const { Thought } = require('../models');

//Get all thoughts
router.get('/thoughts', async (req, res) => {
    const thoughts = await Thought.find({});
    res.json(thoughts);
// console.log(thoughts);
});

// Create a thought
router.post('/thought', async (req, res) => {
    try {
        // Use the thought model to create a thought with the req.body properties
        const thought = await Thought.create(req.body);

        const userId = req.body.userId;

        // Update the associated user's thoughts array with the newly created thought's ID
        await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

        // Send the new thought object back as the response
        res.json(thought);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});


//get a single thought by it's id
router.get('/thought/:id', async (req, res)=> {
    const thought = await Thought.findOne(req.params.id);

    if (thought) return res.json(thought); //use return to avoid the else

    res.json({message:'Thought Not Found'});
});

// Update a thought by it's id
router.put('/thought/:id', async (req, res) => {
    const { thoughtText, username } = req.body;

    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $set: { thoughtText, username } },
            { new: true }
        );

        if (!updatedThought) throw new Error('No thought found with that ID');

        res.json(updatedThought);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});

// Delete a thought by it's id
router.delete('/thought/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndRemove(req.params.id);

        if (!deletedThought) throw new Error('No thought found with that ID');

        const userId = deletedThought.userId;
        await User.findByIdAndUpdate(userId, { $pull: { thoughts: req.params.id } });

        res.json(deletedThought);
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});

// Create a reaction stored in a single thought's reactions array
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    const { reactionBody, username } = req.body;
    const { thoughtId } = req.params;

    try {
        // Create a new reaction using the Reaction model
        const newReaction = await Reaction.create({
            reactionBody,
            username,
        });

        // Find the thought by its ID using the Thought model
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            throw new Error('No thought found with that ID');
        }

        // Add the newly created reaction's ID to the thought's reactions array
        thought.reactions.push(newReaction._id);

        // Save the updated thought with the new reaction in its reactions array
        const updatedThought = await thought.save();

        res.json(updatedThought);
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});

// Delete a reaction by it's reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    const { thoughtId, reactionId } = req.params;

    try {
        // Find the thought by its ID using the Thought model
        const thought = await Thought.findById(thoughtId);

        if (!thought) {
            throw new Error('No thought found with that ID');
        }

        // Check if the reactionId exists in the thought's reactions array
        if (!thought.reactions.includes(reactionId)) {
            throw new Error('No reaction found with that ID in the thought');
        }

        // Delete the reaction by its ID using the Reaction model
        const deletedReaction = await Reaction.findByIdAndDelete(reactionId);

        if (!deletedReaction) {
            throw new Error('No reaction found with that ID');
        }

        // Remove the deleted reaction's ID from the thought's reactions array
        thought.reactions.pull(reactionId);

        // Save the updated thought without the deleted reaction
        const updatedThought = await thought.save();

        res.json(updatedThought);
    } catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});



module.exports = router;