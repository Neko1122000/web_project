const {Schema} = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        index: true
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    google_class: {
        type: String
    },
    invitation_link: {
        type: String
    },
    folders: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Folder'
        }]
    },
    sets: {
      type: [{
          type: Schema.Types.ObjectId,
          ref: 'Set'
      }]
    },
    members: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    is_member_remove: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})