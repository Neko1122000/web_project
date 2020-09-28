const {Schema} = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        index: true
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    has_password_to_update: {
        type: Boolean,
        default: false
    },
    update_password: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    visible_by: {
        type: String,
        enum: ['everyone', 'only_me', 'classes', 'password'],
        default: 'everyone'
    },
    visible_password: {
        type: String
    },
    class_visible: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Class'
        }],
        default: []
    },
    is_active: {
        type: Boolean,
        default: true
    },
    updated_at: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})