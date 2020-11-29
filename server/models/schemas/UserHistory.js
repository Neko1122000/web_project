const {Schema} = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    set: {
        type: Schema.Types.ObjectId,
        ref: 'Set'
    },
    activity: {
        type: String
    },
    meta: {
        type: Schema.Types.Mixed
    },
    updated_at: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})