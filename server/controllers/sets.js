const {sendSuccess, sendError} = require('../helper/sendResponse')
const SetActions = require('../actions/SetActions')

exports.create = (req, res) => {
    const {userID} = req
    const args = Object.assign({}, req.body)

    SetActions.create(args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.update = (req, res) => {
    const {userID} = req
    const {id: setId} = req.params
    const {args, old_password} = req.body

    SetActions.updateSet(setId, userID, args, old_password)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.delete = (req, res) => {
    const {userID} = req
    const {id: setId} = req.params
    const {old_password} = req.body

    SetActions.delete(setId, userID, old_password)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getDetailSet = (req, res) => {
    const {userID} = req
    const {id: setId} = req.params
    const args = Object.assign({}, req.query)

    SetActions.getSet(setId, userID, args)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}