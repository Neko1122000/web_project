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
    updated_by: {
        type: String,
        enum: ['only_me', 'classes', 'password'],
        default: 'only_me'
    },
    updated_password: {
        type: String
    },
    class_updated: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Class'
        }],
        default: []
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
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