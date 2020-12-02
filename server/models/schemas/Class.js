const {Schema} = require('mongoose')

const Class = new Schema({
    code: {
        type: String,
        unique: true
    },
    name: {
        type: String,
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
    allow_member_change: {
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
        ref: 'User',
        index: true
    }
})

Class.index({name: 'text'})
module.exports = Class