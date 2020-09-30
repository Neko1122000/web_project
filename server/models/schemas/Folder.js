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
        default: String
    },
    updated_at: {
        type: Date
    },
    created_at: {
        type: Date
    }
})