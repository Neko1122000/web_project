const joi = require('joi')
const {getModel} = require('../connection/mongodb')

const _validate = async (args) => {
    const validate_schema = joi.object({
        name: joi.string().required().trim(),
        address: joi.string().required().trim(),
        description: joi.string().trim(),
        allow_member_change: joi.boolean(),
    })

    return validate_schema.validateAsync(args)
}

exports.create = async (args, userId) => {
    const data = await _validate(args)
    const Class = getModel('Class')
    return Class.create({...data, members: [userId],creator: userId})
}

const _allow_update = async (classId, userId) => {
    const Class = getModel('Class')
    const _class = await Class.findById(classId).lean()

    if (!_class) throw new Error('Class not found')
    const {allow_member_change} = _class
    if (!allow_member_change) {
        const {creator} = _class
        if (creator !== userId) throw new Error ('You not allow to change this resource.')
    } else {
        const {members} = _class
        if (!members.includes(userId)) throw new Error ('You not allow to change this resource.')
    }
    return true
}

const update = async (classId, args, userId) => {
    await _allow_update(classId, userId)

    args = (({sets, folders, members, name, description, allow_member_change, address}) => ({sets, folders, members, name, description, allow_member_change, address}))(args);

    const Class = getModel('Class')
    return Class.updateOne({_id: classId}, {$set: args})
}
exports.update = update

exports.delete = async (classId, userId) => {
    const Class = getModel('Class')
    const _class = await Class.findById(classId).lean()
    if (!_class) throw new Error ('Class not found.')

    if (!_class.creator === userId) throw new Error ('You not allow to change this resource.')
    return Class.updateOne({_id: classId}, {$set: {is_active: false}})
}

exports.getDetail = async (classId, userId) => {
    const Class = getModel('Class')
    const _class = await Class.findOne({_id: classId}).lean()

    const {members} = _class
    if (!members.includes(userId)) {
        const {folders, sets} = _class

        const Folder = getModel('Folder')
        const _folders = await Folder.find({_id: {$in: folders}, is_active: true}).select('-sets').lean()

        const query = {
            _id: {$in: sets},
            is_active: true,
            $or: [
                {visible_by: {$in: ['everyone', 'password']}},
                {visible_by: 'only_me', creator: userId},
                {visible_by: 'classes', visible_class: {classId}}
            ]}
        const Set = getModel('Set')
        const _sets = await Set.find(query).select('name description creator visible_by').lean()

        const data =  Object.assign({}, _class, {folder: _folders, sets, _sets})
        return {data, member: true}
    } else return {data: _class, member: false}
}

exports.search = async (args, userId) => {
    const query = {is_active: true, creator: userId}
    const sort = {created: -1}
    const {name} = args

    if (name)  {
        delete query.creator
        query['name'] = {$text: {$search: name}}

        delete sort.created
        sort['score'] = {$meta: "textScore"}
    }

    const Class = getModel('Class')
    return Class.find(query).select('name description creator').sort(sort).lean()
}