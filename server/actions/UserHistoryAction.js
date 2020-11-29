const {getModel} = require('../connection/mongodb')
const {createHighestRecord} = require('./HighestRecordAction')

exports.updateOrCreateIfNotExist = async (args, userID) => {
    const {activity, set_id} = args
    const data = {
        activity,
        set: set_id,
        user: userID,
    }

    const UserHistory = getModel('UserHistory')
    const history = await UserHistory.findOne(data).lean()

    switch (activity) {
        case 'learn': {
            if (!history) {
                await UserHistory.create({...data, meta: {count: 1}})
            } else {
                await UserHistory.updateOne({data}, {$set: {meta: {count: history.meta.count + 1}}})
            }
            break
        }
        case 'examination': {
            const {result} = args
            if (!history) {
                await UserHistory.create({...data, meta: {result: [result]}})
            } else {
                await UserHistory.updateOne({data}, {$push: {meta: {count: result}}, $set: {updated_at: Date.now()}})
            }
            break
        }
        case 'play_game': {
            const {result} = args
            if (!history) {
                await UserHistory.create({...data, meta: {result: [result]}})
            } else {
                await UserHistory.updateOne({data}, {$push: {meta: {count: result}}, $set: {updated_at: Date.now()}})
            }
            await createHighestRecord(set_id, result, userID)
            break
        }
    }

    return true
}

exports.getHistory = async (userId) => {
    const UserHistory = getModel('UserHistory')

    return UserHistory.aggregate([
        {$match: {user: userId}},
        {$group: {_id: "$set", data: {$mergeObjects: {type: '$activity', result: '$meta'}}}}
    ])
}