const {Schema} = require('mongoose')

module.exports = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    facebook_id: {
        type: String
    },
    google_id: {
        type: String
    },
    email: {
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