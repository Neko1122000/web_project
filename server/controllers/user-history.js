const {sendError, sendSuccess} = require('../helper/sendResponse')
const UserHistoryAction = require('../actions/UserHistory')

exports.create = (req, res) => {
    UserHistoryAction.create()
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}