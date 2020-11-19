const {sendSuccess, sendError} = require('../helper/sendResponse')
const folder = require('../actions/FolderAction')

exports.create = (req, res) => {
    const {userID} = req
    const args = Object.assign({}, req.body)

    folder.create(args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getFolderDetail = (req, res) => {
    const {userID} = req
    const {id: folder_id} = req.params

    folder.getDetail(folder_id, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.updateFolder = (req, res) => {
    const {userID} = req
    const {id: folderId} = req.params
    const args = Object.assign({}, req.body)

    folder.updateFolder(folderId, args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.deleteFolder = (req, res) => {
    const {userID} = req
    const {id: folderId} = req.params

    folder.deleteFolder(folderId, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.updateSet = (req, res) => {
    const {userID} = req
    const {id: folderId} = req.params
    const args = Object.assign({}, req.body)

    folder.updateSet(folderId, args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}