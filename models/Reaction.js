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

    virtuals: {
        createdAt: {
            get() { //this is a get method on createdAt to format the date
                const formattedDate = this.createdAt.toLocaleString();
                return formattedDate;
            }
        }
    }
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;