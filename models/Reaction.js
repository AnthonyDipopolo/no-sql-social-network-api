const { Schema, model, Types } = require('mongoose');

// Create a new Mongoose schema for the 'Reaction' collection
const reactionSchema = new Schema({
    // Define the 'reactionId' field as a Schema.Types.ObjectId with a default value of a new ObjectId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId // Set default value to a new objectId
    },

    // Define the 'reactionBody' field as a required string with a maximum length of 280 characters
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

    // Define the 'username' field as a required string
    username: {
        type: String,
        required: true,
    }
}, {
    // Schema options
    timestamps: true, // creates 'createdAt' and 'updatedAt' fields in the schema
});

// Create a Mongoose model for the 'Reaction' collection using the 'reactionSchema'
const Reaction = model('Reaction', reactionSchema);

// Export the 'Reaction' model to be used in other parts of the application
module.exports = Reaction;
