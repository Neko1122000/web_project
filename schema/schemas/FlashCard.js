const {Schema} = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        index: true
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    language: {
      type: String
    },
    set: {
        type: Schema.Types.ObjectId,
        ref: 'Set'
    },
    is_active: {
        type: Boolean,
        default: false
    },
    updated_at: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})