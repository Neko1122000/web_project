const {Schema} = require('mongoose')

module.exports = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    facebook_token: {
        type: String
    },
    google_token: {
        type: String
    },
    image_link: {
        type: String
    },
    account_type: {
        type: String,
        enum: ['teacher', 'student', 'admin'],
        default: 'student'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    }
})