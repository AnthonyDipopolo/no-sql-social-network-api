const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regular expression to validate an email address

    },
    thoughts: [{
        type: Types.ObjectId,
        ref: 'Thought' //reference to thought model to create connection
    }],
    friends:  [{
        type: Types.ObjectId,
        ref: 'User' //reference to user model to create self-connection
    }]
}, {
    virtuals: {
        friendCount: {
            get() { //this is a get method on the friendCount object
                return this.friends.length
            }
        }
    }
});

const User = model('User', userSchema);

module.exports = User;