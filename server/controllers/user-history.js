const {sendError, sendSuccess} = require('../helper/sendResponse')
const UserHistoryAction = require('../actions/UserHistoryAction')

exports.updateOrCreateIfNotExist = (req, res) => {
    const {userID} = req
    const args = Object.assign({}, req.body)

    UserHistoryAction.updateOrCreateIfNotExist(args, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getUserHistory = (req, res) => {
    const {userID} = req

    UserHistoryAction.getHistory(userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}