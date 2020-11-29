const {getModel} = require('../connection/mongodb')

exports.createHighestRecord = async (set_id, result, userID) => {
    const Record = getModel('GameHighestRecord')
    return Record.create({set:set_id, result, user: userID})
}

exports.getHighestGameRecord = async (set_id) => {
    const Record = getModel('GameHighestRecord')
    return Record.find({set: set_id}).sort({result: 1}).limit(10).lean()
}