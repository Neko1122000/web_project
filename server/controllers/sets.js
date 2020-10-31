const {sendSuccess, sendError} = require('../helper/sendResponse')
const SetActions = require('../actions/SetActions')

exports.create = (req, res) => {
    const {userId} = req
    const args = Object.assign({}, req.body)

    SetActions.create(args, userId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}