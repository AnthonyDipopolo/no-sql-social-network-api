const { Schema, model, Types } = require('mongoose');

// Create a new Mongoose schema for the 'User' collection
const userSchema = new Schema({
    // Define the 'username' field as a required string, with unique and trimmed properties
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // Define the 'email' field as a required string with unique property and email validation using regex
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regular expression to validate an email address
    },

    // Define the 'thoughts' field as an array of 'Thought' model references
    thoughts: [{
        type: Types.ObjectId,
        ref: 'Thought' //reference to thought model to create connection
    }],

    // Define the 'friends' field as an array of 'User' model references
    friends:  [{
        type: Types.ObjectId,
        ref: 'User' //reference to user model to create self-connection
    }]
}, {
    // Schema options

    // toJSON option to include virtual fields in the response
    toJSON: { virtuals: true },

    // Virtuals definition
    virtuals: {
        // Define the 'friendCount' virtual field as a getter method to calculate the length of the 'friends' array
        friendCount: {
            get() { //this is a get method on the friendCount object
                return this.friends.length;
            }
        }
    }
});

// Create a Mongoose model for the 'User' collection using the 'userSchema'
const User = model('User', userSchema);

// Export the 'User' model to be used in other parts of the application
module.exports = User;
