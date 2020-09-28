const {Schema} = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    activity: {
        type: String
    },
    meta: {
        type: Schema.Types.Mixed
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})