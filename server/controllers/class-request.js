const {sendSuccess, sendError} = require('../helper/sendResponse')
const RequestAction = require('../actions/RequestAction')

exports.getPendingMembers = (req, res) => {
    const {id: classId} = req.params
    const {userID} = req

    RequestAction.getPendingMembers(classId, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.create = (req, res) => {
    const {id: classId} = req.params
    const {userID} = req

    RequestAction.createJoinClassRequest(classId, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.approveMembers = (req, res) => {
    const {id: classId} = req.params
    const {members} = Object.assign({}, req.body)
    const {userID} = req

    RequestAction.approveMembers(classId, members, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.rejectMembers = (req, res) => {
    const {id: classId} = req.params
    const {members} = Object.assign({}, req.body)
    const {userID} = req

    RequestAction.rejectMembers(classId, members, userID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}