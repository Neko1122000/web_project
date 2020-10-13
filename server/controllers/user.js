const UserAction = require('../actions/UserAction')
const {sendSuccess, sendError} = require('../helper/sendResponse')

exports.generateToken = (req, res) => {
    const {user} = req
    UserAction.generateToken(user)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.refreshToken = (req, res) => {
    const {refresh_token} = req.query
    UserAction.refreshToken(refresh_token)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.login = (req, res) => {
    const data = req.body
    UserAction.login(data)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}