const {sendSuccess, sendError} = require('../helper/sendResponse')
const ClassAction = require('../actions/ClassAction')

exports.create = (req, res) => {
    const {userID} = req
    const args = Object.assign({}, req.body)

    ClassAction.create(args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getDetail = (req, res) => {
    const {userID} = req
    const {id: classId} = Object.assign({}, req.params)

    ClassAction.getDetail(classId, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.update = (req, res) => {
    const {userID} = req
    const {id: classId} = req.params
    const args = Object.assign({}, req.body)

    ClassAction.update(classId, args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.delete = (req, res) => {
    const {userID} = req
    const {id: classId} = req.params

    ClassAction.delete(classId, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.search = (req, res) => {
    const {userID} = req
    const {args} = Object.assign({}, req.query)

    ClassAction.search(args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}