const {Schema} = require('mongoose')

module.exports = new Schema({
    type: {
        type: String,
        index: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    meta: {
        type: Schema.Types.Mixed
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
    }
})