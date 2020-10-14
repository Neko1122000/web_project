const {Schema} = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    key: {
        type: String
    },
    value: {
        type: String
    },
    updated: {
        type: Date
    }
})