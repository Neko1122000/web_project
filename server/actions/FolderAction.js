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
    return Folder.updateOne({_id: folderId, creator: userID, is_active: true}, {$set: {..._folder, updated_at: Date.now()}})
}

exports.deleteFolder = async (folderId, userID) => {
    const Folder = getModel('Folder')
    return Folder.updateOne({_id: folderId, creator: userID}, {$set: {is_active: false, updated_at: Date.now()}})
}

exports.updateSet = async (folderId, args, userID) => {
    const {sets} = args
    const Folder = getModel('Folder')
    return Folder.updateOne({_id: folderId, creator: userID, is_active: true}, {$set: {sets, updated_at: Date.now()}})
}

exports.search = async (userId) => {
    const Folder = getModel('Folder')
    return Folder.find({creator: userId, is_active: true}).select('name description sets').lean()
}

exports.getDetail = async (folderId, userId) => {
    const Folder = getModel('Folder')
    const folder = Folder.findOne({_id: folderId, creator: userId, is_active: true})
        .populate({
            path: 'sets',
            select: 'name description creator'
        })
        .lean()
    if (!folder) throw new Error ('Folder not found')
    const User = getModel('User')
    const sets =  await Promise.map(folder.set, set => {
        const user = User.findById(set.creator).select('username')
        return Object.assign({}, set, {creator: user})
    }, {concurrency: 10})
    return Object.assign({}, folder, {sets})
}
