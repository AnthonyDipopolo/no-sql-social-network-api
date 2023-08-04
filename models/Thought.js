const {Schema, model, Types} = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            type: Types.ObjectId,
            ref: 'Reaction'
        }
    ]
}, {
    timestamps: true, // creates createdAt and updatedAt fields in the schema

    toJSON: { virtuals: true },

    virtuals: {
        reactionsCount: {
            get() { //this is a get method on the reactionsCount object
                return this.reactions.length
            }
        }
    }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;