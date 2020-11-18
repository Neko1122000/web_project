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
    const args = Object.assign({}, req.body)

    SetActions.updateSet(setId, userID, args)
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