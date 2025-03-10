const {Schema} = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    set: {
        type: Schema.Types.ObjectId,
        ref: 'Set',
        index: true
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