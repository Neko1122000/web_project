const joi = require('joi')
const {getModel} = require('../connection/mongodb')

const _validate = async (args) => {
    const validate_schema = joi.object({
        name: joi.string().required().trim(),
        description: joi.string().trim()
    })
    return validate_schema.validateAsync(args)
}

exports.create = async (args, userID) => {
    const _folder = Object.assign({}, await _validate(args), {creator: userID})
    const Folder = getModel('Folder')
    return Folder.create(_folder)
}

exports.updateFolder = async (folderId, args, userID) => {
    const _folder = Object.assign({}, await _validate(args), {creator: userID})
    const Folder = getModel('Folder')
    return Folder.updateOne({_id: folderId, creator: userID}, {$set: {..._folder, updated_at: Date.now()}})
}

exports.deleteFolder = async (folderId, userID) => {
    const Folder = getModel('Folder')
    return Folder.updateOne({_id: folderId, creator: userID}, {$set: {is_active: false, updated_at: Date.now()}})
}

exports.updateSet = async (folderId, args, userID) => {
    const {sets} = args
    const Folder = getModel('Folder')
    return Folder.updateOne({_id: folderId, creator: userID}, {$set: {sets, updated_at: Date.now()}})
}