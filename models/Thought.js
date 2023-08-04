const { Schema, model, Types } = require('mongoose');

// Create a new Mongoose schema for the 'Thought' collection
const thoughtSchema = new Schema({
    // Define the 'thoughtText' field as a required string with minimum length of 1 and maximum length of 280 characters
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    // Define the 'username' field as a required string
    username: {
        type: String,
        required: true,
    },

    // Define the 'reactions' field as an array of 'Reaction' model references
    reactions: [
        {
            type: Types.ObjectId,
            ref: 'Reaction'
        }
    ]
}, {
    // Schema options
    timestamps: true, // creates 'createdAt' and 'updatedAt' fields in the schema

    // toJSON option to include virtual fields in the response
    toJSON: { virtuals: true },

    // Virtuals definition
    virtuals: {
        // Define the 'reactionsCount' virtual field as a getter method to calculate the length of the 'reactions' array
        reactionsCount: {
            get() { //this is a get method on the reactionsCount object
                return this.reactions.length;
            }
        }
    }
});

// Create a Mongoose model for the 'Thought' collection using the 'thoughtSchema'
const Thought = model('Thought', thoughtSchema);

// Export the 'Thought' model to be used in other parts of the application
module.exports = Thought;
