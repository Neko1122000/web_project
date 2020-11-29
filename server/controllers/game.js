const {sendError, sendSuccess} = require('../helper/sendResponse')
const GameAction = require('../actions/HighestRecordAction')

exports.getRecord = (req, res) => {
    const {id: setId} = Object.assign({}, req.params)

    GameAction.getHighestGameRecord(setId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}