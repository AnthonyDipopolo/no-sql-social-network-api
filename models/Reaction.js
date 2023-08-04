const {Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId // Set default value to a new objectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // creates createdAt and updatedAt fields in the schema
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;