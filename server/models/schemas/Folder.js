const {Schema} = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        index: true
    },
    description: {
        type: String
    },
    sets: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Set'
        }]  ,
        default: []
    },
    is_active: {
        type: Boolean,
        default: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    updated_at: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})