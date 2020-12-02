const {getModel} = require('../connection/mongodb')
const ClassAction = require('./ClassAction')

exports.createJoinClassRequest = async (classId, userId) => {
    const Request = getModel('Request')

    const Class = getModel('Class')
    const _class = await Class.findById(classId).lean()
    if (_class.members.includes(userId)) throw new Error ('You are already in class.')

    const data = {
        type: 'join_class',
        meta: {
            class: classId,
        },
        creator: userId
    }
    return Request.create(data)
}

exports.getPendingMembers = async (classId, userId) => {
    const Request = getModel('Request')

    const Class = getModel('Class')
    const _class = await Class.findById(classId).lean()

    const members = _class.members.map(str => str + "")
    if (!members.includes(userId + "")) throw new Error ('You are not allowed to see this resource.')

    const request = await Request.find({type: 'join_class', 'meta.class': classId, status: 'pending'}).populate({
        path: 'creator',
        select: 'username'
    }).lean()
    return request.map(data => {
        data.username = data.creator.username || data.creator._id
        return data
    })

}

exports.rejectMembers = async (classId, membersReject, userId) => {
    const Class = getModel('Class')
    const _class = await Class.findById(classId).lean()
    const {members, allow_member_change} = _class
    if (!members.includes(userId) || !allow_member_change) throw new Error ('You are not allowed to change this resource.')

    if (!Array.isArray(membersReject)) throw new Error ('Member list must be an array.')

    const Request = getModel('Request')
    const query = {
        type: 'join_class',
        'meta.class': classId,
        status: 'pending',
        creator: {$in: members},
        updated_at: Date.now()
    }
    return Request.updateMany(query, {$set: {status: "rejected"}}).lean()
}

exports.approveMembers = async (classId, membersAdd, userId) => {
    const Class = getModel('Class')
    const _class = await Class.findById(classId).lean()
    const {members, allow_member_change} = _class
    if (!members.includes(userId) || !allow_member_change) throw new Error ('You are not allowed to change this resource.')

    if (!Array.isArray(membersAdd)) throw new Error ('Member list must be an array.')

    const _members = members.concat(membersAdd)
    const Request = getModel('Request')
    const query = {
        type: 'join_class',
        'meta.class': classId,
        status: 'pending',
        creator: {$in: members},
        updated_at: Date.now()
    }
    await Request.updateMany(query, {$set: {status: "approved"}}).lean()
    return ClassAction.update(classId, {members: _members}, userId)
}