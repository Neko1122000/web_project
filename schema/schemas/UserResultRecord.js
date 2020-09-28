const {Schema} = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    flashcard: {
        type: Schema.Types.ObjectId,
        ref: 'FlashCard'
    },
    result: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date()
    }
})